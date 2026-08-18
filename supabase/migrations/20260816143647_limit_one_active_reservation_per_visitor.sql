-- Evita que um único navegador reserve vários países ao mesmo tempo.
delete from public.slot_reservations r
using (
  select slot_id, row_number() over (partition by visitor_token order by created_at desc) as position
  from public.slot_reservations
) duplicates
where r.slot_id = duplicates.slot_id and duplicates.position > 1;

create unique index if not exists slot_reservations_one_slot_per_visitor_idx
  on public.slot_reservations (visitor_token);

create or replace function public.reserve_event_slot(p_slot_id uuid, p_visitor_token uuid)
returns table (result text, expires_at timestamptz)
language plpgsql security definer set search_path = public
as $$
declare
  v_expiry timestamptz := now() + interval '5 minutes';
  v_existing_expiry timestamptz;
begin
  perform pg_advisory_xact_lock(hashtextextended(p_visitor_token::text, 0));
  delete from public.slot_reservations r where r.visitor_token = p_visitor_token and r.expires_at <= now();
  select r.expires_at into v_existing_expiry from public.slot_reservations r where r.visitor_token = p_visitor_token limit 1;
  if found then return query select 'already_reserved'::text, v_existing_expiry; return; end if;
  perform 1 from public.event_slots s where s.id = p_slot_id for update;
  if not found then return query select 'not_found'::text, null::timestamptz; return; end if;
  if exists (select 1 from public.registrations r where r.slot_id = p_slot_id) then return query select 'taken'::text, null::timestamptz; return; end if;
  delete from public.slot_reservations r where r.slot_id = p_slot_id and r.expires_at <= now();
  insert into public.slot_reservations (slot_id, visitor_token, expires_at)
  values (p_slot_id, p_visitor_token, v_expiry) on conflict (slot_id) do nothing;
  if found then return query select 'reserved'::text, v_expiry; end if;
  return query select 'unavailable'::text, null::timestamptz;
end;
$$;

revoke all on function public.reserve_event_slot(uuid, uuid) from public;
grant execute on function public.reserve_event_slot(uuid, uuid) to anon, authenticated;

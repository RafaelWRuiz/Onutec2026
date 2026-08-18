-- Registra apenas tentativas reais enviadas ao servidor antes da abertura.
create table public.security_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in ('early_reservation_attempt')),
  visitor_token uuid not null,
  slot_id uuid references public.event_slots(id) on delete set null,
  created_at timestamptz not null default now()
);

create index security_events_created_at_idx on public.security_events (created_at desc);
alter table public.security_events enable row level security;
create policy "admins read security events" on public.security_events for select to authenticated using (private.is_event_admin());

create or replace function public.reserve_event_slot(p_slot_id uuid, p_visitor_token uuid)
returns table (result text, expires_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare v_expiry timestamptz := now() + interval '5 minutes'; v_existing_expiry timestamptz;
begin
  if exists (select 1 from public.event_settings e where e.singleton = true and e.registration_opens_at > now()) then
    insert into public.security_events (event_type, visitor_token, slot_id)
    values ('early_reservation_attempt', p_visitor_token, p_slot_id);
    return query select 'closed'::text, null::timestamptz;
    return;
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_visitor_token::text, 0));
  delete from public.slot_reservations r where r.visitor_token = p_visitor_token and r.expires_at <= now();
  select r.expires_at into v_existing_expiry from public.slot_reservations r where r.visitor_token = p_visitor_token limit 1;
  if found then return query select 'already_reserved'::text, v_existing_expiry; return; end if;
  perform 1 from public.event_slots s where s.id = p_slot_id for update;
  if not found then return query select 'not_found'::text, null::timestamptz; return; end if;
  if exists (select 1 from public.registrations r where r.slot_id = p_slot_id) then return query select 'taken'::text, null::timestamptz; return; end if;
  delete from public.slot_reservations r where r.slot_id = p_slot_id and r.expires_at <= now();
  insert into public.slot_reservations (slot_id, visitor_token, expires_at) values (p_slot_id, p_visitor_token, v_expiry) on conflict (slot_id) do nothing;
  if found then return query select 'reserved'::text, v_expiry; end if;
  return query select 'unavailable'::text, null::timestamptz;
end;
$$;

revoke all on function public.reserve_event_slot(uuid, uuid) from public;
grant execute on function public.reserve_event_slot(uuid, uuid) to anon, authenticated;

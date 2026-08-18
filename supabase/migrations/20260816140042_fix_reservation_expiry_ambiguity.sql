-- Corrige a leitura do vencimento da reserva quando a mesma visitante tenta a vaga já reservada.
create or replace function public.reserve_event_slot(p_slot_id uuid, p_visitor_token uuid)
returns table (result text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_expiry timestamptz := now() + interval '5 minutes';
begin
  perform 1 from public.event_slots where id = p_slot_id for update;

  if not found then
    return query select 'not_found'::text, null::timestamptz;
    return;
  end if;

  if exists (select 1 from public.registrations where slot_id = p_slot_id) then
    return query select 'taken'::text, null::timestamptz;
    return;
  end if;

  delete from public.slot_reservations
  where slot_id = p_slot_id and expires_at <= now();

  insert into public.slot_reservations (slot_id, visitor_token, expires_at)
  values (p_slot_id, p_visitor_token, v_expiry)
  on conflict (slot_id) do nothing;

  if found then
    return query select 'reserved'::text, v_expiry;
  elsif exists (
    select 1
    from public.slot_reservations r
    where r.slot_id = p_slot_id and r.visitor_token = p_visitor_token and r.expires_at > now()
  ) then
    return query
    select 'reserved'::text, r.expires_at
    from public.slot_reservations r
    where r.slot_id = p_slot_id and r.visitor_token = p_visitor_token
    limit 1;
  else
    return query select 'unavailable'::text, null::timestamptz;
  end if;
end;
$$;

revoke all on function public.reserve_event_slot(uuid, uuid) from public;
grant execute on function public.reserve_event_slot(uuid, uuid) to anon, authenticated;

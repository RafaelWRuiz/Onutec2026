create table public.event_settings (singleton boolean primary key default true check (singleton), registration_opens_at timestamptz not null default now(), updated_at timestamptz not null default now(), updated_by uuid references auth.users(id));
alter table public.event_settings enable row level security;
insert into public.event_settings (singleton, registration_opens_at) values (true, now()) on conflict (singleton) do nothing;
create table public.committee_locations (period text not null check (period in ('Manhã', 'Tarde')), committee text not null, location text not null default '', updated_at timestamptz not null default now(), updated_by uuid references auth.users(id), primary key (period, committee));
alter table public.committee_locations enable row level security;
create policy "admins manage event settings" on public.event_settings for all to authenticated using (private.is_event_admin()) with check (private.is_event_admin());
create policy "admins manage committee locations" on public.committee_locations for all to authenticated using (private.is_event_admin()) with check (private.is_event_admin());
create or replace function public.get_registration_status() returns table (opens_at timestamptz, is_open boolean) language sql security definer set search_path = public as $$ select e.registration_opens_at, e.registration_opens_at <= now() from public.event_settings e where e.singleton = true $$;
revoke all on function public.get_registration_status() from public;
grant execute on function public.get_registration_status() to anon, authenticated;

create or replace function public.reserve_event_slot(p_slot_id uuid, p_visitor_token uuid)
returns table (result text, expires_at timestamptz)
language plpgsql security definer set search_path = public as $$
declare v_expiry timestamptz := now() + interval '5 minutes'; v_existing_expiry timestamptz;
begin
  if exists (select 1 from public.event_settings e where e.singleton = true and e.registration_opens_at > now()) then return query select 'closed'::text, null::timestamptz; return; end if;
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

create or replace function public.confirm_event_registration(p_slot_id uuid, p_visitor_token uuid, p_member_one_name text, p_member_one_class text, p_member_two_name text, p_member_two_class text)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_registration_id uuid;
begin
  if exists (select 1 from public.event_settings e where e.singleton = true and e.registration_opens_at > now()) then raise exception 'As inscrições ainda não foram abertas.' using errcode = 'P0001'; end if;
  perform 1 from public.event_slots where id = p_slot_id for update;
  perform 1 from public.slot_reservations where slot_id = p_slot_id and visitor_token = p_visitor_token and expires_at > now() for update;
  if not found then raise exception 'A reserva expirou ou não pertence a esta inscrição.' using errcode = 'P0001'; end if;
  insert into public.registrations (slot_id, member_one_name, member_one_class, member_two_name, member_two_class) values (p_slot_id, p_member_one_name, p_member_one_class, p_member_two_name, p_member_two_class) returning id into v_registration_id;
  delete from public.slot_reservations where slot_id = p_slot_id;
  return v_registration_id;
end;
$$;

revoke all on function public.reserve_event_slot(uuid, uuid) from public;
revoke all on function public.confirm_event_registration(uuid, uuid, text, text, text, text) from public;
grant execute on function public.reserve_event_slot(uuid, uuid) to anon, authenticated;
grant execute on function public.confirm_event_registration(uuid, uuid, text, text, text, text) to anon, authenticated;

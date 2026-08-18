-- ONU Tec: inscrições em dupla com reserva temporária de delegação.
-- Uma vaga é sempre única por período + comitê + país.

create table public.event_slots (
  id uuid primary key default gen_random_uuid(),
  period text not null check (period in ('Manhã', 'Tarde')),
  committee text not null,
  country text not null,
  created_at timestamptz not null default now(),
  unique (period, committee, country)
);

create table public.slot_reservations (
  slot_id uuid primary key references public.event_slots(id) on delete cascade,
  visitor_token uuid not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table public.registrations (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null unique references public.event_slots(id) on delete restrict,
  member_one_name text not null check (char_length(trim(member_one_name)) > 1),
  member_one_class text not null check (char_length(trim(member_one_class)) > 1),
  member_two_name text not null check (char_length(trim(member_two_name)) > 1),
  member_two_class text not null check (char_length(trim(member_two_class)) > 1),
  created_at timestamptz not null default now()
);

create index registrations_slot_id_idx on public.registrations(slot_id);
create index slot_reservations_expires_at_idx on public.slot_reservations(expires_at);

alter table public.event_slots enable row level security;
alter table public.slot_reservations enable row level security;
alter table public.registrations enable row level security;

-- O público pode apenas consultar vagas e a lista de participantes.
create policy "public can read slots" on public.event_slots for select using (true);
create policy "public can read registrations" on public.registrations for select using (true);

-- Reserve ao tocar no país. A chave primária de slot_reservations faz o banco
-- escolher uma única vencedora, mesmo que os pedidos cheguem no mesmo instante.
create or replace function public.reserve_event_slot(p_slot_id uuid, p_visitor_token uuid)
returns table (result text, expires_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_expiry timestamptz := now() + interval '5 minutes';
begin
  -- Serializa reserva e confirmação da mesma vaga.
  perform 1 from event_slots where id = p_slot_id for update;

  if not found then
    return query select 'not_found'::text, null::timestamptz;
    return;
  end if;

  if exists (select 1 from registrations where slot_id = p_slot_id) then
    return query select 'taken'::text, null::timestamptz;
    return;
  end if;

  -- Uma reserva vencida deixa de bloquear a vaga antes da tentativa atual.
  delete from slot_reservations
  where slot_id = p_slot_id and expires_at <= now();

  insert into slot_reservations (slot_id, visitor_token, expires_at)
  values (p_slot_id, p_visitor_token, v_expiry)
  on conflict (slot_id) do nothing;

  if found then
    return query select 'reserved'::text, v_expiry;
  elsif exists (
    select 1 from slot_reservations
    where slot_id = p_slot_id and visitor_token = p_visitor_token and expires_at > now()
  ) then
    return query select 'reserved'::text, (select r.expires_at from slot_reservations r where r.slot_id = p_slot_id);
  else
    return query select 'unavailable'::text, null::timestamptz;
  end if;
end;
$$;

-- Converte somente a reserva desta visitante em inscrição definitiva.
create or replace function public.confirm_event_registration(
  p_slot_id uuid,
  p_visitor_token uuid,
  p_member_one_name text,
  p_member_one_class text,
  p_member_two_name text,
  p_member_two_class text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_registration_id uuid;
begin
  -- Serializa com novas reservas e bloqueia a linha da reserva durante a conversão.
  perform 1 from event_slots where id = p_slot_id for update;

  perform 1 from slot_reservations
  where slot_id = p_slot_id and visitor_token = p_visitor_token and expires_at > now()
  for update;

  if not found then
    raise exception 'A reserva expirou ou não pertence a esta inscrição.' using errcode = 'P0001';
  end if;

  insert into registrations (
    slot_id, member_one_name, member_one_class, member_two_name, member_two_class
  ) values (
    p_slot_id, p_member_one_name, p_member_one_class, p_member_two_name, p_member_two_class
  ) returning id into v_registration_id;

  delete from slot_reservations where slot_id = p_slot_id;
  return v_registration_id;
end;
$$;

revoke all on function public.reserve_event_slot(uuid, uuid) from public;
revoke all on function public.confirm_event_registration(uuid, uuid, text, text, text, text) from public;
grant execute on function public.reserve_event_slot(uuid, uuid) to anon, authenticated;
grant execute on function public.confirm_event_registration(uuid, uuid, text, text, text, text) to anon, authenticated;

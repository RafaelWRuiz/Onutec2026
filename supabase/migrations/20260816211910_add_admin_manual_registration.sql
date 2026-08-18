-- Permite à organização criar uma inscrição sem passar pela reserva pública.
-- A função mantém a vaga única mesmo se outra confirmação chegar no mesmo instante.
create or replace function public.admin_create_registration(
  p_slot_id uuid,
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
  if not private.is_event_admin() then
    raise exception 'Acesso administrativo necessário.' using errcode = '42501';
  end if;

  perform 1 from public.event_slots where id = p_slot_id for update;
  if not found then
    raise exception 'Vaga não encontrada.' using errcode = 'P0001';
  end if;

  if exists (select 1 from public.registrations where slot_id = p_slot_id) then
    raise exception 'Esta vaga já foi ocupada.' using errcode = 'P0001';
  end if;

  insert into public.registrations (
    slot_id, member_one_name, member_one_class, member_two_name, member_two_class
  ) values (
    p_slot_id, p_member_one_name, p_member_one_class, p_member_two_name, p_member_two_class
  ) returning id into v_registration_id;

  -- Uma inscrição manual da organização prevalece sobre reserva pública pendente.
  delete from public.slot_reservations where slot_id = p_slot_id;
  return v_registration_id;
end;
$$;

revoke all on function public.admin_create_registration(uuid, text, text, text, text) from public;
grant execute on function public.admin_create_registration(uuid, text, text, text, text) to authenticated;

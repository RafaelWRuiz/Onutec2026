-- O RPC de inscrição manual nunca deve ser chamado por visitantes anônimos.
revoke all on function public.admin_create_registration(uuid, text, text, text, text) from anon;
revoke all on function public.admin_create_registration(uuid, text, text, text, text) from public;
grant execute on function public.admin_create_registration(uuid, text, text, text, text) to authenticated;

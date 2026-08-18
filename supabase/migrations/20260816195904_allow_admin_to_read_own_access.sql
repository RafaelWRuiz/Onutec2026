drop policy if exists "admins read admin list" on public.event_admins;

create policy "admins read own access"
on public.event_admins for select to authenticated
using (user_id = (select auth.uid()));

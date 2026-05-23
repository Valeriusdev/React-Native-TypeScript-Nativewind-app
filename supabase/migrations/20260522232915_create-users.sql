create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text not null
);

alter table public.users enable row level security;

create policy "users can select their own row"
on public.users
for select
to authenticated
using (id = auth.uid());

create policy "users can insert their own row"
on public.users
for insert
to authenticated
with check (id = auth.uid());

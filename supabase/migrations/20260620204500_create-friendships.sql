create table public.friendships (
  user_low uuid not null references public.users (id) on delete cascade,
  user_high uuid not null references public.users (id) on delete cascade,
  primary key (user_low, user_high),
  check (user_low < user_high)
);

create index friendships_user_high_idx on public.friendships (user_high);

alter table public.friendships enable row level security;

create policy "users can select their friendships"
on public.friendships
for select
to authenticated
using (user_low = auth.uid() or user_high = auth.uid());

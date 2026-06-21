create policy "users can select their friends"
on public.users
for select
to authenticated
using (
  exists (
    select 1
    from public.friendships
    where (
      friendships.user_low = auth.uid()
      and friendships.user_high = users.id
    )
    or (
      friendships.user_high = auth.uid()
      and friendships.user_low = users.id
    )
  )
);

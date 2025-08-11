-- Create private bucket for medical documents
insert into storage.buckets (id, name, public)
values ('medical-docs', 'medical-docs', false)
on conflict (id) do nothing;

-- Policies to allow authenticated users to manage their own files under a user-id prefixed folder
create policy if not exists "Medical docs - read own"
  on storage.objects
  for select
  using (
    bucket_id = 'medical-docs'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy if not exists "Medical docs - insert own"
  on storage.objects
  for insert
  with check (
    bucket_id = 'medical-docs'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy if not exists "Medical docs - update own"
  on storage.objects
  for update
  using (
    bucket_id = 'medical-docs'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy if not exists "Medical docs - delete own"
  on storage.objects
  for delete
  using (
    bucket_id = 'medical-docs'
    and auth.role() = 'authenticated'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
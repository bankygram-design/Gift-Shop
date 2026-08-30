-- Run this AFTER creating a Storage bucket called "product-images" in the
-- Supabase dashboard (Storage > New bucket > name: product-images > Public: ON).
-- This grants admins upload/update/delete rights and everyone read access.

drop policy if exists "public can view product images" on storage.objects;
create policy "public can view product images" on storage.objects
  for select using (bucket_id = 'product-images');

drop policy if exists "admins can upload product images" on storage.objects;
create policy "admins can upload product images" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'product-images'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );

drop policy if exists "admins can update product images" on storage.objects;
create policy "admins can update product images" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'product-images'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );

drop policy if exists "admins can delete product images" on storage.objects;
create policy "admins can delete product images" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'product-images'
    and exists (select 1 from admin_users where admin_users.id = auth.uid())
  );

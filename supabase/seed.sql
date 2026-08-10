-- Creates the first super admin account.
-- EDIT the email and password below before running this once.
-- Safe to run in the Supabase SQL editor (hosted) or via `supabase db reset` (local).

do $$
declare
  new_user_id uuid := gen_random_uuid();
  admin_email text := 'joshgit6@gmail.com';       -- <-- change this
  admin_password text := 'nccdrcMe123!';         -- <-- change this before running
  admin_name text := 'Super Admin';
begin
  -- pgcrypto is needed for crypt()/gen_salt() below; Supabase projects have it
  -- available by default under the "extensions" schema.
  create extension if not exists pgcrypto;

  -- Skip if this email is already registered
  if exists (select 1 from auth.users where email = admin_email) then
    raise notice 'User % already exists, skipping.', admin_email;
    return;
  end if;

  insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token
  ) values (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    admin_email,
    crypt(admin_password, gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    jsonb_build_object('full_name', admin_name),
    now(),
    now(),
    '',
    ''
  );

  -- Also insert the matching identity row (required for email/password login)
  insert into auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  ) values (
    gen_random_uuid(),
    new_user_id,
    new_user_id::text,
    jsonb_build_object('sub', new_user_id::text, 'email', admin_email),
    'email',
    now(),
    now(),
    now()
  );

  -- The on_auth_user_created trigger (see migrations/20260723120000_profiles.sql)
  -- will have already inserted a 'user' profile row for this user — promote it.
  update public.profiles
  set role = 'super_admin', full_name = admin_name
  where id = new_user_id;

  raise notice 'Super admin created: % / %', admin_email, admin_password;
end $$;
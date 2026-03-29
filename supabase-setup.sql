-- Run this in the Supabase SQL Editor for your project
-- (Dashboard → SQL Editor → New query)

-- 1. Create the submissions table
create table if not exists submissions (
  id           bigint generated always as identity primary key,
  created_at   timestamptz default now() not null,
  ref          text not null unique,
  position     text not null,
  first_name   text not null,
  last_name    text not null,
  dob          text,
  ssn          text,
  address      text,
  phone        text,
  email        text,
  education    text,
  experience   text,
  prev_employer text,
  why_fib      text,
  q1           text,
  q2           text,
  q3           text
);

-- 2. Enable Row Level Security
alter table submissions enable row level security;

-- 3. Allow anyone (anon key) to INSERT — but not SELECT, UPDATE, or DELETE.
--    This means the public can submit applications but cannot read them.
--    You read submissions via the Supabase dashboard or with your service role key.
create policy "public can insert"
  on submissions for insert
  to anon
  with check (true);

-- That's it. No select policy = anon users cannot read any rows.

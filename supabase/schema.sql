create extension if not exists "pgcrypto";

create type organization_type as enum ('student_org', 'hackathon', 'nonprofit', 'club', 'other');
create type sponsor_status as enum ('prospecting', 'contacted', 'meeting_scheduled', 'negotiating', 'sponsored', 'rejected');
create type outreach_type as enum ('cold_email', 'follow_up', 'linkedin_message', 'judge_invitation');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  type organization_type not null default 'student_org',
  university text,
  funding_goal numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table public.sponsors (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  company_name text not null,
  contact_name text,
  email text,
  linkedin_url text,
  notes text,
  sponsorship_amount numeric(12, 2) not null default 0,
  last_contacted_at timestamptz,
  status sponsor_status not null default 'prospecting',
  tags text[] not null default '{}',
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  name text not null,
  email text,
  linkedin_url text,
  title text,
  company text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.outreach_messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  contact_id uuid references public.contacts(id) on delete set null,
  type outreach_type not null,
  subject text,
  body text not null,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sponsor_id uuid references public.sponsors(id) on delete set null,
  contact_id uuid references public.contacts(id) on delete set null,
  actor_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  summary text not null,
  created_at timestamptz not null default now()
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  sponsor_id uuid references public.sponsors(id) on delete cascade,
  contact_id uuid references public.contacts(id) on delete cascade,
  title text not null,
  due_at timestamptz not null,
  completed_at timestamptz,
  suggested_message_id uuid references public.outreach_messages(id) on delete set null,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger sponsors_touch_updated_at
before update on public.sponsors
for each row execute function public.touch_updated_at();

create trigger contacts_touch_updated_at
before update on public.contacts
for each row execute function public.touch_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.sponsors enable row level security;
alter table public.contacts enable row level security;
alter table public.outreach_messages enable row level security;
alter table public.activities enable row level security;
alter table public.reminders enable row level security;

create policy "Users can read their own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Users can manage owned organizations"
on public.organizations for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Organization owners can manage sponsors"
on public.sponsors for all
using (
  exists (
    select 1 from public.organizations
    where organizations.id = sponsors.organization_id
    and organizations.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.organizations
    where organizations.id = sponsors.organization_id
    and organizations.owner_id = auth.uid()
  )
);

create policy "Organization owners can manage contacts"
on public.contacts for all
using (
  exists (
    select 1 from public.organizations
    where organizations.id = contacts.organization_id
    and organizations.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.organizations
    where organizations.id = contacts.organization_id
    and organizations.owner_id = auth.uid()
  )
);

create policy "Organization owners can manage outreach messages"
on public.outreach_messages for all
using (
  exists (
    select 1 from public.organizations
    where organizations.id = outreach_messages.organization_id
    and organizations.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.organizations
    where organizations.id = outreach_messages.organization_id
    and organizations.owner_id = auth.uid()
  )
);

create policy "Organization owners can manage activities"
on public.activities for all
using (
  exists (
    select 1 from public.organizations
    where organizations.id = activities.organization_id
    and organizations.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.organizations
    where organizations.id = activities.organization_id
    and organizations.owner_id = auth.uid()
  )
);

create policy "Organization owners can manage reminders"
on public.reminders for all
using (
  exists (
    select 1 from public.organizations
    where organizations.id = reminders.organization_id
    and organizations.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.organizations
    where organizations.id = reminders.organization_id
    and organizations.owner_id = auth.uid()
  )
);

create index sponsors_organization_status_idx on public.sponsors (organization_id, status, position);
create index contacts_organization_search_idx on public.contacts using gin (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(company, '') || ' ' || coalesce(email, '')));
create index activities_organization_created_idx on public.activities (organization_id, created_at desc);
create index reminders_organization_due_idx on public.reminders (organization_id, due_at) where completed_at is null;

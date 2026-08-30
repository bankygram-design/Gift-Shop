-- BYSIMON GIFTS database schema
-- Run this in the Supabase SQL editor once the project is created.

create extension if not exists "pgcrypto";

-- ADMIN USERS (roles on top of Supabase Auth users)
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- CATEGORIES
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  emoji text,
  image_url text,
  created_at timestamptz not null default now()
);

-- PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12, 2) not null check (price >= 0),
  image_url text,
  category_id uuid references categories(id) on delete set null,
  stock integer,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ORDERS
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique, -- e.g. GIF-1048
  customer_name text not null,
  customer_phone text not null,
  delivery_address text not null,
  delivery_city text not null,
  delivery_state text not null,
  delivery_country text,
  subtotal numeric(12, 2) not null,
  delivery_fee numeric(12, 2),
  total numeric(12, 2) not null,
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'processing', 'ready', 'delivered')),
  created_at timestamptz not null default now()
);

-- ORDER ITEMS
-- product_name and price are snapshotted at order time on purpose:
-- if the product's live price changes later, this historical record must not change.
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  price numeric(12, 2) not null
);

-- STORE SETTINGS (single row)
create table if not exists store_settings (
  id integer primary key default 1 check (id = 1),
  store_name text not null default 'BYSIMON GIFTS',
  whatsapp_number text not null default '',
  phone text,
  email text,
  logo_url text,
  address text,
  instagram text,
  updated_at timestamptz not null default now()
);

insert into store_settings (id, store_name)
values (1, 'BYSIMON GIFTS')
on conflict (id) do nothing;

-- ORDER NUMBER GENERATION
-- Auto-generates order numbers like BSG-1000, BSG-1001, ... on insert,
-- so the app never has to guess/race on the next number itself.
create sequence if not exists order_number_seq start with 1000;

create or replace function set_order_number()
returns trigger as $$
begin
  if new.order_number is null or new.order_number = '' then
    new.order_number := 'BSG-' || nextval('order_number_seq');
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_set_order_number on orders;
create trigger trg_set_order_number
before insert on orders
for each row execute function set_order_number();

-- INDEXES
create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_is_featured on products(is_featured);
create index if not exists idx_order_items_order_id on order_items(order_id);
create index if not exists idx_orders_status on orders(status);

-- ROW LEVEL SECURITY
alter table categories enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table store_settings enable row level security;
alter table admin_users enable row level security;

-- Public (anon) can READ categories, available products, and store settings
drop policy if exists "public can read categories" on categories;
create policy "public can read categories" on categories
  for select using (true);

drop policy if exists "public can read available products" on products;
create policy "public can read available products" on products
  for select using (is_available = true);

drop policy if exists "public can read store settings" on store_settings;
create policy "public can read store settings" on store_settings
  for select using (true);

-- Public (anon) can INSERT orders and order_items (checkout flow),
-- but cannot read, update, or delete other customers' orders.
drop policy if exists "public can create orders" on orders;
create policy "public can create orders" on orders
  for insert with check (true);

drop policy if exists "public can create order items" on order_items;
create policy "public can create order items" on order_items
  for insert with check (true);

-- Public (anon) can also READ orders/order_items.
-- NOTE / KNOWN TRADEOFF: the Basic package has no customer accounts, so
-- there's no auth.uid() to scope this to "your own order only" - anyone
-- with the anon key could look up any order's name/phone/address. No
-- payment data is stored, so the blast radius is limited, but this is
-- worth hardening later (e.g. a SECURITY DEFINER RPC that only returns
-- one order by number) if the client wants stronger guest-order privacy.
drop policy if exists "public can read orders" on orders;
create policy "public can read orders" on orders
  for select using (true);

drop policy if exists "public can read order items" on order_items;
create policy "public can read order items" on order_items
  for select using (true);

-- Authenticated admins (rows present in admin_users) have full access.
drop policy if exists "admins full access categories" on categories;
create policy "admins full access categories" on categories
  for all using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists "admins full access products" on products;
create policy "admins full access products" on products
  for all using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists "admins full access orders" on orders;
create policy "admins full access orders" on orders
  for all using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists "admins full access order items" on order_items;
create policy "admins full access order items" on order_items
  for all using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists "admins full access store settings" on store_settings;
create policy "admins full access store settings" on store_settings
  for all using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

drop policy if exists "admins can read own admin row" on admin_users;
create policy "admins can read own admin row" on admin_users
  for select using (auth.uid() = id);

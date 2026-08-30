-- Run this in Supabase SQL Editor. Safe to run once - adds automatic
-- order numbering (BSG-1000, BSG-1001, ...) to the orders table that
-- already exists from schema.sql.

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

-- Also needed: allow reading orders/order_items back (the checkout flow
-- inserts an order, then immediately needs to read it back to get its
-- order_number, and the confirmation page needs to read it too).
-- KNOWN TRADEOFF: no customer accounts in the Basic package means this
-- can't be scoped to "your own order only" - see the comment in schema.sql.
drop policy if exists "public can read orders" on orders;
create policy "public can read orders" on orders
  for select using (true);

drop policy if exists "public can read order items" on order_items;
create policy "public can read order items" on order_items
  for select using (true);

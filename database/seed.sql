-- Seed data for BYSIMON GIFTS
-- Run this AFTER schema.sql. Safe to re-run (uses upsert on slug/unique columns).
-- Replace these rows with real products once photos/final copy are ready -
-- or better, once the admin dashboard exists, manage products there instead.

insert into categories (name, slug, emoji) values
  ('Flowers', 'flowers', '🌸'),
  ('Necklaces', 'necklaces', '📿'),
  ('Men & Women Wears', 'men-women-wears', '👕'),
  ('Customized Items', 'customized-items', '🎨'),
  ('Earrings', 'earrings', '💎'),
  ('Greeting Letters', 'greeting-letters', '💌'),
  ('Picture Frames', 'picture-frames', '🖼️'),
  ('Car Keys', 'car-keys', '🔑'),
  ('House Keys', 'house-keys', '🗝️'),
  ('Kids Toys', 'kids-toys', '🧸'),
  ('Men & Women Watches', 'men-women-watches', '⌚'),
  ('Glasses', 'glasses', '🕶️'),
  ('Belts', 'belts', '👖'),
  ('Flower Vase', 'flower-vase', '🏺'),
  ('Guy Gifts', 'guy-gifts', '🎁'),
  ('Combo Gift', 'combo-gift', '🎀'),
  ('Foods', 'foods', '🍰'),
  ('Men Accessories', 'men-accessories', '🧢'),
  ('Women Accessories', 'women-accessories', '👛'),
  ('Rings', 'rings', '💍'),
  ('House Items', 'house-items', '🏠')
on conflict (slug) do update set emoji = excluded.emoji, name = excluded.name;

insert into products (name, slug, description, price, category_id, stock, is_available, is_featured)
select
  'Fresh Rose Bouquet', 'fresh-rose-bouquet',
  'Fresh roses arranged for a romantic gesture that speaks for itself.',
  30000, id, 15, true, true
from categories where slug = 'flowers'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, category_id, stock, is_available, is_featured)
select
  'Beaded Necklace', 'beaded-necklace',
  'A handcrafted beaded necklace that pairs elegance with everyday wear.',
  18000, id, 20, true, true
from categories where slug = 'necklaces'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, category_id, stock, is_available, is_featured)
select
  'Customized Photo Frame', 'customized-photo-frame',
  'A personalized photo frame engraved with a name or special date.',
  15000, id, 25, true, false
from categories where slug = 'picture-frames'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, category_id, stock, is_available, is_featured)
select
  'Customized Mug', 'customized-mug',
  'A printed mug personalized with a name, photo, or message.',
  9000, id, 30, true, true
from categories where slug = 'customized-items'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, category_id, stock, is_available, is_featured)
select
  'Classic Wrist Watch', 'classic-wrist-watch',
  'A refined wrist watch suited for both everyday wear and special occasions.',
  45000, id, 10, true, false
from categories where slug = 'men-women-watches'
on conflict (slug) do nothing;

insert into products (name, slug, description, price, category_id, stock, is_available, is_featured)
select
  'Deluxe Combo Gift Box', 'deluxe-combo-gift-box',
  'A curated mix of treats and keepsakes bundled into one gift box.',
  55000, id, 8, true, false
from categories where slug = 'combo-gift'
on conflict (slug) do nothing;

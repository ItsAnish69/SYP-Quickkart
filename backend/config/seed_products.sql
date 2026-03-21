-- Seed products for clothing, electronics, and groceries.
-- Safe for repeated runs, each row checks existence by (name, department).

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'clothing', 'Classic Linen Shirt', 49.00, 69.00, 4.80, 128, 'Black',
'https://images.unsplash.com/photo-1593032465171-8bd6322a0d4d?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1593032465171-8bd6322a0d4d?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'
),
'Step into a refined everyday style with this classic linen shirt.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Classic Linen Shirt' AND department = 'clothing');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'clothing', 'Urban Fit Blazer', 119.00, 149.00, 4.60, 94, 'Charcoal',
'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'
),
'A tailored blazer with modern proportions and polished finish.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Urban Fit Blazer' AND department = 'clothing');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'clothing', 'Essential Black Dress', 89.00, 120.00, 4.70, 212, 'Black',
'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80'
),
'A minimal black dress designed for versatility and confidence.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Essential Black Dress' AND department = 'clothing');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'electronics', 'Noise Cancelling Headphones X5', 159.00, 199.00, 4.80, 421, 'Matte Black',
'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80'
),
'Premium over-ear headphones with adaptive noise cancellation.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Noise Cancelling Headphones X5' AND department = 'electronics');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'electronics', 'Smart Watch Active Pro', 189.00, 229.00, 4.60, 308, 'Space Gray',
'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=900&q=80'
),
'Track health metrics and workouts with an AMOLED display.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Smart Watch Active Pro' AND department = 'electronics');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'electronics', 'Wireless Gaming Mouse', 79.00, 109.00, 4.40, 249, 'Black',
'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1613141411244-0e4ac259d217?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=900&q=80'
),
'Lightweight wireless mouse with high precision sensor.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Wireless Gaming Mouse' AND department = 'electronics');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'groceries', 'Organic Banana Bundle', 4.00, 5.00, 4.70, 92, 'Fresh Yellow',
'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=900&q=80'
),
'Naturally ripened organic bananas for healthy snacking.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Organic Banana Bundle' AND department = 'groceries');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'groceries', 'Farm Fresh Eggs (12 Pack)', 6.00, 7.00, 4.80, 188, 'Natural',
'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=900&q=80'
),
'Grade-A farm eggs sourced from trusted local farms.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Farm Fresh Eggs (12 Pack)' AND department = 'groceries');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'groceries', 'Whole Grain Bread Loaf', 3.00, 4.00, 4.40, 67, 'Golden Brown',
'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80'
),
'Freshly baked whole grain bread with soft texture.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Whole Grain Bread Loaf' AND department = 'groceries');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'clothing', 'Cozy Knit Sweater', 69.00, 95.00, 4.40, 77, 'Stone',
'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1593032465171-8bd6322a0d4d?auto=format&fit=crop&w=900&q=80'
),
'Soft-touch knitwear with premium warmth and clean texture.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Cozy Knit Sweater' AND department = 'clothing');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'clothing', 'Tailored Wide Pants', 74.00, 99.00, 4.30, 56, 'Grey',
'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1593032465171-8bd6322a0d4d?auto=format&fit=crop&w=900&q=80'
),
'Wide-leg tailored pants with a clean front and flowing shape.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Tailored Wide Pants' AND department = 'clothing');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'clothing', 'Minimal White Sneakers', 95.00, 119.00, 4.90, 309, 'White',
'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80'
),
'Clean, low-profile sneakers made for everyday use.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Minimal White Sneakers' AND department = 'clothing');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'electronics', 'Ultra HD Webcam 4K', 99.00, 129.00, 4.70, 217, 'Graphite',
'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?auto=format&fit=crop&w=900&q=80'
),
'Crystal-clear 4K streaming webcam with autofocus and low-light correction.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Ultra HD Webcam 4K' AND department = 'electronics');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'electronics', 'Mechanical Keyboard RGB', 129.00, 159.00, 4.50, 176, 'White',
'https://images.unsplash.com/photo-1595044426077-d36d9236d544?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1595044426077-d36d9236d544?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1541140532154-b024d705b90a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80'
),
'Tactile mechanical keys with hot-swappable switches and customizable RGB.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Mechanical Keyboard RGB' AND department = 'electronics');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'groceries', 'Extra Virgin Olive Oil', 14.00, 18.00, 4.90, 144, 'Emerald Gold',
'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=900&q=80'
),
'Cold-pressed extra virgin olive oil with smooth finish and rich flavor.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Extra Virgin Olive Oil' AND department = 'groceries');

INSERT INTO products (department, name, price, old_price, rating, reviews_count, color, image_url, images_json, description)
SELECT 'groceries', 'Chicken Breast Fillet', 11.00, 13.00, 4.60, 103, 'Fresh Cut',
'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80',
JSON_ARRAY(
  'https://images.unsplash.com/photo-1603048297172-c92544798d5a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=900&q=80'
),
'Lean, tender chicken breast portions prepared for everyday meals.'
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Chicken Breast Fillet' AND department = 'groceries');

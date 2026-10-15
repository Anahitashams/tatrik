import fs from "fs";
import path from "path";
import { products as seedProducts } from "./products";

// Server-side product "database" backed by a JSON file on disk, used by
// the /api/products route handlers. This is one honest step up from the
// browser-only localStorage version: every visitor now sees the same
// catalog, because the data lives on the server, not in each person's
// browser.
//
// It is still not a real database (no transactions, no concurrent-write
// safety, and on most PaaS platforms the filesystem is wiped on every
// redeploy unless a persistent disk is attached - see the project
// README). Swap this file for real database calls (e.g. Prisma) when
// you're ready; the API routes that call it won't need to change shape.
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "products.json");

const DEFAULT_STOCK = 20;

function withDefaults(product) {
  return {
    stock: DEFAULT_STOCK,
    tone: "dust",
    icon: "mug",
    imageUrl: "",
    ...product,
  };
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureSeeded() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const seeded = seedProducts.map(withDefaults);
    fs.writeFileSync(DATA_FILE, JSON.stringify(seeded, null, 2), "utf-8");
  }
}

function readAll() {
  try {
    ensureSeeded();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedProducts.map(withDefaults);
  } catch (error) {
    return seedProducts.map(withDefaults);
  }
}

function writeAll(list) {
  ensureSeeded();
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), "utf-8");
}

export function getAllProducts() {
  return readAll();
}

export function getProductBySlug(slug) {
  return readAll().find((product) => product.slug === slug) || null;
}

export function createProduct(input) {
  const list = readAll();
  const baseSlug = slugify(input.slug || input.name || "product");
  let slug = baseSlug || `product-${Date.now().toString(36)}`;
  let suffix = 2;
  while (list.some((p) => p.slug === slug)) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const newProduct = withDefaults({
    ...input,
    slug,
    price: Number(input.price) || 0,
    stock: Number.isFinite(Number(input.stock)) ? Number(input.stock) : DEFAULT_STOCK,
  });

  writeAll([...list, newProduct]);
  return newProduct;
}

export function updateProductBySlug(slug, patch) {
  const list = readAll();
  let updated = null;
  const next = list.map((product) => {
    if (product.slug !== slug) return product;
    updated = {
      ...product,
      ...patch,
      price: patch.price !== undefined ? Number(patch.price) || 0 : product.price,
      stock:
        patch.stock !== undefined ? Math.max(0, Number(patch.stock) || 0) : product.stock,
    };
    return updated;
  });
  if (!updated) return null;
  writeAll(next);
  return updated;
}

export function deleteProductBySlug(slug) {
  const list = readAll();
  const exists = list.some((product) => product.slug === slug);
  if (!exists) return false;
  writeAll(list.filter((product) => product.slug !== slug));
  return true;
}

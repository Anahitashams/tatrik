"use client";

import { useState } from "react";
import { categories, formatPrice } from "@/lib/products";
import { useProducts } from "@/lib/product-store";
import AdminProductForm from "@/components/AdminProductForm";

const categoryLabel = Object.fromEntries(categories.map((c) => [c.slug, c.label]));

function InlineNumberField({ value, onCommit, min = 0 }) {
  const [draft, setDraft] = useState(String(value));

  return (
    <input
      type="number"
      min={min}
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      onBlur={() => {
        const num = Number(draft);
        if (Number.isFinite(num) && num !== value) {
          onCommit(num);
        } else {
          setDraft(String(value));
        }
      }}
      className="w-24 rounded-lg border border-ink/15 bg-cream px-2 py-1.5 text-sm text-ink"
    />
  );
}

export default function AdminProductsPage() {
  const { products, hydrated, addProduct, updateProduct, deleteProduct } = useProducts();
  const [mode, setMode] = useState("list"); // list | add | `edit:${slug}`
  const [error, setError] = useState("");

  async function handleAdd(data) {
    try {
      await addProduct(data);
      setMode("list");
      setError("");
    } catch (err) {
      setError("افزودن محصول با خطا مواجه شد. دوباره تلاش کنید.");
    }
  }

  async function handleEdit(slug, data) {
    try {
      await updateProduct(slug, data);
      setMode("list");
      setError("");
    } catch (err) {
      setError("ذخیره‌ی تغییرات با خطا مواجه شد. دوباره تلاش کنید.");
    }
  }

  async function handleDelete(slug, name) {
    if (!window.confirm(`محصول «${name}» حذف شود؟ این کار قابل بازگشت نیست.`)) return;
    try {
      await deleteProduct(slug);
      setError("");
    } catch (err) {
      setError("حذف محصول با خطا مواجه شد. دوباره تلاش کنید.");
    }
  }

  async function handleInlineUpdate(slug, patch) {
    try {
      await updateProduct(slug, patch);
    } catch (err) {
      setError("ذخیره‌ی تغییرات با خطا مواجه شد. دوباره تلاش کنید.");
    }
  }

  const editingSlug = mode.startsWith("edit:") ? mode.slice(5) : null;
  const editingProduct = editingSlug ? products.find((p) => p.slug === editingSlug) : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-ink">محصولات</h1>
          <p className="mt-2 text-sm text-ink-soft">
            {hydrated ? `${products.length} محصول در کاتالوگ.` : "در حال بارگذاری..."} قیمت و موجودی را
            مستقیم در جدول ویرایش کنید.
          </p>
        </div>
        {mode === "list" && (
          <button
            type="button"
            onClick={() => setMode("add")}
            className="rounded-full bg-ink px-6 py-2.5 text-sm text-cream transition-colors hover:bg-clay-dark"
          >
            + افزودن محصول
          </button>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-clay/10 px-4 py-2.5 text-sm text-clay-dark">{error}</p>
      )}

      {mode === "add" && (
        <div className="mt-6">
          <AdminProductForm onSubmit={handleAdd} onCancel={() => setMode("list")} />
        </div>
      )}

      {editingProduct && (
        <div className="mt-6">
          <AdminProductForm
            initialProduct={editingProduct}
            onSubmit={(data) => handleEdit(editingProduct.slug, data)}
            onCancel={() => setMode("list")}
          />
        </div>
      )}

      {mode === "list" && hydrated && (
        <div className="mt-6 overflow-x-auto rounded-soft border border-ink/10">
          <table className="w-full min-w-[720px] text-right text-sm">
            <thead className="bg-ink/5 text-ink-soft">
              <tr>
                <th className="px-4 py-3 font-normal">نام محصول</th>
                <th className="px-4 py-3 font-normal">دسته</th>
                <th className="px-4 py-3 font-normal">قیمت (تومان)</th>
                <th className="px-4 py-3 font-normal">موجودی</th>
                <th className="px-4 py-3 font-normal">وضعیت</th>
                <th className="px-4 py-3 font-normal">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10 bg-paper">
              {products.map((product) => (
                <tr key={product.slug}>
                  <td className="px-4 py-3 text-ink">
                    {product.name}
                    <div className="text-xs text-ink-soft">{formatPrice(product.price)}</div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{categoryLabel[product.category] || product.category}</td>
                  <td className="px-4 py-3">
                    <InlineNumberField
                      value={product.price}
                      onCommit={(value) => handleInlineUpdate(product.slug, { price: value })}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <InlineNumberField
                      value={product.stock}
                      onCommit={(value) => handleInlineUpdate(product.slug, { stock: value })}
                    />
                  </td>
                  <td className="px-4 py-3">
                    {product.stock > 0 ? (
                      <span className="rounded-full bg-sage/20 px-3 py-1 text-xs text-ink-soft">موجود</span>
                    ) : (
                      <span className="rounded-full bg-clay/20 px-3 py-1 text-xs text-clay-dark">ناموجود</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setMode(`edit:${product.slug}`)}
                        className="text-ink-soft hover:text-ink"
                      >
                        ویرایش
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.slug, product.name)}
                        className="text-clay-dark hover:underline"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

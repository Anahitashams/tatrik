"use client";

import { useState } from "react";
import { categories } from "@/lib/products";
import { TONE_OPTIONS, ICON_OPTIONS } from "@/lib/product-store";

const inputClass =
  "w-full rounded-soft border border-ink/15 bg-cream px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:border-clay-dark";

const toneLabels = { dust: "آبی‌دودی", clay: "خاکی", sand: "شنی", sage: "سبز مریمی" };
const iconLabels = { mug: "ماگ", bowl: "کاسه", vase: "گلدان", plate: "بشقاب", candle: "شمعدان", stack: "ست" };

const emptyForm = {
  name: "",
  category: categories[0]?.slug || "",
  price: "",
  stock: "20",
  detail: "",
  description: "",
  tone: "dust",
  icon: "mug",
  imageUrl: "",
};

export default function AdminProductForm({ initialProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initialProduct
      ? {
          name: initialProduct.name || "",
          category: initialProduct.category || categories[0]?.slug || "",
          price: String(initialProduct.price ?? ""),
          stock: String(initialProduct.stock ?? "0"),
          detail: initialProduct.detail || "",
          description: initialProduct.description || "",
          tone: initialProduct.tone || "dust",
          icon: initialProduct.icon || "mug",
          imageUrl: initialProduct.imageUrl || "",
        }
      : emptyForm
  );

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      detail: form.detail.trim(),
      description: form.description.trim(),
      tone: form.tone,
      icon: form.icon,
      imageUrl: form.imageUrl.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-soft border border-ink/10 bg-paper p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">نام محصول</label>
          <input
            required
            minLength={2}
            maxLength={80}
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">دسته</label>
          <select
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className={inputClass}
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">قیمت (تومان)</label>
          <input
            required
            type="number"
            min="0"
            max="999999999"
            step="1000"
            value={form.price}
            onChange={(event) => update("price", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">موجودی</label>
          <input
            required
            type="number"
            min="0"
            max="100000"
            value={form.stock}
            onChange={(event) => update("stock", event.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">رنگ‌بندی نمایش</label>
          <select value={form.tone} onChange={(event) => update("tone", event.target.value)} className={inputClass}>
            {TONE_OPTIONS.map((tone) => (
              <option key={tone} value={tone}>
                {toneLabels[tone] || tone}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-ink-soft">آیکون نمایش</label>
          <select value={form.icon} onChange={(event) => update("icon", event.target.value)} className={inputClass}>
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {iconLabels[icon] || icon}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-ink-soft">توضیح کوتاه</label>
          <input
            value={form.detail}
            onChange={(event) => update("detail", event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-ink-soft">توضیح کامل</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-sm text-ink-soft">
            آدرس تصویر (اختیاری — خالی بگذارید تا آیکون پیش‌فرض نمایش داده شود)
          </label>
          <input
            value={form.imageUrl}
            onChange={(event) => update("imageUrl", event.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          className="rounded-full bg-ink px-7 py-2.5 text-sm text-cream transition-colors hover:bg-clay-dark"
        >
          {initialProduct ? "ذخیره تغییرات" : "افزودن محصول"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}

import Link from "next/link";
import ProductVisual from "./ProductVisual";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  const outOfStock = Number.isFinite(product.stock) && product.stock <= 0;

  return (
    <Link href={`/products/${product.slug}`} className="group flex flex-col">
      <div className="relative">
        <ProductVisual
          icon={product.icon}
          tone={product.tone}
          image={product.imageUrl}
          className="aspect-square rounded-soft transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {outOfStock && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] text-cream">
            ناموجود
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="text-ink">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-soft">{product.detail}</p>
        </div>
        <p className="shrink-0 text-sm text-clay-dark">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}

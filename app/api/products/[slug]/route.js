import { NextResponse } from "next/server";
import {
  getProductBySlug,
  updateProductBySlug,
  deleteProductBySlug,
} from "@/lib/products-db";

export async function GET(request, { params }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function PATCH(request, { params }) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "بدنه‌ی درخواست نامعتبر است." }, { status: 400 });
  }

  const product = updateProductBySlug(params.slug, body);

  if (!product) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({ product });
}

export async function DELETE(request, { params }) {
  const ok = deleteProductBySlug(params.slug);

  if (!ok) {
    return NextResponse.json({ error: "محصول یافت نشد" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

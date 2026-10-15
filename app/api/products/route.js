import { NextResponse } from "next/server";
import { getAllProducts, createProduct } from "@/lib/products-db";

// Real server-backed catalog endpoint (see lib/products-db.js). Every
// visitor reads/writes the same data here - unlike the old localStorage
// version, this is not per-browser.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.trim().toLowerCase();

  let results = getAllProducts();

  if (category && category !== "all") {
    results = results.filter((product) => product.category === category);
  }

  if (search) {
    results = results.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        (product.detail || "").toLowerCase().includes(search) ||
        (product.description || "").toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ products: results });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "بدنه‌ی درخواست نامعتبر است." }, { status: 400 });
  }

  if (!body?.name || !body?.category) {
    return NextResponse.json({ error: "نام و دسته‌ی محصول الزامی است." }, { status: 400 });
  }

  const product = createProduct(body);
  return NextResponse.json({ product }, { status: 201 });
}

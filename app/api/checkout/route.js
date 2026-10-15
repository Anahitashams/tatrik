import { NextResponse } from "next/server";

// Test/mock checkout + payment API. This simulates what a real payment
// gateway and order backend would do, without talking to any real
// service or storing anything permanently.
//
// Note: because the product catalog in this demo is managed client-side
// (see lib/product-store.js, backed by localStorage) rather than in a
// real database, this route trusts the line-item name/price sent by the
// client instead of re-looking them up server-side. A production build
// backed by a real database would re-validate price/stock here.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "بدنه‌ی درخواست نامعتبر است." }, { status: 400 });
  }

  const items = Array.isArray(body?.items) ? body.items : [];
  const customer = body?.customer || {};

  if (items.length === 0) {
    return NextResponse.json({ error: "سبد خرید خالی است." }, { status: 400 });
  }

  if (!customer.fullName || !customer.address || !customer.phone) {
    return NextResponse.json(
      { error: "نام، آدرس و شماره تماس برای ثبت سفارش الزامی است." },
      { status: 400 }
    );
  }

  const lines = [];
  for (const item of items) {
    const name = typeof item?.name === "string" ? item.name.trim() : "";
    const price = Number(item?.price);
    const slug = typeof item?.slug === "string" ? item.slug : "";

    if (!name || !slug || !Number.isFinite(price) || price < 0) {
      return NextResponse.json({ error: "اطلاعات یکی از اقلام سبد خرید نامعتبر است." }, { status: 400 });
    }

    const quantity = Math.max(1, Math.round(Number(item.quantity) || 1));
    lines.push({ slug, name, quantity, price });
  }

  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const shipping = 90000;
  const total = subtotal + shipping;

  // simulate network/processing latency like a real payment gateway
  await new Promise((resolve) => setTimeout(resolve, 600));

  const orderId = `TK-${Date.now().toString(36).toUpperCase()}`;
  const eta = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("fa-IR");

  const order = {
    orderId,
    status: "confirmed",
    paymentMethod: "test-gateway",
    items: lines,
    subtotal,
    shipping,
    total,
    customer: {
      fullName: customer.fullName,
      address: customer.address,
      phone: customer.phone,
    },
    estimatedDelivery: eta,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json({ order }, { status: 201 });
}

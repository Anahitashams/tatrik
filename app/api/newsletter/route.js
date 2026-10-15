import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Test/mock newsletter subscription API. Nothing is actually stored or
// emailed - this just validates input and returns a success response,
// standing in for a real mailing-list backend.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "بدنه‌ی درخواست نامعتبر است." }, { status: 400 });
  }

  const email = (body?.email || "").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "ایمیل وارد شده معتبر نیست." }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json({ ok: true, message: "با موفقیت عضو خبرنامه شدید." });
}

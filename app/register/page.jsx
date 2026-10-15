"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Sign-up is no longer a separate form: it happens inline in the phone +
// verification-code flow on /login (a new phone number is asked for a name
// right after its code is verified). This route stays only so old links or
// bookmarks to /register still land somewhere useful.
export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}

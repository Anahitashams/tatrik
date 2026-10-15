"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { normalizePhone, isValidIranianPhone } from "./phone";

// Test/demo authentication. Accounts and the active session live in the
// browser's localStorage instead of a real user database + secure
// server-side session, standing in for a real auth backend. Identity is
// the Iranian mobile number, verified with a one-time code that's generated
// and checked on the server (app/api/otp/*) and sent for real via
// Kavenegar (lib/kavenegar.js) - this is how customers sign in AND sign
// up, in one flow, with no password anywhere.
const USERS_KEY = "tatrik-users-v1";
const SESSION_KEY = "tatrik-session-v1";

const SEED_USERS = [
  {
    id: "admin-1",
    name: "مدیر فروشگاه",
    phone: "09120000001",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "customer-1",
    name: "مشتری آزمایشی",
    phone: "09120000002",
    role: "customer",
    createdAt: new Date().toISOString(),
  },
];

export { normalizePhone, isValidIranianPhone };

function safeReadUsers() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function safeWriteUsers(list) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(list));
  } catch (error) {
    // ignore
  }
}

// Plain (non-hook) accessor so other modules (like the cart's checkout
// flow) can tag an order with the signed-in user without depending on
// the AuthContext / React tree.
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const existingUsers = safeReadUsers();
    if (existingUsers.length === 0) {
      safeWriteUsers(SEED_USERS);
    }

    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      setUser(raw ? JSON.parse(raw) : null);
    } catch (error) {
      setUser(null);
    } finally {
      setHydrated(true);
    }
  }, []);

  const persistSession = useCallback((nextUser) => {
    setUser(nextUser);
    try {
      if (nextUser) {
        window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
      } else {
        window.localStorage.removeItem(SESSION_KEY);
      }
    } catch (error) {
      // ignore
    }
  }, []);

  // Step 1 of the login/signup flow: ask the server to generate and text a
  // one-time code to this phone number (app/api/otp/request). If Kavenegar
  // isn't configured yet, the server hands the code back instead of
  // sending it, and the UI shows it as a "test code" hint.
  const requestLoginOtp = useCallback(async (phone) => {
    const normalizedPhone = normalizePhone(phone);
    if (!isValidIranianPhone(normalizedPhone)) {
      return { ok: false, error: "شماره تماس معتبر نیست؛ مثال: 09123456789" };
    }
    try {
      const { data } = await axios.post("/api/otp/request", { phone: normalizedPhone });
      return {
        ok: true,
        phone: normalizedPhone,
        sent: data.sent,
        devCode: data.devCode || null,
        canResendAt: data.canResendAt || 0,
      };
    } catch (error) {
      const message = error?.response?.data?.error || "ارسال کد با خطا مواجه شد.";
      return { ok: false, error: message };
    }
  }, []);

  // Step 2: verify the code against the server (app/api/otp/verify). If an
  // account already exists for this phone, the user is logged straight in.
  // Otherwise the caller gets `isNewUser: true` back and should collect a
  // name, then call completeSignup().
  const verifyLoginOtp = useCallback(
    async (phone, code) => {
      const normalizedPhone = normalizePhone(phone);
      try {
        await axios.post("/api/otp/verify", { phone: normalizedPhone, code });
      } catch (error) {
        const message = error?.response?.data?.error || "کد وارد شده صحیح نیست.";
        return { ok: false, error: message };
      }

      const users = safeReadUsers();
      const existing = users.find((u) => u.phone === normalizedPhone);
      if (existing) {
        persistSession(existing);
        return { ok: true, isNewUser: false, user: existing };
      }
      return { ok: true, isNewUser: true, phone: normalizedPhone };
    },
    [persistSession]
  );

  // Step 3 (new accounts only): the phone number is already verified by
  // this point, so this just needs a display name to finish creating the
  // account, then signs the person in.
  const completeSignup = useCallback(
    (phone, name) => {
      const normalizedPhone = normalizePhone(phone);
      if (!isValidIranianPhone(normalizedPhone)) {
        return { ok: false, error: "شماره تماس معتبر نیست." };
      }
      if (!name || !name.trim()) {
        return { ok: false, error: "لطفاً نام خود را وارد کنید." };
      }
      const users = safeReadUsers();
      if (users.some((u) => u.phone === normalizedPhone)) {
        return { ok: false, error: "حسابی با این شماره تماس قبلاً ساخته شده است." };
      }
      const newUser = {
        id: `customer-${Date.now().toString(36)}`,
        name: name.trim(),
        phone: normalizedPhone,
        role: "customer",
        createdAt: new Date().toISOString(),
      };
      safeWriteUsers([...users, newUser]);
      persistSession(newUser);
      return { ok: true, user: newUser };
    },
    [persistSession]
  );

  const resendLoginOtp = useCallback((phone) => requestLoginOtp(phone), [requestLoginOtp]);

  const logout = useCallback(() => {
    persistSession(null);
  }, [persistSession]);

  const listUsers = useCallback(() => safeReadUsers(), []);

  const value = useMemo(
    () => ({
      user,
      hydrated,
      requestLoginOtp,
      verifyLoginOtp,
      completeSignup,
      resendLoginOtp,
      logout,
      listUsers,
    }),
    [user, hydrated, requestLoginOtp, verifyLoginOtp, completeSignup, resendLoginOtp, logout, listUsers]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

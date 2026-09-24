"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) window.location.href = "/";
    });
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });
      if (error) setMessage(error.message);
      else if (!data.session)
        setMessage("تم إنشاء الحساب. راجع بريدك الإلكتروني لتأكيد الحساب ثم سجل الدخول.");
      else window.location.href = "/";
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else window.location.href = "/";
    }
    setBusy(false);
  }

  return (
    <main className="min-h-screen bg-[#040711] px-4 py-12">
      <div className="mx-auto max-w-md">
        <Link href="/" className="text-sm text-blue-300">← العودة للمتجر</Link>
        <div className="glass mt-8 rounded-3xl p-7">
          <div className="grid size-14 place-items-center rounded-2xl bg-blue-500 text-xl font-black">N</div>
          <h1 className="mt-6 text-3xl font-black">
            {mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {mode === "login" ? "ادخل لحسابك في NURO STORE." : "أنشئ حسابك لمتابعة طلباتك."}
          </p>

          <form onSubmit={submit} className="mt-7 grid gap-4">
            {mode === "signup" && (
              <input required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="الاسم الكامل"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-blue-400/50" />
            )}
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-blue-400/50" />
            <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-blue-400/50" />
            {message && <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-3 text-sm leading-6 text-blue-100">{message}</div>}
            <button disabled={busy} className="rounded-xl bg-blue-500 px-5 py-3 font-bold disabled:opacity-50">
              {busy ? "جاري التنفيذ..." : mode === "login" ? "دخول" : "إنشاء الحساب"}
            </button>
          </form>

          <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setMessage(""); }}
            className="mt-5 w-full text-sm text-slate-400 hover:text-blue-300">
            {mode === "login" ? "ما عندك حساب؟ إنشاء حساب" : "عندك حساب؟ تسجيل الدخول"}
          </button>
        </div>
      </div>
    </main>
  );
}

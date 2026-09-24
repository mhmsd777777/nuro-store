"use client";
import Link from "next/link";
import {Menu,Search,ShoppingCart,X,Heart,User} from "lucide-react";
import {useEffect,useState} from "react";
import {supabase} from "@/lib/supabase";

export default function Header(){
 const[open,setOpen]=useState(false),[cart,setCart]=useState(0),[fav,setFav]=useState(0),[user,setUser]=useState<any>(null);
 useEffect(()=>{
   const sync=()=>{try{const c=JSON.parse(localStorage.getItem("nuro-cart")||"[]");const f=JSON.parse(localStorage.getItem("nuro-favorites")||"[]");setCart(c.reduce((n:any,x:any)=>n+(x.qty||1),0));setFav(f.length)}catch{}};
   sync(); window.addEventListener("storage",sync);
   supabase.auth.getUser().then(({data})=>setUser(data.user));
   const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>setUser(session?.user??null));
   return()=>{window.removeEventListener("storage",sync);subscription.unsubscribe()};
 },[]);
 return <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050812]/85 backdrop-blur-xl">
  <div className="container flex h-[72px] items-center justify-between gap-4">
   <Link href="/" className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-2xl bg-blue-500 font-black shadow-[0_0_35px_rgba(22,136,255,.35)]">N</div><div><div className="text-lg font-black">NURO STORE</div><div className="text-[10px] text-slate-400">كل ما تحتاجه في مكان واحد</div></div></Link>
   <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex"><Link href="/">الرئيسية</Link><Link href="/shop">المتجر</Link><Link href="/categories">الأقسام</Link><Link href="/favorites" className="flex items-center gap-1">المفضلة {fav>0&&<span className="rounded-full bg-blue-500 px-1.5 text-[10px]">{fav}</span>}</Link><Link href="/about">عن نيرو</Link><Link href="/contact">تواصل معنا</Link></nav>
   <div className="flex gap-2"><Link href="/shop" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5"><Search size={18}/></Link><Link href="/cart" className="relative grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5"><ShoppingCart size={18}/>{cart>0&&<span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-blue-500 px-1 text-center text-[10px] font-bold">{cart}</span>}</Link><Link href="/login" aria-label="الحساب" className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5"><User size={18}/></Link><button onClick={()=>setOpen(!open)} className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 md:hidden">{open?<X size={18}/>:<Menu size={18}/>}</button></div>
  </div>
  {open&&<nav className="container grid gap-2 border-t border-white/10 py-4 md:hidden"><Link onClick={()=>setOpen(false)} href="/" className="rounded-xl p-3">الرئيسية</Link><Link onClick={()=>setOpen(false)} href="/shop" className="rounded-xl p-3">المتجر</Link><Link onClick={()=>setOpen(false)} href="/categories" className="rounded-xl p-3">الأقسام</Link><Link onClick={()=>setOpen(false)} href="/favorites" className="rounded-xl p-3">المفضلة</Link><Link onClick={()=>setOpen(false)} href="/cart" className="rounded-xl p-3">السلة</Link><Link onClick={()=>setOpen(false)} href="/login" className="rounded-xl p-3">الحساب</Link><Link onClick={()=>setOpen(false)} href="/about" className="rounded-xl p-3">عن نيرو</Link><Link onClick={()=>setOpen(false)} href="/contact" className="rounded-xl p-3">تواصل معنا</Link></nav>}
 </header>
}

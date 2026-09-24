import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"NURO STORE — كل عالمك الرقمي في مكان واحد",description:"متجر نيرو للمنتجات والخدمات الرقمية.",keywords:["NURO STORE","نيرو ستور","اشتراكات","ألعاب","خدمات رقمية"]};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body>{children}</body></html>}
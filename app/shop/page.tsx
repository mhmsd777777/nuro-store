import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopClient from "@/components/ShopClient";
import { getStoreProducts } from "@/lib/store";

export default async function Shop() {
  const products = await getStoreProducts();
  return (
    <>
      <Header />
      <main className="container py-12">
        <ShopClient products={products} />
      </main>
      <Footer />
    </>
  );
}

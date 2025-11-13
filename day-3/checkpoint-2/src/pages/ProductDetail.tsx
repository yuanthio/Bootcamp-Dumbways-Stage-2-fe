import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((p) => p.id === Number(productId));
  if (!product) {
    return <p className="text-center text-red-500">Produk tidak ditemukan.</p>;
  }
  return (
    <div className="flex items-center flex-col gap-5 mb-8">
      <h1 className="text-2xl font-bold">Product Detail</h1>
      <Card className="w-4xl grid grid-cols-2 gap-4 bg-slate-700 text-white p-0 overflow-hidden">
        <div className="">
          <img src={product?.image} alt={product?.name} className="w-full" />
        </div>
        <CardContent className="py-4">
          <CardTitle className="text-2xl mb-4">{product?.name}</CardTitle>
          <p className="text-lg">Rp. {product?.price}</p>
          <CardDescription className="text-slate-300 mb-6">
            <h3>{product?.description}</h3>
          </CardDescription>
          <CardAction className="flex justify-start w-full">
            <Button variant="secondary" className="bg-blue-500 text-white cursor-pointer hover:bg-blue-400">Add to cart</Button>
          </CardAction>
        </CardContent>
      </Card>
    </div>
  );
}

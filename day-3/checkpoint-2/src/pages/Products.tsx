import {
  Card,
  CardAction,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router-dom";
import { products } from "../data/products";

export default function Products() {
  return (
    <div className="mt-4">
      <h1 className="text-3xl text-center mb-4 font-bold">Products</h1>
      <div className="flex justify-center gap-4 px-4 mb-7">
        {products.map((product) => (
          <Card className="w-xs bg-slate-700 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition duration-300 ease-in-out p-0 overflow-hidden">
            <img src={product.image} alt={product.name} />
            <CardContent className="text-center p-4">
              <CardTitle className="mb-2 text-white">{product.name}</CardTitle>
              <p className="mb-4 text-white">{product.price}</p>
              <CardAction className="flex justify-center gap-2 w-full">
                <Button variant="secondary" className="bg-blue-500 text-white cursor-pointer hover:bg-blue-400">Add to cart</Button>
                <Button key={product.id} asChild variant="secondary" className="hover:bg-slate-200">
                  <Link to={product.id.toString()}>Detail</Link>
                </Button>
              </CardAction>
            </CardContent>
          </Card>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

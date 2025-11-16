import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/services/api";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import type { ProductType } from "@/types/products";

export function Products() {
  const { addToCart } = useCart();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch {
        console.error("Gagal fetch data products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (product: ProductType) => {
    setLoadingId(product.id);
    await addToCart(product); 
    setLoadingId(null);
  };

  return (
    <div className="mt-4 mb-5">
      <h1 className="text-3xl text-slate-900 text-center mb-4 font-bold dark:text-white">
        Products
      </h1>
      {loading ? (
        <p className="text-black dark:text-slate-500 text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 px-4">
          {products.map((product) => (
            <Dialog>
              <DialogTrigger key={product.id} asChild>
                <Card
                  onClick={() => setSelectedProduct(product)}
                  className="cursor-pointer hover:shadow-lg dark:hover:shadow-white dark:hover:shadow-xs dark:bg-slate-800 transition duration-300"
                >
                  <CardHeader className="p-0">
                    <div className="w-full h-48 overflow-hidden rounded-t-md">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-full justify-between gap-2">
                    <div>
                      <CardTitle>{product.title}</CardTitle>
                      <p>${product.price}</p>
                      <CardDescription>{product.description}</CardDescription>
                    </div>

                    <div className="mt-3 flex gap-2 justify-center">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(product);
                        }}
                        disabled={loadingId === product.id}
                        className="cursor-pointer"
                      >
                        {loadingId === product.id ? "Adding..." : "Add to Cart"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <img
                    src={selectedProduct?.image}
                    alt=""
                    className="w-full h-64 object-cover"
                  />
                  <DialogTitle>{selectedProduct?.title}</DialogTitle>
                  <p>${selectedProduct?.price}</p>
                  <p>{selectedProduct?.category}</p>
                  <DialogDescription>
                    {selectedProduct?.description}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
}

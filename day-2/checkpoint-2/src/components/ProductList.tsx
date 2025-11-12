import { ProductCard } from "./ProductCard";
import type { ProductType } from "../api/products";

type ProductListProps = {
  products: ProductType[];
  onToggle: (id: number) => void;
  addedProducts: number[];
};

export function ProductList({ products, onToggle, addedProducts }: ProductListProps) {
  if (products.length === 0) {
    return <p style={{ textAlign: "center", color: "#777" }}>Produk tidak ditemukan</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          added={addedProducts.includes(product.id)}
          onToggle={() => onToggle(product.id)}
        />
      ))}
    </div>
  );
}

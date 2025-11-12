import { ProductCard } from "./ProductCard";

export type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
  added: boolean;
};

type ProductListProps = {
  products: ProductType[];
  onToggle: (id: number) => void;
};

export function ProductList({ products, onToggle }: ProductListProps) {
  return (
    <div style={{
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
    }}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          added={product.added}
          onToggle={() => onToggle(product.id)}
        />
      ))}
    </div>
  );
}

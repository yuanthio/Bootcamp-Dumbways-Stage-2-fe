import { useEffect, useState } from "react";
import { ProductList } from "./components/ProductList";
import { fetchProducts, type ProductType, products as allProducts } from "./api/products";

function useDebounce<T>(value: T, delay: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

function App() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<ProductType[]>(allProducts);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<number[]>([]); 

  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    setLoading(true);
    fetchProducts(debouncedQuery).then((res) => {
      setProducts(debouncedQuery ? res : allProducts); 
      setLoading(false);
    });
  }, [debouncedQuery]);

  const toggleProduct = (id: number) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ 
      textAlign: "center", 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: "100vw"
      }}>
      <h1>🛒 Product List</h1>
      <h3>Cart: {cart.length} item{cart.length !== 1 ? "s" : ""}</h3>

      <input
        type="text"
        placeholder="Cari produk..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "8px",
          width: "220px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "20px"
        }}
      />

      {loading ? (
        <p style={{ marginTop: "20px" }}>Loading...</p>
      ) : (
        <ProductList
          products={products}
          onToggle={toggleProduct}
          addedProducts={cart}
        />
      )}
    </div>
  );
}

export default App;

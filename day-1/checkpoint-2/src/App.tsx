import { useState } from "react";
import { ProductList, type ProductType } from "./components/ProductList";
import keyboardImg from "./assets/keyboard.jpg";
import mouseImg from "./assets/mouse.jpg";
import headsetImg from "./assets/headset.jpg";

function App() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 1,
      name: "Mouse",
      price: 120000,
      image: mouseImg,
      added: false,
    },
    {
      id: 2,
      name: "Keyboard",
      price: 350000,
      image: keyboardImg,
      added: false,
    },
    {
      id: 3,
      name: "Headset",
      price: 250000,
      image: headsetImg,
      added: false,
    },
  ]);

  const toggleProduct = (id: number) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, added: !p.added } : p
      )
    );
  };

  const totalCart = products.filter(p => p.added).length;

  return (
    <div style={{ 
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      marginBottom: "50px",
      }}>
      <h1>Product List</h1>
      <h3>Cart: {totalCart} item</h3>

      <ProductList products={products} onToggle={toggleProduct} />
    </div>
  );
}

export default App;

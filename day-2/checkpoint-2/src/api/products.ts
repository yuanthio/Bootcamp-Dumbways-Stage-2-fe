import keyboardImage from "../assets/keyboard.jpg"
import mouseImage from "../assets/mouse.jpg"
import headsetImage from "../assets/headset.jpg"
import monitorImage from "../assets/monitor.jpg"
import chairdImage from "../assets/chair.jpg"

export type ProductType = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// Data produk (dummy)
export const products: ProductType[] = [
  { id: 1, name: "Keyboard", price: 350000, image: keyboardImage },
  { id: 2, name: "Mouse", price: 250000, image: mouseImage },
  { id: 3, name: "Headset", price: 200000, image: headsetImage },
  { id: 4, name: "Monitor", price: 1800000, image: monitorImage },
  { id: 5, name: "Chair", price: 2500000, image: chairdImage },
];

export const fetchProducts = (query: string): Promise<ProductType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered);
    }, 500);
  });
};

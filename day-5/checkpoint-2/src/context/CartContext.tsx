import React, { createContext, useEffect, useState } from "react";
import type { CartItem } from "@/types/cart";

export type CartContextType = {
  cart: CartItem[];
  loadingIds: number[];
  globalLoading: boolean; 
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => void;
  getTotal: () => number;
};

export const CartContext = createContext<CartContextType | null>(null);

const fakeApi = {
  call: <T,>(result: T, failRate = 0.05, delay = 700) =>
    new Promise<T>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < failRate) {
          reject(new Error("Network error"));
        } else {
          resolve(result);
        }
      }, delay);
    }),
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem("cart_v1");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart_v1", JSON.stringify(cart));
  }, [cart]);

  const getTotal = () =>
    cart.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const setItemLoading = (id: number, loading: boolean) => {
    setLoadingIds((prev) => (loading ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const addToCart = async (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setGlobalLoading(true);
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p));
      }
      return [...prev, { ...item, quantity }];
    });

    try {
      await fakeApi.call(true, 0.05, 600);
      setGlobalLoading(false);
    } catch (err) {
      setCart((prev) => {
        const exists = prev.find((p) => p.id === item.id);
        if (!exists) return prev;
        const newQty = exists.quantity - quantity;
        if (newQty <= 0) return prev.filter((p) => p.id !== item.id);
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: newQty } : p));
      });
      setGlobalLoading(false);
      console.error(err);
      throw err;
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    const prev = cart.find((c) => c.id === id);
    if (!prev) return;
    setItemLoading(id, true);

    setCart((cur) => cur.map((c) => (c.id === id ? { ...c, quantity } : c)));

    try {
      await fakeApi.call(true, 0.05, 600);
      setItemLoading(id, false);
    } catch (err) {
      setCart((cur) => cur.map((c) => (c.id === id ? { ...c, quantity: prev.quantity } : c)));
      setItemLoading(id, false);
      console.error(err);
      throw err;
    }
  };

  const removeFromCart = async (id: number) => {
    const prev = cart;
    setItemLoading(id, true);

    setCart((cur) => cur.filter((c) => c.id !== id));

    try {
      await fakeApi.call(true, 0.05, 600);
      setItemLoading(id, false);
    } catch (err) {
      setCart(prev);
      setItemLoading(id, false);
      console.error(err);
      throw err;
    }
  };

  const clearCart = () => setCart([]);

  const value: CartContextType = {
    cart,
    loadingIds,
    globalLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

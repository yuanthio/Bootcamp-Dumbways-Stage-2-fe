import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { Products } from "./pages/Products";
import { CartProvider } from "./context/CartContext";
import Login from "./pages/Login";
import PrivateRoute from "./lib/PrivateRoute";
import ThemeToggle from "./components/ThemeToggle";
import Cart from "./pages/Cart";

function Header() {
  const { token, logout } = useAuth();
  return (
    <div className="flex gap-4 bg-white dark:bg-slate-800 shadow-md w-full justify-center py-4 sticky top-0">
      <Button asChild variant="secondary">
        <Link to="/">Home</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link to="/about">About</Link>
      </Button>
      {token && (
        <Button asChild variant="secondary">
          <Link to="/products">Products</Link>
        </Button>
      )}
      {token && (
        <Button asChild variant="secondary">
          <Link to="/cart">Cart</Link>
        </Button>
      )}
      {token ? (
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      ) : (
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
      )}
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/cart"
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

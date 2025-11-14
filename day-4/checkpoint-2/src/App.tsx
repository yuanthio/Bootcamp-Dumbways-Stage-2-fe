import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import Movies from "./pages/Movies";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import PrivateRoute from "./lib/PrivateRoute";
import ThemeToggle from "./components/ThemeToggle";

function Header() {
  const { token, logout } = useAuth();
  return (
    <div className="flex gap-4 bg-white dark:bg-slate-800 shadow-md w-full justify-center py-4 sticky top-0">
      <Button asChild variant="secondary">
        <Link to="/">Home</Link>
      </Button>

      {token && (
        <Button asChild variant="secondary">
          <Link to="/favorites">Favorites</Link>
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
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

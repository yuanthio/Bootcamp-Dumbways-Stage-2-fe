import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="flex gap-4 justify-center py-4 bg-slate-900 sticky top-0 z-50">
        <Button asChild variant="secondary">
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/products">Products</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/cart">Cart</Link>
        </Button>
      </div>
    </>
  );
}

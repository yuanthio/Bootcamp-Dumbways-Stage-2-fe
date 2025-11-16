import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const {
    cart,
    loadingIds,
    getTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const isLoading = (id?: number) => (id ? loadingIds.includes(id) : false);

  if (cart.length === 0) {
    return (
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold">Your Cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="mt-8 px-4 mb-5">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border p-3 rounded-md dark:bg-slate-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-gray-400">
                ${item.price.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                disabled={isLoading(item.id)}
                className="cursor-pointer"
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={isLoading(item.id)}
                className="cursor-pointer"
              >
                +
              </Button>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <Button
                variant="destructive"
                onClick={() => removeFromCart(item.id)}
                disabled={isLoading(item.id)}
                className="cursor-pointer"
              >
                {isLoading(item.id) ? "Removing..." : "Remove"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-lg font-semibold">
          Total: ${getTotal().toLocaleString()}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => clearCart()} className="cursor-pointer">
            Clear
          </Button>
          <Button onClick={() => alert("Checkout")} className="cursor-pointer">Checkout</Button>
        </div>
      </div>
    </div>
  );
}

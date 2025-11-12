type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  added: boolean;
  onToggle: () => void;
};

export function ProductCard({ name, price, image, added, onToggle }: ProductCardProps) {
  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        borderRadius: "8px",
        padding: "12px",
        width: "180px",
        textAlign: "center",
        color: "black"
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", borderRadius: "8px" }}
      />

      <h3>{name}</h3>
      <p>Rp {price.toLocaleString()}</p>

      <button
        onClick={onToggle}
        style={{
          marginTop: "10px",
          padding: "8px",
          width: "100%",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          color: "white",
          backgroundColor: added ? "green" : "blue",
        }}
      >
        {added ? "Added ✅" : "Add to Cart"}
      </button>
    </div>
  );
}

type TodoProps = {
  title: string;
  done: boolean;
  onToggle: () => void;
};

export function Todo({ title, done, onToggle }: TodoProps) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
      <input type="checkbox" checked={done} onChange={onToggle} />
      <span style={{ textDecoration: done ? "line-through" : "none" }}>
        {title}
      </span>
    </div>
  );
}

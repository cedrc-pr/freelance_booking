import type { Product } from "../../models";

export default function ProductCard({ name, description, price }: Product) {
  return (
    <div className="w-full bg-cyan-100 rounded flex flex-col p-5">
      <div className="flex justify-between">
        <h1>
          <strong>{name}</strong>
        </h1>
        <h2>{price} $</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

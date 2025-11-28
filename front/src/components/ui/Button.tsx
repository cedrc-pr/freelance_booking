interface ButtonProps {
  name: string;
  submit: boolean;
  onClick?: () => void;
}

export default function Button({ name, submit, onClick }: ButtonProps) {
  return (
    <button
      type={submit ? "submit" : "button"}
      className="w-70 py-1 bg-cyan-100 hover:bg-cyan-300 border rounded hover:cursor-pointer"
      onClick={() => (onClick ? onClick() : "")}
    >
      {name}
    </button>
  );
}

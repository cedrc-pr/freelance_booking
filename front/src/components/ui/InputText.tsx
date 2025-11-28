interface InputTextProps {
  name: string;
  value: string;
  setter: React.Dispatch<React.SetStateAction<string>>;
  onChange?: (login: string) => void;
  placeHolder?: string;
}

export default function InputText({
  name,
  value,
  setter,
  onChange,
  placeHolder,
}: InputTextProps) {
  return (
    <label htmlFor={name}>
      {name}:
      <input
        id={name}
        value={value}
        placeholder={placeHolder ?? ""}
        onChange={(e) => {
          setter(e.target.value);
          onChange ? onChange(e.target.value) : "";
        }}
        className="w-70 py-1 px-2 bg-cyan-50 border"
      />
    </label>
  );
}

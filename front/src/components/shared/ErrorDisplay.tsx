interface ErrorProps {
  message: string;
}

export default function ErrorDisplay({ message }: ErrorProps) {
  if (message === "") {
    return;
  }
  return <h2 className="w-70 py-1 bg-red-200 border rounded">{message}</h2>;
}

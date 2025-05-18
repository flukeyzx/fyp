import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ size = 2 }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2
        className="animate-spin text-primary"
        style={{ width: `${size}rem`, height: `${size}rem` }}
      />
    </div>
  );
}

import ProtectedRoute from "@/components/providers/ProtectedRoute";
import Home from "@/components/common/Home";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
}

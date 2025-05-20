import TokenProvider from "@/context/TokenContext";
import LayoutClient from "./LayoutClient";
import { cookies } from "next/headers";
import AuthProvider from "@/context/AuthContext";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/auth/signup");
  }
  return (
    <TokenProvider initialToken={authToken}>
      <AuthProvider authToken={authToken}>
        <LayoutClient children={children} />
      </AuthProvider>
    </TokenProvider>
  );
}

import { cookies } from "next/headers";
import { Navbar } from "./Navbar";

export async function NavbarServer() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;
  const serverIsAuthenticated = !!authToken;

  return <Navbar serverIsAuthenticated={serverIsAuthenticated} />;
}

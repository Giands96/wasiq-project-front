import { cookies } from "next/headers";
import { Navbar } from "./Navbar";

/**
 * Server Component wrapper para el Navbar.
 * Lee la cookie httpOnly "auth-token" en el servidor para que
 * el SSR ya sepa si el usuario está autenticado.
 * Esto elimina el flash visual al refrescar la página.
 */
export async function NavbarServer() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token")?.value;
  const serverIsAuthenticated = !!authToken;

  return <Navbar serverIsAuthenticated={serverIsAuthenticated} />;
}

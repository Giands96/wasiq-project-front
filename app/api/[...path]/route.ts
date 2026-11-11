import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type ProxyMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const proxyRequest = async (
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
  method: ProxyMethod,
) => {
  const apiUrl = process.env.API_URL?.replace(/\/+$/, "");
  if (!apiUrl) {
    return NextResponse.json(
      { message: "La variable de entorno API_URL no está configurada" },
      { status: 500 },
    );
  }

  const { path } = await params;
  const backendPath = path.join("/");
  const normalizedPath =
    backendPath === "properties" ? `${backendPath}/` : backendPath;
  const targetUrl = `${apiUrl}/${normalizedPath}${request.nextUrl.search}`;
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");

  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);

  const body =
    method === "GET" || method === "DELETE"
      ? undefined
      : await request.arrayBuffer();

  try {
    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: "no-store",
    });

    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");
    if (responseContentType) {
      responseHeaders.set("content-type", responseContentType);
    }

    for (const setCookie of response.headers.getSetCookie()) {
      responseHeaders.append("set-cookie", setCookie);
    }

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch {
    return NextResponse.json(
      { message: "No se pudo conectar con la API" },
      { status: 502 },
    );
  }
};

const createHandler =
  (method: ProxyMethod) =>
  (request: NextRequest, context: { params: Promise<{ path: string[] }> }) =>
    proxyRequest(request, context, method);

export const GET = createHandler("GET");
export const POST = createHandler("POST");
export const PUT = createHandler("PUT");
export const PATCH = createHandler("PATCH");
export const DELETE = createHandler("DELETE");

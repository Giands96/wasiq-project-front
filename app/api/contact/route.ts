import { NextResponse } from "next/server";

interface ContactPayload {
  fullName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const fullName = body.fullName?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const phone = body.phone?.trim() ?? "";
    const subject = body.subject?.trim() ?? "";
    const message = body.message?.trim() ?? "";

    if (!fullName || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "El correo electronico no es valido." },
        { status: 400 }
      );
    }

    // TODO: Integrar proveedor de correo empresarial (Resend, SendGrid, SMTP, etc.).
    // Por ahora se deja trazabilidad en servidor para pruebas locales.
    console.info("[CONTACT_FORM] Nuevo mensaje:", {
      fullName,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        message:
          "Recibimos tu mensaje. En breve un asesor de Wasiq se pondra en contacto contigo.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "No se pudo procesar el formulario de contacto." },
      { status: 500 }
    );
  }
}

# Integracion de formulario de contacto a correo empresarial

## Estado actual
- Frontend envia el formulario a `POST /api/contact`.
- El endpoint valida campos y responde exito.
- Falta conectar el envio real de correo (correo empresarial aun no definido).

## Opcion recomendada (Resend)
Resend es simple para proyectos Next.js y evita mantener SMTP manual.

## Paso a paso en backend
1. Crear cuenta en Resend y verificar tu dominio empresarial (ejemplo: `wasiq.com`).
2. Obtener API Key y guardarla en variables de entorno:
```env
RESEND_API_KEY=tu_api_key
CONTACT_TO_EMAIL=soporte@wasiq.com
CONTACT_FROM_EMAIL=contacto@wasiq.com
```
3. Instalar libreria:
```bash
npm i resend
```
4. Reemplazar el `TODO` en `app/api/contact/route.ts` por envio real:
```ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: process.env.CONTACT_FROM_EMAIL!,
  to: process.env.CONTACT_TO_EMAIL!,
  subject: `[Contacto Wasiq] ${subject}`,
  replyTo: email,
  html: `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Nombre:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Telefono:</strong> ${phone}</p>
    <p><strong>Asunto:</strong> ${subject}</p>
    <p><strong>Mensaje:</strong><br/>${message}</p>
  `,
});
```
5. Agregar limite basico por IP para evitar spam (rate limit).
6. Registrar logs y alertas para errores de entrega.

## Opcion SMTP clasica (si ya tienes proveedor corporativo)
1. Usar `nodemailer`.
2. Configurar host, puerto, usuario y password SMTP en `.env`.
3. Enviar correo en `POST /api/contact` con `transporter.sendMail(...)`.

## Paso a paso en frontend
1. Mantener el `fetch("/api/contact")` actual.
2. Mostrar estados de UX:
- Enviando
- Exito
- Error
3. Agregar captcha (hCaptcha o reCAPTCHA) antes de produccion.
4. Opcional: guardar consulta en base de datos para trazabilidad interna.

## Checklist de produccion
- Dominio verificado para envio de correo.
- Variables de entorno configuradas en hosting.
- Endpoint con rate limit + captcha.
- Prueba de envio desde entorno de produccion.
- Casilla de destino definida (`CONTACT_TO_EMAIL`).
- Plantilla HTML de correo revisada por negocio.

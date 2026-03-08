"use client";

import { FormEvent, useState } from "react";
import { Mail, Phone, Clock3, MessageSquareText, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";

type ContactFormData = {
    fullName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

const initialForm: ContactFormData = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export default function ContactPage() {
    const [formData, setFormData] = useState<ContactFormData>(initialForm);
    const [isSending, setIsSending] = useState(false);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFeedback(null);
        setIsSending(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = (await response.json()) as { message?: string };

            if (!response.ok) {
                throw new Error(data.message ?? "No se pudo enviar tu mensaje.");
            }

            setFeedback({
                type: "success",
                message: data.message ?? "Mensaje enviado correctamente.",
            });
            setFormData(initialForm);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Ocurrio un error inesperado.";
            setFeedback({ type: "error", message });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(194,168,120,0.25),transparent_40%),radial-gradient(circle_at_85%_5%,rgba(122,139,107,0.2),transparent_35%),linear-gradient(180deg,#fffdf8_0%,#f6f2e8_100%)] px-4 py-12 md:px-8 md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary-text">Contacto Wasiq</p>
                    <h1 className="mt-3 text-3xl font-bold text-text-primary md:text-5xl">Te respondemos rapido y con soluciones claras</h1>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary md:text-base">
                        Nuestro equipo de soporte acompana a propietarios e interesados con respuestas agiles,
                        seguimiento personalizado y atencion humana en cada consulta.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-border-light/70 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-3">
                            <Clock3 className="h-6 w-6 text-primary-base" />
                            <CardTitle>Respuesta eficiente</CardTitle>
                            <CardDescription>Tiempo promedio de primera respuesta menor a 2 horas en horario laboral.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-border-light/70 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-3">
                            <MessageSquareText className="h-6 w-6 text-primary-base" />
                            <CardTitle>Seguimiento continuo</CardTitle>
                            <CardDescription>Cada caso tiene seguimiento hasta que la consulta quede resuelta.</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="border-border-light/70 bg-white/80 backdrop-blur-sm">
                        <CardHeader className="space-y-3">
                            <ShieldCheck className="h-6 w-6 text-primary-base" />
                            <CardTitle>Atencion confiable</CardTitle>
                            <CardDescription>Tratamos tu informacion con cuidado y procesos orientados a seguridad.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-5">
                    <Card className="border-border-light/80 bg-white lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Canales de contacto</CardTitle>
                            <CardDescription>Tambien puedes escribirnos o llamarnos por estos medios.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-text-secondary">
                            <div className="flex items-start gap-3 rounded-lg border border-border-light/70 p-3">
                                <Mail className="mt-0.5 h-4 w-4 text-primary-base" />
                                <div>
                                    <p className="font-medium text-text-primary">Correo</p>
                                    <p>soporte@wasiq.com (temporal)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 rounded-lg border border-border-light/70 p-3">
                                <Phone className="mt-0.5 h-4 w-4 text-primary-base" />
                                <div>
                                    <p className="font-medium text-text-primary">Celular / WhatsApp</p>
                                    <p>+51 999 999 999 (temporal)</p>
                                </div>
                            </div>
                            <div className="rounded-lg border border-dashed border-primary-base/50 bg-primary-base/5 p-3 text-xs leading-relaxed">
                                Horario de atencion: Lunes a Viernes, 9:00 am a 7:00 pm.
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-border-light/80 bg-white lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Formulario de contacto</CardTitle>
                            <CardDescription>Cuéntanos tu consulta y te responderemos lo antes posible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="grid gap-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Nombre completo</Label>
                                        <Input
                                            id="fullName"
                                            value={formData.fullName}
                                            onChange={(event) => handleChange("fullName", event.target.value)}
                                            placeholder="Ej. Juan Perez"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Correo electronico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(event) => handleChange("email", event.target.value)}
                                            placeholder="nombre@correo.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Numero de contacto</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(event) => handleChange("phone", event.target.value)}
                                            placeholder="999999999"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Asunto</Label>
                                        <Input
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(event) => handleChange("subject", event.target.value)}
                                            placeholder="Consulta sobre una propiedad"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Mensaje</Label>
                                    <textarea
                                        id="message"
                                        className="min-h-36 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                        value={formData.message}
                                        onChange={(event) => handleChange("message", event.target.value)}
                                        placeholder="Escribe aqui tu consulta..."
                                        required
                                    />
                                </div>

                                {feedback && (
                                    <div
                                        className={`rounded-md border p-3 text-sm ${
                                            feedback.type === "success"
                                                ? "border-status-success/40 bg-status-success/10 text-status-success"
                                                : "border-status-error/40 bg-status-error/10 text-status-error"
                                        }`}
                                    >
                                        {feedback.message}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={isSending}
                                    className="h-11 w-full bg-primary-base text-white hover:bg-primary-hover md:w-auto"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {isSending ? "Enviando..." : "Enviar mensaje"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
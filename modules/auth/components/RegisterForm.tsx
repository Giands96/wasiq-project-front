"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "../schemas/auth.schema";
import { useRegister } from "../hooks/useRegister";
import LoginBG from "@/public/login-bg.webp";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Loader2, MoveLeftIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ROUTES } from "@/shared/constants/routes";

export const RegisterForm = () => {
  const { register, isLoading, error } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => register(data);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl h-148 bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="hidden md:block w-1/2 relative">
          <Image
            src={LoginBG}
            alt="register background"
            fill
            sizes="50vw"
            quality={100}
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <Card className="w-full border-none shadow-none">
            <CardHeader className="text-center space-y-1">
              <div className="text-left">
                <Link className="text-neutral-400 hover:underline" href={ROUTES.HOME}>
                  <MoveLeftIcon className="inline mr-2 w-4 h-4" />
                  Volver al inicio
                </Link>
              </div>
              <CardTitle className="text-2xl font-bold">Crea tu cuenta ✨</CardTitle>
              <CardDescription>Regístrate en Wasiq Inmobiliaria</CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input placeholder="Juan" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Apellido</FormLabel>
                          <FormControl>
                            <Input placeholder="Pérez" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo electrónico</FormLabel>
                        <FormControl>
                          <Input placeholder="ejemplo@wasiq.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número telefónico</FormLabel>
                        <FormControl>
                          <Input placeholder="999999999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {error && (
                    <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-beige-dark hover:shadow-sm hover:bg-beige-dark hover:cursor-pointer transition-all text-neutral-700"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    ¿Ya tienes cuenta?{" "}
                    <Link href={ROUTES.AUTH.LOGIN} className="text-primary-button hover:underline">
                      Inicia sesión
                    </Link>
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
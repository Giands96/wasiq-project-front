"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myProfileSchema, MyProfileFormValues } from "@/modules/users/schemas/userSchemas";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/shared/constants/routes";
import { authService } from "@/modules/auth/services/auth.service";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
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



export default function MyProfilePage() {
  const router = useRouter();
  const { user, token, isAuthenticated, _hasHydrated, setAuth } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<MyProfileFormValues>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  useEffect(() => {
    if (!_hasHydrated) return;

    if (!isAuthenticated || !user) {
      router.replace(ROUTES.AUTH.LOGIN);
      return;
    }

    form.reset({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone ?? "",
      password: "",
    });
  }, [_hasHydrated, isAuthenticated, user, form, router]);

  const watchedPhone = form.watch("phone");
  const watchedPassword = form.watch("password");

  const hasChanges = useMemo(() => {
    const phoneChanged = (user?.phone ?? "") !== watchedPhone;
    const passwordChanged = Boolean(watchedPassword && watchedPassword.length > 0);
    return phoneChanged || passwordChanged;
  }, [user?.phone, watchedPhone, watchedPassword]);

  const onSubmit = async (data: MyProfileFormValues) => {
    if (!user || !token) return;

    setIsSaving(true);
    try {
      const updatedUser = await authService.updateProfile({
        phone: data.phone,
        password: data.password || undefined,
      });

      setAuth(updatedUser, token);
      form.reset({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone ?? "",
        password: "",
      });

      toast.success("Perfil actualizado correctamente");
    } catch {
      toast.error("No se pudo actualizar tu perfil. Intenta nuevamente.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!_hasHydrated) {
    return (
      <div className="min-h-screen p-4 md:p-8 bg-linear-to-tr from-beige to-orange-500/4">
        <Card className="max-w-3xl mx-auto">
          <CardContent className="py-8 text-sm text-neutral-500">Cargando perfil...</CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-linear-to-tr from-beige to-orange-500/4">
      <Card className="max-w-3xl mx-auto shadow-sm border-neutral-200">
        <CardHeader>
          <CardTitle className="text-2xl">Mi perfil</CardTitle>
          <CardDescription>
            Puedes actualizar tu numero y contrasena. Nombre, apellido y correo son solo lectura.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly disabled className="bg-neutral-50" />
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
                        <Input {...field} readOnly disabled className="bg-neutral-50" />
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
                    <FormLabel>Correo electronico</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly disabled className="bg-neutral-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numero de celular</FormLabel>
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
                    <FormLabel>Nueva contrasena</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Deja este campo vacio si no deseas cambiarla"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 mt-0.5" />
                <p>
                  Proximamente se anadira la verificacion de celular para reforzar la seguridad de tu cuenta.
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSaving || !hasChanges}
                className="w-full md:w-auto bg-beige-dark text-neutral-700 hover:bg-beige-dark"
              >
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSaving ? "Guardando cambios..." : "Guardar cambios"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

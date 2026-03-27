"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AppleIcon, GoogleIcon } from "@/components/icon";
import Button from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { ApiError, signIn } from "@/lib/auth-api";
import aalmaLogo from "../../../public/aalma.svg";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setError(null);

    try {
      await signIn({
        email: email.trim(),
        password,
      });
      router.push("/home");
      router.refresh();
    } catch (caughtError) {
      if (caughtError instanceof ApiError) {
        setError(caughtError.message);
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    }
  });

  return (
    <main className="flex flex-row items-center justify-center h-screen w-screen p-12">
      {/* <AuthVisual className="h-full w-[45vw]" /> */}
      <section className="w-[45vw] flex items-center justify-end">
        <img
          src="/images/auth/auth-visual.png"
          alt="Auth Visual"
          className="h-full"
        />
      </section>
      <section className="flex flex-col gap-6 grow p-16">
        <Image src={aalmaLogo} alt="Aalma Logo" width={180} />
        <div>
          <h1 className="text-5xl font-bold">Accédez à votre espace</h1>
          <p className="text-lg">
            Connexion sécurisée, vos données restent confidentielles
          </p>
        </div>
        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "L'email est requis",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Format d'email invalide",
              },
            }}
            render={({ field }) => (
              <TextField
                label="Email"
                placeholder="Email"
                type="email"
                value={field.value}
                onChange={field.onChange}
                errorMessage={errors.email?.message}
                isRequired
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Le mot de passe est requis",
            }}
            render={({ field }) => (
              <TextField
                label="Mot de passe"
                placeholder="Mot de passe"
                type="password"
                value={field.value}
                onChange={field.onChange}
                errorMessage={errors.password?.message}
                isRequired
              />
            )}
          />
          <p className="text-body-small ml-auto">
            Mot de passe oublié ? Pas de panique, on s'en occupe
          </p>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
            right={<ArrowRightIcon className="w-4 h-4" />}
          >
            Connexion
          </Button>
        </form>
        <div className="h-px bg-gray-100 w-full"></div>
        <div className="flex flex-row gap-3">
          <Button
            color="White"
            left={<GoogleIcon className="w-4 h-4" />}
            fullWidth
          >
            Se connecter avec Google
          </Button>
          <Button
            color="White"
            left={<AppleIcon className="w-4 h-4" />}
            fullWidth
          >
            Se connecter avec Apple
          </Button>
        </div>
      </section>
    </main>
  );
}

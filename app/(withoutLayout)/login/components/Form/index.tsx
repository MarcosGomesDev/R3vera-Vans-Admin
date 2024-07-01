"use client";

import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/float-input";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginAction } from "@/server-actions/auth.action";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginForm, loginSchema } from "./formSchema";

export function Form({ redirect_to }: { redirect_to: string }) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorTimeout = setTimeout(() => {
        clearErrors();
      }, 10000);

      return () => clearTimeout(errorTimeout);
    }
  }, [errors, clearErrors]);

  const clientAction = async (formData: LoginForm) => {
    setIsLoading(true);
    const response = await loginAction(formData);

    if (response?.error) {
      toast({
        title: "Uh oh! Algo deu errado",
        description: response.error.error.message,
        variant: "destructive",
      });

      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(clientAction)}
      className="w-full max-w-[300px] rounded-lg bg-background p-5"
    >
      <div>
        <h2 className="mb-2 text-2xl font-bold text-primary">Login</h2>
        <span className="mb-6 block text-sm font-normal text-gray-400">
          Entre com seu e-mail e senha
        </span>
        <div>
          <Input
            type="hidden"
            value={redirect_to}
            {...register("redirect_to")}
          />

          <FloatingLabelInput
            id="email"
            label="Email"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          <div className="my-2 mb-6 text-xs text-red-500">
            {errors.email ? "* " + errors.email?.message : ""}
          </div>
          <FloatingLabelInput
            id="password"
            label="Senha"
            type="password"
            {...register("password")}
            error={errors.password}
          />
          <div className="mt-2 text-xs text-red-500">
            {errors.password ? "* " + errors.password?.message : ""}
          </div>
        </div>
        <div className="intro-x mt-4 flex text-xs text-primary dark:text-primary sm:text-sm">
          <Link href="#" className="hover:underline">
            Esqueceu sua senha?
          </Link>
        </div>
        <div className="intro-x mt-5 text-center xl:mt-8 xl:text-left">
          <Button
            className="h-10 w-full rounded-xl align-top font-bold"
            type="submit"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </form>
  );
}

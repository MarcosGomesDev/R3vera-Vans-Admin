"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/ui/float-input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { createCustomer } from "@/server-actions/customer.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { AddCustomerForm, addCustomerSchema } from "./formSchema";

interface AddFormProps {
  id?: string;
}

export function AddForm({ id }: AddFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<AddCustomerForm>({
    resolver: zodResolver(addCustomerSchema),
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sounds",
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorTimeout = setTimeout(() => {
        clearErrors();
      }, 10000);

      return () => clearTimeout(errorTimeout);
    }
  }, [errors, clearErrors]);

  async function clientAction(formData: AddCustomerForm) {
    setIsLoading(true);
    const response = await createCustomer(formData);

    if (response?.error) {
      toast({
        title: "Uh oh! Algo deu errado",
        description: response.error.error.message,
        variant: "destructive",
      });

      setIsLoading(false);
      return;
    }

    setIsLoading(false);

    toast({
      title: "Sucesso!",
      description: "Cliente criado com sucesso",
      variant: "default",
    });

    redirect("/customers");
  }

  function handleAddSound() {
    append({ name: "", link: "", type: "" });
  }

  return (
    <div className="flex w-full flex-col space-y-3">
      <form
        onSubmit={handleSubmit(clientAction)}
        className="flex w-full flex-col space-y-3 rounded-lg bg-background p-5 px-6 shadow-md"
      >
        <div className="flex w-full items-center justify-between">
          <p className="font-semibold">Nome do cliente</p>
          <FloatingLabelInput
            label="Nome"
            type="text"
            className="w-[340px]"
            {...register("name")}
            error={errors.name?.message}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <p className="font-semibold">Buzinas</p>

          <Accordion type="single" className="flex flex-col" collapsible>
            {fields.map((field, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="font-semibold">
                  Buzina {index + 1}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col space-y-3 px-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Label>Nome</Label>
                    <FloatingLabelInput
                      label="Nome"
                      type="text"
                      className="w-[340px]"
                      {...register(`sounds.${index}.name`)}
                      error={errors.sounds?.[index]?.name?.message}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Link</Label>
                    <FloatingLabelInput
                      label="Link"
                      type="text"
                      className="w-[340px]"
                      {...register(`sounds.${index}.link`)}
                      error={errors.sounds?.[index]?.link?.message}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Tipo</Label>
                    <Select>
                      <SelectTrigger className="w-[340px]">
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="default">Padrão</SelectItem>
                          <SelectItem value="funny">Divertida</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="h-10 self-end rounded-xl align-top font-bold"
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remover
                  </Button>
                </AccordionContent>
              </AccordionItem>
            ))}
            <Button
              className="mt-4 h-10 self-end rounded-xl align-top font-bold"
              type="button"
              variant="outline"
              onClick={handleAddSound}
            >
              Adicionar
            </Button>
          </Accordion>
        </div>
      </form>
      <div className="flex w-1/2 gap-3 self-end">
        <Button
          className="h-11 w-full rounded-xl align-top font-bold shadow-md"
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button
          className="h-11 w-full min-w-24 rounded-xl bg-black align-top font-bold shadow-md"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner className="text-white" />
          ) : id ? (
            "Salvar"
          ) : (
            "Adicionar"
          )}
        </Button>
      </div>
    </div>
  );
}

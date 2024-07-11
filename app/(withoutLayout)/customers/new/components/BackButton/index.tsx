"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface BackButtonProps
  extends HTMLAttributes<HTMLButtonElement>,
    ButtonProps {}

export function BackButton({ className, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className={twMerge(["size-12 rounded-full", className])}
      {...props}
    >
      <ChevronLeftIcon size={24} />
    </Button>
  );
}

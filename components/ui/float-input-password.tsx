import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import { FloatingLabelInput, FloatingLabelInputProps } from "./float-input";

interface FloatingLabelInputPasswordProps extends FloatingLabelInputProps {
  register?: UseFormRegisterReturn;
}

export function FloatingLabelInputPassword({
  error,
  register,
  ...props
}: FloatingLabelInputPasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div
      className={twMerge([
        "relative mt-5 flex rounded-md border border-input outline-none focus-within:border-primary dark:border-slate-600 dark:bg-background dark:focus-within:border-primary",
        error ? "!border-red-500 focus-within:border-red-500" : "",
      ])}
    >
      <div className="w-10/12">
        <FloatingLabelInput
          className="flex-auto !border-transparent"
          id="password"
          label="Senha"
          type={showPassword ? "text" : "password"}
          error={error}
          {...register}
          {...props}
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        className="absolute right-0 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <>
            <EyeOff
              className={twMerge([
                "size-5 text-primary hover:opacity-80 dark:text-primary",
                error ? "text-red-500" : "",
              ])}
            />
          </>
        ) : (
          <>
            <EyeIcon
              className={twMerge([
                "size-5 text-primary hover:opacity-80 dark:text-slate-400",
                error ? "text-red-500" : "",
              ])}
            />
          </>
        )}
      </Button>
    </div>
  );
}

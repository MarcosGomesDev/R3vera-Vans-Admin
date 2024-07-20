import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOff } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: unknown;
}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const isPassword = type === "password";

    return (
      <>
        <Input
          placeholder=" "
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={cn(
            "peer flex-auto",
            error ? "!border-red-500 focus-visible:ring-red-500" : "",
            className,
            isPassword ? "pr-10" : "",
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            className="absolute right-0 top-0 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <>
                <EyeOff
                  className={twMerge([
                    "size-5 text-slate-300 hover:opacity-80 dark:text-input",
                    error ? "text-red-500" : "",
                  ])}
                />
              </>
            ) : (
              <>
                <EyeIcon
                  className={twMerge([
                    "size-5 text-slate-300 hover:opacity-80 dark:text-slate-400",
                    error ? "text-red-500" : "",
                  ])}
                />
              </>
            )}
          </Button>
        )}
      </>
    );
  },
);
FloatingInput.displayName = "FloatingInput";

interface FloatingLabelProps
  extends React.ComponentPropsWithoutRef<typeof Label> {
  error?: unknown;
}

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FloatingLabelProps
>(({ className, error, ...props }, ref) => {
  return (
    <Label
      className={cn(
        "peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform border-input bg-background px-2 text-sm text-gray-500 !ring-0 duration-300 focus-within:border-black focus:ring-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black dark:bg-background dark:peer-focus:text-slate-400 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
        error ? "!border-red-500 !text-red-500" : "",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FloatingLabel.displayName = "FloatingLabel";

export type FloatingLabelInputProps = InputProps & {
  label?: string;
  error?: unknown;
  inputClassName?: React.HTMLAttributes<HTMLInputElement>["className"];
  labelClassName?: React.HTMLAttributes<HTMLLabelElement>["className"];
};

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, error, inputClassName, labelClassName, ...props }, ref) => {
  return (
    <div className="relative">
      <FloatingInput
        error={error}
        ref={ref}
        id={id}
        className={inputClassName}
        {...props}
      />
      <FloatingLabel htmlFor={id} error={error} className={labelClassName}>
        {label}
      </FloatingLabel>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };

import * as Icons from "lucide-react";
import { HTMLAttributes } from "react";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  name: keyof typeof Icons;
}

export function Icon({ name, ...props }: IconProps) {
  const LucideIcon = Icons[name] as React.ElementType;

  if (!LucideIcon) {
    console.error(`Icon "${name}" does not exist in lucide-react`);
    return null;
  }

  return <LucideIcon {...props} />;
}

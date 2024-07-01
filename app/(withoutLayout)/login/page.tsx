import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Form } from "./components";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { redirect_to?: string };
}) {
  const { redirect_to = "/" } = searchParams;

  const authService = new AuthService();
  const user = authService.getUser();

  if (user && !authService.isTokenExpired()) {
    redirect(redirect_to);
  }
  return (
    <div className="flex h-screen">
      <div className="flex h-screen w-full flex-col items-center justify-center bg-primary-foreground lg:w-1/2 lg:bg-background">
        <Form redirect_to={redirect_to} />
      </div>
      <div className="hidden h-screen w-1/2 justify-center rounded-bl-[8rem] bg-gradient-to-b from-black from-10% via-red-950 via-50% to-primary to-90% lg:flex">
        <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="logo"
          className="-mt-64"
          priority
        />
      </div>
    </div>
  );
}

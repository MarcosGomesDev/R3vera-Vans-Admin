import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="h-screen w-1/2"></div>
      <div className="flex h-screen w-1/2 justify-center rounded-bl-[8rem] bg-gradient-to-b from-black from-10% via-red-950 via-50% to-primary to-90%">
        <Image
          src="/logo.svg"
          width={200}
          height={200}
          alt="logo"
          className="-mt-64"
        />
      </div>
    </div>
  );
}

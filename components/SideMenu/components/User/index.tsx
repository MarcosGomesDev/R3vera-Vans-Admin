import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoonIcon, SearchIcon } from "lucide-react";

export function User() {
  return (
    <div className="flex h-12 w-full max-w-[322px] items-center justify-between rounded-full bg-white px-2 shadow-md">
      <div className="relative flex w-full max-w-[216px] items-center">
        <SearchIcon className="absolute ml-2 size-4" />
        <Input
          placeholder="Pesquisar"
          className="h-8 w-full rounded-full pl-8"
        />
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoonIcon className="size-5" />
      </Button>
      <div className="size-8 rounded-full bg-primary"></div>
    </div>
  );
}

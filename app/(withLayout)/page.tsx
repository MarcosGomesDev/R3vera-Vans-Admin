import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div>
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-md">
            <CardContent className="flex h-[4.5rem] min-w-[220px] max-w-[262px] items-center p-0 px-4 py-2">
              <div className="flex w-full items-center gap-4">
                <div className="size-11 rounded-full bg-gray-200"></div>
                <div>
                  <span className="block text-xs text-gray-400">Clientes</span>
                  <p className="text-2xl font-semibold text-black">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

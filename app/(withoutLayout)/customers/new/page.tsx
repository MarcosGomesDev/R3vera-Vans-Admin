import { AddForm } from "./components/AddForm";
import { BackButton } from "./components/BackButton";

export default function CustomersPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const { id } = searchParams;

  return (
    <div className="mx-auto min-h-screen bg-[#F4F7FE] py-10">
      <BackButton className="ml-8" />

      <div className="container mt-8 flex max-w-screen-xl flex-col">
        <h1 className="mt-5 pb-8 text-2xl font-semibold">
          {id ? "Editar" : "Adicionar"} Cliente
        </h1>
        <div className="w-full max-w-3xl self-center">
          <AddForm id={id} />
        </div>
      </div>
    </div>
  );
}

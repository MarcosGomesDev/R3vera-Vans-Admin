import { columns, Customer } from "./components/Columns";
import { DataTable } from "./components/DataTable";

async function getData(): Promise<Customer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Maria",
      authorized: true,
      createdAt: "2024-01-01",
    },
    {
      id: "f5e3d3d0",
      name: "João",
      authorized: false,
      createdAt: "2024-01-01",
    },
    {
      id: "b8b5f9c4",
      name: "Pedro",
      authorized: true,
      createdAt: "2024-01-01",
    },
    // ...
  ];
}

export default async function CustomersPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

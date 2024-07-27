import { columns } from "./components/Columns";
import { DataTable } from "./components/DataTable";

export default function FilesPage() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={[]} />
    </div>
  );
}

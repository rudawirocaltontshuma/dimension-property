import { PageHeader } from "../_lib/page-header";
import { PropertiesTable } from "./_components/properties-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Properties" description="Browse and manage every property in the portfolio." />
      <PropertiesTable />
    </div>
  );
}

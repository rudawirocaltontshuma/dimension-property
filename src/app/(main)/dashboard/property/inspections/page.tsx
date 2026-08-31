import { PageHeader } from "../_lib/page-header";
import { InspectionsTable } from "./_components/inspections-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Inspections" description="Schedule and review property and unit inspections." />
      <InspectionsTable />
    </div>
  );
}

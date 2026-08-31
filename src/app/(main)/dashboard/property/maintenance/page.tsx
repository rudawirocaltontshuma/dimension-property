import { PageHeader } from "../_lib/page-header";
import { MaintenanceBoard } from "./_components/maintenance-board";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Maintenance" description="Track work orders from report through completion." />
      <MaintenanceBoard />
    </div>
  );
}

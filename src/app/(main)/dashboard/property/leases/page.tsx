import { PageHeader } from "../_lib/page-header";
import { LeasesTable } from "./_components/leases-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Leases" description="Every lease agreement across the portfolio." />
      <LeasesTable />
    </div>
  );
}

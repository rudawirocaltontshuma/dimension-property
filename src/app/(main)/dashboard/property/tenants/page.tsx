import { PageHeader } from "../_lib/page-header";
import { TenantsTable } from "./_components/tenants-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Tenants" description="Manage tenant records, leases, and rent history." />
      <TenantsTable />
    </div>
  );
}

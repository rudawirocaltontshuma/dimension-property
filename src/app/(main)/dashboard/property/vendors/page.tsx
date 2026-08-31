import { PageHeader } from "../_lib/page-header";
import { VendorsTable } from "./_components/vendors-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Vendors" description="Manage contractors and service providers." />
      <VendorsTable />
    </div>
  );
}

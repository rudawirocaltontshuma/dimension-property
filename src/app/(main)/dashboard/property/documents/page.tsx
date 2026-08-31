import { PageHeader } from "../_lib/page-header";
import { DocumentCenter } from "./_components/document-center";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Documents"
        description="A central archive for leases, inspections, invoices, and certificates. No files are actually stored."
      />
      <DocumentCenter />
    </div>
  );
}

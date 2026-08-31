import { PageHeader } from "../_lib/page-header";
import { RentOverview } from "./_components/rent-overview";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Rent"
        description="A visual overview of expected versus collected rent. Demo data only — no real payments are processed."
      />
      <RentOverview />
    </div>
  );
}

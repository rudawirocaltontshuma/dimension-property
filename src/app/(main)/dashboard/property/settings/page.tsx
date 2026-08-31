import { PageHeader } from "../_lib/page-header";
import { SettingsForm } from "./_components/settings-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Settings"
        description="Organization, profile, and notification preferences. Non-functional demo forms."
      />
      <SettingsForm />
    </div>
  );
}

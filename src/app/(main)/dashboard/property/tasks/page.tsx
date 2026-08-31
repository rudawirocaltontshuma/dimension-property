import { PageHeader } from "../_lib/page-header";
import { TasksBoard } from "./_components/tasks-board";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Tasks" description="Property management to-dos and follow-ups." />
      <TasksBoard />
    </div>
  );
}

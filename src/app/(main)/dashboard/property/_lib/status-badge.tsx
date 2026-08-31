import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Active: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Occupied: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Approved: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Completed: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Pass: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Paid: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Preferred: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  Done: "bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300",
  New: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Review: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Scheduled: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Reserved: "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  "In Progress": "bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
  Pending: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Reported: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Waiting: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Expiring: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "Notice Given": "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "Pass with Notes": "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "Under Renovation": "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  "To Do": "bg-muted text-muted-foreground",
  Vacant: "bg-muted text-muted-foreground",
  Inactive: "bg-muted text-muted-foreground",
  Past: "bg-muted text-muted-foreground",
  Maintenance: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Rejected: "bg-destructive/10 text-destructive",
  Expired: "bg-destructive/10 text-destructive",
  Overdue: "bg-destructive/10 text-destructive",
  Fail: "bg-destructive/10 text-destructive",
  Urgent: "bg-destructive/10 text-destructive",
  High: "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  Medium: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Low: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge
      className={cn(
        "rounded-full px-2.5 font-medium",
        statusStyles[status] ?? "bg-muted text-muted-foreground",
        className,
      )}
    >
      {status}
    </Badge>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { type TaskStatus, tasks } from "../../_lib/data";
import { StatusBadge } from "../../_lib/status-badge";

const columns: TaskStatus[] = ["To Do", "In Progress", "Done"];

export function TasksBoard() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {columns.map((status) => {
        const items = tasks.filter((task) => task.status === status);
        return (
          <div key={status} className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-1">
              <h3 className="font-medium text-sm">{status}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">{items.length}</span>
            </div>
            <div className="flex flex-col gap-2">
              {items.map((task) => (
                <Card key={task.id} className="gap-2 py-3">
                  <CardHeader className="px-3">
                    <CardTitle className="font-medium text-sm leading-snug">{task.title}</CardTitle>
                    {task.propertyName ? <p className="text-muted-foreground text-xs">{task.propertyName}</p> : null}
                  </CardHeader>
                  <CardContent className="flex items-center justify-between px-3 text-xs">
                    <StatusBadge status={task.priority} />
                    <span className="text-muted-foreground">{task.assignee}</span>
                  </CardContent>
                  <CardContent className="px-3 pt-0 text-muted-foreground text-xs">Due {task.dueDate}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

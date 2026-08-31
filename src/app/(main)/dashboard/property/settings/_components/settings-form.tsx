"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { getInitials } from "@/lib/utils";

const preferences = [
  {
    id: "notify-rent",
    label: "Rent collection alerts",
    description: "Notify when rent is overdue.",
    defaultChecked: true,
  },
  {
    id: "notify-maintenance",
    label: "Maintenance alerts",
    description: "Notify on new or urgent work orders.",
    defaultChecked: true,
  },
  {
    id: "notify-leases",
    label: "Lease expiration reminders",
    description: "Notify 60 days before a lease expires.",
    defaultChecked: true,
  },
  {
    id: "notify-applications",
    label: "New applications",
    description: "Notify when a new application is submitted.",
    defaultChecked: false,
  },
];

export function SettingsForm() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Organization</CardTitle>
          <CardDescription>Basic details for the property management organization.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="org-name">Organization name</Label>
            <Input id="org-name" defaultValue="Nexora Property Group" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-email">Contact email</Label>
            <Input id="org-email" type="email" defaultValue="operations@nexoraproperty.dev" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-phone">Phone</Label>
            <Input id="org-phone" defaultValue="(555) 010-2200" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-timezone">Timezone</Label>
            <Input id="org-timezone" defaultValue="America/Chicago" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Property Manager Profile</CardTitle>
          <CardDescription>Your profile as shown across the platform.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-14">
              <AvatarFallback>{getInitials("Alicia Moreno")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">Alicia Moreno</p>
              <p className="text-muted-foreground text-sm">Senior Property Manager</p>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pm-name">Full name</Label>
              <Input id="pm-name" defaultValue="Alicia Moreno" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pm-email">Email</Label>
              <Input id="pm-email" type="email" defaultValue="alicia.moreno@nexoraproperty.dev" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-normal">Notification Preferences</CardTitle>
          <CardDescription>Choose what you want to be notified about.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {preferences.map((pref) => (
            <div
              key={pref.id}
              className="flex items-center justify-between gap-4 border-b pb-4 last:border-0 last:pb-0"
            >
              <div>
                <p className="text-sm">{pref.label}</p>
                <p className="text-muted-foreground text-xs">{pref.description}</p>
              </div>
              <Switch defaultChecked={pref.defaultChecked} />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </div>
  );
}

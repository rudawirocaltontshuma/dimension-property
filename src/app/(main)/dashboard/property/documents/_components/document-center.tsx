"use client";

import * as React from "react";

import { FileSpreadsheet, FileText, ImageIcon, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { type DocumentCategory, documents } from "../../_lib/data";

const categories: DocumentCategory[] = [
  "Leases",
  "Inspections",
  "Maintenance",
  "Property Documents",
  "Invoices",
  "Certificates",
];

const iconByFileType = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileSpreadsheet,
  jpg: ImageIcon,
};

export function DocumentCenter() {
  const [query, setQuery] = React.useState("");

  const filtered = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase()) ||
      doc.propertyName.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search documents..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>

      <Tabs defaultValue="Leases">
        <TabsList variant="line" className="flex-wrap">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category} ({filtered.filter((d) => d.category === category).length})
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((category) => {
          const items = filtered.filter((doc) => doc.category === category);
          return (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((doc) => {
                  const Icon = iconByFileType[doc.fileType];
                  return (
                    <Card key={doc.id} className="gap-2 py-3">
                      <CardHeader className="flex-row items-start gap-2 space-y-0 px-3">
                        <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                        <CardTitle className="font-medium text-sm leading-snug">{doc.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex items-center justify-between px-3 text-muted-foreground text-xs">
                        <span>{doc.propertyName}</span>
                        <span>{doc.size}</span>
                      </CardContent>
                      <CardContent className="px-3 pt-0 text-muted-foreground text-xs">
                        Uploaded {doc.uploadedDate}
                      </CardContent>
                    </Card>
                  );
                })}
                {items.length === 0 && (
                  <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-muted-foreground text-sm">
                    No documents found in this category.
                  </div>
                )}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

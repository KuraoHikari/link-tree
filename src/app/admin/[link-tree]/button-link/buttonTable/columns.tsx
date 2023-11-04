"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type ButtonTreeColumn = {
 id: string;
 text: string;
 link: string;
};

export const columns: ColumnDef<ButtonTreeColumn>[] = [
 {
  accessorKey: "text",
  header: "Text",
 },
 {
  accessorKey: "link",
  header: "Link",
 },
 {
  id: "actions",
  cell: ({ row }) => <CellAction data={row.original} />,
 },
];

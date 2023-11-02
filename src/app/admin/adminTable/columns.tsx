"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type LinkTreeColumn = {
 id: string;
 title: string;
 description: string;
 createdAt: string;
};

export const columns: ColumnDef<LinkTreeColumn>[] = [
 {
  accessorKey: "title",
  header: "Title",
 },

 {
  accessorKey: "description",
  header: "Description",
 },
 {
  accessorKey: "createdAt",
  header: "Date",
 },
 {
  id: "actions",
  cell: ({ row }) => <CellAction data={row.original} />,
 },
];

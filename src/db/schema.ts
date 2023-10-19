import {
 timestamp,
 pgTable,
 text,
 primaryKey,
 integer,
 uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
 id: text("id").notNull().primaryKey(),
 name: text("name"),
 email: text("email").notNull(),
 emailVerified: timestamp("emailVerified", {
  mode: "date",
 }),
 image: text("image"),

 username: text("username").unique(),
});

export const accounts = pgTable(
 "account",
 {
  userId: text("userId")
   .notNull()
   .references(() => users.id, { onDelete: "cascade" }),
  type: text("type")
   .$type<AdapterAccount["type"]>()
   .notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
 },
 (account) => ({
  compoundKey: primaryKey(
   account.provider,
   account.providerAccountId
  ),
 })
);

export const sessions = pgTable("session", {
 sessionToken: text("sessionToken").notNull().primaryKey(),
 userId: text("userId")
  .notNull()
  .references(() => users.id, { onDelete: "cascade" }),
 expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
 "verificationToken",
 {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
 },
 (vt) => ({
  compoundKey: primaryKey(vt.identifier, vt.token),
 })
);

export const linkTrees = pgTable("linkTree", {
 id: uuid("id").defaultRandom().primaryKey(),
 title: text("title").notNull(),
 description: text("description").notNull(),
 userId: text("user_id").notNull(),
 createdAt: timestamp("created_at", {
  mode: "date",
 }).defaultNow(),
});

export const buttons = pgTable("button", {
 id: uuid("id").defaultRandom().primaryKey(),
 text: text("text").notNull(),
 link: text("link").notNull(),
 userId: text("user_id").notNull(),
 linkTreeId: text("linkTree_id").notNull(),
});

export const linkTreesRelations = relations(
 linkTrees,
 ({ one, many }) => ({
  user: one(users, {
   fields: [linkTrees.userId],
   references: [users.id],
  }),
  buttons: many(buttons),
 })
);

export const userRelations = relations(
 users,
 ({ many }) => ({
  linkTrees: many(linkTrees),
  buttons: many(buttons),
 })
);

export const buttonsRelations = relations(
 buttons,
 ({ one }) => ({
  linkTree: one(linkTrees, {
   fields: [buttons.linkTreeId],
   references: [linkTrees.id],
  }),
  user: one(users, {
   fields: [buttons.userId],
   references: [users.id],
  }),
 })
);

import { Icons } from "@/components/icons";
import { types } from "util";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export type MemberProps = {
  name: string;
  slug: string;
};

export type FormProps = {
  name: string;
  role: string;
  day: string | null;
  kpiScores: { [key: string]: string };
  attendance: boolean;
  timeIn: string;
  timeOut: string;
  notes: string;
  userId: string;
  roleId: string;
};

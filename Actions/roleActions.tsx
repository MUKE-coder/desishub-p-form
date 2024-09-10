"use server";

import { db } from "@/lib/db";
import { MemberProps } from "@/types/nav";

export async function createRole(data: MemberProps) {
  try {
    const { slug, name } = data;
    const existingRole = await db.role.findUnique({
      where: {
        slug: slug,
      },
    });
    if (existingRole) {
      return {
        data: null,
        error: `role with this slug "${slug}" already exists.`,
        status: 409,
      };
    }
    const createdRole = await db.role.create({
      data: { slug, name },
    });
    return {
      data: createdRole,
      error: null,
      status: 201,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getRoles() {
  try {
    const dbRoles = await db.role.findMany();
  // console.log(dbRoles)
    return dbRoles;
  } catch (error) {
    console.log(error);
  }
}

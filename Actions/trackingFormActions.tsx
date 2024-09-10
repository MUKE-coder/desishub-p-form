"use server";
import { db } from "@/lib/db";
import { FormProps } from "@/types/nav";

export async function createFormData(formData: FormProps) {
  try {
    const {
      name,
      role,
      kpiScores,
      attendance,
      timeIn,
      timeOut,
      notes,
      userId,
      roleId,
    } = formData;
    const createdData = await db.formData.create({
      data: {
        name,
        role,
        kpiScores,
        attendance,
        timeIn,
        timeOut,
        notes,
        userId,
        roleId,
      },
    });
    console.log(createdData);
    return createdData;
  } catch (error) {
    console.log(error);
  }
}

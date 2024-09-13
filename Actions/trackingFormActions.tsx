"use server";
import { db } from "@/lib/db";
import { FormProps } from "@/types/nav";

export async function createFormData(formData: FormProps) {
  try {
    const {
      name,
      role,
      day,
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
        day,
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

export async function fetchFormData() {
  try {
    const fetchedFormData = await db.formData.findMany({
      include: {
        User: true,
        Role: true,
      },
    });

    const processedFormData = fetchedFormData.map((data) => ({
      id: data.id,
      day: data.day,
      attendance: data.attendance,
      timeIn: data.timeIn,
      timeOut: data.timeOut,
      notes: data.notes,
      user: data.name,
      role: data.role,
      kpiScores: Object.entries(data.kpiScores as Record<string, string>).map(
        ([name, score]) => ({
          name,
          score,
        })
      ),
    }));

    return { reports: processedFormData };
  } catch (error) {
    console.error("Failed to fetch form data:", error);
    throw new Error("Failed to fetch form data");
  }
}

export async function allFormData() {
  try {
    const fetchedFormData = await db.formData.findMany({
      // orderBy: { createdAt: "desc" },
      include: {
        User: true,
        Role: true,
      },
    });

    return fetchedFormData;
  } catch (error) {
    console.error("Failed to fetch filtered form data:", error);
    throw new Error("Failed to fetch filtered form data");
  }
}

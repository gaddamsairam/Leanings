"use server";

import { RegisterSchema } from "../schemas";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values) => {
  const validateField = RegisterSchema?.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fileds" };
  }
  const { email, password, name } = validateField.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "User created!" };
};

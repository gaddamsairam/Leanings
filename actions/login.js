"use server";

import { LoginSchema } from "../schemas";

export const login = async (values) => {
  const validateField = LoginSchema?.safeParse(values);
  if (!validateField.success) {
    return { error: "Invalid fileds" };
  }
  return { success: "Email sent!" };
};

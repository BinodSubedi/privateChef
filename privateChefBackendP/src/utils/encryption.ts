import bcrypt from "bcrypt";

export const hashPassword = (normalPassword: string) => {
  return bcrypt.hash(normalPassword, 10);
};

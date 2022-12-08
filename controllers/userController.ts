import { UserModel } from "@prisma/client";
import { prisma } from "../prisma/client";

export async function createUser(userData: UserModel) {
  await prisma.userModel.create({
    data: userData,
  });
}

export async function getUserByEmail(email: string) {
  const user = await prisma.userModel.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function updateUserByEmail(email: string, data: UserModel) {
  const user = await prisma.userModel.update({
    where: {
      email: email,
    },
    data: data,
  });
  return user;
}

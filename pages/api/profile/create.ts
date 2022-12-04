import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { UserModel } from "@prisma/client";

async function createUser(userData: UserModel) {
  await prisma.userModel.create({
    data: userData,
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body;
  await createUser(data)
    .then(async (user) => {
      await prisma.$disconnect();
      res.status(200).json(user);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

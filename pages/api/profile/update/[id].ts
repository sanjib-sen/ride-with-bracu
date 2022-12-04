import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { UserModel } from "@prisma/client";
const prisma = new PrismaClient();
async function updateUser(email: string, data: UserModel) {
  const user = await prisma.userModel.update({
    where: {
      email: email,
    },
    data: data,
  });
  return user;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email: unknown = req.query.id;
  const data = req.body;
  await updateUser(email as string, data)
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

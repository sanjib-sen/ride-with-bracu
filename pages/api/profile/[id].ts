import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function getUser(email: string) {
  const user = await prisma.userModel.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data: unknown = req.query.id;
  await getUser(data as string)
    .then(async (user) => {
      await prisma.$disconnect();
      res.status(200).json({ user });
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function getRiders(fromBracu: boolean) {
  const users = await prisma.userModel.findMany({
    where: {
      fromBRACU: fromBracu,
    },
  });
  return users;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const frombracu = req.query.frombracu;
  await getRiders(frombracu === "true")
    .then(async (users) => {
      await prisma.$disconnect();
      res.status(200).json(users);
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

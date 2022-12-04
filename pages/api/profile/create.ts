import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userData } from "../../../types/userData";
const prisma = new PrismaClient();

async function createUser(userData: userData) {
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
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  res.status(200).json({ success: true, message: "User Creation Succesfull." });
}

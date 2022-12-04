import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { userData } from "../../types/userData";
const prisma = new PrismaClient();

async function main(userData: userData) {
  const user = await prisma.userModel.create({
    data: {
      name: userData.name,
      email: userData.email,
      image: userData.image,
      facebook: userData.facebook,
      whatsapp: userData.whatsapp,
    },
  });
  console.log(user);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get data submitted in request's body.
  const data = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  //   if (!body.first || !body.last) {
  //     // Sends a HTTP bad request error code
  //     return res.status(400).json({ data: "First or last name not found" });
  //   }

  // Found the name.
  // Sends a HTTP success code

  if (req.method == "post") {
    main(req.body)
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  }

  res.status(200).json({ data });
}

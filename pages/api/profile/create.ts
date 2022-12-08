import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { createUser } from "../../../controllers/userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token === null) {
    res.status(401).json({ message: "Unauthorized Access" });
  }
  const data = req.body;
  await createUser(data)
    .then(async (user) => {
      res.status(200).json(user);
    })
    .catch(async (e) => {
      console.error(e);
      process.exit(1);
    });
}

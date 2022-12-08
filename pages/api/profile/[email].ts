import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getUserByEmail } from "../../../controllers/userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token === null || token.email != req.query.email) {
    res.status(401).json({ message: "Unauthorized Access" });
  } else {
    const email = req.query.email;
    await getUserByEmail(email as string)
      .then(async (user) => {
        res.status(200).json(user);
      })
      .catch(async (e) => {
        console.error(e);
        process.exit(1);
      });
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getRiders } from "../../../controllers/riderController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req });
  if (token === null) {
    res.status(401).json({ message: "Unauthorized Access" });
  }
  const frombracu = req.query.frombracu;
  await getRiders(frombracu === "true")
    .then(async (users) => {
      res.status(200).json(users);
    })
    .catch(async (e) => {
      console.error(e);
      process.exit(1);
    });
}

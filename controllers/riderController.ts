import { prisma } from "../prisma/client";
import minutesAgo from "../utils/minutesAgo";

export async function getRiders(fromBracu: boolean) {
  const users = await prisma.userModel.findMany({
    where: {
      fromBRACU: fromBracu,
      requestedAt: {
        gte: minutesAgo(30),
      },
    },
  });

  return users;
}

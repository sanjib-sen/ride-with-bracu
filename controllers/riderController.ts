import { minuteToEndSearch } from "../global/variables";
import { prisma } from "../prisma/client";
import minutesAgo from "../utils/minutesAgo";

export async function getRiders(fromBracu: boolean) {
  const users = await prisma.userModel.findMany({
    where: {
      fromBRACU: fromBracu,
      requestedAt: {
        gte: minutesAgo(minuteToEndSearch),
      },
    },
  });

  return users;
}

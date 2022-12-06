import { prisma } from "../prisma/client";

export async function getRiders(fromBracu: boolean) {
  const users = await prisma.userModel.findMany({
    where: {
      fromBRACU: fromBracu,
    },
  });
  return users;
}

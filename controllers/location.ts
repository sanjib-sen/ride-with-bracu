import { userData } from "../types/userData";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUserModel(userData: userData) {
  async function main() {
    const user = await prisma.userModel.create({
      data: {
        name: userData.name,
        email: userData.email,
        image: userData.image,
        defaultLocationName: userData.defaultLocationName,
      },
    });
    console.log(user);
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
}

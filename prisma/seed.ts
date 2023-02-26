import { prisma } from "../src/db";

async function main() {
  prisma.queue.createMany({
    data: [
      {
        payload: {
          module: "ingatlan.com/init",
        },
      },
      {
        payload: {
          module: "ingatlan.jofogas.com/init",
        },
      },
    ],
  });
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

import { prisma } from "../src/db";

async function main() {
  prisma.queue.createMany({
    data: [
      {
        payload: {
          command: "init",
          module: "ingatlan.com/stats",
        },
      },
      {
        payload: {
          command: "init",
          module: "ingatlan.jofogas.com/stats",
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

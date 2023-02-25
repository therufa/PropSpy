import { prisma } from "./db";

async function main() {
  const allProperties = await prisma.link.findMany();
  console.log(allProperties);
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

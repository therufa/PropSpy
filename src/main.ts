import { prisma } from "./db";
import { ingatlanCom, jofogasHu } from "./crawlers/index";

async function main() {
  console.log(await ingatlanCom.getStats());
  console.log(await jofogasHu.getStats());
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

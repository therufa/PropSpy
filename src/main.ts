import { prisma } from "./db";
import { scrape } from "./spiders/link";

async function main() {
  // spawn scrapers
  console.log(await scrape(1));
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

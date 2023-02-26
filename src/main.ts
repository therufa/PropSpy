import { prisma } from "./db";
import { scrape as scrapeLink } from "./spiders/link";

async function scrape(p: number) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 10000));
  return scrapeLink(p);
}

async function main() {
  const {
    page: { totalPages },
  } = (await scrape(1)) ?? { page: { totalPages: 0 } };

  for (let page = 320; page < Math.ceil(totalPages / 10); page + 10) {
    await Promise.all(Array.from({ length: 10 }, (_, i) => scrape(page + i)));
  }
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

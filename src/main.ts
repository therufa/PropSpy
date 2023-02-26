import { prisma } from "./db";
import { scrape } from "./spiders/link";

async function main() {
  const {
    page: { totalPages },
  } = (await scrape(1)) ?? { page: { totalPages: 0 } };

  // spawn a new scraper for every 10 pages
  const chunks = Array.from({ length: totalPages / 10 }, (_, i) => i * 10 + 1);

  for (const chunk of chunks) {
    await Promise.all(Array.from({ length: 10 }, (_, i) => scrape(chunk + i)));
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

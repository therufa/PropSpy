import axios from "axios";
import { load } from "cheerio";
import { pipe } from "ramda";
import { prisma } from "../db";

function sanitizeNumeric(value: string) {
  return value.replace(/[^0-9]/g, "").trim();
}

function sanitizePage(value: string) {
  return value.split("/").map(pipe(sanitizeNumeric, Number)) as [
    number,
    number
  ];
}

export async function scrape(page: number) {
  try {
    const { data } = await axios.get(
      `https://ingatlan.com/lista/elado?page=${page}`
    );
    const $ = load(data);

    const listings = $("[data-id].listing")
      .map((_i, el) => {
        return {
          url: $(el).find("a.listing__link").attr("href"),
          address: $(el).find(".listing__address").text(),
          price: $(el).find(".listing__price .price").text(),
          photoCount: $(el).find(".listing__photos-count").text(),
          label: $(el).find(".listing__label").text(),
          props: {
            areaSize: sanitizeNumeric(
              $(el).find(".listing__data--area-size").text()
            ),
            plotSize: sanitizeNumeric(
              $(el).find(".listing__data--plot-size").text()
            ),
            rooms: sanitizeNumeric($(el).find(".listing__data--rooms").text()),
            floor: sanitizeNumeric($(el).find(".listing__data--floor").text()),
          },
        };
      })
      .toArray();

    const properties = await prisma.$transaction(
      listings.map((listing) => {
        const properties = {
          url: listing.url!,
          rawHtml: data,
          title: listing.address,
          price: listing.price,
          areaSize: listing.props.areaSize,
          plotSize: listing.props.plotSize,
          floor: listing.props.floor,
          rooms: listing.props.rooms,
        };

        return prisma.property.upsert({
          create: properties,
          update: properties,
          where: {
            url: listing.url!,
          },
        });
      })
    );

    const [currentPage, totalPages] = sanitizePage(
      $(".pagination__page-number").text()
    );

    return {
      properties,
      page: {
        currentPage,
        totalPages,
      },
    };
  } catch (e) {
    console.error(e);
  }
}

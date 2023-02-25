import axios from "axios";
import { load } from "cheerio";

function sanitizeNumeric(value: string) {
  return value.replace(/[^0-9]/g, "");
}

export async function scrape(page: number) {
  try {
    const { data } = await axios.get(
      `https://ingatlan.com/lista/elado?page=${page}`
    );
    const $ = load(data);

    return $("[data-id].listing")
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
  } catch (e) {
    console.error(e);
  }
}

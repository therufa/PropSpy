import axios from "axios";
import { load } from "cheerio";

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
            areaSize: $(el).find(".listing__prop--area-size").text(),
            plotSize: $(el).find(".listing__prop--plot-size").text(),
            rooms: $(el).find(".listing__prop--rooms").text(),
            floor: $(el).find(".listing__prop--floor").text(),
          },
        };
      })
      .toArray();
  } catch (e) {
    console.error(e);
  }
}

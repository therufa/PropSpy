import axios from "axios";
import { load } from "cheerio";
import { pipe } from "ramda";
import { sanitizeNumeric } from "../../utils";
import { Stats } from "../types";

function sanitizePage(value: string) {
  return pipe(sanitizeNumeric, Number)(value);
}

export async function getStats(): Promise<Stats | undefined> {
  try {
    const url = `https://ingatlan.jofogas.hu/magyarorszag/ingatlan`;
    const { data } = await axios.get(url);
    const $ = load(data);
    const totalItems = sanitizePage(
      $(".listing-content.row > .items-column > .re-view-toggle strong").text()
    );
    const itemsPerPage = $(".list-items .listing.list-item").toArray().length;

    return {
      url,
      paginationKey: "o",
      listingCount: totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      itemsPerPage,
    };
  } catch (e) {
    console.error(e);
  }
}

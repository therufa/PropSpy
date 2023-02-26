import axios from "axios";
import { load } from "cheerio";
import { pipe } from "ramda";
import { sanitizeNumeric } from "../../utils";
import { Stats } from "../types";

function sanitizePage(value: string) {
  return value.split("/").map(pipe(sanitizeNumeric, Number)) as [
    number,
    number
  ];
}

export async function getStats(): Promise<Stats | undefined> {
  try {
    const url = "https://ingatlan.com/lista/elado";
    const { data } = await axios.get(url);
    const $ = load(data);
    const [, totalPages] = sanitizePage($(".pagination__page-number").text());
    const itemsPerPage = $(".resultspage__listings > .listing").toArray()
      .length;
    const listingCount = Number(
      sanitizeNumeric($(".results__number__count").text())
    );

    return {
      url,
      paginationKey: "page",
      listingCount,
      itemsPerPage,
      totalPages,
    };
  } catch (e) {
    console.error(e);
  }
}

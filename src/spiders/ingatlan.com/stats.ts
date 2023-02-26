import axios from "axios";
import { load } from "cheerio";
import { pipe } from "ramda";
import { sanitizeNumeric } from "../../utils";

function sanitizePage(value: string) {
  return value.split("/").map(pipe(sanitizeNumeric, Number)) as [
    number,
    number
  ];
}

export async function scrape() {
  try {
    const { data } = await axios.get(`https://ingatlan.com/lista/elado`);
    const $ = load(data);
    const [, totalPages] = sanitizePage($(".pagination__page-number").text());

    return {
      totalPages,
    };
  } catch (e) {
    console.error(e);
  }
}

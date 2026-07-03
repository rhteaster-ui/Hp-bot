import * as cheerio from "cheerio";
import request from "./request.js";

export default async function detail(url) {
    const html = await request(url);
    const $ = cheerio.load(html);

    const specs = {};

    $("table.box-info tr.box-baris").each((_, el) => {
        const key = $(el).find("td.kolom-satu").text().trim();
        const value = $(el).find("td.kolom-dua").text().trim();

        if (key && value) {
            specs[key] = value;
        }
    });

    return {
        status: true,

        title: $("h1").first().text().trim(),

        image:
            $('meta[property="og:image"]').attr("content") ||
            $("img.ct-image").first().attr("src") ||
            null,

        description:
            $('meta[name="description"]').attr("content") ||
            "",

        specs
    };
}

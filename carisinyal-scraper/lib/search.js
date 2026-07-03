import * as cheerio from "cheerio";
import request from "./request.js";

export default async function search(keyword) {

    const html = await request(
        `https://carisinyal.com/?s=${encodeURIComponent(keyword)}`
    );

    const $ = cheerio.load(html);

    const result = [];

    $(".oxy-post").each((_, el) => {

        const title = $(el).find(".oxy-post-title").text().trim();

        if (!title) return;

        const style =
            $(el)
                .find(".oxy-post-image-fixed-ratio-hp,.oxy-post-image-fixed-ratio")
                .attr("style") || "";

        const match = style.match(/url\((.*?)\)/);

        result.push({
            title,
            type: $(el).find(".oxy-post-meta").text().trim(),
            url: $(el).find(".oxy-post-title").attr("href"),
            image: match ? match[1] : null
        });

    });

    return result;

}

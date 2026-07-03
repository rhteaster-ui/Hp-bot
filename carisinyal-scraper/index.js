import search from "./search.js";
import detail from "./detail.js";

function normalize(text = "") {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

export default async function spec(query) {
    if (!query) {
        return {
            status: false,
            message: "Query tidak boleh kosong."
        };
    }

    const results = await search(query);

    if (!results || results.length === 0) {
        return {
            status: false,
            message: "HP tidak ditemukan."
        };
    }

    const target = normalize(query);

    const best =
        results.find(x => normalize(x.title) === target) ||
        results.find(x => normalize(x.title).includes(target)) ||
        results.find(x => target.includes(normalize(x.title))) ||
        results[0];

    return await detail(best.url);
}

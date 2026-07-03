import search from "./search.js";
import detail from "./detail.js";

function normalize(text = "") {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
}

function score(title, query) {
    const t = normalize(title);
    const q = normalize(query);

    let s = 0;

    if (t === q) s += 100;

    if (t.includes(q)) s += 80;

    if (q.includes(t)) s += 60;

    const words = q.match(/[a-z]+|\d+/g) || [];

    for (const w of words) {
        if (t.includes(w)) s += 10;
    }

    return s;
}

export default async function spec(query) {

    if (!query) {
        return {
            status: false,
            message: "Query tidak boleh kosong."
        };
    }

    const attempts = [
        query,
        query.replace(/oppo|xiaomi|realme|samsung|vivo|iphone|apple|redmi|poco/gi, "").trim(),
        query.replace(/\s+/g, ""),
        query.replace(/(\d+)/g, " $1 ")
    ].filter((v, i, a) => v && a.indexOf(v) === i);

    let best = null;
    let bestScore = -1;

    for (const q of attempts) {

        const results = await search(q);

        if (!results?.length) continue;

        const phones = results.filter(r =>
            (r.type || "").toLowerCase().includes("ponsel")
        );

        for (const phone of phones) {

            const s = score(phone.title, query);

            if (s > bestScore) {
                bestScore = s;
                best = phone;
            }

        }

        if (bestScore >= 80) break;
    }

    if (!best) {
        return {
            status: false,
            message: "Ponsel tidak ditemukan."
        };
    }

    return await detail(best.url);

}

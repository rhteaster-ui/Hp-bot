import Carisinyal from "./index.js";

const hp = new Carisinyal();

const query = process.argv.slice(2).join(" ");

if (!query) {
    console.log(`
Usage:
node req.js "xiaomi 17t"

Contoh:
node req.js "oppo reno 14"
`);
    process.exit(0);
}

try {
    const data = await hp.spec(query);

    console.log(JSON.stringify(data, null, 2));
} catch (e) {
    console.error({
        status: false,
        message: e.message
    });
}

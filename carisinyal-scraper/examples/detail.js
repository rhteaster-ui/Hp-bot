import Carisinyal from "../index.js";

const hp = new Carisinyal();

const result = await hp.search("Xiaomi 17T");

console.log(await hp.detail(result[0].url));

import Carisinyal from "../index.js";

const hp = new Carisinyal();

const data = await hp.spec("xiaomi 17t");

console.log(JSON.stringify(data, null, 2));

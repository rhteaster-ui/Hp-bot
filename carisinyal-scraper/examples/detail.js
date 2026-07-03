import hp from "../index.js";
const r=await hp.search("Xiaomi 17T");
console.log(await hp.detail(r[0].url));
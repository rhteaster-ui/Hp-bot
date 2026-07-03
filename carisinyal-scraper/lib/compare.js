import search from "./search.js";
export default async function compare(a,b){return {first:(await search(a))[0],second:(await search(b))[0]};}
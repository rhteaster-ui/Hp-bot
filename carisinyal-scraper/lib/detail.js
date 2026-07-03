import * as cheerio from "cheerio";
import request from "./request.js";
export default async function detail(url){const html=await request(url);const $=cheerio.load(html);return {title:$("h1").first().text().trim(),image:$(".wp-post-image").attr("src"),description:$("meta[name=\"description\"]").attr("content")};}

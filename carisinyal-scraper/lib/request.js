import axios from "axios";
export default async function request(url){const {data}=await axios.get(url,{headers:{"User-Agent":"Mozilla/5.0"}});return data;}
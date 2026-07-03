import search from "./lib/search.js";
import detail from "./lib/detail.js";
import compare from "./lib/compare.js";
import spec from "./lib/spec.js";

export default class Carisinyal {

    search(query){
        return search(query);
    }

    detail(url){
        return detail(url);
    }

    compare(a,b){
        return compare(a,b);
    }

    spec(query){
        return spec(query);
    }

}

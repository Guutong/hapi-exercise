import { CartsCollection } from "./collections/carts.collection";

export default class Plugin { 
    name: string = "datasource"
    version: string = "1.0.0"

    async register(server, options) { 
        new CartsCollection(server, options).register();
    }
}

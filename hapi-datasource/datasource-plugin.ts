import { CartsCollection } from "./collections/carts.collection";
import { ShippingCollection } from "./collections/shipping.collection";

export default class Plugin { 
    name: string = "datasource"
    version: string = "1.0.0"

    async register(server, options) { 
        new CartsCollection(server, options).register();
        new ShippingCollection(server, options).register();
    }
}

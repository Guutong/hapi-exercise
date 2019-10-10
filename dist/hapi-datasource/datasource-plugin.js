"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const carts_collection_1 = require("./collections/carts.collection");
const shipping_collection_1 = require("./collections/shipping.collection");
const product_collection_1 = require("./collections/product.collection");
class Plugin {
    constructor() {
        this.name = "datasource";
        this.version = "1.0.0";
    }
    register(server, options) {
        return __awaiter(this, void 0, void 0, function* () {
            new carts_collection_1.CartsCollection(server, options).register();
            new shipping_collection_1.ShippingCollection(server, options).register();
            new product_collection_1.ProductsCollection(server, options).register();
        });
    }
}
exports.default = Plugin;
//# sourceMappingURL=datasource-plugin.js.map
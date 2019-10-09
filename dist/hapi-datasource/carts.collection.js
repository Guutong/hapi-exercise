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
const mongodb = require("mongodb");
class Plugin {
    constructor() {
        this.name = "datasource";
        this.version = "1.0.0";
    }
    register(server, options) {
        return __awaiter(this, void 0, void 0, function* () {
            new CartsCollection().register(server, options);
        });
    }
}
exports.default = Plugin;
class CartsCollection {
    register(server, options) {
        const db = server.mongo.db;
        server.method({
            name: 'datasource.carts.get',
            method: (id) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = {};
                    if (id) {
                        query["_id"] = mongodb.ObjectId(id);
                    }
                    const result = yield db.collection('carts').find(query).toArray();
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
    }
}
exports.CartsCollection = CartsCollection;
//# sourceMappingURL=carts.collection.js.map
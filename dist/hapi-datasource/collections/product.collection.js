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
class ProductsCollection {
    constructor(server, options) {
        this.server = server;
        this.options = options;
    }
    register() {
        const db = this.server.mongo.db;
        this.server.method({
            name: 'datasource.products.get',
            method: (id) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = {};
                    if (id) {
                        query["_id"] = mongodb.ObjectId(id);
                    }
                    const result = yield db.collection('products').find(query).toArray();
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.products.insert',
            method: (payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield db.collection('products').insertOne(payload);
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.products.update',
            method: (id, payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = yield db.collection('products').updateOne(query, { $set: payload });
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.products.delete',
            method: (id, payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = yield db.collection('products').deleteOne(query);
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.products.deleteAll',
            method: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield db.collection('products').deleteMany();
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
    }
}
exports.ProductsCollection = ProductsCollection;
//# sourceMappingURL=product.collection.js.map
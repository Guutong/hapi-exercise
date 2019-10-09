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
class CartsCollection {
    constructor(server, options) {
        this.server = server;
        this.options = options;
    }
    register() {
        const db = this.server.mongo.db;
        this.server.method({
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
        this.server.method({
            name: 'datasource.carts.insert',
            method: (payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield db.collection('carts').insertOne(payload);
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.carts.update',
            method: (id, payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = yield db.collection('carts').updateOne(query, { $set: payload });
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.carts.delete',
            method: (id, payload) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = yield db.collection('carts').deleteOne(query);
                    return result;
                }
                catch (error) {
                    throw new Error(error);
                }
            })
        });
        this.server.method({
            name: 'datasource.carts.deleteAll',
            method: () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const result = yield db.collection('carts').remove();
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
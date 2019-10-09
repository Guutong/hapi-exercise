import * as mongodb from "mongodb";

export class CartsCollection {
    server: any;
    options: any;

    constructor(server, options) { 
        this.server = server;
        this.options = options;
    }

    register() { 
        const db = this.server.mongo.db;
        this.server.method({
            name: 'datasource.carts.get',
            method: async (id) => { 
                try {
                    const query = {};
                    if (id) {
                        query["_id"] = mongodb.ObjectId(id);
                    } 
                    const result = await db.collection('carts').find(query).toArray();
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.carts.insert',
            method: async (payload) => { 
                try {
                    const result = await db.collection('carts').insertOne(payload);
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.carts.update',
            method: async (id, payload) => { 
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = await db.collection('carts').updateOne(query, { $set: payload });
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.carts.delete',
            method: async (id, payload) => { 
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = await db.collection('carts').deleteOne(query);
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });
    }
}
import * as mongodb from "mongodb";

export class ShippingCollection {
    server: any;
    options: any;

    constructor(server, options) { 
        this.server = server;
        this.options = options;
    }

    register() { 
        const db = this.server.mongo.db;
        this.server.method({
            name: 'datasource.shipping.get',
            method: async (id) => { 
                try {
                    const query = {};
                    if (id) {
                        query["_id"] = mongodb.ObjectId(id);
                    } 
                    const result = await db.collection('shipping').find(query).toArray();
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.shipping.insert',
            method: async (payload) => { 
                try {
                    const result = await db.collection('shipping').insertOne(payload);
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.shipping.update',
            method: async (id, payload) => { 
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = await db.collection('shipping').updateOne(query, { $set: payload });
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.shipping.delete',
            method: async (id, payload) => { 
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = await db.collection('shipping').deleteOne(query);
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });
    }
}
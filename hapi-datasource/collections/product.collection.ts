import * as mongodb from "mongodb";

export class ProductsCollection {
    server: any;
    options: any;

    constructor(server, options) { 
        this.server = server;
        this.options = options;
    }

    register() { 
        const db = this.server.mongo.db;
        this.server.method({
            name: 'datasource.products.get',
            method: async (id) => { 
                try {
                    const query = {};
                    if (id) {
                        query["_id"] = mongodb.ObjectId(id);
                    } 
                    const result = await db.collection('products').find(query).toArray();
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.products.insert',
            method: async (payload) => { 
                try {
                    const result = await db.collection('products').insertOne(payload);
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.products.update',
            method: async (id, payload) => { 
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = await db.collection('products').updateOne(query, { $set: payload });
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.products.delete',
            method: async (id, payload) => { 
                try {
                    const query = {
                        "_id": mongodb.ObjectId(id)
                    };
                    const result = await db.collection('products').deleteOne(query);
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });

        this.server.method({
            name: 'datasource.products.deleteAll',
            method: async () => { 
                try {
                    const result = await db.collection('products').deleteMany();
                    return result;
                } catch (error) {
                    throw new Error(error);
                }
            }
        });
    }
}
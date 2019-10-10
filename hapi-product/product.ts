import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import * as Joi from "@hapi/joi";

export default class Plugin { 
    name: string = 'productsPlugin';
    version: string = '1.0.0';
    products = [];

    async register(server) { 
        server.route({
            method: 'GET',
            path: '/products',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = request.query.id
                try {
                    const result = await server.methods.datasource.products.get(id)
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            },
            options: {
                tags: ['api'],
                validate: {
                    query: Joi.object({
                        id: Joi.string()
                    })
                }
            }
        });
    
        server.route({
            method: 'POST',
            path:'/products',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const payload = request.payload
                try {
                    const result = await server.methods.datasource.products.insert(payload);
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            },
            options: {
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        name: Joi.string().min(1).required(),
                        price: Joi.number().integer().min(0).required(),
                        description: Joi.string().allow("")
                    })
                }
            }
        });
    
        server.route({
            method: 'PATCH',
            path:'/products/{id}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = request.params.id
                const payload = request.payload
                try {
                    const result = await server.methods.datasource.products.update(id, payload);
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            },
            options: {
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                    }),
                    payload: Joi.object({
                        name: Joi.string().min(1).required(),
                        price: Joi.number().integer().min(0).required(),
                        description: Joi.string()
                    })
                }
            }
        });
    
        server.route({
            method: 'DELETE',
            path:'/products/{id}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = request.params.id
                try {
                    const result = await server.methods.datasource.products.delete(id);
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            },
            options: {
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string()
                    })
                }
            }
        });

        server.route({
            method: 'DELETE',
            path: '/products',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                try {
                    const result = await server.methods.datasource.products.deleteAll();
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            },
            options: {
                tags: ['api']
            }
        });
    } 
}
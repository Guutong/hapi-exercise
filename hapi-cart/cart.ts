import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";

export default class Plugin { 
    name: string = 'cartsPlugin';
    version: string = '1.0.0';
    carts = [];

    async register(server) { 
        server.route({
            method: 'GET',
            path:'/carts',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = request.query.id
                try {
                    const result = await server.methods.datasource.carts.get(id)
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            }
        });
    
        server.route({
            method: 'POST',
            path:'/carts',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const payload = request.payload
                try {
                    const result = await server.methods.datasource.carts.insert(payload);
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            }
        });
    
        server.route({
            method: 'PATCH',
            path:'/carts/{id}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = request.params.id
                const payload = request.payload
                try {
                    const result = await server.methods.datasource.carts.update(id, payload);
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            }
        });
    
        server.route({
            method: 'DELETE',
            path:'/carts/{id}',
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = request.params.id
                try {
                    const result = await server.methods.datasource.carts.delete(id);
                    return result;
                } catch (error) {
                    Boom.internal("Internal server error: ", error);
                }
            }
        });
    } 
}
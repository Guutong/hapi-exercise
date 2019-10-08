import * as Hapi from "@hapi/hapi";

export default class Plugin { 
    name: string = 'cartsPlugin';
    version: string = '1.0.0';
    carts = [];

    async register(server) { 
        server.route({
            method: 'GET',
            path:'/carts',
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = Number(request.query.id)
                if (id) {
                    const productIds = this.carts.map(product => product.id)
                    return this.carts[productIds.indexOf(id)] || null;
                } else { 
                    return this.carts;
                }
            }
        });
    
        server.route({
            method: 'POST',
            path:'/carts',
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const payload = request.payload
                this.carts.push(payload);
                return this.carts;
            }
        });
    
        server.route({
            method: 'PATCH',
            path:'/carts/{id}',
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = Number(request.params.id)
                const payload = request.payload
                if (id) { 
                    const productIds: number[] = this.carts.map(product => product.id)                
                    if (productIds.indexOf(id) !== -1) {
                        const temp = this.carts[productIds.indexOf(id)];                    
                        temp['price'] = payload.price;
                        this.carts[productIds.indexOf(id)] = temp;
                    }
                }
                return this.carts;
            }
        });
    
        server.route({
            method: 'DELETE',
            path:'/carts/{id}',
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const id = Number(request.params.id)
                this.carts = this.carts.filter(product => product.id !== id)
                return this.carts;
            }
        });
    } 
}
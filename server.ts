import * as Hapi from "@hapi/hapi";

const init = async () => {
    const server: Hapi.Server = new Hapi.Server({
        port: process.env.PORT || 3001,
        host: '0.0.0.0',
    });
      
    server.route({
        method: 'GET',
        path:'/',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return 'Hello World!';
        }
    });

    let carts = [];
    server.route({
        method: 'GET',
        path:'/carts',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = Number(request.query.id)
            if (id) {
                const productIds = carts.map(product => product.id)
                return carts[productIds.indexOf(id)] || null;
            } else { 
                return carts;
            }
        }
    });

    server.route({
        method: 'POST',
        path:'/carts',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const payload = request.payload
            carts.push(payload);
            return carts;
        }
    });

    server.route({
        method: 'PATCH',
        path:'/carts/{id}',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = Number(request.params.id)
            const payload = request.payload
            if (id) { 
                const productIds: number[] = carts.map(product => product.id)                
                if (productIds.indexOf(id) !== -1) {
                    const temp = carts[productIds.indexOf(id)];                    
                    temp['price'] = payload.price;
                    carts[productIds.indexOf(id)] = temp;
                }
            }
            return carts;
        }
    });

    server.route({
        method: 'DELETE',
        path:'/carts/{id}',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const id = Number(request.params.id)
            carts = carts.filter(product => product.id !== id)
            return carts;
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err: any) => {
    console.log(err);
    process.exit(1);
});

init();
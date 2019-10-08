import * as Hapi from "@hapi/hapi";

const init = async () => {
    const server: Hapi.Server = new Hapi.Server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
    });
      
    server.route({
        method: 'GET',
        path:'/',
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return 'Hello World!';
        }
    });

    await server.register([
        require('./hapi-cart')
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err: any) => {
    console.log(err);
    process.exit(1);
});

init();
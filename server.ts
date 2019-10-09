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

    const mongoConnection = {
        url: 'mongodb://mc:mc@localhost:27018/exampledb',
        settings: {
            poolSize: 10
        },
        decorate: true
    };

    await server.register([
        require('@hapi/inert'),
        require('@hapi/vision'),
        {
            plugin: require('hapi-swagger'),
            options: {
                info: {
                    title: 'API Documentation',
                    version: '1.0.0',
                },
            }
        },
        {
            plugin: require('hapi-mongodb'),
            options: mongoConnection
        },
        require('./hapi-datasource'),
        require('./hapi-cart'),
    ]);


    // server.start(() => {
    //     promiseA((a) => { 
    //         promiseB(a, (b) => { 
    //             promiseC(b, () => { 
    //                 if () {

    //                 } else { 

    //                 }
    //             });
    //         });
    //     });
    //     console.log('Server running on %s', server.info.uri);
    // });

    // server.start().then(() => { 
    //     console.log('Server running on %s', server.info.uri);
    // });

    await server.start()
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err: any) => {
    console.log(err);
    process.exit(1);
});

init();
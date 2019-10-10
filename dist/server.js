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
const Hapi = require("@hapi/hapi");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new Hapi.Server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0',
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
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
    yield server.register([
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
        require('./hapi-product'),
    ]);
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=server.js.map
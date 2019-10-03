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
        port: 3001,
        host: '0.0.0.0',
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });
    let carts = [];
    server.route({
        method: 'GET',
        path: '/carts',
        handler: (request, h) => {
            const id = Number(request.query.id);
            if (id) {
                const productIds = carts.map(product => product.id);
                return carts[productIds.indexOf(id)] || null;
            }
            else {
                return carts;
            }
        }
    });
    server.route({
        method: 'POST',
        path: '/carts',
        handler: (request, h) => {
            const payload = request.payload;
            carts.push(payload);
            return carts;
        }
    });
    server.route({
        method: 'PATCH',
        path: '/carts/{id}',
        handler: (request, h) => {
            const id = Number(request.params.id);
            const payload = request.payload;
            if (id) {
                const productIds = carts.map(product => product.id);
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
        path: '/carts/{id}',
        handler: (request, h) => {
            const id = Number(request.params.id);
            carts = carts.filter(product => product.id !== id);
            return carts;
        }
    });
    yield server.start();
    console.log('Server running on %s', server.info.uri);
});
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
//# sourceMappingURL=server.js.map
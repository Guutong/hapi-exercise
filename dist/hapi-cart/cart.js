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
class Plugin {
    constructor() {
        this.name = 'cartsPlugin';
        this.version = '1.0.0';
        this.carts = [];
    }
    register(server) {
        return __awaiter(this, void 0, void 0, function* () {
            server.route({
                method: 'GET',
                path: '/carts',
                handler: (request, h) => {
                    const id = Number(request.query.id);
                    if (id) {
                        const productIds = this.carts.map(product => product.id);
                        return this.carts[productIds.indexOf(id)] || null;
                    }
                    else {
                        return this.carts;
                    }
                }
            });
            server.route({
                method: 'POST',
                path: '/carts',
                handler: (request, h) => {
                    const payload = request.payload;
                    this.carts.push(payload);
                    return this.carts;
                }
            });
            server.route({
                method: 'PATCH',
                path: '/carts/{id}',
                handler: (request, h) => {
                    const id = Number(request.params.id);
                    const payload = request.payload;
                    if (id) {
                        const productIds = this.carts.map(product => product.id);
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
                path: '/carts/{id}',
                handler: (request, h) => {
                    const id = Number(request.params.id);
                    this.carts = this.carts.filter(product => product.id !== id);
                    return this.carts;
                }
            });
        });
    }
}
exports.default = Plugin;
//# sourceMappingURL=cart.js.map
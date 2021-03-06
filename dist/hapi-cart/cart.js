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
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
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
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    const id = request.query.id;
                    try {
                        const result = yield server.methods.datasource.carts.get(id);
                        return result;
                    }
                    catch (error) {
                        Boom.internal("Internal server error: ", error);
                    }
                }),
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
                path: '/carts',
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    const payload = request.payload;
                    try {
                        const result = yield server.methods.datasource.carts.insert(payload);
                        return result;
                    }
                    catch (error) {
                        Boom.internal("Internal server error: ", error);
                    }
                }),
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
                path: '/carts/{id}',
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    const id = request.params.id;
                    const payload = request.payload;
                    try {
                        const result = yield server.methods.datasource.carts.update(id, payload);
                        return result;
                    }
                    catch (error) {
                        Boom.internal("Internal server error: ", error);
                    }
                }),
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
                path: '/carts/{id}',
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    const id = request.params.id;
                    try {
                        const result = yield server.methods.datasource.carts.delete(id);
                        return result;
                    }
                    catch (error) {
                        Boom.internal("Internal server error: ", error);
                    }
                }),
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
                path: '/carts',
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const result = yield server.methods.datasource.carts.deleteAll();
                        return result;
                    }
                    catch (error) {
                        Boom.internal("Internal server error: ", error);
                    }
                }),
                options: {
                    tags: ['api']
                }
            });
        });
    }
}
exports.default = Plugin;
//# sourceMappingURL=cart.js.map
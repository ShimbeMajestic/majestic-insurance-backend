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
exports.createApolloServer = void 0;
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("../graphql/resolvers/user.resolver");
const policy_resolver_1 = require("../graphql/resolvers/policy.resolver");
const claim_resolver_1 = require("../graphql/resolvers/claim.resolver");
const authChecker_1 = require("../middleware/authChecker");
const createApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const schema = yield (0, type_graphql_1.buildSchema)({
        resolvers: [user_resolver_1.UserResolver, policy_resolver_1.PolicyResolver, claim_resolver_1.ClaimResolver],
        authChecker: authChecker_1.authChecker,
        validate: false,
    });
    const server = new server_1.ApolloServer({
        schema,
    });
    yield server.start();
    return server;
});
exports.createApolloServer = createApolloServer;

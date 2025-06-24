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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("./graphql/resolvers/user.resolver");
const policy_resolver_1 = require("./graphql/resolvers/policy.resolver");
const claim_resolver_1 = require("./graphql/resolvers/claim.resolver");
const authChecker_1 = require("./middleware/authChecker");
dotenv_1.default.config();
const app = (0, express_1.default)();
// PostgreSQL connection
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "majestic_insurance",
    synchronize: true,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    subscribers: [],
    migrations: [],
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [user_resolver_1.UserResolver, policy_resolver_1.PolicyResolver, claim_resolver_1.ClaimResolver],
            authChecker: authChecker_1.authChecker,
            validate: false,
        });
        const server = new server_1.ApolloServer({
            schema,
        });
        yield server.start();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
            context: (_a) => __awaiter(this, [_a], void 0, function* ({ req }) {
                return { req };
            }),
        }));
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/graphql`);
        });
    });
}
startServer().catch(console.error);

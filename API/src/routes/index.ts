import { FastifyInstance } from "fastify";
import { userRoute } from "./user.route";

export async function Routes(app: FastifyInstance) {
    app.register(userRoute, {prefix: '/user'})
}
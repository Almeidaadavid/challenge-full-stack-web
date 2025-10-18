import { FastifyInstance } from "fastify";
import { userRoute } from "./user.route";
import { studentRoute } from "./student.route";

export async function Routes(app: FastifyInstance) {
    app.register(userRoute, {prefix: '/user'});
    app.register(studentRoute, {prefix: '/student'});
}
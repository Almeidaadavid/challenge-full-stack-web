import { FastifyInstance } from "fastify";
import { userRoute } from "../../user/routes/user.route";
import { studentRoute } from "../../student/routes/student.route";

export async function Routes(app: FastifyInstance) {
    await app.register(userRoute, {prefix: '/user'});
    await app.register(studentRoute, {prefix: '/student'});
}
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";
import { UserController } from "../controllers/userController";


export async function userRoute(app: FastifyInstance) {
    const db = app.db
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.post('/', userController.create);
}
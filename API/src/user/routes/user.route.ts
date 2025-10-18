import { FastifyInstance } from "fastify";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";


export async function userRoute(app: FastifyInstance) {
    const db = app.db
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.post('/', userController.create);
}
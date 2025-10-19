import { FastifyInstance } from "fastify";
import { UserRepository } from "../../user/repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

export async function authRoute(app: FastifyInstance) {
    const db = app.db;
    const userRepository = new UserRepository(db);
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    app.post('/', authController.login);
}
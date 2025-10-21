import { FastifyInstance } from "fastify";
import { UserRepository } from "../../user/repositories/user.repository";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/auth.controller";

export async function authRoute(app: FastifyInstance) {
    const db = app.db;
    const userRepository = new UserRepository(db);
    const authService = new AuthService(userRepository);
    const authController = new AuthController(authService);

    app.post('/', {
        schema: {
            description: 'User login',
            tags: ['Auth'],
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email'},
                    password: { type: 'string' }
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        user: { 
                            type: 'object', 
                            properties: {
                                id: { type: 'string' },
                                email: { type: 'string', format: 'email' },
                                name: { type: 'string' }
                            }
                        }
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string'
                        }
                    }
                }
            }
        }
    }, authController.login);
}
import { FastifyInstance } from "fastify";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";


export async function userRoute(app: FastifyInstance) {
    const db = app.db
    const userRepository = new UserRepository(db);
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    app.post('/', {
        schema: {
            description: 'Create a new user',
            tags: ['User'],
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string'},
                    email: { type: 'string', format: 'email'},
                    password: { type: 'string' }
                },
            },
            response: {
                201: {
                    type: 'null',
                },
                500: { 
                    type: 'object', 
                    properties: { 
                        message: { 
                            type: 'string' 
                        } 
                    } 
                },
            }
        }
    }, userController.create);
}
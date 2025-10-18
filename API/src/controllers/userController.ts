import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService";
import { CreateUserDTO } from "../interfaces/user.interface";
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    create = async(request: FastifyRequest<{Body: CreateUserDTO}>, reply: FastifyReply) => {
        try{
            const {name, email, password} = request.body;
            const createdUser = await this.userService.create({name, email,password});
            return reply.code(201).send({createdUser})
        } catch (error: any) {
            throw Error(error);
        }
    }
}
import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/userService";
import { CreateUserDTO } from "../interfaces/user.interface";
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    create = async(request: FastifyRequest<{Body: CreateUserDTO}>, reply: FastifyReply) => {
        try{
            const {name, email, password} = request.body;
            await this.userService.create({name, email,password});
            return reply.send('')
        } catch (error: any) {
            throw Error(error);
        }
    }
}
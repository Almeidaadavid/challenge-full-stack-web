import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { CreateUserForm } from "../forms/user.form";
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    create = async(request: FastifyRequest<{Body: CreateUserForm}>, reply: FastifyReply) => {
        try{
            const {name, email, password} = request.body;
            const createdUser = await this.userService.create({name, email,password});
            return reply.code(201).send({createdUser})
        } catch (error: any) {
            throw Error(error);
        }
    }
}
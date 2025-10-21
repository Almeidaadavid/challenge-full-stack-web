import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service";
import { CreateUserForm } from "../forms/user.form";
import { ApiError } from "../../common/helpers/api-errors.helper";
export class UserController {
    
    constructor(private readonly userService: UserService) {}

    create = async(request: FastifyRequest<{Body: CreateUserForm}>, reply: FastifyReply) => {
        try{
            const {name, email, password} = request.body;
            await this.userService.create({name, email,password});
            return reply.code(201).send();
        } catch (error: any) {
            throw new ApiError(error.message || "Unexpected error while creating user.", 500);
        }
    }
}
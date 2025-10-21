import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth.service";
import { LoginUserForm } from "../../user/forms/user.form";
import { ApiError, UnauthorizedError } from "../helpers/api-errors.helper";

export class AuthController {
    constructor(private readonly authService: AuthService){}

    login = async (request: FastifyRequest<{ Body: LoginUserForm }>, reply: FastifyReply) => {
    try {
      const data = await this.authService.login(request.body);
      return reply.send(data);
    } catch (error: any) {
      if (error.statusCode !== 500) {
        throw new ApiError(error.message, error.statusCode);
      }
       throw new ApiError("Unexpected error during login.", 500);
    }
  };
}
import { LoginUserForm } from "../../user/forms/user.form";
import { UserRepository } from "../../user/repositories/user.repository";
import { BadRequestError, NotFoundError } from "../helpers/api-errors.helper";
import { PasswordHelper } from "../helpers/password.helper";
import { TokenHelper } from "../helpers/token.helper";
import { LoginPayload } from "../interfaces/auth.interface";
import { AuthValidator } from "../validators/auth.validator";

export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    login = async(login: LoginUserForm) : Promise<LoginPayload> => {
        AuthValidator.validateLogin(login);
        const user = await this.userRepository.getByEmail(login.email);
        if (!user) {
            throw new NotFoundError('User not found!');
        }
        const validPassword = PasswordHelper.compare(login.password, user.password);

        if (!validPassword) {
            throw new BadRequestError('Invalid email or password.');
        }

        const token = TokenHelper.generate(user.id);

        const {password: _, ...userLogin} = user;

        return {
            token: token,
            user: userLogin
        };
    }
}
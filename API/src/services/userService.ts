import { PasswordHelper } from "../helper/password.helper";
import { CreateUserForm } from "../forms/user.form";
import { UserRepository } from "../repositories/userRepository";
import { UserValidator } from "../validator/user.validator";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    create = async(userDTO: CreateUserForm) => {
        UserValidator.validateCreate(userDTO);
        const hashPassword = await PasswordHelper.hash(userDTO.password);
        return await this.userRepository.create({...userDTO, password: hashPassword});
    }
}
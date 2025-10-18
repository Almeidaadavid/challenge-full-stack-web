import { CreateUserForm } from "../forms/user.form";
import { PasswordHelper } from "../../common/helper/password.helper";
import { UserRepository } from "../repositories/user.repository";
import { UserValidator } from "../validators/user.validator";


export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    create = async(userDTO: CreateUserForm) => {
        UserValidator.validateCreate(userDTO);
        const hashPassword = await PasswordHelper.hash(userDTO.password);
        return await this.userRepository.create({...userDTO, password: hashPassword});
    }
}
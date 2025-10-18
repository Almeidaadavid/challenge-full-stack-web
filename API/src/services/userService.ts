import { PasswordHelper } from "../helper/password.helper";
import { CreateUserDTO } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/userRepository";
import { UserValidator } from "../validator/user.validator";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    create = async(userDTO: CreateUserDTO) => {
        UserValidator.validateCreate(userDTO);
        const hashPassword = await PasswordHelper.hash(userDTO.password);
        return await this.userRepository.create({...userDTO, password: hashPassword});
    }
}
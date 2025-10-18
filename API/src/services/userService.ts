import { CreateUserDTO } from "../interfaces/user.interface";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    create = async(userDTO: CreateUserDTO) => {
        return await this.userRepository.create(userDTO);
    }
}
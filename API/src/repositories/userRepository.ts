import { DataSource, Repository } from "typeorm";
import { User } from "../db/entities/User";

export class UserRepository {
    private readonly repository: Repository<User>

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
    }

    async create(UserData: Partial<User>) {
        const user = this.repository.create(UserData);
        return await this.repository.save(user);
    }

}
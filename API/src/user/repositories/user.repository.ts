import { DataSource, Repository } from "typeorm";
import { BaseRepository } from "../../common/repositories/BaseRepository";
import { User } from "../entities/user.entity";

export class UserRepository extends BaseRepository<User> {
    constructor(dataSource: DataSource) {
        super(dataSource, User)
    }

    getByEmail = async(email: string) => {
        return await this.repository.findOne({
            where: {
                email: email
            }
        });
    }

}
import { DataSource, Repository } from "typeorm";
import { User } from "../db/entities/User";
import { BaseRepository } from "./base/BaseRepository";

export class UserRepository extends BaseRepository<User> {
    constructor(dataSource: DataSource) {
        super(dataSource, User)
    }
}
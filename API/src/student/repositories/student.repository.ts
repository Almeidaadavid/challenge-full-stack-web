import { DataSource, Repository } from "typeorm";
import { Student } from "../entities/student.entity";
import { BaseRepository } from "../../common/repositories/BaseRepository";

export class StudentRepository extends BaseRepository<Student> {
    constructor(dataSource: DataSource) {
        super(dataSource, Student);
    }
}
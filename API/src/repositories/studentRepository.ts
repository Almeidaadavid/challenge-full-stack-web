import { DataSource, Repository } from "typeorm";
import { Student } from "../db/entities/Student";
import { BaseRepository } from "./base/BaseRepository";

export class StudentRepository extends BaseRepository<Student> {
    constructor(dataSource: DataSource) {
        super(dataSource, Student);
    }
}
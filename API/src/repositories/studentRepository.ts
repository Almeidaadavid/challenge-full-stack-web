import { DataSource, Repository } from "typeorm";
import { Student } from "../db/entities/Student";

export class StudentRepository {
    private readonly repository: Repository<Student>
    
    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(Student);
    }

    async create(studentData: Partial<Student>) {
        const student = this.repository.create(studentData);
        return await this.repository.save(student);
    }

}
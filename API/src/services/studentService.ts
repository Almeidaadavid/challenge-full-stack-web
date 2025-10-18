import { CreateStudentDTO } from "../interfaces/student.interface";
import { StudentRepository } from "../repositories/studentRepository";
import { StudentValidator } from "../student/student.validator";

export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) {}

    create = async(studentDTO: CreateStudentDTO) => {
        StudentValidator.validateCreate(studentDTO);
        return await this.studentRepository.create(studentDTO);
    }
}
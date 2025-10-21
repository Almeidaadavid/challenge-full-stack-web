import { PaginationForm } from "../../common/forms/pagination.form";
import { CreateStudentForm, UpdateStudentForm } from "../forms/student.form";
import { StudentRepository } from "../repositories/student.repository";
import { StudentValidator } from "../validators/student.validator";

export class StudentService {
    constructor(private readonly studentRepository: StudentRepository) {}

    create = async(studentDTO: CreateStudentForm) => {
        StudentValidator.validateCreate(studentDTO);
        return await this.studentRepository.create(studentDTO);
    }

    list = async(paginationForm: PaginationForm) => {
        const sortField = paginationForm.sortBy?.[0]?.key ?? '';
        const sortOrder = paginationForm.sortBy?.[0]?.order ?? 'asc';
        const form = {
            ...paginationForm,
            page: Number(paginationForm.page) || 1,
            limit: Number(paginationForm.limit) || 10,
            sortBy: [{ key: sortField, order: sortOrder }]
        };
        return await this.studentRepository.findAllStudent(form);
    }

    update = async(id: number, data: UpdateStudentForm) => {
        StudentValidator.validateUpdate(data);
        return await this.studentRepository.update(id, data);
    }

    delete = async(id: number) => {
        return await this.studentRepository.delete(id);
    }

    getById = async(id: number) => {
        return await this.studentRepository.findById(id);
    }
}
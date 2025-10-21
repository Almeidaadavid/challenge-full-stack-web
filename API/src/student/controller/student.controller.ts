import { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "../services/student.service";
import { CreateStudentForm, UpdateStudentForm } from "../forms/student.form";
import { PaginationForm } from "../../common/forms/pagination.form";
import { ApiError } from "../../common/helpers/api-errors.helper";

export interface RequestParams {
    id: string,
}
export class StudentController {
    
    constructor(private readonly studentService: StudentService) {}

      create = async (request: FastifyRequest<{ Body: CreateStudentForm }>, reply: FastifyReply) => {
        try {
            const { name, email, studentRegistration, document, cellphone, course } = request.body;
            const createdStudent = await this.studentService.create({name,email,studentRegistration,document,cellphone,course,});
            return reply.code(201).send(createdStudent);
        } catch (error: any) {
            throw new ApiError(error.message || "Unexpected error while creating student.", 500);
        }
    };

  getAll = async (request: FastifyRequest<{ Querystring: PaginationForm }>, reply: FastifyReply) => {
        try {
            const students = await this.studentService.list(request.query);
        return reply.send(students);
        } catch (error: any) {
            throw new ApiError(error.message || "Unexpected error while listing students.", 500);
        }
    };

  update = async (request: FastifyRequest<{ Params: { id: string }; Body: UpdateStudentForm }>,reply: FastifyReply) => {
        try {
            const { id } = request.params;
            await this.studentService.update(Number(id), request.body);
            return reply.code(204).send();
        } catch (error: any) {
            throw new ApiError(error.message || "Unexpected error while updating student.", 500);
        }
    };

  getById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            const data = await this.studentService.getById(Number(id));
            return reply.send(data);
        } catch (error: any) {
            throw new ApiError(error.message || "Unexpected error while fetching student.", 500);
        }
    };

  delete = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            await this.studentService.delete(Number(id));
            return reply.code(204).send();
        } catch (error: any) {
            throw new ApiError(error.message || "Unexpected error while deleting student.", 500);
        }
    };
}
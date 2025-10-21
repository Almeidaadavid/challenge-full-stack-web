import { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "../services/student.service";
import { CreateStudentForm, UpdateStudentForm } from "../forms/student.form";
import { PaginationForm } from "../../common/forms/pagination.form";

export interface RequestParams {
    id: string,
}
export class StudentController {
    
    constructor(private readonly studentService: StudentService) {}

    create = async(request: FastifyRequest<{Body: CreateStudentForm}>, reply: FastifyReply) => {
        try {
            
            const {name,email,studentRegistration,document, cellphone, course} = request.body;
            const createdStudent = await this.studentService.create({name,email,studentRegistration,document, cellphone, course})
            return reply.code(201).send();
        } catch (error: any) {
            throw Error(error);
        }
    }

    getAll = async(request: FastifyRequest<{Querystring: PaginationForm}>, reply: FastifyReply) => {
        try {
            const students = await this.studentService.list(request.query);  
            return reply.send(students);
        } catch (error: any) {
            throw Error(error);
        }
    }

    update = async(request: FastifyRequest<{Params: RequestParams, Body: UpdateStudentForm}>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            await this.studentService.update(Number(id), request.body);
            return reply.code(204).send();
        } catch (error: any) {
            throw Error(error);
        }
    }

    getById = async(request: FastifyRequest<{Params: RequestParams}>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            const data = await this.studentService.getById(Number(id));
            return reply.send(data);
        } catch (error: any) {
            throw Error(error);
        }
    }

    delete = async(request: FastifyRequest<{Params: RequestParams}>, reply: FastifyReply) => {
        try {
            const { id }= request.params;
            await this.studentService.delete(Number(id));
            return reply.code(204).send()
        } catch (error: any) {
            throw Error(error);
        }
    }    
}
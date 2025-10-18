import { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "../services/studentService";
import { CreateStudentForm, UpdateStudentForm } from "../forms/student.form";

interface RequestParams {
    id: number,
}
export class StudentController {
    
    constructor(private readonly studentService: StudentService) {}

    create = async(request: FastifyRequest<{Body: CreateStudentForm}>, reply: FastifyReply) => {
        try {
            const {name,email,Ra,document} = request.body;
            const createdStudent = await this.studentService.create({name, email,Ra,document})
            return reply.code(201).send();
        } catch (error: any) {
            throw Error(error);
        }
    }

    getAll = async(request: FastifyRequest, reply: FastifyReply) => {
        try {
            const students = await this.studentService.list();  
            return reply.send({students});
        } catch (error: any) {
            throw Error(error);
        }
    }

    delete = async(request: FastifyRequest<{Params: RequestParams}>, reply: FastifyReply) => {
        try {
            const { id }= request.params;
            const teste = await this.studentService.delete(id);
            return reply.code(204).send()
        } catch (error: any) {
            throw Error(error);
        }
    }

    update = async(request: FastifyRequest<{Params: RequestParams, Body: UpdateStudentForm}>, reply: FastifyReply) => {
        try {
            const { id } = request.params;
            await this.studentService.update(id, request.body);
            return reply.code(204).send();
        } catch (error: any) {
            throw Error(error);
        }
    }
}
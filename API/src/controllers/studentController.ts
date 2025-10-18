import { FastifyReply, FastifyRequest } from "fastify";
import { StudentService } from "../services/studentService";
import { CreateStudentDTO } from "../interfaces/student.interface";

export class StudentController {
    
    constructor(private readonly studentService: StudentService) {}

    create = async(request: FastifyRequest<{Body: CreateStudentDTO}>, reply: FastifyReply) => {
        try {
            const {name,email,Ra,document} = request.body;
            this.studentService.create({name, email,Ra,document})
        } catch (error: any) {
            throw Error(error);
        }
    }
}
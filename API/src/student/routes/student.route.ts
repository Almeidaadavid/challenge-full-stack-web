import { FastifyInstance } from "fastify";
import { StudentRepository } from "../repositories/student.repository";
import { StudentService } from "../services/student.service";
import { RequestParams, StudentController } from "../controller/student.controller";
import { AuthMiddleware } from "../../common/middlewares/auth.middleware";
import { CreateStudentForm, UpdateStudentForm } from "../forms/student.form";
import { PaginationForm } from "../../common/forms/pagination.form";


export async function studentRoute(app: FastifyInstance) {
    const db = app.db;
    const studentRepository = new StudentRepository(db);
    const studentService = new StudentService(studentRepository);
    const studentController = new StudentController(studentService);

    app.post<{Body: CreateStudentForm}> 
        ('/', {preHandler: [AuthMiddleware]} , studentController.create);

    app.get<{Querystring: PaginationForm}> 
        ('/', {preHandler: [AuthMiddleware]}, studentController.getAll);

    app.patch<{Params: RequestParams, Body: UpdateStudentForm}> 
        ('/:id', {preHandler: [AuthMiddleware]}, studentController.update);

    app.delete<{Params: RequestParams}> 
        ('/:id', {preHandler: [AuthMiddleware]}, studentController.delete);

    app.get<{Params: RequestParams}> 
        ('/:id', {preHandler: [AuthMiddleware]}, studentController.getById);
}
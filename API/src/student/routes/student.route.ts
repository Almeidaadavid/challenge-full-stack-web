import { FastifyInstance } from "fastify";
import { StudentRepository } from "../repositories/student.repository";
import { StudentService } from "../services/student.service";
import { StudentController } from "../controller/student.controller";


export async function studentRoute(app: FastifyInstance) {
    const db = app.db;
    const studentRepository = new StudentRepository(db);
    const studentService = new StudentService(studentRepository);
    const studentController = new StudentController(studentService);

    app.post('/', studentController.create);
    app.get('/', studentController.getAll);
    app.patch('/:id', studentController.update)
    app.delete('/:id', studentController.delete)
}
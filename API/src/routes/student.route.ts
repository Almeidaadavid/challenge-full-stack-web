import { FastifyInstance } from "fastify";
import { StudentRepository } from "../repositories/studentRepository";
import { StudentService } from "../services/studentService";
import { StudentController } from "../controllers/studentController";


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
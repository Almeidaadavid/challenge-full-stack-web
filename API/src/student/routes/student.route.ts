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
        ('/', {
            preHandler: [AuthMiddleware],
            schema: {
                description: 'Create a new student',
                security: [{ bearerAuth: [] }],
            tags: ['Student'],
            body: {
                    type: 'object',
                    required: ['name', 'email', 'studentRegistration', 'document'],
                    properties: {
                        name: { type: 'string'},
                        email: { type: 'string', format: 'email'},
                        studentRegistration: { type: 'string' },
                        document: { type: 'string' },
                        cellphone: { type: 'string' },
                        course: { type: 'string' },
                    },
                },
                response: {
                    201: {
                        type: 'null',
                    },
                    500: { 
                        type: 'object', 
                        properties: { 
                            message: { 
                                type: 'string' 
                            } 
                        } 
                    },
                }
            }
        } , studentController.create);

    app.get<{Querystring: PaginationForm}> 
        ('/', {
            preHandler: [AuthMiddleware],
            schema: {
                description: 'List all students with pagination',
                security: [{ bearerAuth: [] }],
                tags: ['Student'],
                querystring: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number' },
                                        name: { type: 'string' },
                                        email: { type: 'string' },
                                        studentRegistration: { type: 'string' },
                                        document: { type: 'string' },
                                        cellphone: { type: 'string' },
                                        course: { type: 'string' },
                                    }
                                }
                            },
                            page: { type: 'number' },
                            limit: { type: 'number' },
                            totalItems: { type: 'number' },
                            totalPages: { type: 'number' },
                        },
                    },
                    500: { 
                        type: 'object', 
                        properties: { 
                            message: { 
                                type: 'string' 
                            } 
                        } 
                    },
                }
            }
        }, studentController.getAll);

    app.patch<{Params: RequestParams, Body: UpdateStudentForm}> 
        ('/:id', {
            preHandler: [AuthMiddleware],
            schema: {
                description: 'Update a student by ID',
                security: [{ bearerAuth: [] }],
                tags: ['Student'],
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'string' },
                    }
                },
                body: {
                type: 'object',
                    properties: {
                        name: { type: 'string'},
                        email: { type: 'string', format: 'email'},
                        cellphone: { type: 'string' },
                        course: { type: 'string' },
                    }
                },
                response: {
                    204: {
                        type: 'null',
                    },
                    500: { 
                        type: 'object', 
                        properties: { 
                            message: { 
                                type: 'string' 
                            } 
                        } 
                    },
                }
            }
        }, studentController.update);

    app.delete<{Params: RequestParams}> 
        ('/:id', {
            preHandler: [AuthMiddleware],
            schema: {
                description: 'Delete a student by ID',
                security: [{ bearerAuth: [] }],
                tags: ['Student'],
                params: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                    }
                },
                response: {
                    204: {
                        type: 'null',
                    },
                    500: { 
                        type: 'object', 
                        properties: { 
                            message: { 
                                type: 'string' 
                            } 
                        } 
                    },
                }
            }
        }, studentController.delete);

    app.get<{Params: RequestParams}> 
        ('/:id', {
            preHandler: [AuthMiddleware],
            schema: {
                description: 'List all students with pagination',
                security: [{ bearerAuth: [] }],
                tags: ['Student'],
                params: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        id: { type: 'number' },
                    }
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            name: { type: 'string' },
                            email: { type: 'string' },
                            studentRegistration: { type: 'string' },
                            document: { type: 'string' },
                            cellphone: { type: 'string' },
                            course: { type: 'string' },
                        }
                    },
                    500: { 
                        type: 'object', 
                        properties: { 
                            message: { 
                                type: 'string' 
                            } 
                        } 
                    },
                }
            }
        }, studentController.getById);
}
import { FastifyInstance } from "fastify";
import { AppDataSource } from "./datasource";
import { ApiError } from "../helpers/api-errors.helper";

export async function InitializeDatabase(app: FastifyInstance) {
    try {
        await AppDataSource.initialize();
        app.decorate('db', AppDataSource);
        app.log.info('Database initialized successfully!')
    } catch(error: any) {
        app.log.error('Erro ao inicializar o banco de dados', error);
        throw new ApiError("Failed to initialize database connection.", 500);
    }
}
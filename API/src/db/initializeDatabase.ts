import { FastifyInstance } from "fastify";
import { AppDataSource } from "./data-source";

export async function InitializeDatabase(app: FastifyInstance) {
    try {
        await AppDataSource.initialize();
        app.decorate('db', AppDataSource);
        app.log.info('Banco de dados inicializado com sucesso!')
    } catch(error: any) {
        app.log.error('Erro ao inicializar o banco de dados', error);
        throw error;
    }
}
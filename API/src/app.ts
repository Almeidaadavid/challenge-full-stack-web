import fastify from "fastify";
import { InitializeDatabase } from "./db/initializeDatabase";
import { Routes } from "./routes";



export async function InitializeApplication() {
    const app = fastify({
        logger: {
            level: 'info',
            transport: {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "HH:MM:ss",
                }
            }
        }
    });
    await InitializeDatabase(app);
    app.register(Routes)
    const port = process.env.PORT || 3333;

    try {
        await app.listen({ port: Number(port) });
        app.log.info(`Servidor rodando na porta ${port}`);
    } catch (err:any) {
        app.log.error("Erro ao iniciar o servidor", err);
        process.exit(1);
    }

    return app;
}
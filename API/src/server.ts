import "reflect-metadata";
import { InitializeApplication } from "./app";

async function Initialize() {
    try {
        const app = await InitializeApplication();
        app.log.info("Aplicação inicializada com sucesso!");
    } catch(error) {
        console.error('Erro ao inicializar a aplicação:', error);
        process.exit(1);
    }
}


Initialize();
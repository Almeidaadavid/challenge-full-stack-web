import { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

export async function SwaggerConfig(app: FastifyInstance) {
    await app.register(swagger, {
        openapi: {
        openapi: "3.0.0",
        info: {
            title: "Graduation API",
            description: "API for managing students in a graduation system",
            version: "1.0.0",
        },
        components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT'
                    }
                }
            },
        }
    });

    await app.register(swaggerUI, {
        routePrefix: "/docs",
    });
}
import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ApiError } from "../helpers/api-errors.helper";

export async function ErrorMiddleware(app: FastifyInstance) {
  app.setErrorHandler((error: FastifyError | ApiError, request: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ApiError) {
      app.log.error(`[API ERROR] ${error.message}`);
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message,
      });
    }

    app.log.error(error);

    return reply.status(500).send({
      statusCode: 500,
      message: "Internal Server Error",
    });
  });
}
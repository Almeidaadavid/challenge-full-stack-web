import { FastifyReply, FastifyRequest } from "fastify";
import { TokenHelper } from "../helper/token.helper";

export async function AuthMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const {authorization} = request.headers;

    if (!authorization) {
        return reply.code(401).send({message: 'Token não enviado.'});
    }

    try{
        const token = authorization.split(' ')[1] as string;
        const { id } = TokenHelper.valid(token);
        request.userId = id;
    } catch {
        return reply.code(401).send({ message: 'Token inválido' });
    }
}
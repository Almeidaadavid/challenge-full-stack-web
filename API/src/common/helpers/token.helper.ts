import jwt, { JwtPayload } from 'jsonwebtoken';

export class TokenHelper {
    static generate(id: number) {
        return jwt.sign({id: id}, process.env.JWT_TOKEN ?? '', {
            expiresIn: '1d'
        });
    }

    static valid(token: string) : JwtPayload {
        return jwt.verify(token, process.env.JWT_TOKEN ?? '' ) as JwtPayload;
    }
}
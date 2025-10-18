import { hash }  from 'bcrypt';

export class PasswordHelper {
    static async hash(password: string) {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }
}
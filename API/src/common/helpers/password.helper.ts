import { hash, compare }  from 'bcrypt';

export class PasswordHelper {
    static async hash(password: string) {
        const saltRounds = 10;
        return await hash(password, saltRounds);
    }

    static async compare(formPassword: string, userPassword: string) {
        return await compare(formPassword, userPassword);
    }
};
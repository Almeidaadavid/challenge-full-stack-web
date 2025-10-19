import { LoginUserForm } from "../../user/forms/user.form";

export class AuthValidator {
    static validateLogin(data: LoginUserForm) {
        const requiredFields = ["email", "password"];
        
        const missingField = requiredFields.find((field) => {
            !data[field as keyof LoginUserForm]
        });

        if (missingField) {
            throw new Error(`O campo "${missingField}" é obrigatório.`);
        };

        if (!data.email.includes("@")) {
            throw new Error("Email inválido.");
        };

        return true;
    }
};
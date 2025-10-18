import { CreateUserForm } from "../forms/user.form";

export class UserValidator {
    static validateCreate(data: CreateUserForm) {
        const requiredFields = ["name", "email", "Ra", "document"];
        
        const missingField = requiredFields.find((field) => {
            !data[field as keyof CreateUserForm]
        })

        if (missingField) {
            throw new Error(`O campo "${missingField}" é obrigatório.`);
        }

        if (!data.email.includes("@")) {
            throw new Error("Email inválido.");
        }

        if (!data.password || data.password.length < 6  ) {
            throw new Error("A senha deve conter pelo menos 6 caracteres.");
        }

        return true;
    }
}
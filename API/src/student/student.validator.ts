import { CreateStudentDTO } from "../interfaces/student.interface";

export class StudentValidator {
    static validateCreate(data: CreateStudentDTO) {
        const requiredFields = ["name", "email", "Ra", "document"];

        const missingField = requiredFields.find((field) => {
            !data[field as keyof CreateStudentDTO]
        })

        if (missingField) {
            throw new Error(`O campo "${missingField}" é obrigatório.`);
        }

        if (!data.email.includes("@")) {
            throw new Error("Email inválido.");
        }

        if (data.Ra.length < 5) {
            throw new Error("RA deve ter pelo menos 5 caracteres.");
        }

        return true;
  }
}
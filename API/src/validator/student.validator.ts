import { CreateStudentForm } from "../forms/student.form";
import { UpdateStudentResponse } from "../responses/student.response";

export class StudentValidator {
    static validateCreate(data: CreateStudentForm) {
        const requiredFields = ["name", "email", "Ra", "document"];

        const missingField = requiredFields.find((field) => {
            !data[field as keyof CreateStudentForm]
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
    static validateUpdate(data: UpdateStudentResponse) {
        const requiredFields = ["name", "email"];

        const missingField = requiredFields.find((field) => {
            !data[field as keyof UpdateStudentResponse]
        })

        if (missingField) {
            throw new Error(`O campo "${missingField}" é obrigatório.`);
        }

        if (!data.email.includes("@")) {
            throw new Error("Email inválido.");
        }
    }
}
import { BadRequestError } from "../../common/helpers/api-errors.helper";
import { CreateStudentForm, UpdateStudentForm } from "../forms/student.form";

export class StudentValidator {
    static validateCreate(data: CreateStudentForm) {
        const requiredFields = ["name", "email", "studentRegistration", "document"];

        const missingField = requiredFields.find(
            (field) => !data[field as keyof CreateStudentForm]
        );

        if (missingField) {
            throw new BadRequestError(`The field "${missingField}" is required.`);
        }

        if (!data.email.includes("@")) {
            throw new BadRequestError("Invalid email format.");
        }

        if (data.studentRegistration.length < 5) {
            throw new BadRequestError("Student registration must have at least 5 characters.");
        }

        return true;
    }
    static validateUpdate(data: UpdateStudentForm) {
        const requiredFields = ["name", "email"];

        const missingField = requiredFields.find(
            (field) => !data[field as keyof UpdateStudentForm]
        );

        if (missingField) {
            throw new BadRequestError(`The field "${missingField}" is required.`);
        }

        if (!data.email.includes("@")) {
            throw new BadRequestError("Invalid email format.");
        }
    }
}
import { BadRequestError } from "../../common/helpers/api-errors.helper";
import { CreateUserForm } from "../forms/user.form";

export class UserValidator {
    static validateCreate(data: CreateUserForm) {
        const requiredFields = ["name", "email", "password"];

        const missingField = requiredFields.find(
            (field) => !data[field as keyof CreateUserForm]
        );

        if (missingField) {
            throw new BadRequestError(`The field "${missingField}" is required.`);
        }

        if (!data.email.includes("@")) {
            throw new BadRequestError("Invalid email format.");
        }
        
        if (!data.password || data.password.length < 6  ) {
            throw new BadRequestError("Password must be at least 6 characters long.");
        }

        return true;
    }
}
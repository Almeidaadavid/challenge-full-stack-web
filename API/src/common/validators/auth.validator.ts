import { LoginUserForm } from "../../user/forms/user.form";
import { BadRequestError } from "../helpers/api-errors.helper";

export class AuthValidator {
    static validateLogin(data: LoginUserForm) {
        const requiredFields = ["email", "password"];

        const missingField = requiredFields.find(
            (field) => !data[field as keyof LoginUserForm]
        );

        if (missingField) {
            throw new BadRequestError(`The field "${missingField}" is required.`);
        };

        if (!data.email.includes("@")) {
            throw new BadRequestError("Invalid email format.");
        };

        return true;
    }
};
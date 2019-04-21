import { validator, positiveInteger, ValidationSchema } from '../helpers/validator';

class UserValidation {

	public create = validator(
		new ValidationSchema({
			email: {
				in: "body",
				isEmail: {
					errorMessage: "Invalid Email Address"
				},
				notEmpty: true
			}
		})
	);

}

export const userValidation = new UserValidation();

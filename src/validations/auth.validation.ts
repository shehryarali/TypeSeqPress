import { validator, positiveInteger, ValidationSchema } from '../helpers/validator';

class AuthValidation {

	public login = validator({
		email: { in: "body", notEmpty: true, errorMessage: "Empty Email" },
		password: { in: "body", notEmpty: true, errorMessage: "Empty Password" }
  });
  
  public register = validator({
		username: { in: "body", notEmpty: true, errorMessage: "Empty Username" },
		password: { in: "body", notEmpty: true, errorMessage: "Empty Password" }
  });

	public changePassword = validator({
		current_password: { in: 'body', notEmpty: true, errorMessage: 'Current Password is a required Feild'},
		password: { in: 'body', notEmpty: true, errorMessage: 'Cannot Apply Empty Password'}
	})

	public activate = validator({
		email: { in: "params", notEmpty: false, errorMessage: "Empty Username" },
	});	

}

export const authValidation = new AuthValidation();

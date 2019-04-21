import { NextFunction, Request, Response } from "express";
import { ValidationSchema as _V } from "express-validator";

export function validator(schema: object) {
	return async (req: Request, res: Response, next: NextFunction) => {
		req.check(schema);

		const result = await req.getValidationResult();

		if (!result.isEmpty()) {
			return res
				.status(400)
				.json({
					error: true,
					validations: result.array(),
					message: "Validation Error Occurred",
					invalid_request: true,
					body: req.body,
					params: req.params
				});
		}

		return next();
	};
}

export function positiveInteger(value, { req }){
	return +value > 0;
}

export class ValidationSchema {
	constructor(Schema: _V){
		return Schema
	}
}
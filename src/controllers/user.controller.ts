import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, OK, INTERNAL_SERVER_ERROR, CREATED } from "http-status-codes";
import userModel from "../models/user.model";



class UserController {

	public async create(req: Request, res:Response, next: NextFunction) {

		userModel.create(req.body).then(
			user => {
				res.status(OK).json(user)
			}, 
			error => {
				res
				.status(INTERNAL_SERVER_ERROR)
				.json({
					error: true,
					message: error
				})				
			}
		);
	}

	public async fetch(req: Request, res:Response, next: NextFunction) {

		userModel.findAll().then(
			users => {
				res.status(OK).json(users)
			}, 
			error => {
				res
				.status(BAD_REQUEST)
				.json({
					error: true,
					message: error
				})				
			}
		)
	}
}

export const userController = new UserController();

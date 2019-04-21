import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, NOT_FOUND, OK, INTERNAL_SERVER_ERROR, CREATED, UNAUTHORIZED } from "http-status-codes";
import userModel from "../models/user.model";
import { generate } from "../helpers/authentication";
import User from "../models/user.model";
import { logger } from "../helpers";

class AuthController {


  public async activate(req: Request, res:Response, next: NextFunction) {
    const { email } = req.params;
    if (!email) {
      res
				.status(BAD_REQUEST)
				.json({
					error: true,
					message: 'Please provide email.'
				})
    }
    console.log({ email: email });
    userModel.update(
      { status: 1 },
      { returning: true, where: { email: email } }
    ).then(
      user => {
        console.log(user);
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
    )
    
    
  }

	public async register(req: Request, res:Response, next: NextFunction) {

		userModel.create(req.body).then(
			user => {
				res.status(CREATED).json(user)
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

	public async login(req: Request, res:Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!(email && password)) {
      res
				.status(BAD_REQUEST)
				.json({
					error: true,
					message: 'Please provide email and password.'
				})
    }  

    // to track the user
    let device_name = req.headers['x-device-id'];
    let fingerprint: any = {
      fingerprint: req['fingerprint'],
      device_name: device_name,
      body: req.body,
      params: req.params,
    }

		userModel.findOne(
      { where: { email } }
    ).then(
			(user: User | any) => {
        fingerprint.username = user.username;
        fingerprint.email = user.email;

        if (!user.status) {
          logger.error("Unverified User Access blocked",fingerprint)

          res.status(UNAUTHORIZED).send({
              error: true,
              message: 'User Not Verified',
              need_verification: true,
              is_verified: user.status,
              email: user.email
          })
        }

        // generating the token (email and username)
        const token = generate({
          email: user.email,
          username: user.username
        });
        
        // update the user data with the token
        user.update({
          authToken: token
        }).then();

        // update the user data with the token
        user.authToken = token;
        delete user.password;

        // sending back the user with token
        res.status(OK).json(user)
			}, 
			error => {
				res
				.status(NOT_FOUND)
				.json({
					error: true,
					message: 'User not found, please try again later'
				})				
			}
		)
	}
}

export const authController = new AuthController();

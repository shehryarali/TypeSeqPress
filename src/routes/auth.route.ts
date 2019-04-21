import { Router } from "express";
import { authController } from "../controllers";
import { authValidation } from "../validations";

const router = Router();

router
	.route("/login")
	/**
	 * @api {post} /auth/login Sign In Users
	 * @apiName Login
	 * @apiGroup Auth
	 *
	 * @apiParam {String} email Email or username
	 * @apiParam {String} password Unique Email Id
	 * 
	 * @apiSuccess {String} token JWT Token.
	 */
	.post(authValidation.login, authController.login);

router
	.route("/activate/:email")
	/**
	 * @api {post} /auth/activate Activate User Status
	 * @apiName Activate
	 * @apiGroup Auth
	 *
	 * @apiParam {String} email Email or username
	 * 
	 * @apiSuccess {String} user status.
	 */
	.get(authValidation.activate, authController.activate);	

router
	.route("/register")
	/**
	 * @api {post} /auth/register Register User
	 * @apiName Register
	 * @apiGroup Auth
	 * 
	 * @apiSuccess {Array} Users.
	 */
	.post(authValidation.register, authController.register);

export default router;

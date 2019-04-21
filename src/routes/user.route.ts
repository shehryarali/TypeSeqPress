import { Router } from "express";
import { userController } from "../controllers";
import { userValidation } from "../validations";

const router = Router();

router
	.route("/create")
	/**
	 * @api {post} /users/create Create New User
	 * @apiName Create
	 * @apiGroup User
	 *
	 * @apiParam {String} name Name of User
	 * @apiParam {String} email Unique Email Id
	 * @apiParam {String} phone_number Phone Number
	 * @apiParam {String} username Unique Username for user
	 * @apiParam {String} password Password For User
	 * @apiParam {Base64} profile_photo Profile Photo in base64
	 * 
	 * @apiSuccess {String} firstname Firstname of the User.
	 * @apiSuccess {String} lastname  Lastname of the User.
	 */
	.post(userValidation.create, userController.create);

router
	.route("/fetch")
	/**
	 * @api {get} /users/index Get All Users
	 * @apiName Index
	 * @apiGroup User
	 * 
	 * @apiSuccess {Array} Users.
	 */
	.get(userController.fetch);

export default router;

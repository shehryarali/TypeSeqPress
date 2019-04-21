import { Router } from "express";
import userRoute from "./user.route";
import authRoute from "./auth.route";
import { verify } from "../helpers/authentication";

const router = Router();

router.use(verify);
router.use("/auth", authRoute);
router.use("/user", userRoute);

export { router };

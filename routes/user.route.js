import { Router } from "express";
import { registerUser,loginUser,logoutUser, changePassword, changeUsername, changeEmail } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.midddleware.js";
const router=Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').delete(verifyJWT,logoutUser)
router.route("/changePassword").patch(verifyJWT,changePassword)
router.route("/changeUsername").patch(verifyJWT,changeUsername)
router.route("/changeEmail").patch(verifyJWT,changeEmail)

export default router
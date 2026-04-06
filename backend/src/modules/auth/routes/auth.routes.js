import {userRegister,userLogin,refreshToken,adminRegister} from "../controllers/auth.controller.js"
import express from "express"
const router = express.Router()

router.post("/user/register",userRegister)
router.post("/admin/register",adminRegister)
router.post("/user/login",userLogin)
router.post("/refresh-token",refreshToken)
export default router
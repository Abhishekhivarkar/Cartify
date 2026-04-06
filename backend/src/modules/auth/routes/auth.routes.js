import {userRegister,userLogin,refreshToken,adminRegister,adminLogin,userGetMe, adminGetMe} from "../controllers/auth.controller.js"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"
import express from "express"
const router = express.Router()

router.post("/user/register",userRegister)
router.post("/admin/register",adminRegister)
router.post("/user/login",userLogin)
router.post("/admin/login",adminLogin)
router.post("/refresh-token",refreshToken)
router.get("/user/get-me",authMiddleware,userGetMe)
router.get("/admin/get-me",authMiddleware,adminGetMe)

export default router
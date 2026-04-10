import express from "express"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"
import { roleMiddleware } from "../../../middlewares/role.middleware.js"
import { ROLE } from "../../../configs/role.config.js"
import { createProduct } from "../controllers/product.controller.js"


const router = express.Router()

router.post("/",authMiddleware,roleMiddleware(ROLE.ADMIN),createProduct)

export default router
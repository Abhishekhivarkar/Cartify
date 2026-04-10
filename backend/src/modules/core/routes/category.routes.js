import express from "express"
import { createCategory,getAllCategory, updateCategory , getCategoryById, deleteCategory} from "../controllers/category.controller.js"
import {authMiddleware} from "../../../middlewares/auth.middleware.js"
import { roleMiddleware } from "../../../middlewares/role.middleware.js"
import { ROLE } from "../../../configs/role.config.js"


const router = express.Router()

router.post("/",authMiddleware,roleMiddleware(ROLE.ADMIN),createCategory)
router.get("/all",authMiddleware,roleMiddleware(ROLE.ADMIN),getAllCategory)
router.put("/:categoryId",authMiddleware,roleMiddleware(ROLE.ADMIN),updateCategory)
router.get("/:categoryId",authMiddleware,roleMiddleware(ROLE.ADMIN),getCategoryById)
router.delete("/:categoryId",authMiddleware,roleMiddleware(ROLE.ADMIN),deleteCategory)
export default router
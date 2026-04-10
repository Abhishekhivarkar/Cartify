import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./modules/auth/routes/auth.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import categoryRoutes from "./modules/core/routes/category.routes.js"
import productRoutes from "./modules/core/routes/product.routes.js"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin:"http//localhost:5173",
 credentials:true
}))

app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)
app.use("/health",(_,res)=>{
 return res.status(200).json({
  success:true,
  status:"OK"
 })
})

app.use(errorMiddleware)
export default app
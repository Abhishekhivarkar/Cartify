import app from "./app.js"
import {connectDB} from "./configs/database.config.js"
import {config} from "./configs/env.config.js"



const PORT:number = Number(config.PORT) || 5000
const startServer = async ():Promise<void> =>{
 try{
  await connectDB()
  
  app.listen(PORT,()=>{
   console.log("server is running on port",PORT)
  })
 }catch(err){
  console.log("START SERVER ERROR : ",err)
 }
}

startServer()
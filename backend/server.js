import app from "./src/app.js"
import {connectDB} from "./src/configs/database.config.js"
import {config} from "./src/configs/env.config.js"



const PORT = config.PORT || 5000
const startServer = async () =>{
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
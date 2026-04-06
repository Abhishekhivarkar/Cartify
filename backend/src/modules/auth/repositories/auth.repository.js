import UserModel from "../models/User.model.js"
import AdminModel from "../models/Admin.model.js"
import SessionModel from "../models/Session.model.js"
//find user by email 
export const findUserByEmail = async ({email}) =>{
 return await UserModel.findOne({email})
}

//find admin by email
export const findAdminByEmail = async ({email}) =>{
 return await AdminModel.findOne({email})
}

//create user
export const createUser = async (data) =>{
 return await UserModel.create(data)
}

//create admin
export const createAdmin = async (data) =>{
 return await AdminModel.create(data)
}

// find user for login
export const findUserForLogin = async ({email}) =>{
 return await UserModel.findOne({email}).select("+password")
}

//find session by id
export const findSessionById = async ({refreshTokenHash}) =>{
 return await SessionModel.findOne({refreshTokenHash,isRevoked:false})
}
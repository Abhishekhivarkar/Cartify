import UserModel from "../models/User.model.js"
import AdminModel from "../models/Admin.model.js"
import SessionModel from "../models/Session.model.js"
import BlackListTokenModel from "../models/BlackListToken.model.js"
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

// find admin for login
export const findAdminForLogin = async({email}) =>{
    return await AdminModel.findOne({email}).select("+password")
}
//find session by id
export const findSessionById = async ({refreshTokenHash}) =>{
 return await SessionModel.findOne({refreshTokenHash,isRevoked:false})
}

//find user by id

export const findUserById = async(userId) =>{
    return await UserModel.findById(userId)
}

//find admin by id

export const findAdminById = async(userId) =>{
    return await AdminModel.findById(userId)
}

// create black list token

export const createBlackListToken = async ({accessToken}) =>{
    return await BlackListTokenModel.create({token:accessToken})
}

// find session by session id

export const findSessionBySessionId = async (accessToken) =>{
    return await SessionModel.findById(accessToken)
}

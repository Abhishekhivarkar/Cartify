export const roleMiddleware = (...roles) => {
    return (req, res, next) => { 
        try {
            if (!req.user || !roles.includes(req.userRole)) {  
                return res.status(403).json({
                    success: false,
                    message: "Access Denied"
                })
            }
            next()  
        } catch(err) {
            console.log("ROLE MIDDLEWARE ERROR : ", err)
            return res.status(500).json({
                success: false,
                message: "Role middleware failed"
            })
        }
    }
}
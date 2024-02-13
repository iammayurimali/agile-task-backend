const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.auth = (req, res, next) =>{
    try{
        const token = req.body.token;
        if(!token){
            return res.status(401).json({
                status: false,
                message : 'Token missing'
            })
        }
        //verify token
        try{
            const decode = jwt.decode(token, process.env.JWT_SECRET)
            req.user = decode
        }
        catch(error){
            return res.status(401).json({
                success: false,
                message: 'Token in invalid'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifyting token'
        })
    }
}


exports.isEmplyoee = (req,res,next) => {
    try{
            if(req.user.role !== "Emplyoee") {
                return res.status(401).json({
                    success:false,
                    message:'THis is a protected route for emplyoee',
                });
            }
            next();
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:'User Role is not matching',
        })
    }
}

exports.isManager = (req,res,next) => {
    try{
        if(req.user.role !== "Manager") {
            return res.status(401).json({
                success:false,
                message:'THis is a protected route for manager',
            });
        }
        next();
}
catch(error) {
    return res.status(500).json({
        success:false,
        message:'User Role is not matching',
    })
}
}
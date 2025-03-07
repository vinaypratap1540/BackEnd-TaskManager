import jwt from "jsonwebtoken"

const isAuthenticated = async(req,res,next)=>{
   try {
    console.log("Cookies received:", req.cookies); // Debugging
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            success:false,
            message:"User is not authenticated"
        })
    }
    const decode = jwt.verify(token,process.env.SECRET_KEY)
    if(!decode){
        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        })
    }
    req.id=decode.userId
    next()
   } catch (error) {
    console.log("Authentication Error:", error); // Debugging
     res.status(500).json({ success: false, message: "Server error" });
   }
}

export default isAuthenticated

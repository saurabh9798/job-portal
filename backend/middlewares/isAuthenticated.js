import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) =>{
    try {
        const token = req.cookies.token;
        if (!token) {
            console.log('No token found in cookies');
            return res.status(401).json({
                message: "User not authenticated",
                success:false,
            })
        }
        // console.log('Token found:', token);
        const decode = await jwt.verify(token,process.env.SECRET_KEY);
        if (!decode) {
            console.log('Invalid token');
            return res.status(401).json({
                message: "Invalid token",
                success:false,
            })
        };
        // console.log('Token decoded successfully. User ID:', decode.userId);
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log('Authentication error:', error.message);
        console.log('Error stack:', error.stack);

    }
}
export default isAuthenticated;

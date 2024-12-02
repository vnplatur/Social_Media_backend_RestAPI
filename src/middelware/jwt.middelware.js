import jwt from "jsonwebtoken";

const jwtAuth = (req,res,next)=>{
    // 1. Read the token.
    const token = req.headers['authorization'];

    // 2. if token does not exist
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // 3. verify the token
    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );
        req.userId = payload.userId;
    }catch(err){
        console.log(err);
        return res.status(401).send('Unauthorized');
    }

    next();
}

export default jwtAuth;
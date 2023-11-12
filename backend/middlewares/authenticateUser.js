const jwt=require('jsonwebtoken')
const authenticateUser=async (req,res,next)=>{
    const token=req.headers[o-auth]
    try{
        const userDoc=jwt.verify(token,beespoke123)
        if(userDoc){
            req.user.id=userDoc.id
            next()
        }
    }catch(error){
        res.status(401).json({error:'access denied'})
    }

}
module.exports=authenticateUser
var jwt = require('jsonwebtoken');

// create token 
const generateToken =(id,name,isAdmin)=>{
 return jwt.sign({id,name,isAdmin},process.env.JWT_SECRET,{
     expires:'60d'
 })
}
module.exports = generateToken
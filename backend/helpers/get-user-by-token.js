const jwt = require('jsonwebtoken')
const User = require('../models/User')

const getUserbyToken = async (token)=>{
    if(!token){
        return  res.status(401).json({message:'Acesso Negado'})
    }

    const decoded = jwt.verify(token,'nossosecret')

    const userid = decoded.id

    const user = await User.findOne({_id:userid})

    return user
}

module.exports = getUserbyToken
const User = require('../models/User')

module.exports = class UserController {
    static async registrar(req,res){
        res.json('Ola Get a Pet')
    }
}


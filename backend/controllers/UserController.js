const User = require('../models/User')

module.exports = class UserController {
    static async registrar(req,res){
        const {nome,email,telefone,senha,confirmesenha} = req.body

        //Validações de Campos
        if(!nome ||!email ||!telefone ||!senha ||!confirmesenha){
            res.status(422).json({message:'Campo Obrigatório'})
        }

        if(senha !== confirmesenha){
            res.status(422).json({message:'Senhas não coincidem'})
        }

        //Verifica se  usuário existe

        const UserExist = await User.findOne({email:email})// se a variavel for preeechida é sinal que o usuário ja exista 

        if(UserExist){
            res.status(422).json({message:'Usuário Existe'})
        }


    }
}


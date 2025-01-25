const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = class UserController {
    static async registrar(req, res) {
        const { nome, email, telefone, senha, confirmesenha } = req.body;
    
        // Validações de Campos
        if (!nome || !email || !telefone || !senha || !confirmesenha) {
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }
    
        if (senha !== confirmesenha) {
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }
    
        // Verifica se o usuário já existe
        try {
            const userExist = await User.findOne({ email: email });
    
            if (userExist) {
                return res.status(422).json({ message: 'Usuário já existe.' });
            }
    
            // Criptografa a senha
            const salt = await bcrypt.genSalt(12);
            const hashPass = await bcrypt.hash(senha, salt);
    
            // Cria um novo usuário
            const userData = new User({
                nome,
                email,
                telefone,
                senha: hashPass
            });
    
            // Salva o usuário no banco de dados
            const userSave = await userData.save();
            return res.status(201).json({ message: 'Usuário criado com sucesso!', user: userSave });
        } catch (err) {
            // Trata erros inesperados
            console.error(err);
            return res.status(500).json({ message: 'Ocorreu um erro no servidor.', erro: err.message });
        }
    }
    

    }



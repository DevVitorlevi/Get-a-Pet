const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CreateUserToken = require('../helpers/create-token-user')
const getToken = require('../helpers/get-token')
module.exports = class UserController {
    static async registrar(req, res) {
        // Desestrutura os campos recebidos no corpo da requisição
        const { nome, email, telefone, senha, confirmesenha } = req.body;
    
        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!nome || !email || !telefone || !senha || !confirmesenha) {
            // Retorna uma mensagem de erro com o status 422 (Unprocessable Entity)
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }
    
        // Verifica se as senhas informadas são iguais
        if (senha !== confirmesenha) {
            // Retorna uma mensagem de erro se as senhas não coincidirem
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        }
    
        // Tenta verificar se o usuário já existe no banco de dados
        try {
            // Busca um usuário com o mesmo e-mail no banco de dados
            const userExist = await User.findOne({ email: email });
    
            // Caso o e-mail já esteja registrado, retorna um erro
            if (userExist) {
                return res.status(422).json({ message: 'Usuário já existe.' });
            }
    
            // Gera um "salt" para criptografar a senha (adiciona aleatoriedade ao hash)
            const salt = await bcrypt.genSalt(12);
    
            // Criptografa a senha do usuário com o "salt" gerado
            const hashPass = await bcrypt.hash(senha, salt);
    
            // Cria um novo objeto de usuário com os dados informados e a senha criptografada
            const userData = new User({
                nome,
                email,
                telefone,
                senha: hashPass // Armazena a senha como um hash seguro
            });
    
            // Salva o novo usuário no banco de dados
            const userSave = await userData.save();

            await CreateUserToken(userSave,req,res)
        } catch (err) {
            // Caso ocorra um erro inesperado durante o processo, registra no console
            console.error(err);
    
            // Retorna uma mensagem genérica de erro com o status 500 (Internal Server Error)
            return res.status(500).json({ message: 'Ocorreu um erro no servidor.', erro: err.message });
        }
    }
    static async login(req,res){
        const {email,senha} = req.body

        if(!email || !senha){

            return res.status(422).json({message:'Campo Obrigatório'})
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(422).json({message:'Usuário não Cadastrado'})
        }

        const Checkpass = await bcrypt.compare(senha,user.senha)

        if(!Checkpass){
            return res.status(422).json({message:'Senha Incorreta'})
        }

        await CreateUserToken(user,req,res)
    }

    static async checkUser(req, res) {
        let useratual;
    
        // Verifica se existe um cabeçalho de autorização
        if (req.headers.authorization) {
            const token = getToken(req); // Extrai o token do cabeçalho de autorização
            const decoded = jwt.verify(token, 'nossosecret'); // Decodifica o token usando a chave secreta 'secret'
    
            useratual = await User.findById(decoded.id); // Busca o usuário no banco pelo ID decodificado do token
    
            useratual.senha = undefined; // Remove a senha do objeto de usuário antes de enviar a resposta
        } else {
            useratual = null; // Se não houver token, define useratual como null
        }
    
        // Envia a resposta com o usuário atual ou null
        res.status(200).send(useratual);
    }
    static async getUser(req, res) {
        // Extrai o ID do usuário da URL, que foi enviado como parâmetro (req.params.id)
        const id = req.params.id;
    
        // Busca o usuário no banco de dados pelo ID fornecido e exclui o campo "senha" do resultado retornado
        const user = await User.findById(id).select('-senha');
    
        // Verifica se o usuário foi encontrado
        if (!user) {
            // Caso o usuário não seja encontrado, retorna uma resposta com status 422 (Unprocessable Entity)
            // e uma mensagem indicando que o usuário não foi encontrado
            return res.status(422).json({ message: 'Usuário Não Encontrado' });
        }
    
        // Caso o usuário seja encontrado, retorna uma resposta com status 200 (OK)
        // e o objeto do usuário no formato JSON, excluindo a senha
        res.status(200).json({ user: user });
    }
    
}



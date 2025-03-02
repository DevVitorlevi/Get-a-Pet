const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const CreateUserToken = require('../helpers/create-token-user')
const getToken = require('../helpers/get-token')
const getUserbyToken = require('../helpers/get-user-by-token')
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
    static async login(req, res) {
        // Extrai o email e a senha do corpo da requisição
        const { email, senha } = req.body;
    
        // Verifica se os campos email e senha foram preenchidos
        if (!email || !senha) {
            // Se algum campo estiver vazio, retorna status 422 (Unprocessable Entity)
            // com uma mensagem indicando que os campos são obrigatórios
            return res.status(422).json({ message: 'Campo Obrigatório' });
        }
    
        // Busca no banco de dados por um usuário com o email fornecido
        const user = await User.findOne({ email });
    
        // Verifica se o usuário foi encontrado
        if (!user) {
            // Se o usuário não foi encontrado, retorna status 422
            // com uma mensagem indicando que o usuário não está cadastrado
            return res.status(422).json({ message: 'Usuário não Cadastrado' });
        }
    
        // Compara a senha fornecida pelo usuário com a senha armazenada no banco
        const Checkpass = await bcrypt.compare(senha, user.senha);
    
        // Verifica se a senha está incorreta
        if (!Checkpass) {
            // Se a senha for inválida, retorna status 422
            // com uma mensagem indicando que a senha está incorreta
            return res.status(422).json({ message: 'Senha Incorreta' });
        }
    
        // Caso as credenciais estejam corretas, cria um token para o usuário
        await CreateUserToken(user, req, res);
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

    static async editUser(req, res) {
        // Obtém o ID do usuário a partir dos parâmetros da URL
        const id = req.params.id;
    
        // Obtém o token JWT do cabeçalho de autorização da requisição
        const token = getToken(req);
    
        // Recupera os dados do usuário usando o token
        const user = await getUserbyToken(token);
    
        // Desestrutura os dados enviados no corpo da requisição
        const { nome, email, telefone, senha, confirmesenha } = req.body;
    
        // Inicializa uma variável 'image' como uma string vazia (reservada para futuras implementações de upload de imagens

        if(req.file){
            user.image = req.file.filename
        }
    
        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!nome || !email || !telefone || !senha || !confirmesenha) {
            // Retorna uma mensagem de erro com o status 422 (Unprocessable Entity)
            return res.status(422).json({ message: 'Todos os campos são obrigatórios.' });
        }
    
        // Atualiza os dados do usuário no objeto recuperado
        user.nome = nome;
        user.email = email;
        user.telefone = telefone;
    
        // Verifica se as senhas informadas coincidem
        if (senha !== confirmesenha) {
            // Retorna uma mensagem de erro se as senhas não coincidirem
            return res.status(422).json({ message: 'As senhas não coincidem.' });
        } else if (senha === confirmesenha && senha !== null) {
            // Gera um "salt" para criptografar a senha (adiciona aleatoriedade ao hash)
            const salt = await bcrypt.genSalt(12);
    
            // Criptografa a senha do usuário com o "salt" gerado
            const hashPass = await bcrypt.hash(senha, salt);
    
            // Atualiza a senha criptografada no objeto do usuário
            user.senha = hashPass;
        }
    
        // Verifica se já existe um usuário no banco com o mesmo e-mail informado
        const userexist = await User.findOne({ email });
    
        // Se o e-mail informado não for o mesmo do usuário atual e já existir outro usuário com o mesmo e-mail, retorna erro
        if (user.email !== email && userexist) {
            return res.status(422).json({ message: 'E-mail já está em uso por outro usuário.' });
        }
    
        try {
            // Atualiza o usuário no banco de dados usando o ID
            await User.findOneAndUpdate(
                { _id: user._id }, // Localiza o usuário pelo ID
                { $set: user }, // Substitui os dados pelo objeto atualizado
                { new: true } // Garante que o documento retornado seja o atualizado
            );
    
            // Retorna uma mensagem de sucesso
            res.status(200).json({
                message: 'Usuário atualizado com sucesso.'
            });
        } catch (error) {
            // Retorna uma mensagem de erro caso algo dê errado no servidor
            return res.status(500).json({ message: 'Erro no servidor. Por favor, tente novamente mais tarde.' });
        }
    }
    
    
}



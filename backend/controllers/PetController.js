const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserbyToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
    // Método estático assíncrono para criar um pet
    static async Createpet(req, res) {
        // Extrai os dados do pet do corpo da requisição
        const { nome, idade, peso, cor } = req.body;

        // Define se o pet está disponível
        const disponivel = true;

        const images = req.files

        // Verifica se algum campo obrigatório está faltando
        if (!nome || !idade || !peso || !cor||images.length.value === 0 ) {
            return res.status(422).json({ message: 'Campo Obrigatório' });
        }
        
        // Obtém o token de autenticação da requisição
        const token = getToken(req);
        // Obtém o usuário relacionado ao token
        const user = await getUserbyToken(token);

        try {
            // Cria uma instância de Pet com os dados fornecidos
            const DataPet = new Pet({
                nome,
                idade,
                peso,
                cor,
                disponivel,
                images: [], // Array vazio para imagens do pet
                user: { // Dados do usuário que está criando o pet
                    _id: user._id,
                    nome: user.nome,
                    image: user.image,
                    telefone: user.telefone
                }
            });

            // Percorre todas as imagens enviadas no campo 'images'
            images.map(image => {
                // Adiciona o nome do arquivo de cada imagem ao array 'image' do objeto 'DataPet'
                DataPet.image.push(image.filename);
            });


            // Salva o novo pet no banco de dados
            const Petsave = await DataPet.save();

            // Retorna uma resposta de sucesso com o pet criado
            res.status(201).json({ message: 'Pet Cadastrado', pet: Petsave });
        } catch (err) {
            // Em caso de erro, retorna uma resposta de erro
            return res.status(500).json({ message: 'Erro no Servidor' });
        }
    }
    // Define o método estático assíncrono chamado 'Allpets' no controlador
    static async Allpets(req, res) {
        try {
            // Realiza uma busca no banco de dados pelo modelo 'Pet'
            // e ordena os resultados pela data de criação ('createdAt') em ordem decrescente
            const AllPets = await Pet.find().sort('-createdAt');

            // Retorna uma resposta HTTP com status 200 (OK) contendo uma mensagem e os pets resgatados
            res.status(200).json({ message: 'Pets resgatados', pet: AllPets });
        } catch (err) {
            // Em caso de erro, retorna uma resposta HTTP com status 500 (erro no servidor)
            return res.status(500).json({ message: 'Erro no Servidor' });
        }
}
    static async Mypets(req, res) {
        const token = getToken(req); // Obtém o token de autenticação da requisição.
        const user = await getUserbyToken(token); // Busca o usuário correspondente ao token.

        try {
            const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');
            // Busca todos os pets do usuário ordenados por data de criação (mais recentes primeiro).

            res.status(200).json({ pet: pets }); // Retorna os pets encontrados com status 200 (OK).
        } catch (err) {
            res.status(500).json({ message: 'Erro no Servidor' }); // Retorna erro 500 em caso de falha.
        }
        
    }
    static async Myadotados(req,res){
        const token = getToken(req); // Obtém o token de autenticação da requisição.
        const user = await getUserbyToken(token); // Busca o usuário correspondente ao token.

        try {
            const pets = await Pet.find({ 'adotador._id': user._id }).sort('-createdAt');
            // Busca todos os pets do usuário ordenados por data de criação (mais recentes primeiro).

            res.status(200).json({ pet: pets }); // Retorna os pets encontrados com status 200 (OK).
        } catch (err) {
            res.status(500).json({ message: 'Erro no Servidor' }); // Retorna erro 500 em caso de falha.
        }
    }
    static async PetId(req, res) {
        const id = req.params.id; 
        // Obtém o ID do pet a partir dos parâmetros da URL.
    
        if (!ObjectId.isValid(id)) { 
            // Verifica se o ID fornecido é válido (formato correto para um ObjectId do MongoDB).
            return res.status(422).json({ message: 'Id Inválido' });
            // Retorna um erro 422 (Entidade Não Processável) caso o ID seja inválido.
        }
    
        try {
            const OnePet = await Pet.findById(id); 
            // Procura no banco de dados um pet pelo ID fornecido.
    
            res.status(200).json({ pet: OnePet });
            // Retorna o pet encontrado com status 200 (OK) no formato JSON.
        } catch (e) {
            res.status(500).json({ message: 'Erro no Servidor' });
            // Retorna um erro 500 (Erro Interno do Servidor) caso ocorra alguma falha no processo.
        }

    }

    static async Deletepet(req, res) {
        const id = req.params.id; 
        // Obtém o ID do pet a ser deletado a partir dos parâmetros da requisição.
    
        if (!ObjectId.isValid(id)) {
            // Verifica se o ID fornecido é válido para um ObjectId do MongoDB.
            return res.status(422).json({ message: 'Id Inválido' });
            // Retorna status 422 caso o ID seja inválido.
        }
    
        try {
            const pet = await Pet.findById(id); 
            // Procura o pet no banco de dados com base no ID fornecido.
    
            const token = getToken(req); 
            // Obtém o token de autenticação da requisição.
    
            const user = await getUserbyToken(token); 
            // Decodifica o token e recupera o usuário autenticado.
    
            if (!pet) {
                // Verifica se o pet foi encontrado no banco de dados.
                return res.status(404).json({ message: 'Pet Não Existe' });
                // Retorna status 404 se o pet não existir.
            }
    
            if (pet.user._id.toString() !== user._id.toString()) {
                // Compara o ID do usuário autenticado com o ID do dono do pet.
                return res.status(403).json({ message: 'Acesso não autorizado' });
                // Retorna status 403 se o usuário não for o proprietário do pet.
            }
    
            await Pet.findByIdAndDelete(id); 
            // Deleta o pet do banco de dados pelo ID.
    
            res.status(200).json({ message: 'Pet deletado com sucesso' });
            // Retorna status 200 indicando que o pet foi deletado com sucesso.
    
        } catch (err) {
            res.status(500).json({ message: 'Erro no Servidor' });
            // Retorna status 500 se ocorrer algum erro inesperado no servidor.
        }
    }
    static async UpdatePet(req,res){
        
    }
    
}


const Pet = require('../models/Pet')
const getToken = require('../helpers/get-token')
const getUserbyToken = require("../helpers/get-user-by-token")

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

            images.map(image=>{
                DataPet.image.push(image.filename) 
            })

            // Salva o novo pet no banco de dados
            const Petsave = await DataPet.save();

            // Retorna uma resposta de sucesso com o pet criado
            res.status(201).json({ message: 'Pet Cadastrado', pet: Petsave });
        } catch (err) {
            // Em caso de erro, retorna uma resposta de erro
            return res.status(500).json({ message: 'Erro no Servidor' });
        }
    }
}


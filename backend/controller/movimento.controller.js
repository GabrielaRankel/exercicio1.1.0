const Usuario = require('../models/Usuario')
const Produto = require('../models/Produto')
const Movimento = require('../models/Movimento')

const cadastrar = async (req,res)=>{
    const valores = req.body
    // console.log(valores)

    if(!valores.idUsuario || !valores.idProduto || !valores.tipo || 
        !valores.qtdeMov || !valores.data){
        return res.status(400).json({message: 'Todos os campos são obrigatórios!'})
    }
    try{
        // 1 = verificar se produto existe
        const produto = await Produto.findByPk(valores.idProduto)        
        if(!produto){
            return res.status(404).json({message: "Produto não inexistente!"})
        }
        // 2 =  verificar se usuario existe
        const usuario = await Usuario.findByPk(valores.idUsuario)        
        if(!usuario){
            return res.status(404).json({message: "Usuario não inexistente!"})
        }
        
        let novaQuantidade = produto.quantidade
        // lógica da ENTRADA de produto no estoque
        // 3 - atualizando a quantidade de produto
        if(valores.tipo === 'ENTRADA'){
            novaQuantidade += valores.qtdeMov
        }
        // lógica da SAIDA de produto no estoque
        // 3 - atualizando a quantidade de produto
        else if(valores.tipo === 'SAIDA'){
            if(produto.quantidade < valores.qtdeMov){
                return res.status(400).json({message: "Quantidade insuficiente no estoque!"})
            }
            novaQuantidade -= valores.qtdeMov
        }
        else{
            return res.status(400).json({message: "Tipo de Movimentação Inválida!"})
        }

        await produto.update({quantidade: novaQuantidade})
        
        const movimento = await Movimento.create(valores)
        res.status(201).json(movimento)        
        
    }catch(err){
        console.error('Erro ao registra o Movimento',err)
        res.status(500).json({message: "Erro ao registra o Movimento"})
    }    
}

const listar = async (req,res)=>{
    try{
        const dados = await Movimento.findAll()
        res.status(200).json(dados)
    }catch(err){
        console.error('Não foi possível listar a movimentação!',err)
        res.status(500).json({message: 'Não foi possível listar a movimentação!'})
    }
}

module.exports = { cadastrar, listar }
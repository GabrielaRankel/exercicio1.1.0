const Usuario = require('./Usuario')
const Produto = require('./Produto')
const Movimento = require('./Movimento')

Usuario.hasMany(Movimento,{
    foreignKey: 'idUsuario',
    as: 'movimentoUsuario',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Usuario,{
    foreignKey: 'idUsuario',
    as: 'usuarioMovimento',
    allowNull: false
})

Produto.hasMany(Movimento,{
    foreignKey: 'idProduto',
    as: 'movimentoProduto',
    onDelete: 'CASCADE'
})

Movimento.belongsTo(Produto,{
    foreignKey: 'idProduto',
    as: 'produtoMovimento',
    allowNull: false
})

module.exports = { Usuario, Produto, Movimento }
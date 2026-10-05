const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const VwHistoricoSaidas = db.define('VwHistoricoSaidas',{
    codMovimento: {
        type: DataTypes.INTEGER,
        primaryKey: true, // sequelize precisa da chave primária para o mapeamento
    },
    nome_produto: {
        type: DataTypes.STRING(40),
    },
    categoria: {
        type: DataTypes.STRING(40),
    },
    qtdeMov: {
        type: DataTypes.INTEGER,
    },
    data: {
        type: DataTypes.DATEONLY
    }
},{
    timestamps: false,
    tableName: 'vw_historico_saidas'
})

module.exports = VwHistoricoSaidas
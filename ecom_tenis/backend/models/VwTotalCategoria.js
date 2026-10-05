const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const VwTotalCategoria = db.define('VwTotalCategoria',{
    categoria: {
        type: DataTypes.STRING(40),
        primaryKey: true // sequelize precisa da chave primária para o mapeamento
    },
    total_pares: {
        type: DataTypes.INTEGER,
    },
    valor_total_financeiro: {
        type: DataTypes.DECIMAL(10,2),
    },
},{
    timestamps: false,
    tableName: 'vw_total_por_categoria'
})

module.exports = VwTotalCategoria
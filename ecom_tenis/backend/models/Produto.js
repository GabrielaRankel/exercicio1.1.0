const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produto',{
    codProduto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoUnit: {
        type: DataTypes.DECIMAL(10,2), // moeda
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'produtos'
})

module.exports = Produto
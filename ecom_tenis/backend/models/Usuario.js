const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('usuario',{
    codUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'usuarios'
})

module.exports = Usuario
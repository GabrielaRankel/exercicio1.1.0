const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('movimento',{
    codMovimento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'codUsuario'
        }
    },
    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'codProduto'
        }
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA','SAIDA'),
        allowNull: false
    },
    qtdeMov: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento
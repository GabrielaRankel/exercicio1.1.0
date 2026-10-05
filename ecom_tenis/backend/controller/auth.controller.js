const Usuario = require('../models/Usuario')

const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const login = async (req, res) => {
    const valores = req.body

    if (!valores.email || !valores.senha) {
        return res.status(400).json({ message: "Campos email e senha obrigatórios!" })
    }

    try {
        const usuario = await Usuario.findOne({ where: { email: valores.email } })
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario não encontrado!' })
        }

        const bytes = CryptoJS.AES.decrypt(usuario.senha, CHAVE_SECRETA)
        const senha = bytes.toString(crypto.enc.Utf8)

        if (valores.senha !== senha) {
            return res.status(401).json({ message: 'Senha incorreta, não autorizado!' })
        }

        const UmaHoraEMeia = 1.5 * 60 * 60 * 1000
        const tempoExpirar = Date.now() + UmaHoraEMeia

        const payload = {
            idUsuario: usuario.codusuario,
            nome: usuario.nome,
            expiraEm: tempoExpirar
        }

        const token = CryptoJS.AES.encrypt(JSON.stringify(payload), CHAVE_SECRETA).toString()

        return res.status(200).json({
            message: 'Login realizado com sucesso',
            nome: usuario.nome,
            token: token
        })

    } catch (err) {
        console.error('Não foi possível fazer o login!', err)
        res.status(500).json({ message: 'Não foi possível fazer o login!' })
    }

}

module.exports = { login }
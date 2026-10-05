let resposta = document.getElementById('resposta')
let resposta_nome = document.getElementById('resposta_nome')
let btn_consultar = document.getElementById('btn_consultar')
let btn_consultar_nome = document.getElementById('btn_consultar_nome')

btn_consultar.addEventListener('click', (e) => {
     e.preventDefault()
    
    const codUsuario = document.getElementById('codUsuario').value

    fetch(`http://localhost:3000/usuario/${codUsuario}`)
    .then(res => res.json())
    .then(dados => {

        // Se não encontrar o usuário ou vier mensagem de erro
        if (!dados) {
            resposta.innerHTML = `<p>${'Usuário não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''
        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
    })
})

btn_consultar_nome.addEventListener('click', (e) => {
     e.preventDefault()
    
    const nome = document.getElementById('nome').value

    fetch(`http://localhost:3000/usuario/buscar/${nome}`)
    .then(res => res.json())
    .then(dados => {

        // Se não encontrar o usuário ou vier mensagem de erro
        if (!dados) {
            resposta_nome.innerHTML = `<p>${'Usuário não encontrado!'}</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML = ''
        resposta_nome.innerHTML = ''
        resposta_nome.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao consultar os dados', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codUsuario}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.email}</td>`
        corpo += `<td>${el.cpf}</td>`
        corpo += `<td>${el.telefone}</td>`
        corpo += `<td>${el.senha}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    let cabecalho = ''
    cabecalho += `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Senha</th>
            </tr>
        </thead>
    `
    return cabecalho
}

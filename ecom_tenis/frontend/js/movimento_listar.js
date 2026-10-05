let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/movimentos')
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
    })
    .catch((err) => {
        console.error('Erro ao listar as movimentações', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codMovimento}</td>`
        corpo += `<td>${el.idUsuario}</td>`
        corpo += `<td>${el.idProduto}</td>`
        corpo += `<td>${el.tipo}</td>`
        corpo += `<td>${el.qtdeMov}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Cód. Mov.</th>
                <th>Cód. Usuário</th>
                <th>Cód. Produto</th>
                <th>Tipo</th>
                <th>Qtd. Movimentada</th>
                <th>Data</th>
            </tr>
        </thead>
    `
}
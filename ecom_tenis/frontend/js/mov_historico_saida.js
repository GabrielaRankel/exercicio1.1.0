let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/relatorio/saidas')
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
        console.error('Erro ao carregar o relatório de saídas', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codMovimento}</td>`
        corpo += `<td>${el.nome_produto}</td>`
        corpo += `<td>${el.categoria}</td>`
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
                <th>Cód. Mov</th>
                <th>Nome do Produto</th>
                <th>Categoria</th>
                <th>Qtd. Retirada</th>
                <th>Data da Saída</th>
            </tr>
        </thead>
    `
}
let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/produtos')
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
        console.error('Erro ao listar os dados', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.codProduto}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.categoria}</td>`
        corpo += `<td>${el.numero}</td>`
        corpo += `<td>${el.quantidade}</td>`
        corpo += `<td>R$ ${(el.precoUnit)}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Número</th>
                <th>Qtd</th>
                <th>Preço</th>
            </tr>
        </thead>
    `
}
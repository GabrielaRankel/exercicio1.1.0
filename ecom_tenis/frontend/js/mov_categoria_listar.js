let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/relatorio/categorias')
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
        console.error('Erro ao carregar o relatório por categorias', err)
    })
})

function criarTbody(dados) {
    let corpo = ''
    corpo += `<tbody>`
    dados.forEach(el => {
        corpo += `<tr>`
        corpo += `<td>${el.categoria}</td>`
        corpo += `<td>${el.total_pares}</td>`
        corpo += `<td>R$ ${parseFloat(el.valor_total_financeiro).toFixed(2)}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Categoria</th>
                <th>Total de Pares</th>
                <th>Valor Total Financeiro</th>
            </tr>
        </thead>
    `
}

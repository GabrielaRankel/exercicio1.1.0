let respuesta = document.getElementById('resposta')
let btn_atualizar = document.getElementById('btn_atualizar')

btn_atualizar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const codProduto = document.getElementById('codProduto').value
    const nome = document.getElementById('nome').value
    const categoria = document.getElementById('categoria').value
    const numero = document.getElementById('numero').value
    const quantidade = document.getElementById('quantidade').value
    const precoUnit = document.getElementById('precoUnit').value

    if (!codProduto) {
        resposta.innerHTML = '<p>Por favor, informe o Código do Produto!</p>'
        return
    }

    const produtoAtualizado = {
        nome: nome,
        categoria: categoria,
        numero: numero,
        quantidade: quantidade,
        precoUnit: precoUnit
    }

    fetch(`http://localhost:3000/produto/${codProduto}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produtoAtualizado)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''

        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
            return
        }

        let dadosArr = [dados]

        resposta.innerHTML += `
            <table>
                ${criarThead()}
                ${criarTbody(dadosArr)}
            </table>
        `
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error('Erro ao atualizar os dados', err)
        resposta.innerHTML = '<p>Erro ao tentar atualizar o produto.</p>'
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
        corpo += `<td>R$ ${el.precoUnit}</td>`
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

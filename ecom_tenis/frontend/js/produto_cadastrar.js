let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const nome = document.getElementById('nome').value
    const categoria = document.getElementById('categoria').value
    const numero = document.getElementById('numero').value
    const quantidade = document.getElementById('quantidade').value
    const precoUnit = document.getElementById('precoUnit').value

    const produto = { 
        nome: nome,
        categoria: categoria,
        numero: numero,
        quantidade: quantidade,
        precoUnit: precoUnit
    }

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
    .then(res => res.json())
    .then(dados => {
        console.log(dados.message)
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err) => {
        console.error('Erro ao cadastrar o produto', err)
        resposta.innerHTML = '<p>Erro ao tentar cadastrar o produto.</p>'
    })
})

let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e) => {
    e.preventDefault()
    
    const idUsuario = document.getElementById('idUsuario').value
    const idProduto = document.getElementById('idProduto').value
    const tipo = document.getElementById('tipo').value
    const qtdeMov = document.getElementById('qtdeMov').value
    const data = document.getElementById('data').value

    const movimento = { 
        idUsuario: parseInt(idUsuario),
        idProduto: parseInt(idProduto),
        tipo: tipo,
        qtdeMov: parseInt(qtdeMov),
        data: data
    }

    fetch('http://localhost:3000/movimento', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movimento)
    })
    .then(res => res.json())
    .then(dados => {
        resposta.innerHTML = ''
        
        if (dados.message) {
            resposta.innerHTML = `<p>${dados.message}</p>`
        } else {
            resposta.innerHTML = `<p>Movimentação de código ${dados.codMovimento} registrada com sucesso!</p>`
            document.querySelector('form').reset()
        }
    })
    .catch((err) => {
        console.error('Erro ao registrar o movimento', err)
        resposta.innerHTML = '<p>Erro ao tentar registrar a movimentação.</p>'
    })
})

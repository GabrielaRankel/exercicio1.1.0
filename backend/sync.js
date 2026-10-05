const conn = require('./db/conn')
const { Usuario, Produto, Movimento } = require('./models/rel')

async function syncDataBase(){
    try{
        await conn.sync({force: true})
        console.log('Tabelas sincronizadas')

    // Injetar a criação da view vw_hostorico_saidas
    const queryViewSaidas = `
        CREATE OR REPLACE VIEW vw_historico_saidas AS
        SELECT
	        m.codMovimento,
            p.nome AS nome_produto,
            p.categoria,
            m.qtdeMov,
            m.data
            FROM movimentos m 
        INNER JOIN produtos p ON m.idProduto = p.codProduto
        WHERE m.tipo = 'SAIDA'
        ORDER BY m.data DESC;
    `
        await conn.query(queryViewSaidas)
        console.log('histórico de saídas criado com sucesso!')

    const querView = `
        CREATE OR REPLACE VIEW vw_total_por_categoria AS
        SELECT
	        categoria,
            SUM(quantidade) AS total_pares,
            SUM(quantidade * precoUnit) AS valor_total_financeiro
        FROM produtos
        GROUP BY categoria;
    `
        await conn.query(querView)
        console.log('total por categoria criado com sucesso!')
    }catch(err){
        console.error('Erro ao sincronizar as tabelas',err)
    }finally{
       await conn.close()
       console.log('Fechando a conexão com o banco de dados') 
    }
}

syncDataBase()
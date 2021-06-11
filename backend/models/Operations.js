var knex = require("../database/connection");

class Operations{
    /* 
    
        SELECT materiais.nome as Nome, operacoes.data_movimentacao as Data, 
        SUM(operacoes.quantidade) AS quantidade, 
        (SUM(operacoes.quantidade) * itens.valor_unitario) AS valor
        FROM helpackage.operacoes
        INNER JOIN helpackage.itens
        ON operacoes.id_item = itens.item
        INNER JOIN helpackage.materiais
        ON itens.material = materiais.id_material
        WHERE operacoes.data_movimentacao LIKE "%2021-02%"

    */
    async findAll(data){
        try {
            var result = await knex
            .select(["materiais.nome as Nome", "operacoes.data_movimentacao as Data", "itens.valor_unitario as Valor"])
            .sum('operacoes.quantidade AS quantidade')
            .sum('operacoes.valor AS Valor')
            .whereRaw("operacoes.operacao = 'Venda' AND operacoes.data_movimentacao LIKE '%" + data + "%';")
            .innerJoin('itens', 'operacoes.id_item', 'itens.item')
            .innerJoin('materiais', 'itens.material', 'materiais.id_material')
            .as('materiais')
            .as('operacoes')
            .as('itens')
            .table("operacoes");
            return result[0];
        }catch(err){
            return undefined;
        }
    }
    
    async findByStatus(periodo, periodo1 = x, periodo2 = x, periodo3 = x, status = 'Tudo', limit = 10){
        try {
            var result = await knex
            .select(["operacoes.id as id", "materiais.nome as Nome", "operacoes.data_movimentacao as Data", "itens.valor_unitario as Valor", "operacoes.quantidade AS quantidade", "operacoes.valor AS Valor"])
            .whereRaw("operacoes.operacao != '" + status + "' AND (operacoes.data_movimentacao LIKE '%" + periodo + 
            "%' OR operacoes.data_movimentacao LIKE '%" + periodo1 + 
            "%' OR operacoes.data_movimentacao LIKE '%" + periodo2 + 
            "%' OR operacoes.data_movimentacao LIKE '%" + periodo3 + 
            "%') ORDER BY operacoes.data_movimentacao DESC LIMIT " + limit + "")
            .innerJoin('itens', 'operacoes.id_item', 'itens.item')
            .innerJoin('materiais', 'itens.material', 'materiais.id_material')
            .as('materiais')
            .as('operacoes')
            .as('itens')
            .table("operacoes");
            if (result.length > 0){
                return result;
            }
            return undefined;
        }catch(err){
            return undefined;
        }
    }
    async findByYear(status = 'Tudo', limit = 10){
        try {
            var result = await knex
            .select(["operacoes.id as id", "materiais.nome as Nome", "operacoes.data_movimentacao as Data", "itens.valor_unitario as Valor", "operacoes.quantidade AS quantidade", "operacoes.valor AS Valor"])
            .whereRaw("operacoes.operacao != '" + status + "' ORDER BY operacoes.data_movimentacao DESC LIMIT " + limit + ";")
            .innerJoin('itens', 'operacoes.id_item', 'itens.item')
            .innerJoin('materiais', 'itens.material', 'materiais.id_material')
            .as('materiais')
            .as('operacoes')
            .as('itens')
            .table("operacoes");
            if (result.length > 0){
                return result;
            }
            return undefined;
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new Operations();
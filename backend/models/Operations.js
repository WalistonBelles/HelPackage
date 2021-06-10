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
            .whereRaw("operacoes.data_movimentacao LIKE '%" + data + "%';")
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
    
    async countAll(){
        try {
            var result = await knex('materiais').select(knex.raw('count(*) as count'));
            return result;
        }catch(err){
            return undefined;
        }
    }
    async countGroup(group){
        try {
            var result = await knex('materiais').select(knex.raw('count(*) as count')).where({grupo: group});
            if (result.length > 0){
                return result[0];
            }
            return undefined;
        }catch(err){
            return undefined;
        }
    }

    async findByCodigo(codigo){
        try {
            var result = await knex.select('*').where({codigo: codigo}).table('materiais');
            return result;
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new Operations();
var knex = require("../database/connection");

class Item{
    async findAll(){
        try {   
            var result = await knex
            .select(["materiais.nome", "itens.valor_unitario as vu", "itens.valor_total as vt", "itens.quantidade as quantidade", "itens.es as es"])
            .innerJoin('materiais', 'itens.material', 'materiais.id_material')
            .as('itens')
            .as('materiais')
            .table("itens");
            return result;
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new Item();
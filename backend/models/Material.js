const { where } = require("../database/connection");
var knex = require("../database/connection");

class Material{
    
    async findAll(){
        try {   
            var result = await knex
            .select(["materiais.id_material as id", "materiais.codigo as cod", "materiais.descricao as desc", "materiais_unidade.descricao", "materiais.grupo as grup", ])
            .innerJoin('materiais_unidade', 'materiais.material_unidade', 'materiais_unidade.id')
            .as('materiais')
            .table("materiais");
            return result;
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
            return result;
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new Material();
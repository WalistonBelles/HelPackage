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

    async updateMaterial(codigo, nome, descricao, grupo){
        var material = await this.findByCodigo(codigo);
        if(material != undefined){
            var editMaterial = {};
            if(nome != undefined){
                editMaterial.nome = nome;
            }
            if(descricao != undefined){
                editMaterial.descricao = descricao;
            }
            if(grupo != undefined){
                editMaterial.grupo = grupo;
            }
            try{
                await knex.update(editMaterial).where({codigo: codigo}).table("materiais");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        }else{
            return {status: false,err: "O material não existe!"}
        }
    }
}

module.exports = new Material();
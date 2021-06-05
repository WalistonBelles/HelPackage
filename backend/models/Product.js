const { where } = require("../database/connection");
var knex = require("../database/connection");

class Product{

    async new(material, material_un, valor_unitario, quantidade){
        try{
            var valor_total = valor_unitario * quantidade;
            await knex.insert({material, material_un, valor_unitario, valor_total, quantidade}).table("itens");
        }catch(err){
            console.log(err);
        }
    }

    async selectQuantidade(material){
        try{    
            var result = await knex.select("quantidade").where({material: material}).table("itens");
            return result[0];
        }catch(err){
            return undefined;
        }
    }
    
    async findAll(){
        try {   
            var result = await knex.select(["*"]).table("materiais");
            return result;
        }catch(err){
            return undefined;
        }
    }
    async findByName(nome){
        try {   
            var result = await knex.select(["*"]).where({nome: nome}).table("materiais");
            return result[0];
        }catch(err){
            return undefined;
        }
    }

    async findByMaterial(material){
        try{
            var result = await knex.select(["*"]).where({material:material}).table("itens");
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            return undefined;
        }
    }

    async updateItem(material, quantidade){

        var product = await this.findByMaterial(material);
        if(product != undefined){
            var editItem = {};
            if(quantidade != undefined){
                editItem.quantidade = product.quantidade + quantidade;
                editItem.valor_total = editItem.quantidade * product.valor_unitario;
            }
            try{
                await knex.update(editItem).where({material: product.material}).table("itens");
                return {status: true}
            }catch(err){
                return {status: false,err: err}
            }
        }else{
            return {status: false,err: "O item não existe!"}
        }
    }
}

module.exports = new Product();
var knex = require("../database/connection");
class Cache {
    async insertDataCache(operacao, conteudo){
        try {
            var status = 0;
            var data_criacao = new Date();
            var ultima_modificacao = new Date();
            await knex.insert({operacao, status, data_criacao, ultima_modificacao, conteudo}).table("cache");
        } catch(err){
            return undefined;
        }
    }
    async findById(id){
        try{
            var result = await knex.select("*").from("cache").where({id: id});
            if (result.length > 0){
                return result[0];
            }
            return undefined;
        }catch(err){
            console.log(err);
            return false;
        }
    }
    // Atualizar status do Cache
    async updateCache(id){
        var cache = await this.findById(id);
        if (cache != undefined){
            if(id != undefined){
                var editCache = {};
                editCache.status = 1;
                editCache.ultima_modificacao = new Date();
                try{
                    await knex.update(editCache).where({id: id}).table("cache");
                    return {status: true}
                }catch(err){
                    return {status: false,err: err}
                }
            }
            return {status: false, err: 'Id inválido'}
        }
        else{
            return {status: false,err: "O material não existe!"}
        }
    }

    // Método de procura de pendências de cache no banco
    async returnStatusCache(){
        try {
            var result = await knex
            .select(["*"])
            .whereRaw("`status` = 0;")
            .table("cache");
            if (result.length > 0){
                return result;
            }
            return undefined;
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new Cache();
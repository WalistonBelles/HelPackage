var knex = require("../database/connection");
var bcrypt = require("bcrypt");

class User{

    async new(pessoa, nome, senha){
        try{
            var hash = await bcrypt.hash(senha, 10);
            await knex.insert({pessoa, nome, senha: hash}).table("cargo");
        }catch(err){
            console.log(err);
        }
    }   

    async findByUser(user){
        try{
            var result = await knex.select("*").from("cargo").where({nome: user});
            if (result.length > 0){
                return result[0];
            }
            return undefined;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    // Login
    async login(user, password){
        try{
            var users = await this.findByUser(user);
            if(users != undefined){
                if(await bcrypt.compare(password,users.senha)){
                    return users;
                }
            }
            return undefined;
        }catch(err){
            return undefined;
        }
    }
}

module.exports = new User();
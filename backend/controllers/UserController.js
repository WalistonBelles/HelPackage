var User = require("../models/User");
var Validator = require("./ValidatorController");
var jwt = require("jsonwebtoken");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

var bcrypt = require("bcrypt");

class UserController{
    async index(req, res){
        var users = []
        res.json(users);
    }

    async findUser(req, res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.status(404);
            res.json({});
        }else{
            res.status(200)
            res.json(user);
        }
    }

    async create(req, res){
        var {pessoa, nome, senha} = req.body;

        // Valida pessoa
        if(!await Validator.ValidaNull(pessoa)){
            res.status(400);
            res.json({err: "Pessoa inválida!"})
            return;
        }
        // Valida Nome
        if(!await Validator.ValidaNull(nome)){
            res.status(400);
            res.json({err: "Nome de usuário inválido!"})
            return;
        }
        // Valida Senha
        if(!await Validator.ValidaNull(senha) || senha.lenght < 8){
            res.status(400);
            res.json({err: "A senha precisa conter no minimo 8 caracteres!"})
            return;
        }
        await User.new(pessoa, nome, senha);
        res.status(200);
        res.send("Cadastrado com sucesso!");
    }

    async edit(req, res){
        var {id, name, role, email} = req.body;
        var result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!");
            }else{
                res.status(406);
                res.send(result.err)
            }
        }
        else {
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        var id = req.params.id;
        var result = await User.delete(id);
        if(result.status){
            res.status(200);
            res.send("Tudo OK!");
        }
        else {
            res.status(406);
            res.send(result.err);
        }
    }

    async recoverPassword(req, res){
        var {email} = req.body;
        var result = await PasswordToken.create(email);
        if(result.status){
           res.status(200);
           res.send("" + result.token);
        }
        else {
            res.status(406)
            res.send(result.err)
        }
    }

    async changePassword(req, res){
        var {token, password} = req.body;
        var isTokenValid = await PasswordToken.validate(token);
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("Senha alterada");
        }
        else {
            res.status(406);
            res.send("Token inválido!");
        }
    }

    async login(req, res){
        var {user, password } = req.body;
        var users = await User.login(user,password);
        if(users != undefined){
            var token = jwt.sign({ id: users.id, cargo: users.cargo }, secret);
            res.status(200);
            res.json({token: token, cargo: users.cargo});
        }
        else {
            res.status(406);
            res.json({status: false, err: "Usuário/Senha incorreto!"});
        }
    }
}

module.exports = new UserController();
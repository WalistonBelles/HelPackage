var Material = require("../models/Material");
var Validator = require("./ValidatorController");

class MaterialController{

    async index(req, res){
        var Materials = await Material.findAll();
        res.json(Materials);
    }

    async countAll(req, res){
        var CountAll = await Material.countAll();
        var CountA = await Material.countGroup("A");
        var CountB = await Material.countGroup("B");
        var CountC = await Material.countGroup("C");
        var porcentagem = [];
        var result = [];
        result.all = CountAll[0].count;
        result.a = CountA.count;
        result.b = CountB.count;
        result.c = CountC.count;
        porcentagem[0] = result.a * 100 / result.all;
        porcentagem[1] = result.b * 100 / result.all;
        porcentagem[2] = result.c * 100 / result.all;
        res.json(porcentagem);
    }

    async findByCodigo(req, res){
        var {codigo} = req.body;
        
        if(!await Validator.ValidaNull(codigo)){
            res.status(400);
            res.json({err: "Código inválida!"})
            return;
        }
        var Materials = await Material.findByCodigo(codigo);
        if (Materials){
            res.json(Materials);
            return;
        }
        res.status(400);
        res.json({err: "Código inválida!"})
        return;
    }

    async updateMateriais(req, res){
        var {codigo, nome, descricao, grupo} = req.body;
        var result = await Material.updateMaterial(codigo, nome, descricao, grupo);
        console.log(result);
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
}

module.exports = new MaterialController();
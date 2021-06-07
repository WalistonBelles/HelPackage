var Material = require("../models/Material");

class MaterialController{

    async index(req, res){
        var Materials = await Material.findAll();
        console.log(Materials);
        res.json(Materials);
    }

    async countAll(req, res){
        var CountAll = await Material.countAll();
        var CountA = await Material.countGroup("A");
        var CountB = await Material.countGroup("B");
        var CountC = await Material.countGroup("C");
        var porcentagem = [];
        var result = [];
        result.all = await CountAll;
        result.a = await CountA;
        result.b = await CountB;
        result.c = await CountC;
        porcentagem[0] = result.a[0].count * 100 / result.all[0].count;
        porcentagem[1] = result.b[0].count * 100 / result.all[0].count;
        porcentagem[2] = result.c[0].count * 100 / result.all[0].count;
        console.log(porcentagem);
        res.json(porcentagem);
    }
}

module.exports = new MaterialController();
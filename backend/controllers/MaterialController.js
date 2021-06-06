var Material = require("../models/Material");

class MaterialController{

    async index(req, res){
        var Materials = await Material.findAll();
        console.log(Materials);
        res.json(Materials);
    }
}

module.exports = new MaterialController();
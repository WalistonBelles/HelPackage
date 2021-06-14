var Item = require("../models/Item");

class ItemController{

    async index(req, res){
        var Itens = await Item.findAll();
        res.json(Itens);
    }
}

module.exports = new ItemController();
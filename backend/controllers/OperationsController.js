var Operations = require("../models/Operations");

class OperationsController{

    async index(req, res){
        var allOperations = [];
        let y = 1;
        for (let x=0; x < 6; x++){
            allOperations[x] = await Operations.findAll('2021-0' + y);
            allOperations[x].Valor = allOperations[x].Valor * allOperations[x].quantidade;
            y++;
        }
        res.json(allOperations);
    }
}

module.exports = new OperationsController();
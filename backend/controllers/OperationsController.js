var Operations = require("../models/Operations");
var Validator = require("./ValidatorController");

class OperationsController{

    async index(req, res){
        var allOperations = [];
        let y = 1;
        for (let x=0; x < 6; x++){
            allOperations[x] = await Operations.findAll('2021-0' + y);
            y++;
        }
        res.json(allOperations);
    }

    
    async filterStatus(req, res){
        var {periodo, status, limite} = req.body;
        var allOperations;
        
        // 0 = Compra, 1 = Venda, 2 = Tudo
        // Aqui é invertido o valor no status, pois na query se eu quiser busccar todas as Venda, 
        // basta dizer que quero o retorno diferente de Compra, que sempre retornará somente as vendas
        if (status == 0){
          status = 'Venda';
        }
        if (status == 1){
          status = 'Compra';
        }
        if (status == 2){
          status = 'Tudo';
        }
        
        // Faz um switch case, e baseado no período escolhido, vai retornar valores baseado nele
        switch (periodo) {
            case 0:
              allOperations = await Operations.findByStatus('2021-06', null, null, null, status, limite);
              break;
            case 1:
              allOperations = await Operations.findByStatus('2021-06', '2021-05', null, null, status, limite);
              break;
            case 2:
              allOperations = await Operations.findByStatus('2021-06', '2021-05', '2021-04', '2021-03', status, limite);
              break;
            case 3:
              allOperations = await Operations.findByYear(status, limite);
              break;
            default:
              console.log('Ocorreu 1 error!');
        }
        res.json(allOperations);
    }
}

module.exports = new OperationsController();
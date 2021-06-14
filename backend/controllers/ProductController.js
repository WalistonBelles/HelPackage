var Product = require("../models/Product");
var Validator = require("./ValidatorController");
var Synchronize = require("../models/Synchronize");

class ProductController{

    async index(req, res){
        var Products = await Product.findAll();
        res.json(Products);
    }

    async create(req, res){
        var {material, quantidade} = req.body;
        var quant = parseInt(quantidade, 10);
        // Valida Material
        if(!await Validator.ValidaNull(material)){
            res.status(400);
            res.json({err: "Material Inválido!"})
            return;
        }
        // Valida quantidade
        if(!await Validator.ValidaNull(quant)){
            res.status(400);
            res.json({err: "Quantidade inválida!"})
            return;
        }
        var materialN = await Product.findByName(material);
        if (materialN != undefined){
            var resultado = await Product.findByMaterial(materialN.id_material);
            console.log(resultado);
            if (resultado != undefined){
                await Product.updateItem(materialN.id_material, quant);
                await Synchronize.newProduct(materialN.id_material, quant);
                res.status(200);
                res.send("Cadastrado com sucesso!");
                return;
            }
        }
        res.status(400);
        res.json({err: "Erro ao cadastrar!"})
        return;
    }
}

module.exports = new ProductController();
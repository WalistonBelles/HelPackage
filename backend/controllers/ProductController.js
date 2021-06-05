var Product = require("../models/Product");
var Validator = require("./ValidatorController");

class ProductController{

    async index(req, res){
        var Products = []
        res.json(Products);
    }

    async create(req, res){
        var {material, material_un, valor_unitario, quantidade} = req.body;
        // Valida Material
        if(!await Validator.ValidaNull(material)){
            res.status(400);
            res.json({err: "Material Inválido!"})
            return;
        }
        // Valida material_unidade
        if(!await Validator.ValidaNull(material_un)){
            res.status(400);
            res.json({err: "Material Inválido!"})
            return;
        }
        // Valida valor_unitario
        if(!await Validator.ValidaNull(valor_unitario)){
            res.status(400);
            res.json({err: "Valor inválido!"})
            return;
        }
        // Valida quantidade
        if(!await Validator.ValidaNull(quantidade)){
            res.status(400);
            res.json({err: "Quantidade inválida!"})
            return;
        }
        var resultado = await Product.findByMaterial(material);
        if (resultado != undefined){
            await Product.updateItem(material, quantidade);
            res.status(200);
            res.send("Cadastrado com sucesso!");
            return;
        }
        await Product.new(material, material_un, valor_unitario, quantidade);
        res.status(200);
        res.send("Cadastrado com sucesso!");
    }
}

module.exports = new ProductController();
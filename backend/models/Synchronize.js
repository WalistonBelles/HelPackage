const api = require('../services/api');
const internetAvailable = require("internet-available");
const Cache = require("./Cache");

class Synchronize{
    // Função de sincronizar dados
    async SynchronizeData(req, res){
        // Armazena as funções a serem chamadas
        var Operations = {
            product: function(resultado) {
                api.post("/product",{    
                    material: resultado[0],
                    quantidade: resultado[1]
                }).then(res => {
                    return true;
                }).catch(err => {
                    return false;
                })
            },
            materialUpdate: function(resultado) {
                api.post("/materialUpdate",{    
                    codigo: resultado[0],
                    nome: resultado[1],
                    descricao: resultado[2],
                    grupo: resultado[3]
                }).then(res => {
                    return true;
                }).catch(err => {
                    return false;
                })
            }
        }
        var result = await Cache.returnStatusCache();
        var status = '';
        // Percorre todas pendências para atualizar elas
        for (let x = 0; x < result.length; x++){
            // Confere se possui conexão
            var status = await internetAvailable().then(function(){
                return true;
                }).catch(function(){
                    return false;
                });
            // Se tiver conexão
            if(status){
                // Armazena por indice cada valor contido no coluna conteudo
                var resultado = result[x].conteudo.split(",");
                // Chama a função para sincronizar os dados, passando como parâmetro o array com os dados do conteudo
                await Operations[result[x].operacao.slice(1)](resultado)
                // Seta o status para 1 (Removendo sua pendência de sincronização)
                await Cache.updateCache(result[x].id);
            }else {
                console.log('Sem conexão');
            }
        }
    }

    // Armazena o Material no cache
    async updateMateriais(codigo, nome, descricao, grupo){
        var conteudo = codigo + "," + nome + "," + descricao + "," + grupo; 
        await Cache.insertDataCache('/materialUpdate', conteudo);
        // Chama a função de sincronizar dados
        await this.SynchronizeData();
    }

    // Atualiza o Material na máquina da nuvem
    async newProduct(material, quantidade){
        var conteudo = material + "," + quantidade; 
        await Cache.insertDataCache('/product', conteudo);
        // Chama a função de sincronizar dados
        await this.SynchronizeData();
    }
}

module.exports = new Synchronize();
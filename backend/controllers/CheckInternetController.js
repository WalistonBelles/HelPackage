const internetAvailable = require("internet-available");

class CheckInternetController{
    async CheckInternet(req, res){
        internetAvailable().then(function(){
            console.log("Internet available");
            return 1;
        }).catch(function(){
            console.log("Retornou sem conexão.");
            return 0;
        });
    }
}

module.exports = new CheckInternetController();
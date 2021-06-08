var axios = require('axios');

class CheckInternetController{
    async CheckInternet(req, res){
        var internetAvailable = require("internet-available");
        internetAvailable().then(function(){
            var result = '1';
            axios.get('http://helpackage-com.umbler.net/product').then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
            console.log(result);
            res.send(result);
            console.log("Internet available");
        }).catch(function(){
            console.log("Sem conexão");
            res.send("No internet!");
        });
    }
}

module.exports = new CheckInternetController();
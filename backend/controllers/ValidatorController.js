class ValidatorController{
    async ValidaNull(variavel){
        return variavel != undefined && variavel != '' && variavel != ' ';
    }
}

module.exports = new ValidatorController();
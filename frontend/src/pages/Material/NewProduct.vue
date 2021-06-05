<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77; text-align: center;">Cadastrar Novo Produto</h2>    
        <hr>
        <card>
            <base-button class="animation-on-hover" type="info" @click="newItemlVisible = true">Adicionar item ao estoque</base-button>
            <div v-if="newItemlVisible == true">
                <form>
                    <div v-if="error != undefined">
                        <base-alert type="warning">
                            <strong>Alerta!</strong> {{error}}!
                        </base-alert>
                    </div>
                    <div class="form-row">
                        <base-input class="col-md-3" label="Selecione o Produto">
                            <select id="inputState" class="form-control" v-model="produto">
                                <option v-for="product in products" :key="product.id">{{product.nome}}</option>
                            </select>
                        </base-input>
                        <base-input class="col-md-3" type="number" label="Quantidade" placeholder="Quantidade" v-model="quantidade"/>
                    </div>
                    <base-button class="animation-on-hover" type="success" @click="register">Cadastrar</base-button>
                </form>
            </div>
        </card>
    </div>
</template>

<script>

    import BaseAlert from "@/components/BaseAlert";
    import BaseButton from "@/components/BaseButton";
    import Modal from '@/components/Modal';
    import api from '@/services/api';
    export default {
        created(){
            api.get("/product").then(res => {
                this.products = res.data;
                this.produto = this.products[0].nome;
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        },
        data(){
            return {
                newItemlVisible: false,
                products: [],
                produto: '',
                quantidade: null,
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            Modal
        },
        methods: {
            register(){
                api.post("/product",{
                    material: this.produto,
                    quantidade: this.quantidade
                }).then(res => {
                    console.log(res);
                    this.$router.push({name: 'login'});
                }).catch(err => {
                    var msgErro = err.response.data.err;
                    this.error = msgErro;
                })
            }
        }
    }
</script>

<style scoped>

</style>
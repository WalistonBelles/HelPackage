<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77; text-align: center;">Análise de Vendas</h2>    
        <hr>
        <card>
            <form style="text-align: center;">
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row">
                    <base-input class="col-md-3" label="Selecione o Período">
                        <select id="inputState" class="form-control" v-model="periodo">
                            <option> Ultimos 30 Dias </option>
                            <option> Ultimos 60 Dias </option>
                            <option> Ultimos 120 Dias </option>
                            <option> Ultimo Ano </option>
                        </select>
                    </base-input>
                    <base-input class="col-md-3" label="Status">
                        <select id="inputState" class="form-control" v-model="s_status">
                            <option> Todos </option>
                            <option> Compra </option>
                            <option> Vendas </option>
                        </select>
                    </base-input>
                    <base-input class="col-md-3" label="Limite de Retorno">
                        <select id="inputState" class="form-control" v-model="limite">
                            <option> 10 </option>
                            <option> 30 </option>
                            <option> Todos </option>
                        </select>
                    </base-input>
                </div>
                <base-button round type="success" @click="filtrar()">
                    Buscar
                </base-button>
            </form>
            <br><br>
            <div v-if="newItemlVisible == true">
                <h2 style="text-align: center;">Análise de Transações</h2>
                <table class="table table-hover" v-if="products.length > 0">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Data</th>
                            <th scope="col" class="text-center">Quantidade</th>
                            <th scope="col" class="text-center">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products" :key="product.id">
                            <td>{{product.Nome}}</td>
                            <td>{{product.Data}}</td>
                            <td class="text-center"><p class="text-success">{{product.quantidade}}</p></td>
                            <td class="text-center">{{product.Valor}}</td>
                        </tr>
                    </tbody>
                </table>
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
        data(){
            return {
                newItemlVisible: false,
                periodo: 'Ultimos 30 Dias',
                idPeriodo: 0,
                idStatus: 0,
                idLimite: 0,
                s_status: 'Vendas',
                limite: '10',
                products: [],
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            Modal
        },
        methods: {
            filtrar(){
                switch (this.periodo) {
                    case 'Ultimos 30 Dias':
                        this.idPeriodo = 0;
                        break;
                    case 'Ultimos 60 Dias':
                        this.idPeriodo = 1;
                        break;
                    case 'Ultimos 120 Dias':
                        this.idPeriodo = 2;
                        break;
                    case 'Ultimo Ano':
                        this.idPeriodo = 3;
                        break;
                    default:
                        this.idPeriodo = 0;
                }
                switch (this.s_status) {
                    case 'Compra':
                        this.idStatus = 0;
                        break;
                    case 'Vendas':
                        this.idStatus = 1;
                        break;
                    default:
                        this.idStatus = 2;
                }
                switch (this.limite) {
                    case '10':
                        this.idLimite = 10;
                        break;
                    case '30':
                        this.idLimite = 30;
                        break;
                    default:
                        this.idLimite = 999;
                }
                api.post("/operations",{
                    periodo: this.idPeriodo,
                    status: this.idStatus,
                    limite: this.idLimite
                }).then(res => {
                    this.products = res.data;
                    this.newItemlVisible = true;
                    this.idPeriodo = 0;
                    this.error = undefined;
                }).catch(err => {
                    var msgErro = err.response.data.err;
                    this.error = msgErro;
                    this.newItemlVisible = false;
                    this.products = [];
                })
            }
        }
    }
</script>

<style scoped>

</style>
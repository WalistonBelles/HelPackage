<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77; text-align: center;">Lista de Itens em Estoque</h2>    
        <hr>
        <card>
            <form style="text-align: center;">
                <div class="form-row" style="text-align: center;">
                    <base-input class="col-md-3" type="text" placeholder="Pesquisar Material" v-model="busca"/>
                    <base-button round icon type="success" style="position: relative; top: -4px;" @click="buscar">
                        <i class="tim-icons icon-zoom-split"></i>
                    </base-button>
                </div>
            </form>
            <table class="table table-hover" v-if="filteredLists.length > 0">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Valor Unitário</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Estoque de Segurança</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredLists" :key="item.id">
                        <td>{{item.nome}}</td>
                        <td>R$ {{item.vu}}</td>
                        <td>R$ {{item.vt}}</td>
                        <td>
                            <p class="text-danger" v-if="item.quantidade < item.es">{{item.quantidade}}</p>
                            <p class="text-warning " v-else-if="item.quantidade <= ( item.es * 1.1)">{{item.quantidade}}</p>
                            <p class="text-success" v-else>{{item.quantidade}}</p>
                        </td>
                        <td>{{item.es}}</td>
                    </tr>
                </tbody>
            </table>
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
            api.get("/item").then(res => {
                this.itens = res.data;
                this.filteredLists = res.data;
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
                this.itens = undefined;
            })
        },
        data(){
            return {
                itens: [],
                filteredLists: [],
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            Modal
        },
        methods: {
            buscar: function(){
                this.filteredLists = this.lists;
                if(this.busca == '' || this.busca == ' '){
                    this.filteredLists = this.lists;
                }else {
                    this.filteredLists = this.lists.filter(lists => lists.cod == this.busca);
                }
            }
        }
    }
</script>

<style scoped>

</style>
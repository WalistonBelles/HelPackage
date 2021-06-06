<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77; text-align: center;">Classificação dos Materiais</h2>    
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
                    <th scope="col">CÓDIGO</th>
                    <th scope="col">DESCRIÇÃO</th>
                    <th scope="col">UNIDADE</th>
                    <th scope="col">GRUPO</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="list in filteredLists" :key="list.id">
                    <td>{{list.cod}}</td>
                    <td>{{list.desc}}</td>
                    <td>{{list.descricao}}</td>
                    <td>{{list.grup}}</td>
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
            api.get("/material").then(res => {
                this.lists = res.data;
                this.filteredLists = res.data;
            }).catch(err => {
                var msgErro = err.response.data.err;
                this.error = msgErro;
                this.lists = undefined;
            })
        },
        data(){
            return {
                lists: [],
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
<template>
    <div style="text-align: center;">
        <h2 style="color: #122c77; text-align: center;">Manusear Produto</h2>    
        <hr>
        <card>
            <form style="text-align: center;">
                <div v-if="error != undefined">
                    <base-alert type="warning">
                        <strong>Alerta!</strong> {{error}}!
                    </base-alert>
                </div>
                <div class="form-row" style="text-align: center;">
                    <base-input class="col-md-3" type="text" placeholder="Pesquisar Material" v-model="busca"/>
                    <base-button round icon type="success" style="position: relative; top: -4px;" @click="buscar">
                        <i class="tim-icons icon-zoom-split"></i>
                    </base-button>
                </div>
            </form>
            <div v-if="newItemlVisible == true">
                <h2 style="text-align: center;">Atualizar Produto</h2>    
                <hr>
                <form>
                    <div class="form-row" style="text-align: center;">
                        <base-input class="col-md-3" label="Nome" type="text" v-model="nome"/>
                        <base-input class="col-md-6" label="Descrição" type="text" v-model="descricao"/>
                        <base-input class="col-md-3" label="Grupo">
                            <select id="inputState" class="form-control" v-model="grupo">
                                <option>A</option>
                                <option>B</option>
                                <option>C</option>
                            </select>
                        </base-input>
                    </div>
                    <base-button class="animation-on-hover" type="success" @click="update">Atualizar</base-button>
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
        data(){
            return {
                newItemlVisible: false,
                nome: '',
                descricao: '',
                grupo: '',
                busca: '',
                codigo: '',
                material: [],
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            Modal
        },
        methods: {
            buscar(){
                api.post("/material",{
                    codigo: this.busca
                }).then(res => {
                    this.material = res.data;
                    this.nome = this.material[0].nome;
                    this.descricao = this.material[0].descricao;
                    this.grupo = this.material[0].grupo;
                    this.codigo = this.material[0].codigo;
                    this.newItemlVisible = true;
                    this.error = undefined;
                }).catch(err => {
                    var msgErro = err.response.data.err;
                    this.error = msgErro;
                    this.newItemlVisible = false;
                })
            },
            update(){
                api.post("/materialUpdate",{
                    codigo: this.codigo, 
                    nome: this.nome, 
                    descricao: this.descricao, 
                    grupo: this.grupo
                }).then(res => {
                   this.$router.push({name: 'dashboard'});
                }).catch(err => {
                    var msgErro = err.response.data.err;
                    this.error = msgErro;
                    this.newItemlVisible = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>
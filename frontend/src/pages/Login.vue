<template>
    <div style="text-align: center;" class="container">
        <h2 style="color: #122c77; text-align: center; font-size:"> Login</h2>    
        <hr>
        
        <div class="container">
            <div class="row">
                <div class="col-sm">
                </div>
                <div class="col-sm">
                    <div class="col-md-6">
                        <base-button class="animation-on-hover" type="success" @click="loginModalVisible = true">Login</base-button>
                        <modal :show.sync="loginModalVisible"
                            body-classes="p-0"
                            modal-classes="modal-sm"
                            id="loginModal"
                            :show-close="true">
                        <card type="secondary"
                                header-classes="bg-white pb-5"
                                body-classes="px-lg-5 py-lg-5"
                                class="border-0 mb-0">
                            <template>
                                <div class="text-muted text-center mb-3">
                                    <small>Sign in with</small>
                                </div>
                                <div class="btn-wrapper text-center">
                                    <base-button type="default">
                                        <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/github.svg">
                                        Github
                                    </base-button>

                                    <base-button type="danger">
                                        <img slot="icon" src="https://demos.creative-tim.com/argon-design-system/assets/img/icons/common/google.svg">
                                        Google
                                    </base-button>
                                </div>
                            </template>
                            <template>
                                <div class="text-center text-muted mb-4">
                                    <small>Or sign in with credentials</small>
                                </div>
                                <form role="form">
                                    <base-input alternative
                                                type="text"
                                                class="mb-3"
                                                placeholder="Usuario"
                                                addon-left-icon="ni ni-email-83" v-model="usuario">
                                    </base-input>
                                    <base-input alternative
                                                type="password"
                                                placeholder="Senha"
                                                addon-left-icon="ni ni-lock-circle-open" v-model="senha">
                                    </base-input>
                                    <base-checkbox>
                                        Lembrar-me
                                    </base-checkbox>
                                    <div v-if="error != undefined">
                                        <base-alert type="warning">
                                            <strong>Alerta!</strong> {{error}}!
                                        </base-alert>
                                    </div>
                                    <div class="text-center">
                                        <base-button type="success" class="my-4" @click="login">Acessar</base-button>
                                    </div>
                                </form>
                            </template>
                        </card>
                        </modal>
                    </div>
                </div>
                <div class="col-sm">
                </div>
            </div>
        </div>
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
                usuario: '',
                senha: '',
                loginModalVisible: false,
                error: undefined,
            }
        },
        components: {
            BaseAlert,
            BaseButton,
            Modal
        },
        methods: {
            login(){
                api.post("/login",{
                    user: this.usuario,
                    password: this.senha
                }).then(res => {
                    localStorage.setItem('token',res.data.token);
                    if(res.data.cargo >= 3){
                        this.$router.push({name: 'dashboard'});
                    }else{
                        this.$router.push({name: 'login'});
                    }
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
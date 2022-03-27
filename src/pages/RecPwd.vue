<template>
    <login/>

    <!--ACCOUNT CREATED DIALOG-->
    <Dialog v-model:visible="dialogSuccess.display" :closable="false" class="dialog-success dialog-login" :draggable="false" :modal="true">
        <template #header :class="colorHeader">
        <h3>Contraseña reestablecida</h3>
        </template>
        <div class="text-center">
        <p>Ya puede loguearse en su cuenta con su nueva contraseña</p>
        <Button type="submit" label="Aceptar" v-on:click="dialogSuccess.display = false" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
        </div>
    </Dialog>

    <Dialog v-model:visible="dialog.display" :closable="false" class="dialog-recpwd dialog-login" :draggable="false" :modal="true">
        <template #header :class="colorHeader">
            <div class="grid m-auto text-center">
                <img alt="Logo" class="m-auto logo-size mt-3 mb-1" :src="loginImage()" />
                <div class="col-12 m-auto mb-1">
                    <h3 class="text-center"> Xiangqi Online </h3> 
                </div>
            </div>
        </template>

        <!--VUELIDATE-->
        <div class="flex justify-content-center">
            <div class="card" style="width: 440px">
                <h4 class="text-center mt-3">Reestablecer contraseña</h4>
                <!--FIELD-->
                <form @submit.prevent="handleSubmit(!vRecPwd$.$invalid)" class="p-fluid">
                    <!--PASSWORD-->
                    <div class="field"> 
                        <label for="password" :class="{'p-error':(vRecPwd$.password.$invalid && submitted) || (vRecPwd$.password.$invalid && vRecPwd$.password.$model != '')}">Contraseña</label>
                        <div class="p-inputgroup">
                        <Password id="password" v-model="password" :class="{'p-invalid':(vRecPwd$.password.$invalid && submitted) || (vRecPwd$.password.$invalid && vRecPwd$.password.$model != '')}" toggleMask>
                            <template #header>
                            <h6>Elija una contraseña</h6>
                            </template>
                            <template #footer="sp">
                            {{sp.level}}
                            <Divider />
                                <small v-if="(vRecPwd$.password.$invalid && vRecPwd$.password.$model == '' && submitted) || vRecPwd$.password.$pending.$response" class="p-error">{{vRecPwd$.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                                <small v-else-if="(vRecPwd$.password.$invalid && vRecPwd$.password.$model != '' && vRecPwd$.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                                <small v-else-if="(vRecPwd$.password.$invalid && vRecPwd$.password.$model != '')" class="p-error"> {{vRecPwd$.password.alpha.$message}} </small>
                                <p class="mt-2">Obligatorio</p>
                                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                <li>Debe contener 8 caracteres como mínimo</li>
                                <li>Debe contener mayúsculas</li>
                                <li>Debe contener minúsculas</li>
                                <li>Debe contener números</li>
                            </ul>
                            </template>
                        </Password>
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        </div>
                        <small v-if="(vRecPwd$.password.$invalid && vRecPwd$.password.$model == '' && submitted) || vRecPwd$.password.$pending.$response" class="p-error">{{vRecPwd$.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                        <small v-else-if="(vRecPwd$.password.$invalid && vRecPwd$.password.$model != '' && vRecPwd$.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                        <small v-else-if="(vRecPwd$.password.$invalid && vRecPwd$.password.$model != '')" class="p-error"> {{vRecPwd$.password.alpha.$message}} </small>
                    </div>
                    <!--PASSWORD-->
                    <div class="field">
                        <label for="confPassword" :class="{'p-error':(vRecPwd$.confPassword.$invalid && submitted) || (vRecPwd$.password.$model != vRecPwd$.confPassword.$model)}">Confirmar contraseña</label>
                        <div class="p-inputgroup">
                        <Password id="confPassword" v-model="confPassword" :feedback="false" :class="{'p-invalid':(vRecPwd$.confPassword.$invalid && submitted) || (vRecPwd$.password.$model != vRecPwd$.confPassword.$model)}" toggleMask></Password>
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-key"></i>
                        </span>
                        </div>
                        <small v-if="(vRecPwd$.confPassword.$invalid && submitted) || vRecPwd$.confPassword.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                        <small v-else-if="(vRecPwd$.password.$model != vRecPwd$.confPassword.$model && submitted)" class="p-error">{{'Las contraseñas no coinciden'}}</small>
                    </div>
                    <Button type="submit" label="Reestablecer contraseña" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
                </form>
            </div>
        </div>
    </Dialog>
</template>

<script>
import login from '../pages/Login.vue';
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, helpers } from "@vuelidate/validators";

//Debe contener al menos mayusculas, minusculas y numeros [0-9]{2} le fuerza a q sean 2 numeros
const alpha = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/);

export default {
    setup () {
    return {
        vRecPwd$: useVuelidate(),
        }
    },
    components: {
      login,
    },
    data() {
        return {
            dialog: {
                display: true,
            },
            dialogSuccess: {
                display: false,
            },
            submitted: false,
            password: '',
            confPassword: '',
        }
    },
    methods: {
        loginImage() {
            return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
        },
        /*
        * Funcion que se ejecuta al hacer click en crear cuenta.
        * Solo ejecuta algo si la form de login es valida.     
        */
        handleSubmit() {
            this.submitted = true;
            if (this.vRecPwd$.password.$invalid || this.vRecPwd$.confPassword.$invalid) {
            return;
            }
            // La form ha sido validada correctamente en front

            //this.$accountscount(this.vRecPwd$.nickname.$model, this.vRecPwd$.name.$model, this.vRecPwd$.email.$model, this.vRecPwd$.date.$model, this.vRecPwd$.country.$model, this.vRecPwd$.password.$model,this.Images).then(success => { //this.image
            //if (success) {
                this.dialog.display = false;
                this.dialogSuccess.display = true;
            //});
        },
    },
    validations() {
        return {
        //para que autotrackee el estado $dirty
        "$autoDirty": true,
        //que no autovalide hasta que le meta algo osea hasta que $dirty, lo quito porque da problemas (deja enviar forms vacias)
        //"$lazy": true,
        password: { required, min: minLength(8), alpha: helpers.withMessage('Debe contener al menos mayusculas, minusculas y números', alpha) },
        confPassword: { required },
        }
    },
}
</script>

<style>
.dialog-recpwd {
  width: 550px;
  height: 560px;
}
.dialog-success {
  width: 450px;
  height: 210px;
}
</style>
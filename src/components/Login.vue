<!--BOTÓN Y DIALOGO PARA CREAR UNA CUENTA-->
<template>
  <Dialog v-model:visible="dialog.accountCreated" class="dialog-account-created dialog-login" :draggable="false" :modal="true">
      <template #header :class="colorHeader">
        <h3>Cuenta creada correctamente.</h3>
      </template>
      <div class="text-center">
        <p class="">Por favor, revise su correo electrónico para verificar su cuenta</p>
        <Button type="submit" label="Aceptar" v-on:click="successfullyCreated()" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
      </div>
  </Dialog>
  <Button v-on:click="displayLoginWdw()" class="p-button-raised font-semibold h-3rem" style="border-radius: 1rem" label=" Iniciar sesión o crear cuenta " icon="" iconPos="right" />
  <Dialog v-model:visible="dialog.display" :draggable="false" :modal="true" class="dialog-login" :class="{ 'altura': dialog.isActive, 'alturaMax': dialog.isActiveMax, 'alturaErr': login.failed }">
    <template #header :class="colorHeader">
      <div class="grid" style="margin-right: -28px;">
        <img alt="Logo" class="m-auto logo-size mt-3 mb-1" :src="loginImage()" />
        <div class="col-12 m-auto mb-1">
          <h3 class="text-center"> Xiangqi Online </h3> 
        </div>
        <div class="m-auto mb-3">
          <Button class="p-button-outlined p-button-rounded mr-3 h-3rem" style="border-radius: 1rem" v-on:click="selectedTab('LogIn'), resize('LogIn'), resetFormLog();" label="Iniciar sesión" autofocus/>
          <Button class="p-button-outlined p-button-rounded h-3rem" style="border-radius: 1rem" v-on:click="selectedTab('SignUp'), resize('SignUp'), resetForm()" label="Crear una cuenta" />
        </div>
      </div>
    </template>
    <div id="LogIn" class="w3-container tabTypeJS">
      <!--VUELIDATE-->
      <div class="flex justify-content-center">
          <div class="card" style="width: 440px">
              <!--FIELD-->
              <h4 class="text-center mt-3"> {{dialog.texto}} </h4>
              <Message v-if="login.failed" severity="error" :closable="false">Algún dato introducido no es correcto</Message>
              <form @submit.prevent="handleSubmitLog(!v$.$invalid)" class="p-fluid">
                <!--EMAIL-->
                <div class="field">
                  <label for="emailLog" :class="{'p-error':v$.login.email.$invalid}">Email</label>
                  <div class="p-inputgroup">
                    <InputText id="emailLog" placeholder="cuenta@correo.com" v-model="login.email" :class="{'p-invalid':v$.login.email.$invalid}" aria-describedby="email-error"/>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-envelope"></i>
                    </span>
                  </div>
                  <span v-if="v$.login.email.$error">
                      <span id="email-error" v-for="(error, index) of v$.login.email.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                      </span>
                  </span>
                  <small v-else-if="(v$.login.email.$invalid) || v$.login.email.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
                </div>
                <!--PASSWORD-->
                <div class="field">
                  <label for="passwordLog" :class="{'p-error':(v$.login.password.$invalid) || (v$.login.password.$invalid && v$.login.password.$model != '')}">Contraseña</label>
                  <div class="p-inputgroup">
                    <Password id="passwordLog" v-model="login.password" :feedback="false" :class="{'p-invalid':(v$.login.password.$invalid) || (v$.login.password.$invalid && v$.login.password.$model != '')}" ></Password>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-key"></i>
                    </span>
                  </div>
                  <small v-if="(v$.login.password.$invalid && v$.login.password.$model == '') || v$.login.password.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                  <!--<span id="pwd-error" v-for="(error, index) of v$.passwordLog.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                  </span>-->
                </div>
                <div class="field flex justify-content-center">
                  <a href="">¿Has olvidado tu contraseña?</a>
                </div>
                <Button type="submit" label="Iniciar sesión" class="mt-2 mb-6 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
              </form>
          </div>
      </div>
    </div>

    <div id="SignUp" class="w3-container tabTypeJS" style="display:none">
      <!--VUELIDATE-->
      <div class="flex justify-content-center">
          <div class="card" style="width: 440px">
              <!--FIELD-->
              <h4 class="text-center mt-3"> {{dialog.texto}} </h4>
              <Message v-if="createAc.failed" severity="error" :closable="false">El correo introducido ya existe</Message>
              <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                  <!--NICKNAME-->
                  <div class="field">
                    <label for="nickname" :class="{'p-error':(v$.createAc.nickname.$invalid) || (v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')}">Nombre de usuario</label>
                    <div class="p-inputgroup">
                      <InputText id="nickname" placeholder="Nombre de usuario" v-model="createAc.nickname" :class="{'p-invalid':(v$.createAc.nickname.$invalid) || (v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')}" />
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-id-card"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.nickname.$invalid && v$.createAc.nickname.$model == '') || v$.createAc.nickname.$pending.$response" class="p-error">{{'Por favor, indique un nombre de usuario'}}</small>
                    <small v-else-if="(v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')" class="p-error">{{'El nombre de usuario no puede tener más de 15 caracteres'}}</small>
                  </div>
                  <!--NAME-->
                  <div class="field">
                    <label for="name" :class="{'p-error':v$.createAc.name.$invalid}">Nombre completo</label>
                      <div class="p-inputgroup">
                      <InputText id="name" placeholder="Nombre Apellido" v-model="createAc.name" :class="{'p-invalid':v$.createAc.name.$invalid}" />
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.name.$invalid) || v$.createAc.name.$pending.$response" class="p-error">{{'Por favor, indique su nombre'}}</small>
                  </div>
                  <!--EMAIL-->
                  <div class="field">
                    <label for="email" :class="{'p-error':v$.createAc.email.$invalid}">Email</label>
                    <div class="p-inputgroup">
                      <InputText id="email" placeholder="cuenta@correo.com" v-model="v$.createAc.email.$model" :class="{'p-invalid':v$.createAc.email.$invalid}" aria-describedby="email-error"/>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-envelope"></i>
                      </span>
                    </div>
                    <span v-if="v$.createAc.email.$error">
                        <span id="email-error" v-for="(error, index) of v$.createAc.email.$errors" :key="index">
                          <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>
                    <small v-else-if="(v$.createAc.email.$invalid) || v$.createAc.email.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
                  </div>
                  <!--BIRTHDAY-->
                  <div class="field">
                    <label for="date" :class="{'p-error':v$.createAc.date.$invalid}">Fecha de nacimiento</label>
                    <Calendar id="date" placeholder="01/01/2000" v-model="createAc.date" :showIcon="true" :class="{'p-invalid':v$.createAc.date.$invalid}"/>
                    <small v-if="(v$.createAc.date.$invalid) || v$.createAc.date.$pending.$response" class="p-error">{{'Por favor, indique su fecha de nacimiento'}}</small>
                  </div>
                  <!--COUNTRY-->
                  <div class="field">
                    <label for="country" :class="{'p-error':v$.createAc.country.$invalid}">Seleccione su país de residencia</label>
                    <div class="p-inputgroup">
                      <Dropdown id="country" v-model="createAc.country" :options="countries" optionLabel="name" :filter="true" placeholder="Seleccione su país" :showClear="true" :class="{'p-invalid':v$.createAc.country.$invalid}">
                        <template #value="slotProps">
                          <div id="country-item" class="country-item country-item-value" v-if="slotProps.value">
                            <img src="images/flag_placeholder.png" :class="'flag flag-' + slotProps.value.code.toLowerCase()" />
                            {{slotProps.value.name}}
                          </div>
                          <span v-else>
                            {{slotProps.placeholder}}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item">
                            <img src="images/flag_placeholder.png" :class="'flag flag-' + slotProps.option.code.toLowerCase()" />
                              {{slotProps.option.name}}
                          </div>
                        </template>
                      </Dropdown>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-globe"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.country.$invalid) || v$.createAc.country.$pending.$response" class="p-error">{{'Por favor, indique su país de residencia'}}</small>
                  </div>
                  <!--PICTURE-->
                  <div class="field"> 
                    <label for="imagen">Foto de perfil</label>
                    <div class="p-inputgroup">
                      <FileUpload id="image" v-model="createAc.image" style="width: 440px !important" @change="uploadFile" ref="file" mode="basic" url="./upload" :maxFileSize="1000000" accept="image/*"/>
                    </div>
                  </div>
                  <!--PASSWORD-->
                  <div class="field"> 
                    <label for="password" :class="{'p-error':(v$.createAc.password.$invalid) || (v$.createAc.password.$invalid && v$.createAc.password.$model != '')}">Contraseña</label>
                    <div class="p-inputgroup">
                      <Password id="password" v-model="createAc.password" :class="{'p-invalid':(v$.createAc.password.$invalid) || (v$.createAc.password.$invalid && v$.createAc.password.$model != '')}" toggleMask>
                        <template #header>
                          <h6>Elija una contraseña</h6>
                        </template>
                        <template #footer="sp">
                          {{sp.level}}
                          <Divider />
                            <small v-if="(v$.createAc.password.$invalid && v$.createAc.password.$model == '') || v$.createAc.password.$pending.$response" class="p-error">{{v$.createAc.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                            <small v-else-if="(v$.createAc.password.$invalid && v$.createAc.password.$model != '' && v$.createAc.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                            <small v-else-if="(v$.createAc.password.$invalid && v$.createAc.password.$model != '')" class="p-error"> {{v$.createAc.password.alpha.$message}} </small>
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
                    <small v-if="(v$.createAc.password.$invalid && v$.createAc.password.$model == '') || v$.createAc.password.$pending.$response" class="p-error">{{v$.createAc.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                    <small v-else-if="(v$.createAc.password.$invalid && v$.createAc.password.$model != '' && v$.createAc.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                    <small v-else-if="(v$.createAc.password.$invalid && v$.createAc.password.$model != '')" class="p-error"> {{v$.createAc.password.alpha.$message}} </small>
                  </div>
                  <!--PASSWORD-->
                  <div class="field">
                    <label for="confPassword" :class="{'p-error':(v$.createAc.confPassword.$invalid) || (v$.createAc.password.$model != v$.createAc.confPassword.$model)}">Confirmar contraseña</label>
                    <div class="p-inputgroup">
                      <Password id="confPassword" v-model="createAc.confPassword" :feedback="false" :class="{'p-invalid':(v$.createAc.confPassword.$invalid) || (v$.createAc.password.$model != v$.createAc.confPassword.$model)}" toggleMask></Password>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-key"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.confPassword.$invalid) || v$.createAc.confPassword.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                    <small v-else-if="(v$.createAc.password.$model != v$.createAc.confPassword.$model)" class="p-error">{{'Las contraseñas no coinciden'}}</small>
                  </div>
                  <!--CONDICIONES-->
                  <div class="field-checkbox">
                    <Checkbox id="accept" name="accept" value="Accept" v-model="createAc.accept" :class="{'p-invalid':v$.createAc.accept.$invalid}" />
                    <label for="accept" :class="{'p-error': v$.createAc.accept.$invalid}">Acepto los términos y condiciones</label>
                  </div>
                  <Button type="submit" label="Crear cuenta" class="mt-2 mb-6 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
              </form>
          </div>
      </div>
    </div>
    <template #footer>
    </template>
  </Dialog>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, maxLength, helpers } from "@vuelidate/validators";
//import io from "socket.io-client"
//Debe contener al menos mayusculas, minusculas y numeros [0-9]{2} le fuerza a q sean 2 numeros
const alpha = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/);

export default {
  //Inyectar el modulo de cuentas definido en main.js
  inject: ['$accounts'],

  setup () {
    return {
      v$: useVuelidate()
    }
  },
  created(){
      //this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3000")
      //this.socket.on('connect', () =>{})
  },
  methods: {
    uploadFile() {
      console.log("UPLOAD")
      this.Images = this.$refs.file.files[0];
      console.log(this.Images)
    },
    loginImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
    successfullyCreated() {
      this.dialog.accountCreated = false;
    },
    //vuelidate
    handleSubmit() {
      // La form de crear cuenta no es valida
      if (this.v$.createAc.email.$invalid || this.v$.createAc.password.$invalid || this.v$.createAc.confPassword.$invalid || this.v$.createAc.nickname.$invalid || this.v$.createAc.date.$invalid || this.v$.createAc.country.$invalid || this.v$.createAc.accept.$invalid || this.v$.createAc.name.$invalid) { //|| this.v$.imagen.$invalid) {
        return;
      }
      // La form de crear cuenta es valida
      // Usar el metodo createAccount del servicio (/src/services/account.js) con los parametros definidos en v-model
      this.$accounts.createAccount(this.v$.createAc.nickname.$model, this.v$.createAc.name.$model, this.v$.createAc.email.$model, this.v$.createAc.date.$model, this.v$.createAc.country.$model, this.v$.createAc.password.$model).then(success => { //this.createAc.image
        console.log("EL SUCESO", success);
        if (success) {
          this.dialog.display = false;
          this.dialog.accountCreated = true;
        } else {
          //El email ya estaba registrado
          this.createAc.failed = true;
        }
      });
    },
    handleSubmitLog() {
      // La form de iniciar sesion no es valida
      if (this.v$.login.email.$invalid || this.v$.login.password.$invalid) {
        return;
      } 
      // La form de iniciar sesion es valida
      this.$accounts.login(this.v$.login.email.$model, this.v$.login.password.$model).then(success => {
        if (success) {
          this.dialog.display = false;
          this.$router.push('/profile');
          this.$loggedStatus.logged = true;
        } else {
          this.login.altura = false;
          this.login.failed = true;
          return
        }
      }); 
    },
    resetForm() {
      //Resetear las validaciones
      this.$nextTick(() => { this.v$.$reset() });
      this.createAc.nickname = '';
      this.createAc.name = '';
      this.createAc.email = '';
      this.createAc.password = '';
      this.createAc.confPassword = '';
      this.createAc.imagen = '';
      this.createAc.date = null;
      this.createAc.country = null;
      this.createAc.accept = null;
      this.createAc.failed = false;
    },
    resetFormLog() {
      //Resetear las validaciones
      this.$nextTick(() => { this.v$.$reset() });
      this.login.email = '';
      this.login.password = '';
      this.login.failed = false;
    },
    displayLoginWdw() {
      this.dialog.display = true;
      this.dialog.isActive = true;
      this.dialog.isActiveMax = false;
      this.dialog.texto = "Iniciar sesión";
      this.login.failed = false;
      this.createAc.failed = false;
      this.resetForm();
      this.resetFormLog();
    },
    resize(tabName) {
      if (tabName == "SignUp") {
        this.dialog.isActive = false;
        this.dialog.isActiveMax = true;
        this.dialog.texto = "Crear una cuenta";
      } else {
        this.dialog.isActive = true;
        this.dialog.isActiveMax = false;
        this.dialog.texto = "Iniciar sesión";
      }
    },
    selectedTab(tabName) {
      var i;
      var x = document.getElementsByClassName("tabTypeJS");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";  
      }
      document.getElementById(tabName).style.display = "block";  
    },
  },
  data() {
    return {
      //vuelidate
      dialog: {
        accountCreated: false,
        display: false,
        texto: '',
        isActive: true,
        isActiveMax: false,
      },
      login: {
        email: '',
        password: '',
        failed: false,
      },
      createAc: {
        name: '',
        email: '',
        password: '',
        confPassword: '',
        nickname: '',
        image: null,
        date: null,
        country: null,
        accept: null,
        failed: false,
      },
      Images: '',
      countries: [
          {name: 'Australia', code: 'AU'},
          {name: 'Brazil', code: 'BR'},
          {name: 'China', code: 'CN'},
          {name: 'Egypt', code: 'EG'},
          {name: 'France', code: 'FR'},
          {name: 'Germany', code: 'DE'},
          {name: 'India', code: 'IN'},
          {name: 'Japan', code: 'JP'},
          {name: 'Spain', code: 'ES'},
          {name: 'United States', code: 'US'}
      ],
    }
  },
  //vuelidate
  validations() {
    return {
      //para que autotrackee el estado $dirty
      "$autoDirty": true,
      //que no autovalide hasta que le meta algo osea hasta que $dirty
      "$lazy": true,
      login: {
        email: { 
          required: helpers.withMessage('Por favor, especifique una dirección de correo electrónico', required), 
          email: helpers.withMessage('El correo introducido no es válido', email) 
        },
        password: { 
          required 
        },
      },
      createAc: {
        nickname: { required, max: maxLength(15) },
        name: { required },
        email: { required: helpers.withMessage('Por favor, especifique una dirección de correo electrónico', required), email: helpers.withMessage('El correo introducido no es válido', email) },
        date: { required },
        password: { required, min: minLength(8), alpha: helpers.withMessage('Debe contener al menos mayusculas, minusculas y números', alpha) },
        confPassword: { required },
        country: { required },
        accept: { required },
      },
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
}

body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}

/* DIALOG */
.dialog-login {
  background-color: var(--surface-a); /* Get el current background del tema */
  border-radius: 15px;
  animation-duration: 0.6s;
  animation-name: lineIns derted;
  transition: height 0.6s, width 0.6s;
}

.dialog-account-created {
  width: 450px;
  height: 210px;
}

.altura {
  width: 540px;
  height: 620px;
}

.alturaMax {
  width: 540px;
  height: 940px;
}

.alturaErr {
  width: 540px;
  height: 720px;
}

@media screen and (max-width: 600px) {
  .altura {
    width: 380px;
  }
  .alturaMax {
    width: 380px;
  }
}

.p-dialog-header {
    border-top-right-radius: 15px !important;
    border-top-left-radius: 15px !important;
    padding-bottom: 1.5rem !important;
    border-bottom: 1px solid !important;
    border-bottom-color: rgba(123, 123, 123, 0.3) !important;
    box-shadow: 0 1px 6px rgba(123, 123, 123, 0.2) !important;
}

.p-dialog-content {
  padding: 1rem !important;
}

.p-dialog-footer {
  border-bottom-right-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
}

/* Botón X en Dialog que salga arriba a la izda */
.p-dialog-header-icons {
  margin-bottom: auto;
}

/* Tamño del logo en Dialog */
.logo-size {
  width: 100px;
  height: 100px;
}

</style>
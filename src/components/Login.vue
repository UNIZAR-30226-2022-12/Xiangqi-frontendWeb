<!--BOTÓN Y DIALOGO PARA CREAR UNA CUENTA-->
<template>
  <Button v-on:click="displayLoginWdw()" class="p-button-raised font-semibold h-3rem" style="border-radius: 1rem" label=" Iniciar sesión o crear cuenta " icon="" iconPos="right" />
  <Dialog v-model:visible="display" :draggable="false" :modal="true" :class="{ 'altura': isActive, 'alturaMax': isActiveMax }"> <!--v-model:visible asociado con variable contentStyle="padding: 0px;"-->
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
              <h4 class="text-center mt-3"> {{texto}} </h4>
              <form @submit.prevent="handleSubmitLog(!v$.$invalid)" class="p-fluid">
                <!--EMAIL-->
                <div class="field">
                  <label for="emailLog" :class="{'p-error':v$.emailLog.$invalid && submittedLog}">Email</label>
                  <div class="p-inputgroup">
                    <InputText id="emailLog" placeholder="cuenta@correo.com" v-model="v$.emailLog.$model" :class="{'p-invalid':v$.emailLog.$invalid && submittedLog}" aria-describedby="email-error"/>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-envelope"></i>
                    </span>
                  </div>
                  <span v-if="v$.emailLog.$error && submittedLog">
                      <span id="email-error" v-for="(error, index) of v$.emailLog.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                      </span>
                  </span>
                  <small v-else-if="(v$.emailLog.$invalid && submittedLog) || v$.emailLog.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
                </div>
                <!--PASSWORD-->
                <div class="field">
                  <label for="passwordLog" :class="{'p-error':(v$.passwordLog.$invalid && submittedLog) || (v$.passwordLog.$invalid && v$.passwordLog.$model != '')}">Contraseña</label>
                  <div class="p-inputgroup">
                    <Password id="passwordLog" v-model="v$.passwordLog.$model" :feedback="false" :class="{'p-invalid':(v$.passwordLog.$invalid && submittedLog) || (v$.passwordLog.$invalid && v$.passwordLog.$model != '')}" ></Password>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-key"></i>
                    </span>
                  </div>
                  <small v-if="(v$.passwordLog.$invalid && submittedLog && v$.passwordLog.$model == '') || v$.passwordLog.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                  <span id="pwd-error" v-for="(error, index) of v$.passwordLog.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                  </span>
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
              <h4 class="text-center mt-3"> {{texto}} </h4>
              <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                  <!--NICKNAME-->
                  <div class="field">
                    <label for="nickname" :class="{'p-error':(v$.nickname.$invalid && submitted) || (v$.nickname.$invalid && v$.nickname.$model != '')}">Nombre de usuario</label>
                    <div class="p-inputgroup">
                      <InputText id="nickname" placeholder="Nombre de usuario" v-model="v$.nickname.$model" :class="{'p-invalid':(v$.nickname.$invalid && submitted) || (v$.nickname.$invalid && v$.nickname.$model != '')}" />
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-id-card"></i>
                      </span>
                    </div>
                    <small v-if="(v$.nickname.$invalid && submitted && v$.nickname.$model == '') || v$.nickname.$pending.$response" class="p-error">{{'Por favor, indique un nombre de usuario'}}</small>
                    <small v-else-if="(v$.nickname.$invalid && v$.nickname.$model != '')" class="p-error">{{'El nombre de usuario no puede tener más de 15 caracteres'}}</small>
                  </div>
                  <!--NAME-->
                  <div class="field">
                    <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Nombre completo</label>
                      <div class="p-inputgroup">
                      <InputText id="name" placeholder="Nombre Apellido" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                      </span>
                    </div>
                    <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{'Por favor, indique su nombre'}}</small>
                  </div>
                  <!--EMAIL-->
                  <div class="field">
                    <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email</label>
                    <div class="p-inputgroup">
                      <InputText id="email" placeholder="cuenta@correo.com" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-envelope"></i>
                      </span>
                    </div>
                    <span v-if="v$.email.$error && submitted">
                        <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                          <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>
                    <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
                  </div>
                  <!--BIRTHDAY-->
                  <div class="field">
                    <label for="date" :class="{'p-error':v$.date.$invalid && submitted}">Fecha de nacimiento</label>
                    <Calendar id="date" placeholder="01/01/2000" v-model="date" :showIcon="true" :class="{'p-invalid':v$.date.$invalid && submitted}"/>
                    <small v-if="(v$.date.$invalid && submitted) || v$.date.$pending.$response" class="p-error">{{'Por favor, indique su fecha de nacimiento'}}</small>
                  </div>
                  <!--COUNTRY-->
                  <div class="field">
                    <label for="country" :class="{'p-error':v$.country.$invalid && submitted}">Seleccione su país de residencia</label>
                    <div class="p-inputgroup">
                      <Dropdown id="country" v-model="country" :options="countries" optionLabel="name" :filter="true" placeholder="Seleccione su país" :showClear="true" :class="{'p-invalid':v$.country.$invalid && submitted}">
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
                    <small v-if="(v$.country.$invalid && submitted) || v$.country.$pending.$response" class="p-error">{{'Por favor, indique su país de residencia'}}</small>
                  </div>
                  <!--PICTURE-->
                  <div class="field"> 
                    <label for="imagen">Foto de perfil</label> <!--:class="{'p-error':(v$.imagen.$invalid && submitted)}"-->
                    <div class="p-inputgroup">
                      <FileUpload id="imagen" style="width: 440px !important" @change="uploadFile" ref="file" mode="basic" url="./upload" :maxFileSize="1000000" accept="image/*"/>
                    </div>
                      <!--<small v-if="(v$.imagen.$invalid && submitted) || v$.imagen.$pending.$response" class="p-error">{{'Por favor, suba una foto de perfil'}}</small>-->
                  </div>
                  <!--PASSWORD-->
                  <div class="field"> 
                    <label for="password" :class="{'p-error':(v$.password.$invalid && submitted) || (v$.password.$invalid && v$.password.$model != '')}">Contraseña</label>
                    <div class="p-inputgroup">
                      <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':(v$.password.$invalid && submitted) || (v$.password.$invalid && v$.password.$model != '')}" toggleMask>
                        <template #header>
                          <h6>Elija una contraseña</h6>
                        </template>
                        <template #footer="sp">
                          {{sp.level}}
                          <Divider />
                            <small v-if="(v$.password.$invalid && submitted && v$.password.$model == '') || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                            <small v-else-if="(v$.password.$invalid && v$.password.$model != '' && v$.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                            <small v-else-if="(v$.password.$invalid && v$.password.$model != '')" class="p-error"> {{v$.password.alpha.$message}} </small>
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
                    <small v-if="(v$.password.$invalid && submitted && v$.password.$model == '') || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                    <small v-else-if="(v$.password.$invalid && v$.password.$model != '' && v$.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                    <small v-else-if="(v$.password.$invalid && v$.password.$model != '')" class="p-error"> {{v$.password.alpha.$message}} </small>
                  </div>
                  <!--PASSWORD-->
                  <div class="field">
                    <label for="confPassword" :class="{'p-error':((v$.confPassword.$invalid) || (v$.password.$model != v$.confPassword.$model)) && submitted}">Confirmar contraseña</label>
                    <div class="p-inputgroup">
                      <Password id="confPassword" v-model="v$.confPassword.$model" :feedback="false" :class="{'p-invalid':((v$.confPassword.$invalid) || (v$.password.$model != v$.confPassword.$model)) && submitted}" toggleMask></Password>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-key"></i>
                      </span>
                    </div>
                    <small v-if="(v$.confPassword.$invalid && submitted) || v$.confPassword.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                    <small v-else-if="(v$.password.$model != v$.confPassword.$model && submitted)" class="p-error">{{'Las contraseñas no coinciden'}}</small>
                  </div>
                  <!--CONDICIONES-->
                  <div class="field-checkbox">
                    <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
                    <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">Acepto los términos y condiciones</label>
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
import io from "socket.io-client"
//Debe contener al menos mayusculas, minusculas y numeros [0-9]{2} le fuerza a q sean 2 numeros
const alpha = helpers.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/);

export default {
  setup: () => ({ v$: useVuelidate() }),
  created(){
      this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3000")
      this.socket.on('connect', () =>{})
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
    //vuelidate
    handleSubmit() {
      this.submitted = true;
      this.v$.email.$touch();
      this.v$.password.$touch();
      this.v$.confPassword.$touch();
      this.v$.nickname.$touch();
      this.v$.date.$touch();
      this.v$.country.$touch();
      this.v$.accept.$touch();
      this.v$.name.$touch();
      //this.v$.imagen.$touch();

      //La form de crear cuenta no es valida
      if (this.v$.email.$invalid || this.v$.password.$invalid || this.v$.confPassword.$invalid || this.v$.nickname.$invalid || this.v$.date.$invalid || this.v$.country.$invalid || this.v$.accept.$invalid || this.v$.name.$invalid) { //|| this.v$.imagen.$invalid) {
        return;
      }
      //La form de crear cuenta es valida

      //obtenemos todos los valores introducidos
      var email = document.getElementById("email").value;
      console.log(email)
      var pwd = document.getElementById("password").value;
      console.log(pwd)
      var nickname = document.getElementById("nickname").value;
      console.log(nickname)
      var date = document.getElementById("date").value;
      console.log(date)
      var country = document.getElementById("country-item").textContent;
      console.log("---------------------")
      console.log(country)
      console.log("---------------------")
      var name = document.getElementById("name").value;
      console.log(name)
      this.socket.emit('register', {pwd: pwd, email: email, nickname: nickname, date: date, country: country, name: name, image: this.Images}, (result) => {
        console.log(result)
        if(result){//Login correcto hay que enviar un mail de confirmacion

        } else {
          //Login incorrecto NACHO, ponme feedback de que el correo ya esta registrado
        }
      }) 
      this.display = false;
    },
    handleSubmitLog() {
      this.submittedLog = true;
      console.log(this.v$.emailLog);
      this.v$.emailLog.$touch();
      console.log(this.v$.emailLog);
      this.v$.passwordLog.$touch();
      //La form de iniciar sesion no es valida
      if (this.v$.emailLog.$invalid || this.v$.passwordLog.$invalid) {
        return;
      }
      //Nachos tests para no hacer peticiones al back
      //this.$router.push('/profile');
      //this.$loggedStatus.logged = true;
  
      //La form de iniciar sesion es valida
      //Obtener el contenido de los campos
      var email = document.getElementById("emailLog").value;
      console.log(email)
      var pwd = document.getElementById("passwordLog").value;
      console.log(pwd)
      
      var ok;
      //Vamos a pedirle al backend si el login es correcto o no (El servidor tiene definido un evento 'login' el cual se le envia pwd y email y devuelve un resultado)
      //result es true si ha sido correcto por lo que se pasa a profile
      this.socket.emit('login', {pwd: pwd, email: email}, (result) => {
        ok = result;
        console.log(ok)
        if (ok['ok']){
          this.display = false;
          this.$loggedStatus.logged = true;
          this.$router.push('/profile');
          //Cargar el contenido de la pagina si el login es correcto(Mejor si lo cargamos al crear el componente de profile)
        } else{ // El login ha sido incorrecto(Vemos si existia el correo introducido)
          if(!ok['exist']){//El correo no existia
          //---------------------------------------------------------------------------------------------------
          //---------------------------------------------------------------------------------------------------
          //---------------------------------------------------------------------------------------------------

            //NACHO haz lo tuyo para que informe de que el correo no existia pls



          //---------------------------------------------------------------------------------------------------
          //---------------------------------------------------------------------------------------------------
          //---------------------------------------------------------------------------------------------------
          }
          return;
        }
      })       
    },
    resetForm() {
      this.nickname = '';
      this.name = '';
      this.email = '';
      this.password = '';
      this.confPassword = '';
      this.imagen = '';
      this.date = null;
      this.country = null;
      this.accept = null;
      this.submitted = false;
      this.submittedLog = false;
    },
    resetFormLog() {
      this.emailLog = '';
      this.passwordLog = '';
    },
    displayLoginWdw() {
      this.display = true;
      this.isActive = true;
      this.isActiveMax = false;
      this.texto = "Iniciar sesión";
      this.resetForm();
      this.resetFormLog();
    },
    resize(tabName) {
      //console.log("resize");
      if (tabName == "SignUp") {
        this.isActive = false;
        this.isActiveMax = true;
        this.texto = "Crear una cuenta";
      } else {
        this.isActive = true;
        this.isActiveMax = false;
        this.texto = "Iniciar sesión";
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
      texto: '',
      emailLog: '',
      passwordLog: '',
      name: '',
      email: '',
      password: '',
      confPassword: '',
      nickname: '',
      //imagen: '',
      date: null,
      country: null,
      accept: null,
      submitted: false,
      submittedLog: false,
      showMessage: false,
      socket: '',
      base64: '',
      Images: '',

      display: false,
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
      isActive: true,
      isActiveMax: false,
    }
  },
  //vuelidate
  validations() {
    return {
      emailLog: { required: helpers.withMessage('Por favor, especifique una dirección de correo electrónico', required), email: helpers.withMessage('El correo introducido no es válido', email) },
      passwordLog: { required },
      nickname: { required, max: maxLength(15) },
      name: { required },
      email: { required: helpers.withMessage('Por favor, especifique una dirección de correo electrónico', required), email: helpers.withMessage('El correo introducido no es válido', email) },
      date: { required },
      password: { required, min: minLength(8), alpha: helpers.withMessage('Debe contener al menos mayusculas, minusculas y números', alpha) },
      confPassword: { required },
      country: { required },
      accept: { required },
      //imagen: { required },
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
  /*background-color: var(--surface-a);*/
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
}


/* DIALOG */
.altura {
  background-color: var(--surface-a); /* Get el current background del tema */
  border-radius: 15px;
  width: 540px;
  height: 620px;
  animation-duration: 0.6s;
  animation-name: lineIns derted;
  transition: height 0.6s, width 0.6s;
}

.alturaMax {
  background-color: var(--surface-a);
  border-radius: 15px;
  width: 540px;
  height: 840px;
  animation-duration: 0.6s;
  animation-name: lineInserted;
  transition: height 0.6s, width 0.6s;
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
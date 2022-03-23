<!--BOTÓN Y DIALOGO PARA CREAR UNA CUENTA-->
<template>
  <!--ACCOUNT CREATED DIALOG-->
  <Dialog v-model:visible="dialog.accountCreated" class="dialog-account-created dialog-login" :draggable="false" :modal="true">
      <template #header :class="colorHeader">
        <h3>Cuenta creada correctamente</h3>
      </template>
      <div class="text-center">
        <p class="">Por favor, revise su correo electrónico para verificar su cuenta</p>
        <Button type="submit" label="Aceptar" v-on:click="successfullyCreated()" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
      </div>
  </Dialog>

  <!--FORGOT PASSWORD DIALOG-->
  <Dialog v-model:visible="dialog.displayPsw" class="dialog-login" :class="{'dialog-forgot-password': !forgotPsw.failed, 'dialog-forgot-password-error': forgotPsw.failed}" :draggable="false" :modal="true"> <!--contentStyle="background-color: transparent !important"-->
      <template #header :class="colorHeader">
        <h3>Recuperar contraseña</h3>
      </template>
      <!--VUELIDATE-->
      <div class="flex justify-content-center">
        <div v-if="!forgotPsw.sent" class="card" style="width: 350px">
          <p class="mt-5">Introduce tu correo electrónico y te mandaremos las instrucciones necesarias para recuperar tu contraseña</p>
          <Message v-if="forgotPsw.failed" severity="error" :closable="false">No se ha encontrado el correo introducido</Message>
          <form @submit.prevent="handleSubmitForgotPsw(!vForgot$.$invalid)" class="p-fluid">
            <!--EMAIL-->
            <div class="field">
              <label for="emailLog" :class="{'p-error':vForgot$.forgotPsw.email.$invalid && forgotPsw.submitted}">Email</label>
              <div class="p-inputgroup">
                <InputText id="emailLog" placeholder="cuenta@correo.com" v-model="forgotPsw.email" :class="{'p-invalid':vForgot$.forgotPsw.email.$invalid && forgotPsw.submitted}" aria-describedby="email-error"/>
                <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
                </span>
              </div>
              <span v-if="vForgot$.forgotPsw.email.$error && forgotPsw.submitted">
                  <span id="email-error" v-for="(error, index) of vForgot$.forgotPsw.email.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                  </span>
              </span>
              <small v-else-if="(vForgot$.forgotPsw.email.$invalid && forgotPsw.submitted) || vForgot$.forgotPsw.email.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
            </div>
            <Button type="submit" label="Recuperar contraseña" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
          </form>
        </div>
        <div v-else class="text-center" style="width: 350px">
          <h4 class="mt-6">¡Correo enviado correctamente!</h4>
          <p>Por favor, revisa tu correo electrónico y sigue las instrucciones para recuperar tu contraseña</p>
          <Button type="submit" label="Aceptar" v-on:click="closeForgotPsw()" class="mt-4 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
        </div>
      </div>
  </Dialog>

  <!--TERMS AND CONDS DIALOG-->
  <Dialog v-model:visible="dialog.terms" class="dialog-terms dialog-login" :draggable="false" :modal="true">
      <template #header :class="colorHeader">
        <h3>Términos y condiciones</h3>
      </template>
      <div class="text-justify">
        <p class="">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida dui sapien. Cras eu condimentum nisl, sed scelerisque erat. Donec quis sapien lacus. Maecenas pulvinar sapien quam, sit amet cursus turpis tristique eu. Ut quis ipsum at ante congue semper. In at rhoncus tortor, sit amet luctus ipsum. Etiam volutpat sem vel arcu venenatis vulputate. Praesent magna odio, aliquam eget metus id, vulputate ullamcorper arcu. Nam ut euismod eros, vel luctus libero. Donec in ex lacus. Donec ligula arcu, ornare eu metus non, venenatis lobortis libero. Suspendisse hendrerit efficitur augue porttitor consequat. Sed lorem tortor, accumsan ut arcu a, vestibulum sollicitudin neque. Aliquam mattis eleifend egestas.
          Mauris nunc leo, gravida et leo at, gravida tempus lacus. Morbi non mattis orci. Duis convallis pretium urna, sed imperdiet augue posuere eget. Vivamus interdum felis eget porttitor maximus. Suspendisse velit diam, consectetur at odio et, auctor rutrum ipsum. Vivamus a est ac lacus dapibus vulputate. Duis rhoncus ultrices mauris, eget vulputate dui placerat vitae. Phasellus sagittis vel arcu et maximus. Etiam eu luctus mauris. Cras placerat facilisis velit, a lobortis ipsum vulputate ut. Morbi tempor consequat iaculis. Maecenas eget sodales leo, quis sodales dolor. Aenean vehicula pellentesque elit eu posuere.
          Aenean ac nulla viverra, commodo ipsum sed, bibendum leo. Maecenas lacinia dui tincidunt neque commodo vulputate. Proin odio augue, mollis vitae ipsum ac, vulputate euismod orci. Nulla quis ex nec erat blandit viverra eu luctus ipsum. Maecenas quis augue massa. Cras a rutrum felis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent scelerisque turpis diam, vel condimentum velit porta in. Proin sit amet ante feugiat, facilisis lorem rutrum, tincidunt justo. Maecenas in laoreet massa, ac consequat metus.
          Nulla quis nulla at purus luctus vestibulum vitae sit amet dolor. Praesent iaculis, diam ut dapibus malesuada, mauris lectus maximus tortor, id porttitor quam odio sed turpis. Duis diam leo, consectetur non libero vel, faucibus accumsan sem. Sed euismod dictum lorem lobortis ullamcorper. Maecenas vitae purus nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis accumsan velit posuere posuere consectetur. Suspendisse consectetur, ipsum eu ultrices lobortis, elit risus semper dui, pellentesque dignissim augue diam quis mauris. In nec faucibus eros, sed commodo odio. Curabitur dolor nibh, rhoncus vitae ornare a, convallis volutpat arcu. Nam cursus gravida enim, nec auctor velit feugiat vitae. Fusce ultricies facilisis efficitur. Sed efficitur lectus est, in ultrices ipsum pharetra vitae. Maecenas at ex mollis, tincidunt justo ac, mattis augue.
          In ullamcorper velit eget leo porta accumsan. Duis placerat imperdiet rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum quis pellentesque orci. Integer consectetur, elit imperdiet ultrices posuere, ligula nulla volutpat arcu, sit amet aliquet mauris metus tempor nisi. Fusce eleifend, nibh id ornare lobortis, nisi leo convallis ex, vel volutpat nulla metus et libero. Mauris ac vestibulum lacus, sed ullamcorper elit. Sed facilisis, massa sit amet pulvinar consequat, odio leo laoreet nibh, imperdiet pharetra felis purus ac mauris. Cras commodo gravida nulla in fringilla. Pellentesque tincidunt risus a diam ultricies posuere.
        </p>
      </div>
    <template #footer>
    </template>
  </Dialog>

  <!--LOGIN DIALOG-->
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
    <!--LOGIN FORM-->
    <div id="LogIn" class="w3-container tabTypeJS">
      <div class="flex justify-content-center">
          <div class="card" style="width: 440px">
              <!--FIELD-->
              <h4 class="text-center mt-3"> {{dialog.texto}} </h4>
              <Message v-if="login.failed" severity="error" :closable="false">Algún dato introducido no es correcto</Message>
              <form @submit.prevent="handleSubmitLog(!vLogin$.$invalid)" class="p-fluid">
                <!--EMAIL-->
                <div class="field">
                  <label for="emailLog" :class="{'p-error':vLogin$.login.email.$invalid && login.submitted}">Email</label>
                  <div class="p-inputgroup">
                    <InputText id="emailLog" placeholder="cuenta@correo.com" v-model="login.email" :class="{'p-invalid':vLogin$.login.email.$invalid && login.submitted}" aria-describedby="email-error"/>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-envelope"></i>
                    </span>
                  </div>
                  <span v-if="vLogin$.login.email.$error && login.submitted">
                      <span id="email-error" v-for="(error, index) of vLogin$.login.email.$errors" :key="index">
                        <small class="p-error">{{error.$message}}</small>
                      </span>
                  </span>
                  <small v-else-if="(vLogin$.login.email.$invalid && login.submitted) || vLogin$.login.email.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
                </div>
                <!--PASSWORD-->
                <div class="field">
                  <label for="passwordLog" :class="{'p-error':((vLogin$.login.password.$invalid) || (vLogin$.login.password.$invalid && vLogin$.login.password.$model != '')) && login.submitted}">Contraseña</label>
                  <div class="p-inputgroup">
                    <Password id="passwordLog" v-model="login.password" :feedback="false" :class="{'p-invalid':((vLogin$.login.password.$invalid) || (vLogin$.login.password.$invalid && vLogin$.login.password.$model != '')) && login.submitted}" toggleMask></Password>
                    <span class="p-inputgroup-addon">
                      <i class="pi pi-key"></i>
                    </span>
                  </div>
                  <small v-if="((vLogin$.login.password.$invalid && vLogin$.login.password.$model == '') || vLogin$.login.password.$pending.$response) && login.submitted" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                  <!--<span id="pwd-error" v-for="(error, index) of vLogin$.passwordLog.$errors" :key="index">
                    <small class="p-error">{{error.$message}}</small>
                  </span>-->
                </div>
                <div class="field flex justify-content-center">
                  <Button v-on:click="forgotPswFunc()" label="¿Has olvidado tu contraseña?" class="p-button-link" />
                </div>
                <Button type="submit" label="Iniciar sesión" class="mt-2 mb-6 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
              </form>
          </div>
      </div>
    </div>

    <div id="SignUp" class="w3-container tabTypeJS" style="display:none">
      <!--VUELIDATE-->
      <div class="flex justify-content-center">
          <div class="card resize" style="width: 440px">
              <!--FIELD-->
              <h4 class="text-center mt-3"> {{dialog.texto}} </h4>
              <Message v-if="createAc.failed" severity="error" :closable="false">El correo introducido ya existe</Message>
              <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                  <!--NICKNAME-->
                  <div class="field">
                    <label for="nickname" :class="{'p-error':(v$.createAc.nickname.$invalid && createAc.submitted) || (v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')}">Nombre de usuario</label>
                    <div class="p-inputgroup">
                      <InputText id="nickname" placeholder="Nombre de usuario" v-model="createAc.nickname" :class="{'p-invalid':(v$.createAc.nickname.$invalid && createAc.submitted) || (v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')}" />
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-id-card"></i>
                      </span>
                    </div>
                    <small v-if="((v$.createAc.nickname.$invalid && v$.createAc.nickname.$model == '') || v$.createAc.nickname.$pending.$response) && createAc.submitted" class="p-error">{{'Por favor, indique un nombre de usuario'}}</small>
                    <small v-else-if="(v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')" class="p-error">{{'El nombre de usuario no puede tener más de 15 caracteres'}}</small>
                  </div>
                  <!--NAME-->
                  <div class="field">
                    <label for="name" :class="{'p-error':v$.createAc.name.$invalid && createAc.submitted}">Nombre completo</label>
                      <div class="p-inputgroup">
                      <InputText id="name" placeholder="Nombre Apellido" v-model="createAc.name" :class="{'p-invalid':v$.createAc.name.$invalid && createAc.submitted}" />
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.name.$invalid && createAc.submitted) || v$.createAc.name.$pending.$response" class="p-error">{{'Por favor, indique su nombre'}}</small>
                  </div>
                  <!--EMAIL-->
                  <div class="field">
                    <label for="email" :class="{'p-error':v$.createAc.email.$invalid && createAc.submitted}">Email</label>
                    <div class="p-inputgroup">
                      <InputText id="email" placeholder="cuenta@correo.com" v-model="v$.createAc.email.$model" :class="{'p-invalid':v$.createAc.email.$invalid && createAc.submitted}" aria-describedby="email-error"/>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-envelope"></i>
                      </span>
                    </div>
                    <span v-if="v$.createAc.email.$error && createAc.submitted">
                        <span id="email-error" v-for="(error, index) of v$.createAc.email.$errors" :key="index">
                          <small class="p-error">{{error.$message}}</small>
                        </span>
                    </span>
                    <small v-else-if="(v$.createAc.email.$invalid && createAc.submitted) || v$.createAc.email.$pending.$response" class="p-error">{{'Por favor, indique su correo'}}</small>
                  </div>
                  <!--BIRTHDAY-->
                  <div class="field">
                    <label for="date" :class="{'p-error':v$.createAc.date.$invalid && createAc.submitted}">Fecha de nacimiento</label>
                    <Calendar id="date" placeholder="01/01/2000" v-model="createAc.date" :showIcon="true" :class="{'p-invalid':v$.createAc.date.$invalid && createAc.submitted}"/>
                    <small v-if="(v$.createAc.date.$invalid && createAc.submitted) || v$.createAc.date.$pending.$response" class="p-error">{{'Por favor, indique su fecha de nacimiento'}}</small>
                  </div>
                  <!--COUNTRY-->
                  <div class="field">
                    <label for="country" :class="{'p-error':v$.createAc.country.$invalid && createAc.submitted}">Seleccione su país de residencia</label>
                    <div class="p-inputgroup">
                      <Dropdown id="country" v-model="createAc.country" :options="countries" optionLabel="name" :filter="true" placeholder="Seleccione su país" :showClear="true" :class="{'p-invalid':v$.createAc.country.$invalid && createAc.submitted}">
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
                    <small v-if="(v$.createAc.country.$invalid && createAc.submitted) || v$.createAc.country.$pending.$response" class="p-error">{{'Por favor, indique su país de residencia'}}</small>
                  </div>
                  <!--PICTURE-->
                  <div class="field"> 
                    <label for="imagen">Foto de perfil</label>
                    <div class="p-inputgroup">
                      <FileUpload id="image" v-model="createAc.image" class="resize" style="width : 440px;" @change="uploadFile" ref="file" mode="basic" url="./upload" :maxFileSize="1000000" accept="image/*"/>
                    </div>
                  </div>
                  <!--PASSWORD-->
                  <div class="field"> 
                    <label for="password" :class="{'p-error':(v$.createAc.password.$invalid && createAc.submitted) || (v$.createAc.password.$invalid && v$.createAc.password.$model != '')}">Contraseña</label>
                    <div class="p-inputgroup">
                      <Password id="password" v-model="createAc.password" :class="{'p-invalid':(v$.createAc.password.$invalid && createAc.submitted) || (v$.createAc.password.$invalid && v$.createAc.password.$model != '')}" toggleMask>
                        <template #header>
                          <h6>Elija una contraseña</h6>
                        </template>
                        <template #footer="sp">
                          {{sp.level}}
                          <Divider />
                            <small v-if="(v$.createAc.password.$invalid && v$.createAc.password.$model == '' && createAc.submitted) || v$.createAc.password.$pending.$response" class="p-error">{{v$.createAc.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
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
                    <small v-if="(v$.createAc.password.$invalid && v$.createAc.password.$model == '' && createAc.submitted) || v$.createAc.password.$pending.$response" class="p-error">{{v$.createAc.password.required.$message.replace('Value is required', 'Por favor, especifique una contraseña')}}</small>
                    <small v-else-if="(v$.createAc.password.$invalid && v$.createAc.password.$model != '' && v$.createAc.password.$model.length < 8)" class="p-error"> {{'La contraseña debe tener al menos 8 caracteres'}} </small>
                    <small v-else-if="(v$.createAc.password.$invalid && v$.createAc.password.$model != '')" class="p-error"> {{v$.createAc.password.alpha.$message}} </small>
                  </div>
                  <!--PASSWORD-->
                  <div class="field">
                    <label for="confPassword" :class="{'p-error':(v$.createAc.confPassword.$invalid && createAc.submitted) || (v$.createAc.password.$model != v$.createAc.confPassword.$model)}">Confirmar contraseña</label>
                    <div class="p-inputgroup">
                      <Password id="confPassword" v-model="createAc.confPassword" :feedback="false" :class="{'p-invalid':(v$.createAc.confPassword.$invalid && createAc.submitted) || (v$.createAc.password.$model != v$.createAc.confPassword.$model)}" toggleMask></Password>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-key"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.confPassword.$invalid && createAc.submitted) || v$.createAc.confPassword.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                    <small v-else-if="(v$.createAc.password.$model != v$.createAc.confPassword.$model && createAc.submitted)" class="p-error">{{'Las contraseñas no coinciden'}}</small>
                  </div>
                  <!--CONDICIONES-->
                  <div class="field-checkbox">
                    <Checkbox id="accept" name="accept" value="Accept" v-model="createAc.accept" :class="{'p-invalid':v$.createAc.accept.$invalid && createAc.submitted}" />
                    <Button v-on:click="displayTermsDialog()" label="Aceptar los términos y condiciones" class="text-left p-button-link" />
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
      v$: useVuelidate(),
      vLogin$: useVuelidate(),
      vForgot$: useVuelidate(),
    }
  },
  created(){
      //this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3000")
      //this.socket.on('connect', () =>{})
  },
  methods: {
    uploadFile() {
      this.Images = this.$refs.file.files[0];
    },
    loginImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
    successfullyCreated() {
      this.dialog.accountCreated = false;
    },
    forgotPswFunc() {
      this.dialog.display = false;
      this.dialog.displayPsw = true;
    },
    closeForgotPsw() {
      this.dialog.displayPsw = false;
    },

    /*
     * Mostar el dialog de terms and conditions
     */
    displayTermsDialog() {
      this.dialog.terms = true;
    },

    //vuelidate
    /*
     * Funcion que se ejecuta al hacer click en crear cuenta.
     * Solo ejecuta algo si la form de login es valida.     
     */
    handleSubmit() {
      this.createAc.submitted = true;
      if (this.v$.createAc.email.$invalid || this.v$.createAc.password.$invalid || this.v$.createAc.confPassword.$invalid || this.v$.createAc.nickname.$invalid || this.v$.createAc.date.$invalid || this.v$.createAc.country.$invalid || this.v$.createAc.accept.$invalid || this.v$.createAc.name.$invalid) { //|| this.v$.imagen.$invalid) {
        return;
      }
      // La form ha sido validada correctamente en front
      this.$accounts.createAccount(this.v$.createAc.nickname.$model, this.v$.createAc.name.$model, this.v$.createAc.email.$model, this.v$.createAc.date.$model, this.v$.createAc.country.$model, this.v$.createAc.password.$model).then(success => { //this.createAc.image
        if (success) {
          this.dialog.display = false;
          this.dialog.accountCreated = true;
        } else {
          //El email ya estaba registrado (del backend)
          this.createAc.failed = true;
        }
      });
    },

    /*
     * Funcion que se ejecuta al hacer click en el boton de login.
     * Solo ejecuta algo si la form de login es valida.
     */
    handleSubmitLog() {
      this.login.submitted = true;
      if (this.vLogin$.login.email.$invalid || this.vLogin$.login.password.$invalid) {
        return;
      }
      // La form ha sido validada correctamente en front
      this.$accounts.login(this.vLogin$.login.email.$model, this.vLogin$.login.password.$model).then(success => {
        if (success) {
          this.dialog.display = false;
          this.$router.push('/profile');
          this.$loggedStatus.logged = true;
        } else {
          //El email o la contraseña son incorrectos (del backend)
          this.login.altura = false;
          this.login.failed = true;
        }
      });
    },

    /*
     * Funcion que se ejecuta al hacer click en el boton de recuperar contrasenya.
     * Solo ejecuta algo si la form de login es valida.
     */
    handleSubmitForgotPsw() {
      this.forgotPsw.submitted = true;
      if (this.vForgot$.forgotPsw.email.$invalid) {
        return;
      }
      //Enviar al backend el email
      //if (Si el backend responde que el email existe) {
        //Mostrar mensaje que ok, se ha mandado el mail
        this.forgotPsw.sent = true;
      //} else {
        //Muestra el mensaje en rojo de que no se ha encontrado el mail y cambia el tamanyo del dialog
        this.forgotPsw.failed = true;
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
      this.createAc.submitted = false;
    },
    resetFormForgot() {
      //Resetear las validaciones
      this.$nextTick(() => { this.vForgot$.$reset() });
      this.forgotPsw.email = '';
      this.forgotPsw.failed = false;
      this.forgotPsw.sent = false;
      this.forgotPsw.submitted = false;
    },
    resetFormLog() {
      //Resetear las validaciones
      this.$nextTick(() => { this.vLogin$.$reset() });
      this.login.email = '';
      this.login.password = '';
      this.login.failed = false;
      this.login.submitted = false;
    },
    displayLoginWdw() {
      this.resetForm();
      this.resetFormLog();
      this.resetFormForgot();
      this.dialog.display = true;
      this.dialog.isActive = true;
      this.dialog.isActiveMax = false;
      this.dialog.texto = "Iniciar sesión";
      this.login.failed = false;
      this.createAc.failed = false;
      this.createAc.submitted = false;
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
        displayPsw: false,
        terms: false,
      },
      forgotPsw: {
        submitted: false,
        email: '',
        failed: false,
        sent: false,
      },
      login: {
        submitted: false,
        email: '',
        password: '',
        failed: false,
      },
      createAc: {
        submitted: false,
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
      //"$lazy": true,
      login: {
        email: { 
          required: helpers.withMessage('Por favor, especifique una dirección de correo electrónico', required), 
          email: helpers.withMessage('El correo introducido no es válido', email) 
        },
        password: { 
          required 
        },
      },
      forgotPsw: {
        email: { 
          required: helpers.withMessage('Por favor, especifique una dirección de correo electrónico', required), 
          email: helpers.withMessage('El correo introducido no es válido', email) 
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

.dialog-forgot-password {
  width: 450px;
  height: 390px;
}

.dialog-forgot-password-error {
  width: 450px;
  height: 469px;
}

.dialog-terms {
  width: 750px;
  height: auto;
}

.altura {
  width: 540px;
  height: 660px;
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
    width: 380px !important;
  }
  .alturaMax {
    width: 380px !important;
  }

  .resize {
    width: 350px !important;
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
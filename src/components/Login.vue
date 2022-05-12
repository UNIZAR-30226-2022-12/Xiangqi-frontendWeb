<template>
  <!--ACCOUNT CREATED DIALOG-->
  <Dialog v-model:visible="dialog.accountCreated" :closable="false" class="dialog-account-created dialog-login resize-dialog" :draggable="false" :modal="true">
      <template #header :class="colorHeader">
        <h3>Cuenta creada correctamente</h3>
      </template>
      <div class="text-center">
        <p class="">Por favor, revise su correo electrónico para verificar su cuenta</p>
        <Button type="submit" label="Aceptar" v-on:click="dialog.accountCreated = false" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
      </div>
  </Dialog>

  <!--FORGOT PASSWORD DIALOG-->
  <Dialog v-model:visible="dialog.displayPsw" class="dialog-login resize-dialog" :class="{'dialog-forgot-password': !forgotPsw.failed, 'dialog-forgot-password-error': forgotPsw.failed}" :draggable="false" :modal="true"> <!--contentStyle="background-color: transparent !important"-->
      <template #header :class="colorHeader">
        <h3>Recuperar contraseña</h3>
      </template>
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
          <Button type="submit" label="Aceptar" v-on:click="dialog.displayPsw = false" class="mt-4 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
        </div>
      </div>
  </Dialog>

  <!--TERMS AND CONDS DIALOG-->
  <Dialog v-model:visible="dialog.terms" class="dialog-terms dialog-login resize-dialog" :draggable="false" :modal="true">
      <template #header :class="colorHeader">
        <h3>Términos y condiciones</h3>
      </template>
      <div class="text-justify">
        <h2 class="text-primary">¿Quién puede hacer uso de los servicios?</h2>
        <p>Puede hacer uso de los Servicios solo si accede a firmar un contrato vinculante con Xiangqi Online y no es usted una persona vetada para hacer uso de los servicios de conformidad con la legislación de su jurisdicción aplicable. En cualquier caso, usted deberá tener al menos 13 años, para hacer uso de los Servicios. Si acepta estos Términos y usa los Servicios en nombre de una empresa, organización, gobierno u otra entidad jurídica, afirma y garantiza que está autorizado a hacerlo y cuenta con los poderes necesarios para obligarla al cumplimiento de estos Términos, en cuyo caso el uso de las palabras "usted", "su" y "sus" en estos Términos hará referencia a dicha entidad jurídica.</p>
        <p>Usted es responsable de su uso de los Servicios y de cualquier Contenido que proporcione, incluyendo el cumplimiento con las leyes, reglas y normas aplicables. Solo debe proporcionarnos contenido que desee compartir con otros.</p>
        <h2 class="text-primary">Contenido de los servicios</h2>
        <p>Cualquier confianza que deposite en cualquier Contenido o material publicado por medio de los Servicios u obtenido mediante los mismos, o cualquier uso que haga de ellos, lo hace por su propia cuenta y riesgo. No ratificamos, apoyamos, reafirmamos ni garantizamos la compleción, veracidad, precisión o fiabilidad de ningún Contenido o comunicación publicada por medio de los Servicios, ni ratificamos ninguna opinión expresada por medio de los Servicios. Comprende que al hacer uso de los Servicios, puede exponerse a Contenido que puede resultar ofensivo, dañino, inexacto o inapropiado de cualquier otra forma, o en algunos casos, a publicaciones que puedan haber sido interpretadas erróneamente o que puedan ser engañosas de cualquier otra forma. Todo el Contenido es responsabilidad única de la persona que lo produce. No monitorizamos ni controlamos el Contenido publicado por medio de los Servicios, y no podemos hacernos responsables de dicho Contenido.</p>
        <p>Nos reservamos el derecho a retirar Contenido que incumpla el Acuerdo de usuario, como por ejemplo, violaciones de derechos de autor o de marcas comerciales o cualesquiera otros usos indebidos de propiedad intelectual, suplantación de identidad, conducta ilícita o acoso. </p>
        <h2 class="text-primary">Sus derechos y cesión de derechos sobre el contenido</h2>
        <p>Usted conserva sus derechos sobre cualquier Contenido que envíe, publique o muestre a través de nuestros Servicios. Lo que es suyo, es suyo: usted es el dueño de su Contenido (y del audio incorporado, las fotos y vídeos que se consideren parte del Contenido).</p>
        <p>Al enviar, publicar o mostrar Contenido a través de los Servicios, nos otorga una licencia mundial, no exclusiva, libre del pago de derechos (con derecho a sublicencia) para usar, copiar, reproducir, procesar, adaptar. modificar, publicar, transmitir, mostrar y distribuir dicho Contenido en todos y cada uno de los medios de comunicación o métodos de distribución posibles, conocidos ahora o desarrollados con posterioridad (a efectos aclaratorios, estos derechos incluyen, por ejemplo, los de organización, transformación y traducción). Esta licencia nos autoriza a poner su Contenido a disposición del resto del mundo y a permitir que otros hagan lo mismo. Usted acepta que esta licencia incluye el derecho de Xiangqi Online a proporcionar, promover y mejorar los Servicios y a poner el contenido enviado a o a través de los Servicios a disposición de otras empresas, organizaciones o personas para la sindicación, emisión, distribución, Retweet, promoción o publicación de dicho contenido en otros medios y servicios, sujeto a nuestros términos y condiciones para el uso de dicho Contenido. Dichos usos adicionales por parte de Xiangqi Online u otras empresas, organizaciones o personas se realizarán sin abonarle a usted una compensación con respecto al Contenido que haya enviado, publicado, transmitido o puesto a disposición pública de cualquier otra forma a través de los Servicios, ya que usted acepta que el uso de los Servicios por su parte constituye una compensación suficiente por el Contenido y la cesión de derechos aquí contemplados.</p>
        <p>Xiangqi Online cuenta con un conjunto de reglas en evolución para regir cómo los socios del entorno pueden interactuar con su Contenido publicado en los Servicios. Estas reglas existen para permitir un entorno abierto que tenga en cuenta sus derechos. Usted comprende que podemos modificar o adaptar su Contenido según se distribuya, sindique, publique o emita por nuestra parte o por parte de nuestros socios y/o que podemos realizar cambios en su contenido para adaptarlo a distintos medios.</p>
        <p>Usted declara y garantiza que tiene, o ha obtenido, todos los derechos, licencias, consentimientos, permisos, facultades y/o autorizaciones necesarias para otorgar los derechos aquí conferidos para cualquier Contenido que usted envíe, publique o muestre en los Servicios o a través de estos. Usted acepta que dicho Contenido no contendrá materiales sujetos a derechos de autor u otros derechos de propiedad, salvo que usted cuente con el permiso necesario o esté legalmente facultado para publicar tales materiales y para conceder a Xiangqi Online la licencia anteriormente descrita.</p>
        <h2 class="text-primary">Su cuenta</h2>
        <p>Puede necesitar crear una cuenta para usar alguno de nuestros Servicios. Usted es responsable de la seguridad de su cuenta, por lo que debe usar una contraseña fuerte y limitar su uso a esta cuenta. No podemos ser considerados responsables, ni lo seremos, de ninguna pérdida o daño derivado de su incumplimiento de las anteriores condiciones.</p>
        <p>Usted puede controlar la mayoría de las comunicaciones de los Servicios. Puede que debamos proporcionarle ciertas comunicaciones, como anuncios del servicio y mensajes administrativos. Dichas comunicaciones se consideran parte de los Servicios y no podrá optar por no recibirlos ni usted ni en su cuenta. Si añadió su número de teléfono a su cuenta, y después, lo cambió o desactivó dicho número de teléfono, debe actualizar la información de su cuenta para evitar que nos comuniquemos con cualquiera que asuma su antiguo número.</p>
        <h2 class="text-primary">Exclusiones y limitaciones de responsabilidad</h2>
        <h3>Los Servicios se ofrecen "TAL CUAL"</h3>
        <p>Si usted reside fuera de la Unión Europea, de los Estados de la Asociación Europea de Libre Comercio (EFTA), o del Reino Unido, incluyendo si reside en los Estados Unidos, usted acepta que su acceso y uso de los Servicios o de cualquier Contenido será por su propia cuenta y riesgo. Usted entiende y acepta que los Servicios se le proporcionan "TAL CUAL" y "SEGÚN DISPONIBILIDAD". Las "Entidades de Xiangqi Online" significa Xiangqi Online, sus empresas matriz, filiales, sociedades relacionadas, responsables, directivos, empleados, agentes, representantes, socios y licenciatarios. Sin limitación del carácter general de lo anteriormente indicado, en la medida máxima de lo permitido por la legislación aplicable, LAS ENTIDADES DE Xiangqi Online EXCLUYEN TODAS LAS GARANTÍAS Y CONDICIONES, YA SEAN EXPRESAS O IMPLÍCITAS, DE COMERCIABILIDAD, ADECUACIÓN A UN FIN CONCRETO Y NO INFRACCIÓN. Las Entidades de Xiangqi Online no otorgan ninguna garantía ni realizan ninguna manifestación y excluyen todas las responsabilidades en lo que respecta a: (i) la integridad, exactitud, disponibilidad, puntualidad, seguridad o fiabilidad de los Servicios o de cualquier Contenido; (ii) cualquier daño que pueda sufrir su sistema informático, pérdida de datos u otros daños que resulten de su acceso o uso de los Servicios o de cualquier Contenido; (iii) la eliminación de cualesquiera Contenidos u otras comunicaciones mantenidas por los Servicios o la imposibilidad de almacenar o transmitir tales Contenidos o comunicaciones; y (iv) si los Servicios cumplirán sus requisitos o estarán disponibles de forma ininterrumpida, segura o sin errores. Las sugerencias o informaciones, ya sean de carácter verbal o escrito, que se obtengan de las Entidades de Xiangqi Online o a través de los Servicios, no crearán ninguna garantía o manifestación que no haya sido expresamente contemplada en este documento.</p>
        <h2 class="text-primary">Limitación de la responsabilidad</h2>
        <p>Si usted reside fuera de la Unión Europea, de los Estados de la Asociación Europea de Libre Comercio (EFTA) o del Reino Unido, incluyendo si reside en los Estados Unidos, USTED ACEPTA QUE EN LA MEDIDA MÁXIMA DE LO PERMITIDO POR LA LEGISLACIÓN APLICABLE, LAS ENTIDADES DE Xiangqi Online NO SERÁN RESPONSABLES DE NINGÚN TIPO DE DAÑOS INDIRECTOS, DERIVADOS, ESPECIALES, EMERGENTES O PUNITIVOS, PÉRDIDAS DE BENEFICIOS O INGRESOS, CON INDEPENDENCIA DE QUE SE INCURRA EN DICHAS PÉRDIDAS DIRECTA O INDIRECTAMENTE, O PÉRDIDAS DE DATOS, USO, FONDO DE COMERCIO U OTRAS PÉRDIDAS INTANGIBLES, QUE SE DERIVEN DE: (i) SU ACCESO O USO O INCAPACIDAD DE ACCESO O USO DE LOS SERVICIOS; (ii) CUALQUIER COMPORTAMIENTO O CONTENIDO DE TERCEROS EN LOS SERVICIOS INCLUYENDO, SIN LIMITACIÓN ALGUNA, CUALQUIER CONDUCTA DIFAMATORIA, OFENSIVA O ILEGAL DE OTROS USUARIOS O TERCEROS; (iii) CUALQUIER CONTENIDO OBTENIDO DE LOS SERVICIOS; O (iv) EL ACCESO, USO O ALTERACIÓN NO AUTORIZADOS DE SUS TRANSMISIONES O CONTENIDOS. LA RESPONSABILIDAD TOTAL DE LAS ENTIDADES DE Xiangqi Online NO SUPERARÁ EN NINGÚN CASO LA CANTIDAD DE CIEN DÓLARES ESTADOUNIDENSES (100,00 DÓLARES ESTADOUNIDENSES) O LA CANTIDAD QUE USTED HAYA ABONADO A Xiangqi Online, EN SU CASO, EN LOS SEIS ÚLTIMOS MESES POR LOS SERVICIOS QUE HAYAN DADO LUGAR A LA RECLAMACIÓN, SI ESTA ÚLTIMA CANTIDAD ES MAYOR. LAS LIMITACIONES CONTEMPLADAS EN ESTA SUBSECCIÓN SE APLICARÁN A CUALQUIER PRINCIPIO DE RESPONSABILIDAD, CON INDEPENDENCIA DE QUE SE FUNDAMENTE EN CUALQUIER GARANTÍA, CONTRATO, LEY, RESPONSABILIDAD EXTRACONTRACTUAL (INCLUYENDO NEGLIGENCIA) O CUALQUIER OTRA FIGURA LEGAL, Y DE QUE LAS ENTIDADES DE Xiangqi Online HAYAN SIDO INFORMADAS O NO DE LA POSIBILIDAD DE INCURRIR EN DICHOS DAÑOS, E INCLUSO EN EL SUPUESTO DE QUE LAS ACCIONES LEGALES AQUÍ CONTEMPLADAS NO SURTAN LOS EFECTOS PRETENDIDOS.</p>
        <p>Si usted reside en la Unión Europea, en los Estados de la Asociación Europea de Libre Comercio (EFTA) o en el Reino Unido, usted acepta que al hacer uso de los Servicios usted acepta que la responsabilidad de Xiangqi Online, así como de sus empresas matriz, filiales, sociedades relacionadas, responsables, directivos, empleados, agentes, representantes, socios y licenciatarios, estará limitada a la máxima medida permitida en su país de residencia.</p>
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
              <Message v-if="login.validationFail" severity="error" :closable="false">Correo no verificado</Message>
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
                  <Button v-on:click="dialog.display = false, dialog.displayPsw = true" label="¿Has olvidado tu contraseña?" class="p-button-link" />
                </div>              
                <Button type="submit" :disabled="login.submitDisabled || this.v$.login.$invalid" class="mt-2 mb-6 p-button-raised font-semibold h-3rem" style="border-radius: 1rem">
                  <div class="flex justify-content-center flex-wrap card-container w-full">
                      <div id="spinner" class="flex align-items-center justify-content-center mr-2">
                        <ProgressSpinner v-if="this.login.loging" style="width:20px; height:20px" strokeWidth="8" fill="transparent" animationDuration="2s"/>
                      </div>                   
                      <div v-if="!this.login.loging" class="flex align-items-center justify-content-center font-bold text-white">Iniciar sesión</div>
                      <div v-else class="flex align-items-center justify-content-center font-bold text-white">Entrando...</div>
                  </div>
                </Button>            
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
              <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                  <h6>(*) Campos obligatorios</h6>
                  <!--NICKNAME-->
                  <div class="field">
                    <label for="nickname" :class="{'p-error':(v$.createAc.nickname.$invalid && createAc.submitted) || (v$.createAc.nickname.$invalid && v$.createAc.nickname.$model != '')}">Nombre de usuario *</label>
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
                    <label for="name" :class="{'p-error':v$.createAc.name.$invalid && createAc.submitted}">Nombre completo *</label>
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
                    <label for="email" :class="{'p-error':v$.createAc.email.$invalid && createAc.submitted}">Email *</label>
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
                    <label for="date" :class="{'p-error':v$.createAc.date.$invalid && createAc.submitted}">Fecha de nacimiento *</label>
                    <Calendar id="date" dateFormat="dd/mm/yy" v-model="createAc.date" :maxDate="new Date()" :showIcon="true" :class="{'p-invalid':v$.createAc.date.$invalid && createAc.submitted}"/>
                    <small v-if="(v$.createAc.date.$invalid && createAc.submitted) || v$.createAc.date.$pending.$response" class="p-error">{{'Por favor, indique su fecha de nacimiento'}}</small>
                  </div>
                  <!--COUNTRY-->
                  <div class="field">
                    <label for="country" :class="{'p-error':v$.createAc.country.$invalid && createAc.submitted}">Seleccione su país de residencia *</label>
                    <div class="p-inputgroup">
                      <Dropdown id="country" v-model="createAc.country" :options="countries" optionLabel="name" :filter="true" placeholder="Seleccione su país" :showClear="true" :class="{'p-invalid':v$.createAc.country.$invalid && createAc.submitted}">
                        <template #value="slotProps">
                          <div id="country-item" class="country-item country-item-value" v-if="slotProps.value">
                            <img src="images/flags/flag_placeholder.png" :class="'flag flag-' + slotProps.value.code.toLowerCase()" />
                            {{slotProps.value.name}}
                          </div>
                          <span v-else>
                            {{slotProps.placeholder}}
                          </span>
                        </template>
                        <template #option="slotProps">
                          <div class="country-item">
                            <img src="images/flags/flag_placeholder.png" :class="'flag flag-' + slotProps.option.code.toLowerCase()" style="height: auto !important"/>
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
                      <FileUpload id="image"  class="resize" style="width : 440px;" @change="uploadFile" chooseLabel="Subir foto" ref="file" mode="basic" url="./upload" :maxFileSize="1000000" accept="image/*"/>
                    </div>
                  </div>
                  <!--PASSWORD-->
                  <div class="field"> 
                    <label for="password" :class="{'p-error':(v$.createAc.password.$invalid && createAc.submitted) || (v$.createAc.password.$invalid && v$.createAc.password.$model != '')}">Contraseña *</label>
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
                    <label for="confPassword" :class="{'p-error':(v$.createAc.confPassword.$invalid && createAc.submitted) || (v$.createAc.password.$model != v$.createAc.confPassword.$model)}">Confirmar contraseña *</label>
                    <div class="p-inputgroup">
                      <Password id="confPassword" v-model="createAc.confPassword" :feedback="false" :class="{'p-invalid':(v$.createAc.confPassword.$invalid && createAc.submitted) || (v$.createAc.password.$model != v$.createAc.confPassword.$model)}" toggleMask></Password>
                      <span class="p-inputgroup-addon">
                        <i class="pi pi-key"></i>
                      </span>
                    </div>
                    <small v-if="(v$.createAc.confPassword.$invalid && createAc.submitted) || v$.createAc.confPassword.$pending.$response" class="p-error">{{'Por favor, especifique una contraseña'}}</small>
                    <small v-else-if="(v$.createAc.password.$model != v$.createAc.confPassword.$model)" class="p-error">{{'Las contraseñas no coinciden'}}</small>
                  </div>
                  <!--CONDICIONES-->
                  <div class="field-checkbox">
                    <Checkbox :disabled="createAc.checkBox == false" id="accept" name="accept" value="Accept" v-model="createAc.accept" :class="{'p-invalid':v$.createAc.accept.$invalid && createAc.submitted}" />
                    <Button v-on:click="dialog.terms = true, createAc.checkBox = true" label="Aceptar los términos y condiciones" class="text-left p-button-link" />
                  </div>
                  <Message v-if="(this.v$.createAc.$invalid) && this.createAc.submitted"  severity="error" :closable="false">Por favor compruebe errores en el formulario</Message>
                  <Message v-if="createAc.failed" severity="error" :closable="false">El correo introducido ya existe</Message>
                  <Button type="submit" :disabled="createAc.submitDisabled || this.v$.createAc.$invalid" class="mt-2 mb-6 p-button-raised font-semibold h-3rem" style="border-radius: 1rem">
                    <div class="flex justify-content-center flex-wrap card-container w-full">
                        <div id="spinner" class="flex align-items-center justify-content-center mr-2">
                          <ProgressSpinner v-if="this.createAc.creating" style="width:20px; height:20px" strokeWidth="8" fill="transparent" animationDuration="2s"/>
                        </div>                   
                        <div v-if="!this.createAc.creating" class="flex align-items-center justify-content-center font-bold text-white">Crear cuenta</div>
                        <div v-else class="flex align-items-center justify-content-center font-bold text-white">Creando cuenta...</div>
                    </div>
                  </Button>
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
      this.$accounts.getCountries().then(data => {
        this.countries = data;
      });
  },

  methods: {
    uploadFile() {
      let file = this.$refs.file.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          this.Images = reader.result.split(',')[1];
      };
    },

    loginImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},

    //vuelidate
    /*
     * Funcion que se ejecuta al hacer click en crear cuenta.
     * Solo ejecuta algo si la form de login es valida.     
     */
    handleSubmit() {
      this.createAc.submitted = true;
      this.createAc.submitDisabled = true;

      this.v$.createAc.date.$model.setDate(this.v$.createAc.date.$model.getDate() + 1);
      let date = new Date(this.v$.createAc.date.$model).toISOString()

      if (this.v$.createAc.email.$invalid || this.v$.createAc.password.$invalid || this.v$.createAc.confPassword.$invalid || this.v$.createAc.nickname.$invalid || this.v$.createAc.date.$invalid || this.v$.createAc.country.$invalid || this.v$.createAc.accept.$invalid || this.v$.createAc.name.$invalid) { //|| this.v$.imagen.$invalid) {
        this.createAc.submitDisabled = false;
        return;
      }
      // La form ha sido validada correctamente en front
      this.createAc.creating = true;

      this.$accounts.createAccount(this.v$.createAc.nickname.$model, this.v$.createAc.name.$model, this.v$.createAc.email.$model, date, this.v$.createAc.country.$model, this.v$.createAc.password.$model,this.Images).then(success => { //this.createAc.image
        if (success) {
          this.createAc.creating = false;
          this.dialog.display = false;
          this.dialog.accountCreated = true;
        } else {
          //El email ya estaba registrado (del backend)
          this.createAc.creating = false;
          this.createAc.submitDisabled = false;
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
      this.login.submitDisabled = true;
      if (this.vLogin$.login.email.$invalid || this.vLogin$.login.password.$invalid) {
        this.login.submitDisabled = false;
        return;
      }
      // La form ha sido validada correctamente en front
      this.login.loging = true;
      this.$accounts.login(this.vLogin$.login.email.$model, this.vLogin$.login.password.$model).then(success => {
        if (success.ok) {
          if (success.validacion){ // Correo verificado, y ok, entramos
          console.log("entramos")
            this.dialog.display = false;
            this.login.loging = false;
            
            //this.$router.push({
              //name: 'profile',
              //params: { id: id, myProfile: true }
            //});
            this.$loggedStatus.logged = true;
            this.$router.push('/profile');
          }
          else{
            this.login.loging = false;
            this.login.altura = false;
            this.login.validationFail = true;
          }
          
        } else {
          //El email o la contraseña son incorrectos (del backend)
          this.login.loging = false;
          this.login.submitDisabled = false;
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
      var email = this.vForgot$.forgotPsw.email.$model
      this.$accounts.forgotPwd(email).then(success => {
        if(success){
          this.forgotPsw.sent = true;
        } else {
          this.forgotPsw.failed = true;
        }
      });
        
    },

    /* 
     * Resetea la form de crear cuenta y sus validaciones
     */
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
      this.createAc.checkBox = false;
      this.createAc.submitDisabled = false;
      this.createAc.creating = false;
    },

    /* 
     * Resetea la form de password olvidado y sus validaciones
     */
    resetFormForgot() {
      //Resetear las validaciones
      this.$nextTick(() => { this.vForgot$.$reset() });
      this.forgotPsw.email = '';
      this.forgotPsw.failed = false;
      this.forgotPsw.sent = false;
      this.forgotPsw.submitted = false;
    },

    /* 
     * Resetea la form de login y sus validaciones
     */
    resetFormLog() {
      //Resetear las validaciones
      this.$nextTick(() => { this.vLogin$.$reset() });
      this.login.email = '';
      this.login.password = '';
      this.login.failed = false;
      this.login.validationFail = false;
      this.login.submitted = false;
      this.createAc.submitDisabled = false;
      this.login.loging = false;
    },

    /* 
     * Pone las variables de la form de login al pulsar "iniciar sesion o crear cuenta"
     */
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
      this.createAc.submitDisabled = false;
    },

    /*
     * Activa las clases para la animacion de la ventana de login
     */
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

    /*
     * Cambia la pestanya seleccionada entre login y crear cuenta
     */
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
        submitDisabled: false,
        loging: false,
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
        checkBox: false,
        creating: false,
        submitDisabled: true,
      },
      Images: '',
      countries: '',
    }
  },
  //vuelidate
  validations() {
    return {
      //para que autotrackee el estado $dirty
      "$autoDirty": true,
      //que no autovalide hasta que le meta algo osea hasta que $dirty, lo quito porque da problemas (deja enviar forms vacias)
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

/* Dialog styles */
.dialog-login {
  background-color: var(--surface-a); /* Get el current background del tema */
  border-radius: 15px;
  animation-duration: 0.6s;
  animation-name: lineInserted;
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

  .resize-dialog {
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

/* Tamnyo del logo en Dialog */
.logo-size {
  width: 100px;
  height: 100px;
}

/* Color del spinner */
#spinner .p-progress-spinner-circle{
	-webkit-animation: p-progress-spinner-dash 1.5s ease-in-out infinite !important;
	animation: p-progress-spinner-dash 1.5s ease-in-out infinite !important;
  stroke: white !important;
}

</style>
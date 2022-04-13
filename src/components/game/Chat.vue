<template>
  <!--Chat-->
  <div class="field col-12 mb-0">
      <h5>Chat:</h5>
      <div id="chat" class="section text-left" style="border-radius: 5px; border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: none;">
          <div class="h-20rem" style="overflow-y: visible; overflow-x: hidden">
              <div id="message" v-for="(item, index) in messages" :key="index">
                  <div v-if="item.mine" class="flex justify-content-end flex-wrap">
                      <div class="bg-blue-500 font-bold text-white m-2" style="border-radius: 1.5rem; padding: 0.8rem">
                          <p class="m-0 text-sm">{{ item.nickname }}</p>
                          <p class="m-0">{{ item.message }}</p>
                      </div>
                  </div>
                  <div v-else class="flex justify-content-start flex-wrap">
                      <div class="surface-200 font-bold m-2" style="border-radius: 1.5rem; padding: 0.8rem">
                          <p class="m-0 text-sm">{{ item.nickname }}</p>
                          <p class="m-0">{{ item.message }}</p>
                      </div>
                  </div>
              </div>
          </div>      
      </div>
      <div class="p-inputgroup">
          <InputText v-model="message" style="border-top-left-radius: 0; border-top-right-radius: 0;" placeholder="Mensaje" />
          <Button class="col-fixed p-button-secondary" v-on:click="sendMessage()" :disabled="this.message == null" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 0" icon="pi pi-send" label="Enviar"/>
      </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      //CHAT
      //Mensajes del chat que pillaremos del back mine lo uso para ver si es mio o no (en vd tbn se podria usar el nickname == mi nickname)
      messages: [
          {nickname: 'pikanachi', message: 'Hola', mine: true},
          {nickname: 'pikanachi', message: 'Te he traido los 5', mine: true},
          {nickname: 'juanksp', message: 'Jaja pues por el culo te la hinco!', mine: false},
          {nickname: 'juanksp', message: 'soy muy gracioso porque me gusta Itsuki, no como Nacho que es un Lolicon', mine: false},
          {nickname: 'pikanachi', message: 'jaja Lolicon pues que te den por culo un montón', mine: true},
          {nickname: 'pikanachi', message: 'bueno la cosa, esto el chat y ta wapo', mine: true},
          {nickname: 'juanksp', message: 'ta wapo, ta wapo', mine: false},
      ],
      //Aqui es donde se pone el nuevo mensaje a enviar, habrá que appendearlo a la lista de mensajes para mostrarlo en el front tbn
      message: null,
    }
  },
  methods: {
    sendMessage() {
    this.messages.push({nickname: 'pikanachi', message: this.message, mine: true});
    const scrollIntoViewOptions = { behavior: "smooth", inline: 'start' }; //block: 'nearest'
    const chat = document.getElementById('chat');
    chat.scrollIntoView(scrollIntoViewOptions);
    this.message = null;

    var audio = new Audio('sounds/sendMessage.wav');
    audio.loop = false;
    audio.play();
    },
  }
}
</script>

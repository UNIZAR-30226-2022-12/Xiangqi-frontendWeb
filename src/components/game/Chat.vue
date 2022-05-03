<template>
  <!--Chat-->
  <div class="field col-12 mb-0">
      <h5>Chat:</h5>
      <div class="section text-left" :class="{'chat-dark': this.$appState.darkTheme, 'chat-light': !this.$appState.darkTheme}" style="border-radius: 5px; border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: none;">
          <div class="h-20rem" :class="{'chat-dark-bkg': this.$appState.darkTheme}" id="chat" style="overflow-y: scroll; overflow-x: hidden">
              <div id="message" v-for="(item, index) in messages" :key="index">
                  <div v-if="item.mine" class="flex justify-content-end flex-wrap">
                      <div class="bg-green-500 font-bold text-white m-2" style="border-radius: 1.5rem; padding: 0.8rem">
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

import io from "socket.io-client";

export default {
  inject: ['$accounts'],
  name: 'app',
  props: {
      idSala: {
          type: String,
          required: true
      },
      myId: {
          type: String,
          required: true
      },
      idOp: {
          type: String,
          required: true
      },
  },
  data() {
    return {
      //CHAT
      //Mensajes del chat que pillaremos del back mine lo uso para ver si es mio o no (en vd tbn se podria usar el nickname == mi nickname)
      //CAMBIAR A SI EL ID == AL DEL LOCALSTORAGE ES MIO
      messages: [
      ],
      //Aqui es donde se pone el nuevo mensaje a enviar, habrá que appendearlo a la lista de mensajes para mostrarlo en el front tbn
      message: null,
      socket: null,
      nicknameOp: null,
      myNickname: null
    }
  },
  mounted(){
    this.$accounts.getProfile(this.idOp).then(response => {
      console.log(response.perfil)
      this.nicknameOp = response.perfil.nickname
		});
    this.$accounts.getProfile(this.myId).then(response => {
      console.log(response.perfil)
      this.myNickname = response.perfil.nickname
		});
    if(this.socket == null){
        this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
    }
    this.socket.on("my msg", (data)=>{
      console.log(data)
      this.messages.push({nickname: this.nicknameOp, message: data, mine: false});
      const chat = document.getElementById('chat');
      setTimeout(() => {
        chat.scroll({ top: chat.scrollHeight, behavior: 'smooth' });
      }, 1);
      //Borrar el mensaje
      //this.message = null;

      //Rep sonido
      var audio = new Audio('sounds/receiveMessage.wav');
      audio.loop = false;
      audio.play();
    })
    this.socket.emit("enterRoom", {'id': this.idSala})
    console.log("idsala", this.idSala)
  },
  unmounted(){
    this.socket.off("my msg")
    this.socket.emit("leaveRoom", {'id': this.idSala})
  },
  methods: {
    sendMessage() {
      this.messages.push({nickname: this.myNickname, message: this.message, mine: true});
      const chat = document.getElementById('chat');
      //El evento de scroll tiene que llegar desopues de los del vue
      setTimeout(() => {
        chat.scroll({ top: chat.scrollHeight, behavior: 'smooth' });
      }, 1);
      this.socket.emit("sendMsg", {'id': this.idSala, 'msg': this.message})
      //Borrar el mensaje
      this.message = null;

      //Rep sonido
      var audio = new Audio('sounds/sendMessage.wav');
      audio.loop = false;
      audio.play();
    },
  }
}
</script>

<style>

.chat-dark {
  border-color: #304562 !important;
}

.chat-dark-bkg {
  background-color: #17212f !important;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.chat-light {
  border-color: #CED4DA !important;
}
</style>

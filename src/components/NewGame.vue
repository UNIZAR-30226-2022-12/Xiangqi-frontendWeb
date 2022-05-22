<!--BOTÓN Y DIALOGO PARA CREAR UN JUEGO NUEVO-->
<template>
  <Button v-on:click="openDialog()" class="p-button-raised font-semibold w-full text-left mb-2 h-3rem" style="border-radius: 1rem" label="Nueva Partida" icon="pi pi-plus" iconPos="left" />
  <Dialog v-model:visible="display" class="dialogo-partida" :draggable="false" :modal="true"> <!--v-model:visible asociado con variable contentStyle="padding: 0px;"-->
    <template #header>
      <h3 class="mr-2">Nueva partida</h3> 
    </template>
    <div class="card p-2">
      <div class="flex align-items-center flex-wrap card-container">
          <div class="flex align-items-center justify-content-center mb-5">
            <InputSwitch v-model="friend" id="friend"/>
            <div class="ml-3">Partida contra un amigo conectado</div>
          </div>
          <Dropdown v-if="friend" v-model="selectedFriend" :filter="true" :options="friends" optionLabel="name" class="m-auto w-full" placeholder="Selecciona un amigo">
            <template #option="slotProps">
            {{slotProps.option.name}}
            </template>
          </Dropdown>
      </div>
    </div>
    <template #footer>
      <Button v-on:click="nuevaPartida()" :disabled="this.searchingOponent || (selectedFriend == null && friend)" class="p-button-raised font-semibold h-3rem w-full" style="border-radius: 1rem">
        <div class="flex justify-content-center flex-wrap card-container w-full">
            <div id="spinner" class="flex align-items-center justify-content-center mr-2">
              <ProgressSpinner v-if="this.searchingOponent" style="width:20px; height:20px" strokeWidth="8" fill="transparent" animationDuration="2s"/>
            </div>                   
            <div v-if="!this.searchingOponent && !friend" class="flex align-items-center justify-content-center font-bold text-white">Nueva partida aleatoria</div>
            <div v-else-if="!this.searchingOponent && selectedFriend != null" class="flex align-items-center justify-content-center font-bold text-white">Nueva partida contra {{selectedFriend.name}}</div>
            <div v-else-if="selectedFriend == null && friend" class="flex align-items-center justify-content-center font-bold text-white">Por favor seleccione un amigo de su lista</div>
            <div v-else-if="selectedFriend != null && friend" class="flex align-items-center justify-content-center font-bold text-white">Conectando con {{selectedFriend.name}}</div>
            <div v-else class="flex align-items-center justify-content-center font-bold text-white">Buscando oponente...</div>
        </div>
      </Button> 
    </template>
  </Dialog>
</template>

<script>

export default {
  inject: ['$game'],
  props: {
		onlineFriends: {
			type: Array,
			required: false
		},
    cerrar: {
			type: Boolean,
			required: false
		}
	},
  created(){
    this.friends = this.onlineFriends;
  },
  data() {
    return {
      display: false,
      friend: false,
      selectedFriend: null,
      friends: [],
      socket: null,
      searchingOponent: false,
    }
  },
  methods: {
    openDialog() {
      console.log("AMIGOS: ", this.onlineFriends)
      this.display = true;

      this.$game.socket.emit('getOnlineFriends',{'id': sessionStorage.getItem('id')});

      // Si los vuelvo a poner a null peta muuy fuerte
      this.selectedFriend = null;

      this.friends = this.onlineFriends;

      this.searchingOponent = false;
      this.friend = false;

    },
    nuevaPartida() {
      //Ponemos el spinner
      if(this.selectedFriend == null){
        this.searchingOponent = true;

        //Pasarle al back las opciones de la partida
        this.$game.socket.emit("searchRandomOpponent",{'id':sessionStorage.getItem('id')})
        this.$game.socket.on("startGame", (data)=>{
          console.log(data)
          this.display = false;

          var color;
          if(data.rojo) {
            color = "rojo"
          } else {
            color = "negro"
          }

          this.$game.socket.off("startGame")
          this.$game.socket.emit("leaveRoom", {'id': data.idSala})
          this.$router.push(`/game/${data.idOponent}/${data.idSala}/${color}`)
        })
      } else {
        //Esperando supongo
        this.searchingOponent = true;
        console.log("ENVIO A AMIGo")
        this.$game.socket.emit("sendGameRequest",{'id':sessionStorage.getItem('id'), 'idFriend': this.selectedFriend.id})
        this.$game.socket.on("startGame", (data)=>{
          console.log(data)
          this.display = false;

          var color;
          if(data.rojo) {
            color = "rojo"
          } else {
            color = "negro"
          }

          this.$game.socket.off("startGame")
          this.$game.socket.emit("leaveRoom", {'id': data.idSala})
          this.$router.push(`/game/${data.idOponent}/${data.idSala}/${color}`)
        })
      }
    }
  },
  mounted() { 
    // Recoge el evento que lanza al clicar en aceptar el rejectedInvitation
    this.emitter.on("close-new-game", close => {
      this.display = close;
    });
  }
}
</script>

<style>

.dialogo-partida {
  background-color: var(--surface-a); /* Get el current background del tema */
  border-radius: 15px;
  animation-duration: 0.6s;
  animation-name: lineIns derted;
  transition: height 0.6s, width 0.6s;
  border-radius: 15px;
  width: 30rem;
}

</style>
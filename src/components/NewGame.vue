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
            <InputSwitch v-model="timer" id="timer"/>
            <div class="ml-3">Partida con temporizador</div>
          </div>
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
      <Button v-on:click="nuevaPartida()" :disabled="this.searchingOponent || (selectedFriend.name == null && friend)" class="p-button-raised font-semibold h-3rem w-full" style="border-radius: 1rem">
        <div class="flex justify-content-center flex-wrap card-container w-full">
            <div id="spinner" class="flex align-items-center justify-content-center mr-2">
              <ProgressSpinner v-if="this.searchingOponent" style="width:20px; height:20px" strokeWidth="8" fill="transparent" animationDuration="2s"/>
            </div>                   
            <div v-if="!this.searchingOponent && !friend" class="flex align-items-center justify-content-center font-bold text-white">Nueva partida aleatoria</div>
            <div v-else-if="!this.searchingOponent && selectedFriend.name != null" class="flex align-items-center justify-content-center font-bold text-white">Nueva partida contra {{selectedFriend.name}}</div>
            <div v-else-if="selectedFriend.name == null && friend" class="flex align-items-center justify-content-center font-bold text-white">Por favor seleccione un amigo de su lista</div>
            <div v-else-if="selectedFriend.name != null && friend" class="flex align-items-center justify-content-center font-bold text-white">Conectando con {{selectedFriend.name}}</div>
            <div v-else class="flex align-items-center justify-content-center font-bold text-white">Buscando oponente...</div>
        </div>
      </Button> 
    </template>
  </Dialog>
</template>

<script>
import io from "socket.io-client"

export default {
  data() {
    return {
      display: false,
      timer: false,
      friend: false,
      selectedFriend: {id: null, name: null},
      friends: [
        {id: 1, name: 'juanksp'},
        {id: 2, name: 'pikanachi'},
        {id: 3, name: 'alexzheng'},
      ],
      socket: null,
      searchingOponent: false,
    }
  },
  methods: {
    openDialog() {
      this.display = true;
      //Juan aqui reseteo el socket así ok??
      this.socket = null;
      this.searchingOponent = false;
      this.friend = false;
      this.timer = false;
      this.selectedFriend.id = null, 
      this.selectedFriend.name = null
    },
    nuevaPartida() {
      //Ponemos el spinner
      this.searchingOponent = true;

      //Pasarle al back las opciones de la partida
      if(this.socket == null) {
        this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
      }
      this.socket.emit("searchRandomOpponent",{'id':localStorage.getItem("id")})
      this.socket.on("startGame" ,(data)=>{
          console.log(data)
          this.display = false;
          //En vez de guardar en localStorage los parametros q se que te gusta
          //Mejor pasarlos via router siue estos pasos ej:
          /*
          1- En router.js cambiar el route de game para pasarle los params por URL

          {
            path: '/game/:idOponent/:idSala/:color',
            name: 'Partida',
            component: Game,
          },

          2- Aqui hacer el push así pasandole los params

          this.$router.push({
            name: "game",
            params: { idOponent: data.idOponent, idSala: data.idOponent, color: "rojo"}
          });


          3- En game.vue para pillar los params haz esto

          this.$route.params.idOponent

          this.$route.params.idSala

          this.$route.params.color
          */
         var color;
         if(data.rojo){
            color = "rojo"
          } else {
            color = "negro"
          }
          this.socket.off("startGame")
          localStorage.setItem("socket", this.socket)
          this.socket.emit("leaveRoom", {'id': data.idSala})
          this.$router.push(`/game/${data.idOponent}/${data.idSala}/${color}`)
      })
    }
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
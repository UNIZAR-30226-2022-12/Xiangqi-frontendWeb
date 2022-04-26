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
            <InputSwitch v-model="temporizador" id="temporizador"/>
            <div class="ml-3">Partida con temporizador</div>
          </div>
          <div class="flex align-items-center justify-content-center mb-5">
            <InputSwitch v-model="amigo" id="amigo"/>
            <div class="ml-3">Partida contra un amigo</div>
          </div>
          <Dropdown v-if="amigo" v-model="amigoSeleccionado" :filter="true" :options="amigos" class="m-auto w-full" placeholder="Selecciona un amigo" />
      </div>
    </div>
    <template #footer>
      <Button label="Nueva partida" class="p-button p-button-raised w-full" style="border-radius: 1rem" v-on:click="nuevaPartida()"/>
    </template>
  </Dialog>
</template>

<script>
import io from "socket.io-client"

export default {
  data() {
    return {
      display: false,
      temporizador: false,
      amigo: false,
      amigoSeleccionado: null,
      amigos: [
        'juanksp',
        'pikanachi',
        'alexzheng',
      ],
      socket: null,
    }
  },
  methods: {
    openDialog() {
      this.display = true;
    },
    nuevaPartida() {
      //Pasarle al back las opciones de la partida
      if(this.socket == null){
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
          
          
          localStorage.setItem("idOponente", data.idOponent)
          localStorage.setItem("idSala", data.idOponent)
          if(data.rojo){
            localStorage.setItem("color", "rojo")
          } else {
            localStorage.setItem("color","negro")
          }
          //Pasarle los parametros a game
          this.socket.off("startGame")
          this.$router.push('/game');
      })
      console.log("CLICK")
      //this.display = false;
      //this.$router.push('/game');
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
  width: 23rem;
}

</style>
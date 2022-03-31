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
      <Button label="Nueva partida" class="p-button p-button-raised w-full" v-on:click="nuevaPartida()"/>
    </template>
  </Dialog>
</template>

<script>


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
    }
  },
  methods: {
    openDialog() {
      this.display = true;
    },
    nuevaPartida() {
      //Pasarle al back las opciones de la partida
      this.display = false;
      this.$router.push('/game');
    }
  }
}
</script>

<style>

.dialogo-partida {
  border-radius: 15px;
  width: 23rem;
}

</style>
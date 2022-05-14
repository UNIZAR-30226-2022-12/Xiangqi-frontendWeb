<!--BOTÓN Y DIALOGO QUE INFORMA QUE HAN RECHAZADO LA PARTIDA-->
<template>
  <Dialog v-model:visible="display" class="dialogo-partida" :draggable="false" :modal="true" :closable="false"> <!--v-model:visible asociado con variable contentStyle="padding: 0px;"-->
    <template #header>
      <h3 class="mr-2">Solicitud rechazada</h3> 
    </template>
    <div class="card p-2">
          <div class="text-center mb-5 mt-5">
            <h5> {{nickname}} ha rechazado la invitación a la partida </h5>
          </div>
    </div>
    <template #footer>
    <div class="grid">
            <Button v-on:click="display = false" class="p-button-raised font-semibold h-3rem w-full" label="Aceptar" style="border-radius: 1rem"/>
    </div>
    </template>
  </Dialog>
</template>

<script>

export default {
    props: {
        nickname: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            display: true,
            }
    },
}

</script>
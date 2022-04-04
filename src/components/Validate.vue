<template>
  <login/>
  <Dialog v-model:visible="display" class="dialog-success-verified" :draggable="false" :modal="true">
      <template #header :class="colorHeader">
      <h3>Cuenta validada correctamente</h3>
      </template>
      <div class="text-center">
      <p>Ya puede loguearse en su cuenta en su nueva cuenta con el email indicado:</p>
      <h5>{{email}}</h5>
      <Button type="submit" label="Aceptar" v-on:click="display = false" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
      </div>
  </Dialog>
</template>
<script>
import login from '../pages/Login.vue';

export default {
  //Inyectar el modulo de cuentas definido en main.js
  inject: ['$accounts'],
  components: {
    login,
  },
  data() {
    return {
      display: true,
      email: '',
    }
  },
  created(){
    this.email = window.location.href.split('?')[1].split('=')[1]
    this.$accounts.validate(this.email)
  }
}
</script>

<style>

.dialog-success-verified {
  background-color: var(--surface-a); /* Get el current background del tema */
  border-radius: 15px;
  animation-duration: 0.6s;
  animation-name: lineIns derted;
  transition: height 0.6s, width 0.6s;
  width: 450px;
  height: 280px;
}
</style>
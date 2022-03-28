
<script>


export default {
  //Inyectar el modulo de cuentas definido en main.js
  inject: ['$accounts'],

  created(){
    const email = window.location.href.split('?')[1].split('=')[1]
    console.log(email);
    this.$accounts.validate(email)
    this.$router.push('/');
  }
}
</script>
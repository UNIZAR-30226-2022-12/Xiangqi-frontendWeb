<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Ranking</h5>
				<p>Página por hacer.</p>
			</div>
		</div>
	</div>
	<button @click="show = !show">Testea la animacion</button>
	<Transition name="bounce">
		<h1 v-if="show">OH MAI GOD!!</h1>
	</Transition>
</template>

<script>
export default {
	inject: ['$accounts'],
	data() {
		return {
			show: true,
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	}
}
</script>

<style scoped>

/* animacion */
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
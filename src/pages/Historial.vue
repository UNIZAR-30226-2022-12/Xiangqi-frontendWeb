<template>
	<loader v-if="this.loading"/>
</template>

<script>
import loader from '../components/Loader.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			loading: true,
		}
	},
	components: {
		loader,
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	}
}
</script>
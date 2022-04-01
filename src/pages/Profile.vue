<template>
	<myProfile v-if="perfil!=null" :perfil="perfil" :profileImage="profileImage" :myProfile="true"/>
	<myGames v-if="games!=null" :games="games"/>
	<myStatics v-if="perfil!=null" :perfil="perfil" :myProfile="true"/>
</template>

<script>
import myProfile from '../components/profile/ProfileData.vue';
import myGames from '../components/profile/ProfileGames.vue';
import myStatics from '../components/profile/ProfileStatics.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			perfil: null,
			games: null,
			columns: null,
			profileImage: '',
		}
	},
	components: {
		myProfile,
		myGames,
		myStatics,
	},
	created() {
		this.$accounts.getProfile(localStorage.getItem('id')).then(response => {
			this.perfil = response.perfil;
		});

		this.$accounts.getProfileImage(localStorage.getItem('id')).then(data => {
			this.profileImage = data;
		})

		this.$accounts.getGames(localStorage.getItem('id')).then(response => {
            this.games = response
		});
	},
}
</script>

<style>
.section {
	border-radius: 1rem;
	border-style: solid;
	border-width: 1px;
	border-color: var(--surface-200);
}

/* Este estilo se activa cuando el tamaño de la ventana es >= 992px */
@media (min-width: 992px) {
	.profile-name {
		max-width: 30rem;
	}
}

/* Este estilo se activa cuando el tamaño de la ventana es <= 991px */
@media (max-width: 991px) {
	.profile-name {
		/*background-color: green !important;*/
	}
}
</style>
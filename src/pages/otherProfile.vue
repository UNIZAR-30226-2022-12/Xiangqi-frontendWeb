<template>
	<loader v-if="this.loading"/>
	<otherData v-if="perfil!=null" :perfil="perfil" :profileImage="profileImage" :myProfile="false"/>
	<otherStatics v-if="perfil!=null" :perfil="perfil" :myProfile="false"/>
</template>

<script>
import loader from '../components/Loader.vue';
import otherData from '../components/profile/ProfileData.vue';
import otherStatics from '../components/profile/ProfileStatics.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			loading: true,
			perfil: null,
			columns: null,
			profileData: '',
			profileImage: '',
		}
	},
	components: {
		loader,
		otherData,
		otherStatics,
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

        this.$accounts.getProfile(this.$route.params.id).then(response => {
			this.perfil = response.perfil;
		});
		if (this.perfil.hasImage) {
			this.$accounts.getProfileImage(this.$route.params.id).then(data => {
				this.profileImage = data;
			});
		} else {
			this.profileImage = "images/profilePlaceholder.svg";
		}
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
<template>
	<otherData :perfil="perfil" :profileImage="profileImage" :myProfile="false"/>
	<otherStatics :myProfile="false"/>
</template>

<script>
import otherData from '../components/profile/ProfileData.vue';
import otherStatics from '../components/profile/ProfileStatics.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			perfil: null,
			columns: null,
			profileData: '',
			profileImage: '',
		}
	},
	components: {
		otherData,
		otherStatics,
	},
	created() {
        //IDEA: para reciclar métodos les pasamos siempre nuestro id y el token y que en el back solo se use el 
        //token para autenticar pero que la info la saque del id dado asi podemos usar el mismo metodo para ambos
		/*
        this.$accounts.getProfile(IDE DEL OTRO QUE SACAMOS DE LA TABLA ONCLICK del local storage como habias puesto (acordarse de destruirlo luego), localStorage.getItem('token')).then(response => {
			this.perfil = response.perfil;
		});

		this.$accounts.getProfileImage(   IDE DEL OTRO, localStorage.getItem('token')).then(data => {
			this.profileImage = data;
		})
        */
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
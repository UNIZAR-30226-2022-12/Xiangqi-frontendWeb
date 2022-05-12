<template>
	<h2 v-if="myProfile">Mi perfil</h2>
	<h2 v-else>Perfil de {{perfil.name}}</h2>
	
    <div class="surface-section section p-6 text-center">
		<div class="grid m-auto">
			<div class="col-fixed" style="margin-left: auto; margin-right:auto; width:calc(8rem + 20px)">
				<img id=profliePic :src="profileImage" class="foto-perfil shadow-2 surface-50" style="" alt="foto de perfil">
			</div>
			<div class="col-12 sm:col-12 md:col-12 lg:col-6 align-self-start lg:text-left profile-name" style="min-height: 3.5rem">
				<h2 class="mb-1">{{perfil.name}}</h2>
				<p class="mb-1">#{{perfil.nickname}}</p>
				<img class="flag h-auto" :class="[perfil.country.flag]" src="images/flags/flag_placeholder.png">
			</div>
			<div class="col align-self-start lg:text-right" style="padding-right: 0; padding-left: 0; min-height: 3.5rem">
				<profileEdit v-if="myProfile" :perfil="perfil"/>
			</div>
		</div>
		<div class="surface-section section mt-4 p-6 text-center">
			<div class="grid">
				<div class="col-12 md:col-6 lg:col-3 mb-4 text-center">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50 text-center" style="border-radius: 1rem">
						<font-awesome-icon class="text-4xl text-primary" icon="cake-candles" />
					</span>
					<div class="text-900 mb-3 font-medium text-center">Fecha de cumpleaños</div>
					<span class="text-700 text-sm line-height-3">{{perfil.birthday}}</span>
				</div>
				<div class="col-12 md:col-6 lg:col-2 mb-4 text-center">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50 text-center" style="border-radius: 1rem">
						<font-awesome-icon class="text-4xl text-primary" icon="coins" />
					</span>
					<div class="text-900 mb-3 font-medium text-center">Número de puntos</div>
					<span class="text-700 text-sm line-height-3">{{perfil.points}} puntos</span>
				</div>
				<div class="col-12 md:col-6 lg:col-2 mb-4 text-center">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50 text-center" style="border-radius: 1rem">
						<font-awesome-icon class="text-4xl text-primary" icon="calendar" />
					</span>
					<div class="text-900 mb-3 font-medium text-center">Usuario desde</div>
					<span class="text-700 text-sm line-height-3">{{perfil.registerDate}}</span>
				</div>
				<div class="col-12 md:col-6 lg:col-2 mb-4 text-center">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50 text-center" style="border-radius: 1rem">
						<font-awesome-icon class="text-4xl text-primary" icon="arrow-trend-up" />
					</span>
					<div class="text-900 mb-3 font-medium text-center">Puesto en ranking</div>
					<span class="text-700 text-sm line-height-3">puesto {{perfil.range}}</span>
				</div>
				<div class="col-12 md:col-6 lg:col-3 mb-4 text-center">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50 text-center" style="border-radius: 1rem">
						<font-awesome-icon class="text-4xl text-primary" icon="user-group" />
					</span>
					<div class="text-900 mb-3 font-medium text-center">Numero de amigos</div>
					<span class="text-700 text-sm line-height-3">Amigos {{perfil.nFriends}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import profileEdit from './ProfileEdit.vue';

export default {
	inject: ['$accounts'],
    props: {
        perfil: {
            type: Object,
            required: false
        },
        profileImage: {
            type: String,
            required: true
        },
		myProfile: {
			type: Boolean,
			required: true
		}
    },
	components: {
		profileEdit
	},
	created() {
		document.title = 'Perfil de ' + this.perfil.nickname;
	}
}
</script>

<style>
.foto-perfil {
	vertical-align: middle;
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
	object-fit: cover;
}

.flag {
	vertical-align: middle;
	width: 2rem;
	object-fit: cover;
}
</style>
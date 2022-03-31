<template>
	<h2>Perfil de {{username}}</h2>
	<div class="surface-section section p-6 text-center"> <!--text-center px-2 py-4 md:px-3 lg:px-4-->
			<div class="grid m-auto">
				<div class="col-fixed" style="margin-left: auto; margin-right:auto; width:calc(8rem + 20px)"> <!--col-12 sm:col-12 md:col-12 lg:col-3 bg-blue-500  lg:max-w-max--><!-- m-2 px-5 py-3-->
					<img id=profliePic :src="profileImage" class="foto-perfil" style="" alt="foto de perfil">
				</div>
				<div class="col-12 sm:col-12 md:col-12 lg:col-6 align-self-start lg:text-left profile-name" style="min-height: 3.5rem">
					<h2 class="mb-1">{{name}}</h2>
					<p class="mb-1">#{{username}}</p>
					<img class="flag h-auto" :class="[flag]" src="images/flags/flag_placeholder.png">
				</div>
			</div>
		<div class="surface-section section mt-4 p-6 text-center">
			<div class="grid">
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-star text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Cumpleaños</div>
					<span class="text-700 text-sm line-height-3">{{birthday}}</span>
				</div>
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-users text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Amigos</div>
					<span class="text-700 text-sm line-height-3">{{numFriends}} amigos</span>
				</div>
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-calendar text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Usuario desde</div>
					<span class="text-700 text-sm line-height-3">{{userSince}}</span>
				</div>
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-sort-amount-up text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Rango</div>
					<span class="text-700 text-sm line-height-3">{{range}}</span>
				</div>
			</div>
		</div>
	</div>
	<h2>Estadísticas</h2>
	<div class="surface-section section p-6 text-center">
	</div>
</template>

<script>

export default {
	inject: ['$accounts'],
	data() {
		return {
			name: '',
			username: '',
			flag: '', //flag-cn seria china, puesta por defecto, pillarla del back ver tipos que puede ser en assts/demo/flags.txt
			birthday: '',
			numFriends: '',
			userSince: '',
			range: '',
			profileData: '',
			profileImage: '',
		}
	},
	created() {
		this.$accounts.getOtherProfile(localStorage.getItem('token')).then(response => {
			console.log(response);
			this.name = response.perfil.name;
			this.username = response.perfil.nick;
			this.flag = response.perfil.pais.bandera;
			this.birthday = response.perfil.birthDate;
			//this.numFriends el backend no nos lo da
			this.userSince = response.perfil.registerDate;
			this.range = response.perfil.rango;
			
			console.log(response);
		});

		this.$accounts.getProfileImage(localStorage.getItem('idAconsultar')).then(data => {
			this.profileImage = data;
			console.log(this.profileImage)
		})
	},

	//document.getElementById("profliePic").src="../assets/images/1.png";

}
</script>

<style>
.section {
	border-radius: 1rem;
	border-style: solid;
	border-width: 1px;
	border-color: var(--surface-200);
}

.foto-perfil {
	vertical-align: middle;
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
	border-style: solid;
	border-width: 1.5px;
	border-color: var(--surface-400);
	object-fit: cover;
}

.flag {
	vertical-align: middle;
	width: 2rem;
	object-fit: cover;
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
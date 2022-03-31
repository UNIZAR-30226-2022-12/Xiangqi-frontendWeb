<template>
	<h2 v-if="myProfile">Mi perfil</h2>
	<h2 v-else>Perfil de {{perfil.nombre}}</h2>
	
    <div class="surface-section section p-6 text-center"> <!--text-center px-2 py-4 md:px-3 lg:px-4-->
		<div class="grid m-auto">
			<div class="col-fixed" style="margin-left: auto; margin-right:auto; width:calc(8rem + 20px)"> <!--col-12 sm:col-12 md:col-12 lg:col-3 bg-blue-500  lg:max-w-max--><!-- m-2 px-5 py-3-->
				<img id=profliePic :src="profileImage" class="foto-perfil shadow-2 surface-50" style="" alt="foto de perfil">
			</div>
			<div class="col-12 sm:col-12 md:col-12 lg:col-6 align-self-start lg:text-left profile-name" style="min-height: 3.5rem">
				<h2 class="mb-1">{{perfil.name}}</h2>
				<p class="mb-1">#{{perfil.nickname}}</p>
				<img class="flag h-auto" :class="[perfil.country.flag]" src="images/flags/flag_placeholder.png">
			</div>
			<div class="col align-self-start lg:text-right" style="padding-right: 0; padding-left: 0; min-height: 3.5rem">
				<Button v-if="myProfile" class="p-button-raised" style="border-radius: 1rem" label="Editar perfil" icon="pi pi-user-edit" iconPos="left"></Button>
			</div>
		</div>
		<div class="surface-section section mt-4 p-6 text-center">
			<div class="grid">
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-star text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Cumpleaños</div>
					<span class="text-700 text-sm line-height-3">{{perfil.birthday}}</span>
				</div>
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-users text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Punos</div>
					<span class="text-700 text-sm line-height-3">{{perfil.points}} puntos</span>
				</div>
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-calendar text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Usuario desde</div>
					<span class="text-700 text-sm line-height-3">{{perfil.registerDate}}</span>
				</div>
				<div class="col-6 md:col-3 mb-4 px-5">
					<span class="p-3 shadow-2 mb-3 inline-block surface-50" style="border-radius: 1rem">
						<i class="pi pi-sort-amount-up text-4xl text-primary"></i>
					</span>
					<div class="text-900 mb-3 font-medium">Clasificacion</div>
					<span class="text-700 text-sm line-height-3">Puesto {{perfil.range}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    props: {
        perfil: {
            type: Object,
            required: true
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
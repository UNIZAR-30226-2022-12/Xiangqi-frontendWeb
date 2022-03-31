<template>
    <h2 v-if="myProfile"> Mis estadísticas</h2>
    <h2 v-else>Estadísticas de {{perfil.name}}</h2>
	<div class="surface-section section p-6 text-center">
	
    </div>   
</template>

<script>
export default {
    props: {
		myProfile: {
			type: Boolean,
			required: true
		}
    },
}
</script>
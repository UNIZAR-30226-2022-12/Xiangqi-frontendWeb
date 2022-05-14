<template>
	<h2> Historial </h2>
	<loader v-if="this.loading"/>
	<historial v-else :playerHistory="playerHistory"/>
</template>

<script>
import loader from '../components/Loader.vue';
import historial from '../components/historial/HistorialTable.vue';

export default {
	inject: ['$accounts'],
	components: {
		loader,
		historial
	},
	data() {
		return {
			loading: true,
			playerHistory: []
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

		// CUANDO ESTE EL BACK HECHO:
		// CAMBIAR ESTO
		// ---------------------------------------------------------------------
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
		// El atributo key es obligatorio para que funcione el componente
		this.playerHistory = [
			{key: 0, data: {date: "20/02/22", hour: "12:30"},
				children: [
					{data: {id: 0, nickname: "pikanachi", flag: "flag-es", color: 'rojo', piece:"caballonegro", origin: "[12-12]", destination: "[14-14]"}},
					{data: {id: 1, nickname: "juanksp", flag: "flag-jp", piece:"canyonrojo", origin: "[3-2]", destination: "[3-3]"}},
					{data: {id: 2, nickname: "pikanachi", flag: "flag-es", piece:"oficialnegro", origin: "[2-2]", destination: "[4-4]"}},
				]
			},
			{key: 1, data: {date: "22/02/22", hour: "11:23"},
				children: [
					{data: {id: 0, nickname: "pikanachi", flag: "flag-es", piece:"oficialnegro", origin: "[2-2]", destination: "[4-4]"}},
					{data: {id: 1, nickname: "juanksp", flag: "flag-jp", piece:"soldadorojo", origin: "[3-2]", destination: "[3-3]"}}
				]
			},
			{key: 2, data: {date: "22/02/22", hour: "11:23"},
				children: [
					{key: "0", data: {id: 0, nickname: "pikanachi", flag: "flag-es", piece:"caballonegro", origin: "[2-2]", destination: "[4-4]"}},
					{key: "1", data: {id: 1, nickname: "juanksp", flag: "flag-jp", piece:"caballorojo", origin: "[3-2]", destination: "[3-3]"}}
				]
			},
		];

		this.loading = false;

		// POR ESTO
		// ---------------------------------------------------------------------
		/*
		this.$accounts.getHistorial().then(response => {
			this.playerHistory = response;
			this.loading = false;
		});
		*/
	}
}
</script>
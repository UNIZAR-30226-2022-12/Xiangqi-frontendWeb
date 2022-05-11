<template>
	<h2> Historial </h2>
	<loader v-if="this.loading"/>
	<historial :playerHistory="playerHistory" v-else/>
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

		//El atributo key es obligatorio para que funcione el componente
		this.playerHistory = [
			{key: "0", data: {date: "20/02/22", hour: "12:30"},
				children: [
					{key: "0", data: {id: 0, nickname: "pikanachi", piece:"caballo negro", origin: "[2-2]", destination: "[4-4]"}},
					{key: "1", data: {id: 1, nickname: "juanksp", piece:"caballo rojo", origin: "[3-2]", destination: "[3-3]"}}
				]
			},
			{key: "1", data: {date: "22/02/22", hour: "11:23"},
				children: [
					{key: "0", data: {id: 0, nickname: "pikanachi", piece:"caballo negro", origin: "[2-2]", destination: "[4-4]"}},
					{key: "1", data: {id: 1, nickname: "juanksp", piece:"caballo rojo", origin: "[3-2]", destination: "[3-3]"}}
				]
			},
			{key: "2", data: {date: "22/02/22", hour: "11:23"},
				children: [
					{key: "0", data: {id: 0, nickname: "pikanachi", piece:"caballo negro", origin: "[2-2]", destination: "[4-4]"}},
					{key: "1", data: {id: 1, nickname: "juanksp", piece:"caballo rojo", origin: "[3-2]", destination: "[3-3]"}}
				]
			},
		];

		//CUANDO ESTE EL BACK HECHO:
		//CAMBIAR ESTO
		this.loading = false;

		//POR ESTO
		/*
		this.$accounts.getHistorial().then(response => {
			this.playerHistory = response.playerHistory;
			this.loading = false;
		});
		*/
	}
}
</script>
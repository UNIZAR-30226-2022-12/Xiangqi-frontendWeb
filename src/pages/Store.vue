<template>
	<h2> Tienda </h2>
	<loader v-if="this.loading"/>
	<div v-else>
		<boardsSection :loading="this.loading" :name="boardsName" :set="setsBoards"/>
		<piecesSection :loading="this.loading" :name="piecesName" :set="setsPieces"/>
	</div>
</template>

<script>

import loader from '../components/Loader.vue';
import boardsSection from '../components/store/StoreSection.vue';
import piecesSection from '../components/store/StoreSection.vue';

export default {
	inject: ['$accounts', '$store'],
	components: {
		boardsSection,
		piecesSection,
		loader
	},
	data() {
		return {
			loading: true,
			boardsName: 'tableros',
			piecesName: 'piezas',
			setsBoards: [],
			setsPieces: [],
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
		
		// CUANDO ESTE EL BACK HECHO:
		// CAMBIAR ESTO
		// ---------------------------------------------------------------------
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
		this.setsBoards = [
			{id: '1', name: 'Madera teka', desc: "Tablero con un dragón grabado", category: "Tablero de madera",price: '11', purchased: true},
			{id: '2', name: 'Madera nogal', desc: "Tablero con dragones grabados", category: "Tablero de madera", price: '12', purchased: false},
			{id: '3', name: 'Madera roble', desc: "Tablero con un grabado oriental", category: "Tablero de madera", price: '15', purchased: false},
			{id: '4', name: 'Metal óxido', desc: "Tablero con dragones grabados", category: "Tablero de metal", price: '16', purchased: false},
			{id: '5', name: 'Metal acero', desc: "Tablero con un dragón grabado", category: "Tablero de metal", price: '10', purchased: false},
			{id: '6', name: 'Mármol gris', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '10', purchased: false},
			{id: '7', name: 'Mármol arena', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '18', purchased: false},
			{id: '8', name: 'Mármol onyx', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '10', purchased: true},
			{id: '9', name: 'Mármol hielo', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '10', purchased: false},
			{id: '10', name: 'Ajedrezado', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '8', purchased: false},
			{id: '11', name: 'Cemento gris', desc: "Tablero con un dragón grabado", category: "Tablero de cemento", price: '10', purchased: true},
			{id: '12', name: 'Hormigón', desc: "Tablero con un dragón grabado", category: "Tablero de cemento", price: '10', purchased: false},
		];

		this.setsPieces = [
                {id: '1', name: 'Default symbols', desc: "Iconos con símbolos claros", category: "Iconos", price: '10', purchased: true},
                {id: '2', name: 'Default Chino', desc: "Iconos tradicionales en Chino", category: "Chino", price: '10', purchased: true},
				{id: '3', name: 'Dark symbols', desc: "Iconos con símbolos oscuros", category: "Iconos", price: '30', purchased: false},
				{id: '4', name: 'Dark Chino', desc: "Iconos en Chino oscuros", category: "Chino", price: '30', purchased: false},
				{id: '5', name: 'Light symbols', desc: "Iconos con símbolos claros", category: "Iconos", price: '20', purchased: false},
				{id: '6', name: 'Light Chino', desc: "Iconos en Chino claros", category: "Chino", price: '20', purchased: false},
        ];

		this.loading = false;

		//POR ESTO
		// ---------------------------------------------------------------------
		/*
		this.$store.getStoreItems().then(response => {
			this.setsBoards = response.setsBoards;
			this.setsPieces = response.setsPieces;
			this.loading = false;
		});
		*/
	}
}
</script>
<template>
	<loader v-if="this.loading"/>
	<boardsSection :name="boardsName" :set="setsBoards"/>
	<piecesSection :name="piecesName" :set="setsPieces"/>
</template>

<script>
import loader from '../components/Loader.vue';
import boardsSection from '../components/store/StoreSection.vue';
import piecesSection from '../components/store/StoreSection.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			loading: false,
			boardsName: 'tableros',
			setsBoards: [
                {id: '1', name: 'Madera teka', desc: "Tablero con un dragón grabado", price: '11', purchased: true},
                {id: '2', name: 'Madera nogal', desc: "Tablero con dragones grabados", price: '12', purchased: false},
                {id: '3', name: 'Madera roble', desc: "Tablero con un grabado oriental", price: '15', purchased: false},
                {id: '4', name: 'Metal óxido', desc: "Tablero con dragones grabados", price: '16', purchased: false},
                {id: '5', name: 'Metal acero', desc: "Tablero con un dragón grabado", price: '10', purchased: false},
                {id: '6', name: 'Marmol gris', desc: "Tablero motivo ajedrezado grabado", price: '10', purchased: false},
                {id: '7', name: 'Marmol arena', desc: "Tablero motivo ajedrezado grabado", price: '18', purchased: false},
                {id: '8', name: 'Marmol onyx', desc: "Tablero motivo ajedrezado grabado", price: '10', purchased: false},
                {id: '9', name: 'Marmol hielo', desc: "Tablero motivo ajedrezado grabado", price: '10', purchased: false},
                {id: '10', name: 'Ajedrezado', desc: "Tablero motivo ajedrezado grabado", price: '8', purchased: false},
                {id: '11', name: 'Cemento gris', desc: "Tablero con un dragón grabado", price: '10', purchased: false},
                {id: '12', name: 'Hormigón', desc: "Tablero con un dragón grabado", price: '10', purchased: false},
            ],
			piecesName: 'piezas',
			setsPieces: [
                {id: '1', name: 'Iconos símbolo', desc: "Iconos con símbolos dibujados", price: '10', purchased: true},
                {id: '2', name: 'Iconos en Chino', desc: "Iconos tradicionales en Chino", price: '10', purchased: false},
            ],
		}
	},
	components: {
		loader,
		boardsSection,
		piecesSection,
	},
	created() {
		//this.$loggedStatus.logged = this.$accounts.isAuthenticated();
		this.$loggedStatus.logged = true;
	}
}
</script>
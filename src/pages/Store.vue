<template>
	<h2> Tienda </h2>
	<loader v-if="loading"/>
	<div v-else-if="!loading && setsBoards != null && setsPieces != null && points != null">
		<div class="surface-section section mb-6">
			<div class="col-12 mb-4 mt-4 text-center">
				<span class="p-3 shadow-2 mb-3 inline-block surface-50 text-center" style="border-radius: 1rem">
					<font-awesome-icon class="text-4xl text-primary" icon="coins" />
				</span>
				<div class="text-900 text-2xl font-medium">Número de puntos {{points}}</div>
			</div>
		</div>
		<boardsSection :loading="loading" :name="boardsName" :set="setsBoards" @purchase-item-pressed="purchaseItem" :points="points"/>
		<piecesSection :loading="loading" :name="piecesName" :set="setsPieces" @purchase-item-pressed="purchaseItem" :points="points"/>
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
			setsBoards: null,
			setsPieces: null,
			points: null,
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
		
		// CUANDO ESTE EL BACK HECHO:
		// CAMBIAR ESTO
		// ---------------------------------------------------------------------
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
		/*this.setsBoards = [
			{id: '1', tipo:'1', name: 'Madera teka', desc: "Tablero con un dragón grabado", category: "Tablero de madera",price: '0', purchased: true},
			{id: '2', tipo:'tablero', name: 'Madera nogal', desc: "Tablero con dragones grabados", category: "Tablero de madera", price: '0', purchased: true},
			{id: '3', tipo:'tablero', name: 'Madera roble', desc: "Tablero con un grabado oriental", category: "Tablero de madera", price: '10', purchased: false},
			{id: '4', tipo:'tablero', name: 'Metal óxido', desc: "Tablero con dragones grabados", category: "Tablero de metal", price: '20', purchased: false},
			{id: '5', tipo:'tablero', name: 'Metal acero', desc: "Tablero con un dragón grabado", category: "Tablero de metal", price: '20', purchased: false},
			{id: '6', tipo:'tablero', name: 'Mármol gris', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '7', tipo:'tablero', name: 'Mármol arena', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '8', tipo:'tablero', name: 'Mármol onyx', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: true},
			{id: '9', tipo:'tablero', name: 'Mármol hielo', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '10', tipo:'tablero', name: 'Ajedrezado', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '11', tipo:'tablero', name: 'Cemento gris', desc: "Tablero con un dragón grabado", category: "Tablero de cemento", price: '40', purchased: false},
			{id: '12', tipo:'tablero', name: 'Hormigón', desc: "Tablero con un dragón grabado", category: "Tablero de cemento", price: '40', purchased: false},
		];

		this.setsPieces = [
                {id: '1', tipo:'tablero', name: 'Default symbols', desc: "Iconos con símbolos claros", category: "Iconos", price: '0', purchased: true},
                {id: '2', tipo:'tablero', name: 'Default Chino', desc: "Iconos tradicionales en Chino", category: "Chino", price: '0', purchased: true},
				{id: '3', tipo:'tablero', name: 'Dark symbols', desc: "Iconos con símbolos oscuros", category: "Iconos", price: '30', purchased: false},
				{id: '4', tipo:'tablero', name: 'Dark Chino', desc: "Iconos en Chino oscuros", category: "Chino", price: '30', purchased: false},
				{id: '5', tipo:'tablero', name: 'Light symbols', desc: "Iconos con símbolos claros", category: "Iconos", price: '60', purchased: false},
				{id: '6', tipo:'tablero', name: 'Light Chino', desc: "Iconos en Chino claros", category: "Chino", price: '60', purchased: false},
        ];

		this.loading = false;*/
		//this.points = 60;

		//POR ESTO
		// ---------------------------------------------------------------------
		this.$store.getStoreItems().then(response => {
			this.setsBoards = response.setsBoards;
			this.setsPieces = response.setsPieces;
		});

		this.$store.getPoints().then(response => {
			this.points = response;
			this.loading = false;
		});
	},
	methods: {
		purchaseItem(price, id, tipo) {
			if (this.points - price >= 0) {
				this.points = this.points - price;
				// Actualizar el points en el back
				this.$store.purchaseItem(id, tipo, price);
				//console.log(id, tipo, price);
				if (tipo == 1) {
					//console.log('purchased board');
					this.setsBoards[id - 1].purchased = true;
				} else {
					//console.log('purchased piece');
					this.setsPieces[id - 1].purchased = true;
				}
			}
		}
	}
}
</script>
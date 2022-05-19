<template>
    <!--Tema de los iconos-->
    <div class="field col-12 mb-0">
        <h5>Selección de temas:</h5>
        <label>Seleccione el tema de sus iconos:</label><br>
        <Dropdown class="w-full" v-model="selectedPiecesSet" @change="changeIcons()" :options="setsPieces" optionLabel="name" :filter="true" placeholder="Seleccione un set de piezas">
            <template #option="slotProps">
                <div class="card">
                    <div class="card-container blue-container overflow-hidden">
                        <div class="flex">
                            <img class="h-3rem flex align-items-center justify-content-center mr-3" :src="'images/themes/pieces/' + slotProps.option.id + '/canyonrojo.svg'" />
                            <div class="flex align-items-center justify-content-center font-bold">{{slotProps.option.name}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
    <!--Tema del tablero-->
    <div class="field col-12 mb-0">
        <label>Seleccione el tema de su tablero:</label><br>
        <Dropdown class="w-full" v-model="selectedBoard" @change="changeBoard()" :options="setsBoards" optionLabel="name" :filter="true" placeholder="Seleccione un tema para el tablero">
            <template #option="slotProps">
                <div class="card">
                    <div class="card-container blue-container overflow-hidden">
                        <div class="flex">
                            <img class="h-3rem flex align-items-center justify-content-center mr-3" style="border-radius: 0.5rem" :src="'images/themes/boards/' + slotProps.option.id + '.jpg'" />
                            <div class="flex align-items-center justify-content-center font-bold">{{slotProps.option.name}}</div>
                        </div>
                    </div>
                </div>
            </template>
        </Dropdown>
    </div>
</template>

<script>

export default {
    emits: ['change-board', 'change-icons'],
    inject: ['$store'],
    data() {
        return {
            //Set de piezas seleccionado por defecto
            selectedPiecesSet: {id: '1', name: 'Default symbols'},

            //Tema por defecto del tablero
            selectedBoard: {id: '1', name: 'Madera teka'},

            setsBoards: [],
            setsPieces: []
        }
    },
    created() {
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
		/*this.setsBoards = [
			{id: '1', name: 'Madera teka', desc: "Tablero con un dragón grabado", category: "Tablero de madera",price: '0', purchased: true},
			{id: '2', name: 'Madera nogal', desc: "Tablero con dragones grabados", category: "Tablero de madera", price: '0', purchased: true},
			{id: '3', name: 'Madera roble', desc: "Tablero con un grabado oriental", category: "Tablero de madera", price: '10', purchased: false},
			{id: '4', name: 'Metal óxido', desc: "Tablero con dragones grabados", category: "Tablero de metal", price: '20', purchased: false},
			{id: '5', name: 'Metal acero', desc: "Tablero con un dragón grabado", category: "Tablero de metal", price: '20', purchased: false},
			{id: '6', name: 'Mármol gris', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '7', name: 'Mármol arena', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '8', name: 'Mármol onyx', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: true},
			{id: '9', name: 'Mármol hielo', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '10', name: 'Ajedrezado', desc: "Tablero motivo ajedrezado grabado", category: "Tablero de mármol", price: '30', purchased: false},
			{id: '11', name: 'Cemento gris', desc: "Tablero con un dragón grabado", category: "Tablero de cemento", price: '40', purchased: false},
			{id: '12', name: 'Hormigón', desc: "Tablero con un dragón grabado", category: "Tablero de cemento", price: '40', purchased: false},
		];

		this.setsPieces = [
                {id: '1', name: 'Default symbols', desc: "Iconos con símbolos claros", category: "Iconos", price: '0', purchased: true},
                {id: '2', name: 'Default Chino', desc: "Iconos tradicionales en Chino", category: "Chino", price: '0', purchased: true},
				{id: '3', name: 'Dark symbols', desc: "Iconos con símbolos oscuros", category: "Iconos", price: '30', purchased: false},
				{id: '4', name: 'Dark Chino', desc: "Iconos en Chino oscuros", category: "Chino", price: '30', purchased: false},
				{id: '5', name: 'Light symbols', desc: "Iconos con símbolos claros", category: "Iconos", price: '60', purchased: false},
				{id: '6', name: 'Light Chino', desc: "Iconos en Chino claros", category: "Chino", price: '60', purchased: false},
        ];*/

		//POR ESTO
		// ---------------------------------------------------------------------
		this.$store.getStoreItems().then(response => {
			for (let i = 0; i < response.setsBoards.length; i++) {
                if (response.setsBoards[i].purchased) {
                    this.setsBoards.push(response.setsBoards[i]);
                }
            }
            
			for (let i = 0; i < response.setsPieces.length; i++) {
                if (response.setsPieces[i].purchased) {
                    this.setsPieces.push(response.setsPieces[i]);
                }
            }
		});
    },
    methods: {
        changeBoard() {
            this.$emit('change-board', this.selectedBoard);
        },
        changeIcons() {
            this.$emit('change-icons', this.selectedPiecesSet);
        },
        getSelectedPiecesSet() {
            return this.selectedPiecesSet;
        },
        getSelectedBoard() {
            return this.selectedBoard;
        }
    }
}

</script>
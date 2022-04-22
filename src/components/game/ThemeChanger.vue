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
    data() {
        return {
            //Estos son los sets de piezas que tiene el usuario, habra que pedirlos al back, de momento solo hay 2
            setsPieces: [
                {id:'1', name: 'Iconos occidentales'},
                {id:'2', name: 'Iconos en Chino'},
            ],

            //Set de piezas seleccionado por defecto
            selectedPiecesSet: {id: '1', name: 'Iconos occidentales'},

            //Tema por defecto del tablero
            selectedBoard: {id: '1', name: 'Madera 1'},

            //Estos son los sets que tiene el usuario, habra que pedirlos al back
            setsBoards: [
                {id: '1', name: 'Madera 1'},
                {id: '2', name: 'Madera 2'},
                {id: '3', name: 'Madera 3'},
                {id: '4', name: 'Metal 1'},
                {id: '5', name: 'Metal 2'},
                {id: '6', name: 'Marmol 1'},
                {id: '7', name: 'Marmol 2'},
                {id: '8', name: 'Marmol 3'},
                {id: '9', name: 'Marmol 4'},
                {id: '10', name: 'Checker 1'},
                {id: '11', name: 'Cemento 1'},
                {id: '12', name: 'Cemento 2'},
            ],
        }
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
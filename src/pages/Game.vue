<template>
    <div class="grid">
        <!--BARRA LATERAL-->
        <div class="centrar-mauto col-12 lg:col-4 align-items-center surface-section section p-6 text-left mb-4 lg:mb-0" style="max-width: 40rem"> 
            <div class="grid">
                <div class="field col-12 mb-0">
                    <h3 class="m-0 p-0">Partida contra {{rival.name}}</h3>
                    <div class="flex card-container overflow-hidden mt-4">
                        <div class="flex-none align-items-left justify-content-left mr-3">
                            <img id=profliePic :src="profileImage" class="foto-perfil shadow-2 surface-50 ml-1 mt-1 mb-2" style="" alt="foto de perfil">
                        </div>
                        <div class="flex-grow-1 align-items-left justify-content-left">
                            <p>
                                <img class="flag h-auto mr-1" :class="[rival.country.flag]" src="images/flags/flag_placeholder.png">
                                 #{{ rival.nickname }}
                            </p>
                            <p>Puesto en ranking: {{ rival.range }} </p>
                            <p>Cumpleaños: {{ rival.birthday }} </p>
                        </div>
                    </div>
                    <Button class="col-12 w-full mt-2 w-full p-button-raised font-semibold h-3rem  font-semibold" style="border-radius: 1rem" label="Añadir a mis amigos" icon="pi pi-user-plus"/>
                </div>
                <Divider />
                <!--Temporizador-->
                <div class="field col-12 mb-0">
                    <h6>Temporizador:</h6>
                    <h2 class="mt-0 mb-0">{{this.timer}}</h2>
                </div>
                <Button v-on:click="confirm()" class="col-12 mt-2  mb-2 w-full p-button-raised font-semibold h-3rem bg-pink-500 border-pink-500" style="border-radius: 1rem" icon="pi pi-save" label="Guardar y salir"/>
                <Divider />
                <chat />
                <Divider />
                <!--Tema de los iconos-->
                <div class="field col-12 mb-0">
                    <h5>Selección de temas:</h5>
                    <label>Seleccione el tema de sus iconos:</label><br>
                    <Dropdown class="w-full" v-model="selectedPiecesSet" :options="setsPieces" optionLabel="name" :filter="true" placeholder="Seleccione un set de piezas">
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
                    <Dropdown class="w-full" v-model="selectedBoard" :options="setsBoards" optionLabel="name" :filter="true" placeholder="Seleccione un tema para el tablero">
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
            </div>
        </div>

        <!--Tablero-->
        <div class="col-12 lg:col-8 tema-fondo m-auto board-width" :class="{'wooden1': selectedBoard.id == '1', 'wooden2': selectedBoard.id == '2', 'wooden3': selectedBoard.id == '3', 'metal1': selectedBoard.id == '4', 'metal2': selectedBoard.id == '5', 
            'marbled1': selectedBoard.id == '6', 'marbled2': selectedBoard.id == '7', 'marbled3': selectedBoard.id == '8', 'marbled4': selectedBoard.id == '9', 'checker1': selectedBoard.id == '10', 'concrete1': selectedBoard.id == '11', 'concrete2': selectedBoard.id == '12'}">
            <div v-for="(item, indexFil) in tablero.filas" :key="indexFil" class="flex">
                <div v-for="(itemFila, indexCol) in item" :key="indexCol" v-on:click="moves(indexFil, indexCol, itemFila)" class="h-3rem w-3rem sm:h-4rem sm:w-4rem md:h-5rem md:w-5rem border-600 border-0 flex-grow-1 flex align-items-center justify-content-center">
                    <!--Casilla sin pieza-->
                    <div v-if="itemFila.pieza == null" class="casilla w-2rem h-2rem" :class="{'casilla-pista': itemFila.esPista}" v-on:click="moveSelectedPiece(indexFil, indexCol, itemFila)"></div>
                    <!--Casilla con pieza-->
                    <div v-else class="h-full w-full">
                        <!--Hemos seleccionado una pieza-->
                        <img v-if="indexFil == this.selectedPiece.fil && indexCol == this.selectedPiece.col" class="pieza-responsive-selected selectedPiece" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.id + '/' + itemFila.pieza + itemFila.color + '.svg'">
                        <!--Pieza no seleccionada, vemos si es pista y la marcamos con otra pieza-->
                        <img v-else-if="itemFila.esPista" class="pieza-responsive" v-on:click="moveSelectedPiece(indexFil, indexCol, itemFila)" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.id + '/' + itemFila.pieza + itemFila.color + 'pista.svg'">
                        <img v-else class="pieza-responsive" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.id + '/' + itemFila.pieza + itemFila.color + '.svg'">  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import chat from '../components/game/Chat.vue';
export default  {
	inject: ['$accounts'],
    components: {
        chat,
    },
      data() {
        return {
            //Tablero inicial
            tablero: {
                filas: [
                    [{ pieza: "torre", color: "negro", moves: [], turno: 0, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "elefante", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "general", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "elefante", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: "torre", color: "negro" , moves: [], turno: 0, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }, { pieza: null, color: null  , moves: [], turno: 0, esPista: false }],
                    [{ pieza: "torre", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "general", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: "torre", color: "rojo" , moves: [], turno: 0, esPista: false }],
                ]

                /*
               filas: [
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null, moves: [], turno: 0, esPista: false }, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: "canyon", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "caballo", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "caballo", color: "negro" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},  { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [{f:1,c:1}], turno: -1}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: "canyon", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false}],]
                */            
            },
            //BARRA LATERAL
            //------------------------------------------------------
            rival: {
                mail:'',
                nickname: 'juanksp', 
                name: 'Juan Plo Andrés', 
                birthday: '05/10/2001', 
                country: {
                    flag: 'flag-es',
                },
                range: '2',
                points: '',
                registerDate: '20/02/2022',
            },
            profileImage: 'images/profilePlaceholder.svg',

            timer: '00:00:00',

            //Estos son los sets de piezas que tiene el usuario, habra que pedirlos al back, de momento solo hay 2
            setsPieces: [
                {id:'1', name: 'Iconos occidentales'},
                {id:'2', name: 'Iconos en Chino'},
            ],

            //Set de piezas seleccionado por defecto
            selectedPiecesSet: {id: '1', name: 'Iconos occidentales'},

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
            //Turno actual
            turno: 0,
            reyRojo:{
                fil: 9,
                col:4
            },
            reyNegro:{
                fil: 0,
                col:4
            },

            //Tema por defecto del tablero
            selectedBoard: {id: '1', name: 'Madera 1'},

            //Casilla seleccionada por defecto
            selectedTile: null,

            //Casilla seleccionada por el user
            selectedPiece: {
                fil: null,
                col: null,
                selected: false,
            },
        }
    },
	created() {
        //para ocultar de manera guarra el menu
		this.$loggedStatus.logged = false;
        this.$playing.game = true;
	},
    methods: {
        checkCheck(){
            let reyCheck = null
            if(this.turno%2 == 0){//Comprobar el rojo
                reyCheck = this.reyRojo
            } else{ //Comprobar el negro
                reyCheck = this.reyNegro
            }
            console.log(reyCheck)
        },

        moveSelectedPiece(indexFil, indexCol, itemFila) {
            if(itemFila.esPista){
                //Comprobar si es valido el movimiento
                let valido = true; // funcion que lo compruebe
                if(valido){
                    console.log("AAAAA", this.selectedPiece)
                    console.log(itemFila)
                    this.turno += 1
                    //let aux = itemFila
                    this.tablero.filas[indexFil][indexCol].pieza = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].pieza
                    this.tablero.filas[indexFil][indexCol].color = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].color
                    this.tablero.filas[indexFil][indexCol].esPista = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].esPista
                    this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].pieza = null
                    if(this.tablero.filas[indexFil][indexCol].pieza == "general"){
                        if(this.tablero.filas[indexFil][indexCol].color == "rojo"){
                            this.reyRojo.fil = indexFil
                            this.reyRojo.col = indexCol
                        } else{
                            this.reyNegro.fil = indexFil
                            this.reyNegro.col = indexCol
                        }
                    }
                } else{
                    console.log("Movimiento no valido")
                }
                console.log(indexFil, indexCol, itemFila);
            }
            
        },

        moves(indexFil, indexCol, item) {
            //Hay otro sonido "capture.wav" que reproduciremos al caoturar una pieza
            var audio = new Audio('sounds/move.wav');
            audio.loop = false;
            audio.play();

            if (this.selectedPiece.fil != null) {
                console.log("Entramos")
                this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves.forEach(move => {
                    this.tablero.filas[move.f][move.c].esPista = false;
                });
            }

            this.selectedPiece.fil = indexFil;
            this.selectedPiece.col = indexCol;
            this.selectedPiece.selected = true;
            console.log(indexFil, indexCol);
            this.selectedTile = this.tablero.filas[indexFil][indexCol]
            if(item.moves.length == 0){ //Cada vez que movamos una ficha sus movimientos pasaran a 0, pero si no calculamos sus movimientos y los guardamos hasta el movimiento
                //MOVIMIENTOS POSIBLES DEL GENERAL
                if(item.pieza == "general"){
                    if(indexCol != 5){
                        if (this.tablero.filas[indexFil][indexCol + 1].pieza == null || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil, c: indexCol + 1})
                        }
                    }
                    if(indexCol != 3){
                        if (this.tablero.filas[indexFil][indexCol - 1].pieza == null || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil, c: indexCol - 1})
                        }
                    }
                    if(indexFil != 9){
                        if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol})
                        }
                    }
                    if(indexFil != 7){
                        if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol})
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DEL OFICIAL
                else if(item.pieza == "oficial"){
                    if(indexCol != 5 && indexFil != 9){
                        if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol + 1})
                        }
                    }
                    if(indexCol != 3 && indexFil != 9){
                        if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol - 1})
                        }
                    }
                    if(indexCol != 5 && indexFil != 3){
                        if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol + 1})
                        }
                    }
                    if(indexCol != 3 && indexFil != 3){
                        if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol - 1})
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DEL ELEFANTE
                else if(item.pieza == "elefante"){
                    if(indexCol != 8 && indexFil != 9){
                        if(this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null){
                            if (this.tablero.filas[indexFil + 2][indexCol + 2].pieza == null || this.tablero.filas[indexFil + 2][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol != 0 && indexFil != 9){
                        if(this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null){
                            if (this.tablero.filas[indexFil + 2][indexCol - 2].pieza == null || this.tablero.filas[indexFil + 2][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol - 2})
                            }
                        }
                    }
                    if(indexCol != 8 && indexFil != 5){
                        if(this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null){
                            if (this.tablero.filas[indexFil - 2][indexCol + 2].pieza == null || this.tablero.filas[indexFil - 2][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol != 0 && indexFil != 5){
                        if(this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null){
                            if (this.tablero.filas[indexFil - 2][indexCol - 2].pieza == null || this.tablero.filas[indexFil - 2][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol - 2})
                            }
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DEL CABALLO
                else if(item.pieza == "caballo"){
                    if(indexCol > 1 && indexFil < 9){
                        if(this.tablero.filas[indexFil][indexCol - 1].pieza == null){
                            if (this.tablero.filas[indexFil + 1][indexCol - 2].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol - 2})
                            }
                        }
                    }
                    if(indexCol < 7 && indexFil < 9){
                        if(this.tablero.filas[indexFil][indexCol + 1].pieza == null){
                            if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol > 1 && indexFil > 0){
                        if(this.tablero.filas[indexFil][indexCol - 1].pieza == null){
                            if (this.tablero.filas[indexFil - 1][indexCol - 2].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol - 2})
                            }
                        }
                    }
                    if(indexCol < 7 && indexFil > 0){
                        if(this.tablero.filas[indexFil][indexCol + 1].pieza == null){
                            if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol < 8 && indexFil > 1){
                        if(this.tablero.filas[indexFil - 1][indexCol].pieza == null){
                            if (this.tablero.filas[indexFil - 2][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 2][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol + 1})
                            }
                        }
                    }
                    if(indexCol > 0 && indexFil > 1){
                        if(this.tablero.filas[indexFil - 1][indexCol].pieza == null){
                            if (this.tablero.filas[indexFil - 2][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 2][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol - 1})
                            }
                        }
                    }
                    if(indexCol < 8 && indexFil < 8){
                        if(this.tablero.filas[indexFil + 1][indexCol].pieza == null){
                            if (this.tablero.filas[indexFil + 2][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 2][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol + 1})
                            }
                        }
                    }
                    if(indexCol > 0 && indexFil < 8){
                        if(this.tablero.filas[indexFil + 1][indexCol].pieza == null){
                            if (this.tablero.filas[indexFil + 2][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 2][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol - 1})
                            }
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DE LA TORRE
                else if(item.pieza == "torre"){
                    //Iterar al norte
                    let it = 1
                    for(let i = indexFil; i > 0; i --){
                        if(this.tablero.filas[indexFil - it][indexCol].pieza == null){
                             item.moves.push({f: indexFil - it, c: indexCol})
                        } else{
                            if(this.tablero.filas[indexFil - it][indexCol].color != item.color){
                                item.moves.push({f: indexFil - it, c: indexCol})
                            }
                            break
                        }
                        it += 1
                    }
                    //Iterar al sur
                    it = 1
                    for(let i = indexFil; i < 9; i ++){
                        if(this.tablero.filas[indexFil + it][indexCol].pieza == null){
                             item.moves.push({f: indexFil + it, c: indexCol})
                        } else{
                            if(this.tablero.filas[indexFil + it][indexCol].color != item.color){
                                item.moves.push({f: indexFil + it, c: indexCol})
                            }
                            break
                        }
                        it += 1
                    }
                    //Iterar al este
                    it = 1
                    for(let i = indexCol; i < 8; i ++){
                        if(this.tablero.filas[indexFil][indexCol + it].pieza == null){
                             item.moves.push({f: indexFil, c: indexCol + it})
                        } else{
                            if(this.tablero.filas[indexFil][indexCol + it].color != item.color){
                                item.moves.push({f: indexFil, c: indexCol + it})
                            }
                            break
                        }
                        it += 1
                    }
                    //Iterar al oeste
                    it = 1
                    for(let i = indexCol; i > 0; i --){
                        if(this.tablero.filas[indexFil][indexCol - it].pieza == null){
                             item.moves.push({f: indexFil, c: indexCol - it})
                        } else{
                            if(this.tablero.filas[indexFil][indexCol - it].color != item.color){
                                item.moves.push({f: indexFil, c: indexCol - it})
                            }
                            break
                        }
                        it += 1
                    }
                }

                //MOVIMIENTOS POSIBLES DEL SOLDADO
                else if(item.pieza == "soldado"){
                    if(item.color == "rojo"){
                        if(indexFil > 5){ // Solo para arriba
                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol})
                            }
                        } else{ // Norte, este y oeste
                            if(indexCol != 8){ // Oeste
                                if (this.tablero.filas[indexFil][indexCol + 1].pieza == null || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 0){
                                if (this.tablero.filas[indexFil][indexCol - 1].pieza == null || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol - 1})
                                }
                            }
                            if(indexFil != 0){
                                if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol})
                                }
                            }
                        }
                    } else{
                        if(indexFil <= 5){ // Solo para abajo
                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol})
                            }
                        } else{ // Norte, este y oeste
                            if(indexCol != 8){ // Oeste
                                if (this.tablero.filas[indexFil][indexCol + 1].pieza == null || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 0){
                                if (this.tablero.filas[indexFil][indexCol - 1].pieza == null || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol - 1})
                                }
                            }
                            if(indexFil != 9){
                                if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil + 1, c: indexCol})
                                }
                            }
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DE LA CANYON
                else if(item.pieza == "canyon"){
                    //Iterar al norte
                    let it = 1
                    let saltar = false
                    for(let i = indexFil; i > 0; i --){
                        if(this.tablero.filas[indexFil - it][indexCol].pieza == null){
                            if(!saltar){
                                console.log("MOVEMOS")
                                item.moves.push({f: indexFil - it, c: indexCol})
                            } else{
                                console.log("VOLAMOS")
                            }
                             
                        } else{ // Encontramos una pieza
                            if(this.tablero.filas[indexFil - it][indexCol].color != item.color){
                                if(saltar){
                                    console.log("COMEMOS")
                                    item.moves.push({f: indexFil - it, c: indexCol})
                                } else{
                                    if(saltar){
                                        console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        console.log("SALTAMOS")
                                        saltar = true
                                    }
                                }
                            } else {// SALTAR
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        }
                        it += 1
                    }
                    //Iterar al sur
                    it = 1
                    saltar = false
                    for(let i = indexFil; i < 9; i ++){
                        if(this.tablero.filas[indexFil + it][indexCol].pieza == null){
                             if(!saltar){
                                console.log("MOVEMOS")
                                item.moves.push({f: indexFil + it, c: indexCol})
                            } else{
                                console.log("VOLAMOS")
                            }
                             
                        } else{ // Encontramos una pieza
                            if(this.tablero.filas[indexFil + it][indexCol].color != item.color){
                                if(saltar){
                                    console.log("COMEMOS")
                                    item.moves.push({f: indexFil + it, c: indexCol})
                                } else{
                                    if(saltar){
                                        console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        console.log("SALTAMOS")
                                        saltar = true
                                    }
                                }
                            } else {// SALTAR
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        }
                        it += 1
                    }
                    //Iterar al este
                    it = 1
                    saltar = false
                    for(let i = indexCol; i < 8; i ++){
                        if(this.tablero.filas[indexFil][indexCol + it].pieza == null){
                             if(!saltar){
                                console.log("MOVEMOS")
                                item.moves.push({f: indexFil, c: indexCol + it})
                            } else{
                                console.log("VOLAMOS")
                            }
                             
                        } else{ // Encontramos una pieza
                            if(this.tablero.filas[indexFil][indexCol + it].color != item.color){
                                if(saltar){
                                    console.log("COMEMOS")
                                    item.moves.push({f: indexFil, c: indexCol  + it})
                                } else{
                                    if(saltar){
                                        console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        console.log("SALTAMOS")
                                        saltar = true
                                    }
                                }
                            } else {// SALTAR
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        }
                        it += 1
                    }
                    //Iterar al oeste
                    it = 1
                    saltar = false
                    for(let i = indexCol; i > 0; i --){
                        if(this.tablero.filas[indexFil][indexCol - it].pieza == null){
                             if(!saltar){
                                console.log("MOVEMOS")
                                item.moves.push({f: indexFil, c: indexCol - it})
                            } else{
                                console.log("VOLAMOS")
                            }
                             
                        } else{ // Encontramos una pieza
                            if(this.tablero.filas[indexFil][indexCol - it].color != item.color){
                                if(saltar){
                                    console.log("COMEMOS")
                                    item.moves.push({f: indexFil, c: indexCol  - it})
                                } else{
                                    if(saltar){
                                        console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        console.log("SALTAMOS")
                                        saltar = true
                                    }
                                }
                            } else {// SALTAR
                                if(saltar){
                                    console.log("NOS CAEMOS")
                                    break
                                } else{
                                    console.log("SALTAMOS")
                                    saltar = true
                                }
                            }
                        }
                        it += 1
                    }
                }
                    
                item.moves.forEach(move => {
                    console.log(move)
                    this.tablero.filas[move.f][move.c].esPista = true;
                });
            } else{
                if(item.turno == this.turno){
                    item.moves.forEach(move => {
                        console.log(move)
                        this.tablero.filas[move.f][move.c].esPista = true;
                    });
                    console.log("Ya visto")
                } else{
                    item.moves = []
                    item.turno = this.turno
                    this.moves(indexFil,indexCol,item)
                }
            }
        },
        

        /*
         * Devuelve la casilla, pieza, y color de la pieza seleccionada
         */
        tile(indexFil, indexCol, pieza, color) {
            this.selectedPiece.fil = indexFil;
            this.selectedPiece.col = indexCol;
            this.selectedPiece.selected = true;
            console.log(indexFil, indexCol, pieza, color);
        },

        confirm() {
            this.$confirm.require({
                message: 'Puede guardarla y continuar después.',
                header: '¿Seguro que desea salir de su partida?',
                icon: 'pi pi-exclamation-triangle',
                rejectLabel: 'Continuar partida',
				acceptLabel: 'Guardar y salir',
                accept: () => {
                    //Guardarle la partida


					this.$router.push("/profile")
                },
                reject: () => {
                    this.$toast.add({severity:'info', summary:'Partida en curso', detail:'Su partida sigue en curso y no ha sido guardada', life: 3000});
                }
            });
		},
    }
}
</script>

<style scoped>

.tema-fondo {
    background-position: center center;
    background-size: 100% 100%;
    background-repeat:no-repeat;
    border-radius: 1rem;
    box-shadow: 4px 4px 10px black;
}

.wooden1 {
    background-image: url("/images/themes/boards/1.jpg");
}

.wooden2 {
    background-image: url("/images/themes/boards/2.jpg");
}

.wooden3 {
    background-image: url("/images/themes/boards/3.jpg");
}

.metal1 {
    background-image: url("/images/themes/boards/4.jpg");
}

.metal2 {
    background-image: url("/images/themes/boards/5.jpg");
}

.marbled1 {
    background-image: url("/images/themes/boards/6.jpg");
}

.marbled2 {
    background-image: url("/images/themes/boards/7.jpg");
}

.marbled3 {
    background-image: url("/images/themes/boards/8.jpg");
}

.marbled4 {
    background-image: url("/images/themes/boards/9.jpg");
}

.checker1 {
    background-image: url("/images/themes/boards/10.jpg");
}

.concrete1 {
    background-image: url("/images/themes/boards/11.jpg");
}

.concrete2 {
    background-image: url("/images/themes/boards/12.jpg");
}

.casilla {
    transition: background-color 0.4s;
    border-radius: 100%;
}

.casilla:hover {
    background: rgba(91, 137, 184);
    cursor: pointer;
}

.casilla-pista {
    background-color: rgba(255, 107, 110);
}

@media (max-width: 1000px) {
    .centrar-mauto{
        margin: auto;
    }
}

@media (min-width: 768px) {
    .board-width {
        max-width: 46rem
    }
}

@media (max-width: 768px) {
    .board-width {
        max-width: 40rem;
        height: 41rem;
    }
}

@media (max-width: 580px) {
    .board-width {
        max-width: 38rem;
        height: auto;
    }
}

@media (max-width: 575px) {
    .board-width {
        max-width: 29rem;
        height: auto;
    }
}

.pieza {
    border-radius: 100%;
    vertical-align: middle;
    object-fit: cover;
    transition: border-width 1s;
}

.selectedPiece {
    border-width: 2px;
    border-style: solid;
    border-color: red;
}

.pieza-responsive {
    transition: opacity 0.5s;
}

.pieza-responsive:hover {
    cursor: pointer;
    opacity: 0.6;
}

@media (min-width: 768px) {
    .pieza-responsive {
        margin: 6px;
    }
    .pieza-responsive-selected {
        margin-right: 3px;
    }
}

@media (max-width: 768px) {
    .pieza-responsive {
        margin: 4px;
    }

    .pieza-responsive-selected {
        margin-right: 2px;
    }
}

/* Este estilo se activa cuando el tamaño de la ventana es > 768px */
@media (min-width: 768px) {
    .board {
        height: 800px;
    }
}

/* Este estilo se activa cuando el tamaño de la ventana es < 768px */
@media (max-width: 768px) {
    .board {
        height: 450px;
    }
}

/* Chat */
.scroll-item {
    background-color: var(--surface-card);
    display: flex;
    align-items: center;
}
</style>
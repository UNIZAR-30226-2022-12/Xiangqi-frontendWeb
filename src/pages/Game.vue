<template>
    <div class="grid">
        <!--BARRA LATERAL-->
        <div class="centrar-mauto col-12 lg:col-4 align-items-center surface-section section p-6 text-left mb-4 lg:mb-0" style="max-width: 40rem"> 
            <div class="grid">
                <!--rivalInfo-->
                <rivalInfo :isFriend="false"/>
                <Divider />
                <!--Temporizador-->
                <div class="field col-12 mb-0">
                    <h6>Temporizador:</h6>
                    <h2 class="mt-0 mb-0">{{this.timer}}</h2>
                </div>
                <Button v-on:click="confirm()" class="col-12 mt-2  mb-2 w-full p-button-raised font-semibold h-3rem bg-pink-500 border-pink-500" style="border-radius: 1rem" icon="pi pi-save" label="Guardar y salir"/>
                <Divider />
                <!--Chat-->
                <chat />
                <Divider />
                <!--Game rules-->
                <gameRules />
                <Divider />
                <!--Theme changer-->
                <themeChanger ref="themeChanger" @change-board="changeBoard" @change-icons="changeIcons"/>
            </div>
        </div>

        <!--Tablero-->
        <div v-if="selectedPiecesSet!=null" class="col-12 lg:col-8 tema-fondo m-auto board-width" :class="{'wooden1': selectedBoard.id == '1', 'wooden2': selectedBoard.id == '2', 'wooden3': selectedBoard.id == '3', 'metal1': selectedBoard.id == '4', 'metal2': selectedBoard.id == '5', 
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

import rivalInfo from '../components/game/RivalInfo.vue'
import chat from '../components/game/Chat.vue';
import themeChanger from '../components/game/ThemeChanger.vue';
import gameRules from '../components/game/GameRules.vue';

export default  {
	inject: ['$accounts'],
    components: {
        rivalInfo,
        chat,
        themeChanger,
        gameRules
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
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false }, { pieza: null, color: null, moves: [], turno: 0, esPista: false }, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "oficial", color: "negro", moves: [], turno: 0, esPista: false},{ pieza: "general", color: "negro" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}],
                    [{ pieza: "torre", color: "negro", moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "caballo", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: "torre", color: "negro", moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "caballo", color: "negro" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},  { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: "torre", color: "rojo", moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false}, { pieza: null, color: "rojo" , moves: [{f:1,c:1}], turno: -1}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false},{ pieza: "general", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0, esPista: false}, { pieza: null, color: null, moves: [], turno: 0, esPista: false}, { pieza: "soldado", color: "negro" , moves: [], turno: 0, esPista: false}],]
             */              
            },
            
            //BARRA LATERAL
            //------------------------------------------------------


            timer: '00:00:00',

            //Set de piezas seleccionado por defecto, lo ponemos en el themechanger
            selectedPiecesSet: null,

            //Tema por defecto del tablero, lo ponemos en el themechanger
            selectedBoard: null,

            //Turno actual
            turno: 1,
            reyRojo:{
                fil: 9,
                col:4
            },
            reyNegro:{
                fil: 0,
                col:4
            },

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
    mounted(){
        this.selectedPiecesSet = this.$refs.themeChanger.getSelectedPiecesSet();
        this.selectedBoard = this.$refs.themeChanger.getSelectedBoard();
    },
    methods: {
        changeBoard(board){
            this.selectedBoard = board;
        },
        changeIcons(piecesSet){
            this.selectedPiecesSet = piecesSet;
        },
        /*
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        */
        checkCheck(reyCheck, amenaza){
            //Mirar el norte(Torre, soldado) | canyon cuando encuentre pieza
            let canyon = false
            let amenzas = ["soldado","torre","general"]
            let it = 1
            console.log("NORTE")
            for(let i = reyCheck.fil; i > 0; i --){
                if(this.tablero.filas[reyCheck.fil - it][reyCheck.col].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil - it][reyCheck.col].color == amenaza){//Ficha 
                        console.log(amenzas)
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil - it][reyCheck.col].pieza)){
                                console.log("jaque", this.tablero.filas[reyCheck.fil - it][reyCheck.col].pieza, amenaza)
                            return false //Hay jaque
                        }
                    }
                    if(canyon == false){ // no nos amenazaba un canyon asi que ahora nos puede amenazar
                        console.log("Nos amenaza el canyon")
                        amenzas = ["canyon"]
                        canyon = true
                    } else { // ya nos amenazaba un canyon y se ha caido
                        break
                    }
                }
                if(it ==  1){ // ya no nos amenaza un soldado
                    if(amenzas.length != 1){
                        amenzas.shift()
                    }
                }
                it += 1
            }

            //Mirar el sur(Torre, soldado) | canyon cuando encuentre pieza
            canyon = false
            amenzas = ["soldado","torre","general"]
            it = 1
            for(let i = reyCheck.fil; i < 9; i ++){
                if(this.tablero.filas[reyCheck.fil + it][reyCheck.col].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil + it][reyCheck.col].color == amenaza){//Ficha 
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil + it][reyCheck.col].pieza)){
                                console.log("jaque", this.tablero.filas[reyCheck.fil + it][reyCheck.col].pieza, amenaza)
                            return false //Hay jaque
                        }
                    }
                    if(canyon == false){ // no nos amenazaba un canyon asi que ahora nos puede amenazar
                        amenzas = ["canyon"]
                        canyon = true
                    } else { // ya nos amenazaba un canyon y se ha caido
                        break
                    }
                }
                if(it ==  1){ // ya no nos amenaza un soldado
                    if(amenzas.length != 1){
                        amenzas.shift()
                    }
                }
                it += 1
            }

            //Mirar el este(Torre, soldado) | canyon cuando encuentre pieza
            canyon = false
            amenzas = ["soldado","torre","general"]
            it = 1
            for(let i = reyCheck.col; i < 8; i ++){
                if(this.tablero.filas[reyCheck.fil][reyCheck.col + it].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil][reyCheck.col + it].color == amenaza){//Ficha 
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil][reyCheck.col + it].pieza)){
                                console.log("jaque", this.tablero.filas[reyCheck.fil][reyCheck.col + it].pieza, amenaza)
                            return false //Hay jaque
                        }
                    }
                    if(canyon == false){ // no nos amenazaba un canyon asi que ahora nos puede amenazar
                        amenzas = ["canyon"]
                        canyon = true
                    } else { // ya nos amenazaba un canyon y se ha caido
                        break
                    }
                }
                if(it ==  1){ // ya no nos amenaza un soldado
                    if(amenzas.length != 1){
                        amenzas.shift()
                    }
                }
                it += 1
            }

            //Mirar el oeste(Torre, soldado) | canyon cuando encuentre pieza
            canyon = false
            amenzas = ["soldado","torre","general"]
            it = 1

            for(let i = reyCheck.col;  i > 0; i --){
                if(this.tablero.filas[reyCheck.fil][reyCheck.col - it].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil][reyCheck.col - it].color == amenaza){//Ficha 
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil][reyCheck.col - it].pieza)){
                                console.log("jaque", this.tablero.filas[reyCheck.fil][reyCheck.col - it].pieza, amenaza)
                            return false //Hay jaque
                        }
                    }
                    if(canyon == false){ // no nos amenazaba un canyon asi que ahora nos puede amenaza
                        amenzas = ["canyon"]
                        canyon = true
                    } else { // ya nos amenazaba un canyon y se ha caido
                        break
                    }
                }
                if(it ==  1){ // ya no nos amenaza un soldado
                    if(amenzas.length != 1){
                        amenzas.shift()
                    }
                }
                it += 1
            }

            // MIRAR LOS CABALLOS
            let posicionesAmenazantes = []
            if(reyCheck.fil != 9){
                if(this.tablero.filas[reyCheck.fil + 1][reyCheck.col + 1].pieza == null){ // El caballo pasa por el este y el sureste
                    posicionesAmenazantes.push({f:reyCheck.fil + 1, c: reyCheck.col + 2})
                    posicionesAmenazantes.push({f:reyCheck.fil + 2, c: reyCheck.col + 1})
                }
                if(this.tablero.filas[reyCheck.fil + 1][reyCheck.col - 1].pieza == null){ // El caballo no pasa por el este y el sureste
                    posicionesAmenazantes.push({f:reyCheck.fil + 1, c: reyCheck.col - 2})
                    posicionesAmenazantes.push({f:reyCheck.fil + 2, c: reyCheck.col - 1})
                }
            }
            if(reyCheck.fil != 0){
                if(this.tablero.filas[reyCheck.fil - 1][reyCheck.col + 1].pieza == null){ // El caballo no pasa por el este y el sureste
                    posicionesAmenazantes.push({f:reyCheck.fil - 1, c: reyCheck.col + 2})
                    posicionesAmenazantes.push({f:reyCheck.fil - 2, c: reyCheck.col + 1})
                }
                if(this.tablero.filas[reyCheck.fil - 1][reyCheck.col - 1].pieza == null){ // El caballo no pasa por el este y el sureste
                    posicionesAmenazantes.push({f:reyCheck.fil - 1, c: reyCheck.col - 2})
                    posicionesAmenazantes.push({f:reyCheck.fil - 2, c: reyCheck.col - 1})
                }
            }
            //console.log(posicionesAmenazantes)
            posicionesAmenazantes.forEach(pos => {
                if(pos.f >= 0 && pos.f <= 9 ){
                    if(this.tablero.filas[pos.f][pos.c].pieza == "caballo" && this.tablero.filas[pos.f][pos.c].color == amenaza){
                        console.log("Jaque caballo", amenaza)
                        return false
                    }
                }
            });
            console.log("Jaque de", amenaza)
            return true
        },


        /*
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        */

        moveSelectedPiece(indexFil, indexCol, itemFila) {
            if(itemFila.esPista){
                //Comprobar si es valido el movimiento
                let aux = {pieza: this.tablero.filas[indexFil][indexCol].pieza, color: this.tablero.filas[indexFil][indexCol].color, esPista:this.tablero.filas[indexFil][indexCol].esPista}
                this.tablero.filas[indexFil][indexCol].pieza = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].pieza
                this.tablero.filas[indexFil][indexCol].color = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].color
                this.tablero.filas[indexFil][indexCol].esPista = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].esPista
                this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].pieza = null
                let auxRey = null
                if(this.tablero.filas[indexFil][indexCol].pieza == "general"){
                    if(this.tablero.filas[indexFil][indexCol].color == "rojo"){
                        auxRey = {fil:this.reyRojo.fil, col: this.reyRojo.col}
                        this.reyRojo.fil = indexFil
                        this.reyRojo.col = indexCol
                        console.log("Muevo al rey rojo: ", this.reyRojo)
                    } else{
                        auxRey = {fil:this.reyNegro.fil, col: this.reyNegro.col}
                        this.reyNegro.fil = indexFil
                        this.reyNegro.col = indexCol
                        console.log("Muevo al rey negro: ", this.reyNegro)
                    }
                }
                var reyCheck
                var amenaza
                if(this.turno%2 == 0){//Comprobar el rojo
                    reyCheck = this.reyNegro
                    amenaza = "rojo"
                } else{ //Comprobar el negro
                    reyCheck = this.reyRojo
                    amenaza = "negro"
                }
                if(this.checkCheck(reyCheck, amenaza) == false){
                    console.log("Movimiento no valido")
                    if(auxRey != null){
                        console.log(this.tablero.filas[indexFil][indexCol])
                        if(this.tablero.filas[indexFil][indexCol].color == "rojo"){
                            this.reyRojo.fil = auxRey.fil
                            this.reyRojo.col = auxRey.col
                            console.log("El rey vuelve a: ", this.reyRojo)
                        } else{
                            auxRey = {fil:this.reyNegro.fil, col: this.reyNegro.col}
                            this.reyNegro.fil = auxRey.fil
                            this.reyNegro.col = auxRey.col
                            console.log("El rey vuelve a: ", this.reyNegro)
                        }
                    }
                    this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].pieza = this.tablero.filas[indexFil][indexCol].pieza
                    this.tablero.filas[indexFil][indexCol].pieza = aux.pieza
                    this.tablero.filas[indexFil][indexCol].color = aux.color
                    this.tablero.filas[indexFil][indexCol].esPista = aux.esPista
                    this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves = this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves.filter(function(item) {
                        return (item.f != indexFil || item.c != indexCol)
                    })
                    this.tablero.filas[indexFil][indexCol].esPista = false
                    
                } else{
                    this.turno += 1
                    console.log("movido, Truno actual: ", this.turno)
                        if(this.turno%2 == 0){//Comprobar el rojo
                        let reyCheck = {fil: this.reyNegro.fil, col: this.reyNegro.col}
                        let amenaza = "rojo"
                        if(this.checkCheck(reyCheck, amenaza) == false){
                            console.log("Jaque a negro")
                            this.calcMovesJaque("negro","rojo", reyCheck)
                        } 
                        console.log("Mueve Negro")
                    } else{ //Comprobar el negro
                        let reyCheck = {fil: this.reyRojo.fil, col: this.reyRojo.col}
                        let amenaza = "negro"
                        if(this.checkCheck(reyCheck, amenaza) == false){
                            console.log("Jaque a rojo")
                            this.calcMovesJaque("rojo","negro", reyCheck)
                        } 
                        console.log("Mueve Rojo")
                    }
                }    
            }
            
        },

/*
        *-----o-------------o-------------------o----------------------------------------------------------------------
        *-----o-o---------o-o-------------------o----------------------------------------------------------------------
        *-----o--o-------o--o-------------------o-----------------------------------------------------------------------
        *-----o---o-----o---o-------------------o-----------------------------------------------------------------------
        *-----o----o---o----o---------o---------o-----------------------------------------------------------------------
        *-----o-----o-o-----o----------o--------o-----------------------------------------------------------------------
        *-----o------o------o-----------o-o-o-o-o-----------------------------------------------------------------------
        */
       moveJaque(filaActual, columnaActual, filaMov, columnaMov, pMover, general, reyCheck, amenaza){
           let returnValue = 0
           console.log(this.tablero.filas[filaActual][columnaActual], filaActual, columnaActual)
           let aux = {pieza: this.tablero.filas[filaMov][columnaMov].pieza, color: this.tablero.filas[filaMov][columnaMov].color, esPista:this.tablero.filas[filaMov][columnaMov].esPista}
            this.tablero.filas[filaMov][columnaMov].pieza = this.tablero.filas[filaActual][columnaActual].pieza
            this.tablero.filas[filaMov][columnaMov].color = this.tablero.filas[filaActual][columnaActual].color
            this.tablero.filas[filaMov][columnaMov].esPista = this.tablero.filas[filaActual][columnaActual].esPista
            this.tablero.filas[filaActual][columnaActual].pieza = null
            let auxRey = null
            if(general == true){
                if(pMover == "rojo"){
                    auxRey = {fil:this.reyRojo.fil, col: this.reyRojo.col}
                    this.reyRojo.fil = filaMov
                    this.reyRojo.col = columnaMov
                    console.log("Muevo al rey rojo: ", this.reyRojo)
                    reyCheck = this.reyRojo
                } else{
                    auxRey = {fil:this.reyNegro.fil, col: this.reyNegro.col}
                    this.reyNegro.fil = filaMov
                    this.reyNegro.col = columnaMov
                    console.log("Muevo al rey negro: ", this.reyNegro)
                    reyCheck = this.reyNegro
                }
            }
            let valido = this.checkCheck(reyCheck, amenaza)
            if(general == true){
                if(pMover == "rojo"){
                    this.reyRojo.fil = auxRey.fil
                    this.reyRojo.col = auxRey.col
                    console.log("El rey vuelve a: ", this.reyRojo)
                } else{
                    auxRey = {fil:this.reyNegro.fil, col: this.reyNegro.col}
                    this.reyNegro.fil = auxRey.fil
                    this.reyNegro.col = auxRey.col
                    console.log("El rey vuelve a: ", this.reyNegro)
                }
            }
            this.tablero.filas[filaActual][columnaActual].pieza = this.tablero.filas[filaMov][columnaMov].pieza
            this.tablero.filas[filaMov][columnaMov].pieza = aux.pieza
            this.tablero.filas[filaMov][columnaMov].color = aux.color
            this.tablero.filas[filaMov][columnaMov].esPista = aux.esPista
            this.tablero.filas[filaActual][columnaActual].moves = this.tablero.filas[filaActual][columnaActual].moves.filter(function(item) {
                return (item.f != filaMov || item.c != (columnaMov))
            })
            this.tablero.filas[filaMov][columnaMov].esPista = false
            if(valido == true){
                returnValue = 1
                this.tablero.filas[filaActual][columnaActual].moves.push({f: filaMov, c: columnaMov})
            }
            return returnValue
        },
        

/*
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        */
       calcMovesJaque(pMover, amenaza, reyCheck){
           let totalMoves = 0
           for(let i = 0; i <= 8; i++){//Recorrer las columnas
                for(let j = 0; j <= 9; j++){//Recorrer las filas
                    console.log(i, j)
                    if(this.tablero.filas[j][i].pieza != null){
                        if(this.tablero.filas[j][i].color == pMover){
                            if(this.tablero.filas[j][i].pieza == "general"){
                                if(i != 5){
                                    if (this.tablero.filas[j][i + 1].pieza == null || this.tablero.filas[j][i + 1].color != this.tablero.filas[j][i].color){
                                        totalMoves += this.moveJaque(j, i, j, i+1,pMover ,true, reyCheck, amenaza)
                                    }
                                }
                                if(i != 3){
                                    if (this.tablero.filas[j][i - 1].pieza == null || this.tablero.filas[j][i - 1].color != this.tablero.filas[j][i].color){
                                        totalMoves += this.moveJaque(j, i, j, i-1,pMover ,true, reyCheck, amenaza)
                                    }
                                }
                                if(j < 9){
                                    if(this.tablero.filas[j][i].color == "rojo"){
                                        if (this.tablero.filas[j + 1][i].pieza == null || this.tablero.filas[j + 1][i].color != this.tablero.filas[j][i].color ){
                                            totalMoves += this.moveJaque(j, i, j + 1, i,pMover ,true, reyCheck, amenaza)
                                        }
                                    }  
                                }
                                if(j < 2){
                                    if(this.tablero.filas[j][i].color == "negro"){
                                        if (this.tablero.filas[j + 1][i].pieza == null || this.tablero.filas[j + 1][i].color != this.tablero.filas[j][i].color ){
                                            totalMoves += this.moveJaque(j, i, j + 1, i,pMover ,true, reyCheck, amenaza)
                                        }
                                    }  
                                }
                                if(j > 7){
                                    if(this.tablero.filas[j][i].color == "rojo"){
                                        if (this.tablero.filas[j - 1][i].pieza == null || this.tablero.filas[j - 1][i].color != this.tablero.filas[j][i].color ){
                                            totalMoves += this.moveJaque(j, i, j - 1, i,pMover ,true, reyCheck, amenaza)
                                        } 
                                    }   
                                }

                                if(j > 0){
                                    if(this.tablero.filas[j][i].color == "negro"){
                                        if (this.tablero.filas[j - 1][i].pieza == null || this.tablero.filas[j - 1][i].color != this.tablero.filas[j][i].color ){
                                            totalMoves += this.moveJaque(j, i, j - 1, i,pMover ,true, reyCheck, amenaza)
                                        } 
                                    }   
                                }
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DEL OFICIAL
                            else if(this.tablero.filas[j][i].pieza == "oficial"){
                                if(this.tablero.filas[j][i].color == "rojo"){
                                    console.log("ITAIYO")
                                    if(i != 5 && j != 9){
                                        if (this.tablero.filas[j + 1][i + 1].pieza == null || this.tablero.filas[j + 1][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 3 && j != 9){
                                        if (this.tablero.filas[j + 1][i - 1].pieza == null || this.tablero.filas[j + 1][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 5 && j != 7){
                                        if (this.tablero.filas[j - 1][i + 1].pieza == null || this.tablero.filas[j - 1][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 3 && j != 7){
                                        if (this.tablero.filas[j - 1][i - 1].pieza == null || this.tablero.filas[j - 1][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                } else {
                                    if(i != 5 && j != 2){
                                        if (this.tablero.filas[j + 1][i + 1].pieza == null || this.tablero.filas[j + 1][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 3 && j != 2){
                                        if (this.tablero.filas[j + 1][i - 1].pieza == null || this.tablero.filas[j + 1][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 5 && j != 0){
                                        if (this.tablero.filas[j - 1][i + 1].pieza == null || this.tablero.filas[j - 1][i + 1].color != this.tablero.filas[j][i].color){
                                            //COMPROBAR JAQUE
                                            totalMoves += this.moveJaque(j, i, j - 1, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 3 && j != 0){
                                        if (this.tablero.filas[j - 1][i - 1].pieza == null || this.tablero.filas[j - 1][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DEL ELEFANTE
                            else if(this.tablero.filas[j][i].pieza == "elefante"){
                                if(i != 8 && j != 9){
                                    if(this.tablero.filas[j + 1][i + 1].pieza == null){
                                        if (this.tablero.filas[j + 2][i + 2].pieza == null || this.tablero.filas[j + 2][i + 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 2, i + 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i != 0 && j != 9){
                                    if(this.tablero.filas[j + 1][i - 1].pieza == null){
                                        if (this.tablero.filas[j + 2][i - 2].pieza == null || this.tablero.filas[j + 2][i - 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 2, i - 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i != 8 && j != 5){
                                    if(this.tablero.filas[j - 1][i + 1].pieza == null){
                                        if (this.tablero.filas[j - 2][i + 2].pieza == null || this.tablero.filas[j - 2][i + 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 2, i + 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i != 0 && j != 5){
                                    if(this.tablero.filas[j - 1][i - 1].pieza == null){
                                        if (this.tablero.filas[j - 2][i - 2].pieza == null || this.tablero.filas[j - 2][i - 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 2, i - 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DEL CABALLO
                            else if(this.tablero.filas[j][i].pieza == "caballo"){
                                if(i > 1 && j < 9){
                                    if(this.tablero.filas[j][i - 1].pieza == null){
                                        if (this.tablero.filas[j + 1][i - 2].pieza == null || this.tablero.filas[j + 1][i - 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i - 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 7 && j < 9){
                                    if(this.tablero.filas[j][i + 1].pieza == null){
                                        if (this.tablero.filas[j + 1][i + 2].pieza == null || this.tablero.filas[j + 1][i + 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i + 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i > 1 && j > 0){
                                    if(this.tablero.filas[j][i - 1].pieza == null){
                                        if (this.tablero.filas[j - 1][i - 2].pieza == null || this.tablero.filas[j - 1][i - 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i - 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 7 && j > 0){
                                    if(this.tablero.filas[j][i + 1].pieza == null){
                                        if (this.tablero.filas[j - 1][i + 2].pieza == null || this.tablero.filas[j - 1][i + 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i + 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 8 && j > 1){
                                    if(this.tablero.filas[j - 1][i].pieza == null){
                                        if (this.tablero.filas[j - 2][i + 1].pieza == null || this.tablero.filas[j - 2][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 2, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i > 0 && j > 1){
                                    if(this.tablero.filas[j - 1][i].pieza == null){
                                        if (this.tablero.filas[j - 2][i - 1].pieza == null || this.tablero.filas[j - 2][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 2, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 8 && j < 8){
                                    if(this.tablero.filas[j + 1][i].pieza == null){
                                        if (this.tablero.filas[j + 2][i + 1].pieza == null || this.tablero.filas[j + 2][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 2, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i > 0 && j < 8){
                                    if(this.tablero.filas[j + 1][i].pieza == null){
                                        if (this.tablero.filas[j + 2][i - 1].pieza == null || this.tablero.filas[j + 2][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 2, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DE LA TORRE
                            else if(this.tablero.filas[j][i].pieza == "torre"){
                                //Iterar al norte
                                let it = 1
                                for(let k = j; k > 0; k --){
                                    console.log("NORTE")
                                    if(this.tablero.filas[j - it][i].pieza == null){
                                        totalMoves += this.moveJaque(j, i, j - it, i,pMover ,false, reyCheck, amenaza)
                                    } else{
                                        if(this.tablero.filas[j - it][i].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - it, i,pMover ,false, reyCheck, amenaza)
                                        }
                                        break
                                    }
                                    it += 1
                                }
                                //Iterar al sur
                                it = 1
                                for(let k = j; k < 9; k ++){
                                    console.log("SUR")
                                    if(this.tablero.filas[j + it][i].pieza == null){
                                        totalMoves += this.moveJaque(j, i, j + it, i,pMover ,false, reyCheck, amenaza)
                                    } else{
                                        if(this.tablero.filas[j + it][i].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + it, i,pMover ,false, reyCheck, amenaza)
                                        }
                                        break
                                    }
                                    it += 1
                                }
                                //Iterar al este
                                it = 1
                                for(let k = i; k < 8; k ++){
                                    console.log("ESTE")
                                    if(this.tablero.filas[j][i + it].pieza == null){
                                        totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                        console.log(this.tablero.filas[j][i].moves)
                                    } else{
                                        if(this.tablero.filas[j][i + it].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                            console.log(this.tablero.filas[j][i].moves)
                                        }
                                        break
                                    }
                                    it += 1
                                }
                                //Iterar al oeste
                                it = 1
                                for(let k = i; k > 0; k --){
                                    console.log("WEST")
                                    if(this.tablero.filas[j][i - it].pieza == null){
                                        totalMoves += this.moveJaque(j, i, j, i - it,pMover ,false, reyCheck, amenaza)
                                    } else{
                                        if(this.tablero.filas[j][i - it].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                        }
                                        break
                                    }
                                    it += 1
                                }
                            }

                            //MOVIMIENTOS POSIBLES DEL SOLDADO
                            else if(this.tablero.filas[j][i].pieza == "soldado"){
                                if(this.tablero.filas[j][i].color == "rojo"){
                                    if(j > 4){ // Solo para arriba
                                        if (this.tablero.filas[j - 1][i].pieza == null || this.tablero.filas[j - 1][i].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i,pMover ,false, reyCheck, amenaza)
                                        }
                                    } else{ // Norte, este y oeste
                                        if(i != 8){ // Oeste
                                            if (this.tablero.filas[j][i + 1].pieza == null || this.tablero.filas[j][i + 1].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j + 1, i,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                        if(i != 0){
                                            if (this.tablero.filas[j][i - 1].pieza == null || this.tablero.filas[j][i - 1].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j, i - 1,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                        if(j != 0){
                                            if (this.tablero.filas[j - 1][i].pieza == null || this.tablero.filas[j - 1][i].color != this.tablero.filas[j][i].color ){
                                                totalMoves += this.moveJaque(j, i, j - 1, i,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                } else{
                                    if(j <= 4){ // Solo para abajo
                                        if (this.tablero.filas[j + 1][i].pieza == null || this.tablero.filas[j + 1][i].color != this.tablero.filas[j][i].color ){
                                            totalMoves += this.moveJaque(j, i, j + 1, i,pMover ,false, reyCheck, amenaza)
                                        }
                                    } else{ // Norte, este y oeste
                                        if(i != 8){ // Oeste
                                            if (this.tablero.filas[j][i + 1].pieza == null || this.tablero.filas[j][i + 1].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j, i + 1,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                        if(i != 0){
                                            if (this.tablero.filas[j][i - 1].pieza == null || this.tablero.filas[j][i - 1].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j, i - 1,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                        if(j != 9){
                                            if (this.tablero.filas[j + 1][i].pieza == null || this.tablero.filas[j + 1][i].color != this.tablero.filas[j][i].color ){
                                                totalMoves += this.moveJaque(j, i, j + 1, i,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                }
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DE LA CANYON
                            else if(this.tablero.filas[j][i].pieza == "canyon"){
                                //Iterar al norte
                                let it = 1
                                let saltar = false
                                for(let k = j; k > 0; k --){
                                    if(this.tablero.filas[j - it][i].pieza == null){
                                        if(!saltar){
                                            console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j - it, i,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j - it][i].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j - it, i,pMover ,false, reyCheck, amenaza)
                                                break
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
                                for(let k = j; k < 9; k ++){
                                    if(this.tablero.filas[j + it][i].pieza == null){
                                        if(!saltar){
                                            console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j + it, i,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j + it][i].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j + it, i,pMover ,false, reyCheck, amenaza)
                                                break
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
                                for(let k = i; k < 8; k ++){
                                    if(this.tablero.filas[j][i + it].pieza == null){
                                        if(!saltar){
                                            console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j][i + it].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                                break
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
                                for(let k = i; k > 0; k --){
                                    if(this.tablero.filas[j][i - it].pieza == null){
                                        if(!saltar){
                                            console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j, i - it,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j][i - it].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j, i - it,pMover ,false, reyCheck, amenaza)
                                                break
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
                        }
                        console.log(this.tablero.filas[j][i])
                        this.tablero.filas[j][i].turno = this.turno
                    }
                }
           }
           console.log("Tiene ", totalMoves, "Movimientos posibles")
           if(totalMoves == 0){
               console.log("Jaque mate")
           }
       },




/*
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *
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
                    if(indexFil < 9){
                        if(item.color == "rojo"){
                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol})
                            }
                        }  
                    }
                    if(indexFil < 2){
                        if(item.color == "negro"){
                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol})
                            }
                        }  
                    }
                    if(indexFil > 7){
                        if(item.color == "rojo"){
                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol})
                            } 
                        }   
                    }

                    if(indexFil > 0){
                        if(item.color == "negro"){
                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol})
                            } 
                        }   
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DEL OFICIAL
                else if(item.pieza == "oficial"){
                    if(item.pieza == "rojo"){
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
                        if(indexCol != 5 && indexFil != 7){
                            if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol + 1})
                            }
                        }
                        if(indexCol != 3 && indexFil != 7){
                            if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol - 1})
                            }
                        }
                    } else {
                        if(indexCol != 5 && indexFil != 2){
                            if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol + 1})
                            }
                        }
                        if(indexCol != 3 && indexFil != 2){
                            if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol - 1})
                            }
                        }
                        if(indexCol != 5 && indexFil != 0){
                            if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol + 1})
                            }
                        }
                        if(indexCol != 3 && indexFil != 0){
                            if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol - 1})
                            }
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
                            if (this.tablero.filas[indexFil - 1][indexCol + 2].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 2].color != item.color){
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
                                    break
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
                                    break
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
                                    break
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
                                    break
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
                    this.tablero.filas[move.f][move.c].esPista = true;
                });
            } else{
                console.log("Turno de la ficha: ",item.turno,"Turno Actual: " ,this.turno)
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
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        */

       moves(indexFil, indexCol, item) {
            //Hay otro sonido "capture.wav" que reproduciremos al caoturar una pieza
            var audio = new Audio('sounds/move.wav');
            audio.loop = false;
            audio.play();

            if (this.selectedPiece.fil != null) {
                console.log("Entramos", this.selectedPiece)
                this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves.forEach(move => {
                    this.tablero.filas[move.f][move.c].esPista = false;
                });
            }
            this.selectedPiece.fil = indexFil;
            this.selectedPiece.col = indexCol;
            this.selectedPiece.selected = true;
            if(item.turno == this.turno){
                    item.moves.forEach(move => {
                    //console.log(move)
                    this.tablero.filas[move.f][move.c].esPista = true;
                });
                console.log("Ya visto")
            } else {
                item.moves = []
                item.turno = this.turno

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
                        if(indexFil < 9){
                            if(item.color == "rojo"){
                                if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil + 1, c: indexCol})
                                }
                            }  
                        }
                        if(indexFil < 2){
                            if(item.color == "negro"){
                                if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil + 1, c: indexCol})
                                }
                            }  
                        }
                        if(indexFil > 7){
                            if(item.color == "rojo"){
                                if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol})
                                } 
                            }   
                        }

                        if(indexFil > 0){
                            if(item.color == "negro"){
                                if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol})
                                } 
                            }   
                        }
                    }

                    // -------------------------------------------------------------------------------------------------
                    //MOVIMIENTOS POSIBLES DEL OFICIAL
                    else if(item.pieza == "oficial"){
                        if(item.color == "rojo"){
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
                            if(indexCol != 5 && indexFil != 7){
                                if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 3 && indexFil != 7){
                                if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol - 1})
                                }
                            }
                        } else {
                            if(indexCol != 5 && indexFil != 2){
                                if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil + 1, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 3 && indexFil != 2){
                                if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil + 1, c: indexCol - 1})
                                }
                            }
                            if(indexCol != 5 && indexFil != 0){
                                if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 3 && indexFil != 0){
                                if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol - 1})
                                }
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
                                if (this.tablero.filas[indexFil - 1][indexCol + 2].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 2].color != item.color){
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
                            if(indexFil > 4){ // Solo para arriba
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
                            if(indexFil <= 4){ // Solo para abajo
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
                                    //console.log("MOVEMOS")
                                    item.moves.push({f: indexFil - it, c: indexCol})
                                } /*else{
                                    console.log("VOLAMOS")
                                }*/
                                
                            } else{ // Encontramos una pieza
                                if(this.tablero.filas[indexFil - it][indexCol].color != item.color){
                                    if(saltar){
                                        console.log("COMEMOS")
                                        item.moves.push({f: indexFil - it, c: indexCol})
                                        break
                                    } else{
                                        if(saltar){
                                            console.log("NOS CAEMOS")
                                            break
                                        } else{
                                            //console.log("SALTAMOS")
                                            saltar = true
                                        }
                                    }
                                } else {// SALTAR
                                    if(saltar){
                                        //console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        //console.log("SALTAMOS")
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
                                    //console.log("MOVEMOS")
                                    item.moves.push({f: indexFil + it, c: indexCol})
                                } /*else{
                                    console.log("VOLAMOS")
                                }*/
                                
                            } else{ // Encontramos una pieza
                                if(this.tablero.filas[indexFil + it][indexCol].color != item.color){
                                    if(saltar){
                                        //console.log("COMEMOS")
                                        item.moves.push({f: indexFil + it, c: indexCol})
                                        break
                                    } else{
                                        if(saltar){
                                            //console.log("NOS CAEMOS")
                                            break
                                        } else{
                                            //console.log("SALTAMOS")
                                            saltar = true
                                        }
                                    }
                                } else {// SALTAR
                                    if(saltar){
                                        //console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        //console.log("SALTAMOS")
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
                                    //console.log("MOVEMOS")
                                    item.moves.push({f: indexFil, c: indexCol + it})
                                } else{
                                    //console.log("VOLAMOS")
                                }
                                
                            } else{ // Encontramos una pieza
                                if(this.tablero.filas[indexFil][indexCol + it].color != item.color){
                                    if(saltar){
                                        //console.log("COMEMOS")
                                        item.moves.push({f: indexFil, c: indexCol  + it})
                                        break
                                    } else{
                                        if(saltar){
                                            //console.log("NOS CAEMOS")
                                            break
                                        } else{
                                            //console.log("SALTAMOS")
                                            saltar = true
                                        }
                                    }
                                } else {// SALTAR
                                    if(saltar){
                                        //console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        //console.log("SALTAMOS")
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
                                    //console.log("MOVEMOS")
                                    item.moves.push({f: indexFil, c: indexCol - it})
                                } else{
                                    ////console.log("VOLAMOS")
                                }
                                
                            } else{ // Encontramos una pieza
                                if(this.tablero.filas[indexFil][indexCol - it].color != item.color){
                                    if(saltar){
                                       //console.log("COMEMOS")
                                        item.moves.push({f: indexFil, c: indexCol  - it})
                                        break
                                    } else{
                                        if(saltar){
                                            //console.log("NOS CAEMOS")
                                            break
                                        } else{
                                            //console.log("SALTAMOS")
                                            saltar = true
                                        }
                                    }
                                } else {// SALTAR
                                    if(saltar){
                                        //console.log("NOS CAEMOS")
                                        break
                                    } else{
                                        //console.log("SALTAMOS")
                                        saltar = true
                                    }
                                }
                            }
                            it += 1
                        }
                    }
                        
                    item.moves.forEach(move => {
                        this.tablero.filas[move.f][move.c].esPista = true;
                    });
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
<template>
    <div class="grid">
        <!--BARRA LATERAL-->
        <div class="col-12 lg:col-4 surface-section section p-6 text-left mb-4 lg:mb-0"> 
            <div class="grid">
                <div class="field col-12">
                    <h1 class="mt-0 mb-0">Partida contra {{this.rival}}</h1>
                </div>
                <!--Temporizador-->
                <div class="field col-12">
                    <label>Temporizador:</label>
                    <h2 class="mt-0 mb-0">{{this.timer}}</h2>
                </div>
                <!--Chat-->
                <!--<div class="field col-12">
                    <label>Chat:</label>
                    <div class="section text-left" style="border-radius: 5px; border-bottom-left-radius: 0; border-bottom-right-radius: 0; border-bottom: none;">
                        <VirtualScroller ref="chat" :items="messages" :itemSize="50" class="h-30rem">
                            <template v-slot:item="{ item }">
                                <div v-if="item.mine" class="flex justify-content-end flex-wrap">
                                    <div class="bg-blue-500 font-bold text-white m-2" style="border-radius: 1.5rem; padding: 0.8rem">
                                        <p class="m-0 text-sm">{{ item.nickname }}</p>
                                        <p class="m-0">{{ item.message }}</p>
                                    </div>
                                </div>
                                <div v-else class="flex justify-content-start flex-wrap">
                                    <div class="surface-200 font-bold m-2" style="border-radius: 1.5rem; padding: 0.8rem">
                                        <p class="m-0 text-sm">{{ item.nickname }}</p>
                                        <p class="m-0">{{ item.message }}</p>
                                    </div>
                                </div>
                            </template>
                        </VirtualScroller>                
                    </div>
                    <div class="p-inputgroup">
                        <InputText v-model="message" style="border-top-left-radius: 0; border-top-right-radius: 0;" placeholder="Mensaje" />
                        <Button class="col-fixed p-button-secondary" v-on:click="sendMessage()" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 0" icon="pi pi-send" label="Enviar"/>
                    </div>
                </div>-->
                <!--Tema de los iconos-->
                <div class="field col-12">
                    <label>Seleccione el tema de sus iconos:</label>
                    <Dropdown class="w-full" v-model="selectedPiecesSet" :options="setsPieces" optionLabel="name" :filter="true" placeholder="Seleccione un set de piezas">
                        <template #option="slotProps">
                            <div class="card">
                                <div class="card-container blue-container overflow-hidden">
                                    <div class="flex">
                                        <img class="h-3rem flex align-items-center justify-content-center mr-3" :src="'images/themes/pieces/' + slotProps.option.set + '/canyonrojo.svg'" />
                                        <div class="flex align-items-center justify-content-center font-bold">{{slotProps.option.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <!--Tema del tablero-->
                <div class="field col-12">
                    <label>Seleccione el tema de su tablero:</label>
                    <Dropdown class="w-full" v-model="selectedBoard" :options="setsBoards" optionLabel="name" :filter="true" placeholder="Seleccione un set de piezas">
                        <template #option="slotProps">
                            <div class="card">
                                <div class="card-container blue-container overflow-hidden">
                                    <div class="flex">
                                        <img class="h-3rem flex align-items-center justify-content-center mr-3" style="border-radius: 0.5rem" :src="'images/themes/boards/' + slotProps.option.set + '.jpg'" />
                                        <div class="flex align-items-center justify-content-center font-bold">{{slotProps.option.name}}</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
                <div class="field col-12">
                    <label>Terminar partida:</label>
                    <ConfirmDialog></ConfirmDialog>
                    <Button v-on:click="confirm()" class="col-12 mt-2 w-full p-button-raised font-semibold h-3rem bg-pink-500 border-pink-500" style="border-radius: 1rem" icon="pi pi-save" label="Guardar y salir"/>
                </div>
            </div>
        </div>

        <!--Tablero-->
        <div class="col-12 lg:col-8 tema-fondo m-auto board-width" :class="{'wooden1': selectedBoard.set == 'wooden1', 'wooden2': selectedBoard.set == 'wooden2', 'wooden3': selectedBoard.set == 'wooden3', 'metal1': selectedBoard.set == 'metal1', 'metal2': selectedBoard.set == 'metal2', 
            'marbled1': selectedBoard.set == 'marbled1', 'marbled2': selectedBoard.set == 'marbled2', 'marbled3': selectedBoard.set == 'marbled3', 'marbled4': selectedBoard.set == 'marbled4', 'checker1': selectedBoard.set == 'checker1', 'concrete1': selectedBoard.set == 'concrete1', 'concrete2': selectedBoard.set == 'concrete2'}">
            <div v-for="(item, indexFil) in tablero.filas" :key="indexFil" class="flex">
                <div v-for="(itemFila, indexCol) in item" :key="indexCol" v-on:click="moves(indexFil, indexCol, itemFila)" class="h-3rem w-3rem sm:h-4rem sm:w-4rem md:h-5rem md:w-5rem border-600 border-0 flex-grow-1 flex align-items-center justify-content-center font-bold text-white">
                    <div v-if="itemFila.pieza == null" class="casilla w-3rem h-3rem"></div>
                    <div v-else class="h-full w-full">
                        <img v-if="indexFil == this.selectedPiece.fil && indexCol == this.selectedPiece.col" class="pieza-responsive-selected selectedPiece" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.set + '/' + itemFila.pieza + itemFila.color + '.svg'">
                        <img v-else class="pieza-responsive" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.set + '/' + itemFila.pieza + itemFila.color + '.svg'">  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default  {
	inject: ['$accounts'],
      data() {
        return {
            //Tablero inicial
            tablero: {
                /*
                filas: [
                    [{ pieza: "torre", color: "negro"}, { pieza: "caballo", color: "negro" }, { pieza: "elefante", color: "negro" }, { pieza: "oficial", color: "negro" }, { pieza: "general", color: "negro" }, { pieza: "oficial", color: "negro" }, { pieza: "elefante", color: "negro" }, { pieza: "caballo", color: "negro" }, { pieza: "torre", color: "negro" }],
                    [{ pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null}, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }],
                    [{ pieza: null, color: null }, { pieza: "canyon", color: "negro" }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: "canyon", color: "negro" }, { pieza: null, color: null }],
                    [{ pieza: "soldado", color: "negro" }, { pieza: null, color: null }, { pieza: "soldado", color: "negro" }, { pieza: null, color: null }, { pieza: "soldado", color: "negro" }, { pieza: null, color: null }, { pieza: "soldado", color: "negro" }, { pieza: null, color: null }, { pieza: "soldado", color: "negro" }],
                    [{ pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }],
                    [{ pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }],
                    [{ pieza: "soldado", color: "rojo" }, { pieza: null, color: null }, { pieza: "soldado", color: "rojo" }, { pieza: null, color: null }, { pieza: "soldado", color: "rojo" }, { pieza: null, color: null }, { pieza: "soldado", color: "rojo" }, { pieza: null, color: null }, { pieza: "soldado", color: "rojo" }],
                    [{ pieza: null, color: null }, { pieza: "canyon", color: "rojo" }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: "canyon", color: "rojo" }, { pieza: null, color: null }],
                    [{ pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }, { pieza: null, color: null }],
                    [{ pieza: "torre", color: "rojo" }, { pieza: "caballo", color: "rojo" }, { pieza: "elefante", color: "rojo" }, { pieza: "oficial", color: "rojo" }, { pieza: "general", color: "rojo" }, { pieza: "oficial", color: "rojo" }, { pieza: "elefante", color: "rojo" }, { pieza: "caballo", color: "rojo" }, { pieza: "torre", color: "rojo" }],
                ]
                */
               filas: [
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "canyon", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "caballo", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "caballo", color: "negro" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "soldado", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},  { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: 0}, { pieza: "soldado", color: "rojo" , moves: [{f:1,c:1}], turno: -1}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0},{ pieza: "canyon", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "soldado", color: "rojo" , moves: [], turno: 0}, { pieza: "", color: "" , moves: [], turno: 0}, { pieza: "soldado", color: "negro" , moves: [], turno: 0}],]
            
            },
            //BARRA LATERAL
            //------------------------------------------------------
            rival:'juanksp',

            timer: '00:00:00',

            //CHAT
            //Mensajes del chat que pillaremos del back mine lo uso para ver si es mio o no (en vd tbn se podria usar el nickname == mi nickname)
            /*messages: [
                {nickname: 'pikanachi', message: 'Hola', mine: true},
                {nickname: 'pikanachi', message: 'Te he traido los 5', mine: true},
                {nickname: 'juanksp', message: 'Jaja pues por el culo te la hinco!', mine: false},
                {nickname: 'juanksp', message: 'soy muy gracioso porque me gusta Itsuki, no como Nacho que es un Lolicon', mine: false},
                {nickname: 'pikanachi', message: 'jaja Lolicon pues que te den por culo un montón', mine: true},
                {nickname: 'pikanachi', message: 'bueno la cosa, esto el chat y ta wapo', mine: true},
                {nickname: 'juanksp', message: 'ta wapo, ta wapo', mine: false},
            ],

            //Aqui es donde se pone el nuevo mensaje a enviar, habrá que appendearlo a la lista de mensajes para mostrarlo en el front tbn
            message: null,*/

            //Estos son los sets de piezas que tiene el usuario, habra que pedirlos al back, de momento solo hay 2
            setsPieces: [
                {name: 'Iconos occidentales', set: 'set1'},
                {name: 'Iconos en Chino', set: 'set2'},
            ],

            //Set de piezas seleccionado por defecto
            selectedPiecesSet: {name: 'Iconos occidentales', set: 'set1'},

            //Estos son los sets que tiene el usuario, habra que pedirlos al back
            setsBoards: [
                {name: 'Madera 1', set: 'wooden1'},
                {name: 'Madera 2', set: 'wooden2'},
                {name: 'Madera 3', set: 'wooden3'},
                {name: 'Metal 1', set: 'metal1'},
                {name: 'Metal 2', set: 'metal2'},
                {name: 'Marmol 1', set: 'marbled1'},
                {name: 'Marmol 2', set: 'marbled2'},
                {name: 'Marmol 3', set: 'marbled3'},
                {name: 'Marmol 4', set: 'marbled4'},
                {name: 'Checker 1', set: 'checker1'},
                {name: 'Cemento 1', set: 'concrete1'},
                {name: 'Cemento 2', set: 'concrete2'},
            ],
            //Turno actual
            turno: 0,

            //Tema por defecto del tablero
            selectedBoard: {set: 'wooden1'},

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
	},
    methods: {
        moves(indexFil, indexCol, item) {
            console.log(indexFil, indexCol);
            this.selectedTile = this.tablero.filas[indexFil][indexCol]
            if(item.moves.length == 0){ //Cada vez que movamos una ficha sus movimientos pasaran a 0, pero si no calculamos sus movimientos y los guardamos hasta el movimiento
                //MOVIMIENTOS POSIBLES DEL GENERAL
                if(item.pieza == "general"){
                    if(indexCol != 5){
                        if (this.tablero.filas[indexFil][indexCol + 1].pieza == "" || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil, c: indexCol + 1})
                        }
                    }
                    if(indexCol != 3){
                        if (this.tablero.filas[indexFil][indexCol - 1].pieza == "" || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil, c: indexCol - 1})
                        }
                    }
                    if(indexFil != 9){
                        if (this.tablero.filas[indexFil + 1][indexCol].pieza == "" || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol})
                        }
                    }
                    if(indexFil != 7){
                        if (this.tablero.filas[indexFil - 1][indexCol].pieza == "" || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol})
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DEL OFICIAL
                else if(item.pieza == "oficial"){
                    if(indexCol != 5 && indexFil != 9){
                        if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == "" || this.tablero.filas[indexFil + 1][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol + 1})
                        }
                    }
                    if(indexCol != 3 && indexFil != 9){
                        if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == "" || this.tablero.filas[indexFil + 1][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil + 1, c: indexCol - 1})
                        }
                    }
                    if(indexCol != 5 && indexFil != 3){
                        if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == "" || this.tablero.filas[indexFil - 1][indexCol + 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol + 1})
                        }
                    }
                    if(indexCol != 3 && indexFil != 3){
                        if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == "" || this.tablero.filas[indexFil - 1][indexCol - 1].color != item.color){
                            //COMPROBAR JAQUE
                            item.moves.push({f: indexFil - 1, c: indexCol - 1})
                        }
                    }
                }

                // -------------------------------------------------------------------------------------------------
                //MOVIMIENTOS POSIBLES DEL ELEFANTE
                else if(item.pieza == "elefante"){
                    if(indexCol != 8 && indexFil != 9){
                        if(this.tablero.filas[indexFil + 1][indexCol + 1].pieza == ""){
                            if (this.tablero.filas[indexFil + 2][indexCol + 2].pieza == "" || this.tablero.filas[indexFil + 2][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol != 0 && indexFil != 9){
                        if(this.tablero.filas[indexFil + 1][indexCol - 1].pieza == ""){
                            if (this.tablero.filas[indexFil + 2][indexCol - 2].pieza == "" || this.tablero.filas[indexFil + 2][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol - 2})
                            }
                        }
                    }
                    if(indexCol != 8 && indexFil != 5){
                        if(this.tablero.filas[indexFil - 1][indexCol + 1].pieza == ""){
                            if (this.tablero.filas[indexFil - 2][indexCol + 2].pieza == "" || this.tablero.filas[indexFil - 2][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol != 0 && indexFil != 5){
                        if(this.tablero.filas[indexFil - 1][indexCol - 1].pieza == ""){
                            if (this.tablero.filas[indexFil - 2][indexCol - 2].pieza == "" || this.tablero.filas[indexFil - 2][indexCol - 2].color != item.color){
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
                        if(this.tablero.filas[indexFil][indexCol - 1].pieza == ""){
                            if (this.tablero.filas[indexFil + 1][indexCol - 2].pieza == "" || this.tablero.filas[indexFil + 1][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol - 2})
                            }
                        }
                    }
                    if(indexCol < 7 && indexFil < 9){
                        if(this.tablero.filas[indexFil][indexCol + 1].pieza == ""){
                            if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == "" || this.tablero.filas[indexFil + 1][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol > 1 && indexFil > 0){
                        if(this.tablero.filas[indexFil][indexCol - 1].pieza == ""){
                            if (this.tablero.filas[indexFil - 1][indexCol - 2].pieza == "" || this.tablero.filas[indexFil - 1][indexCol - 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol - 2})
                            }
                        }
                    }
                    if(indexCol < 7 && indexFil > 0){
                        if(this.tablero.filas[indexFil][indexCol + 1].pieza == ""){
                            if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == "" || this.tablero.filas[indexFil + 1][indexCol + 2].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol + 2})
                            }
                        }
                    }
                    if(indexCol < 8 && indexFil > 1){
                        if(this.tablero.filas[indexFil - 1][indexCol].pieza == ""){
                            if (this.tablero.filas[indexFil - 2][indexCol + 1].pieza == "" || this.tablero.filas[indexFil - 2][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol + 1})
                            }
                        }
                    }
                    if(indexCol > 0 && indexFil > 1){
                        if(this.tablero.filas[indexFil - 1][indexCol].pieza == ""){
                            if (this.tablero.filas[indexFil - 2][indexCol - 1].pieza == "" || this.tablero.filas[indexFil - 2][indexCol - 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 2, c: indexCol - 1})
                            }
                        }
                    }
                    if(indexCol < 8 && indexFil < 8){
                        if(this.tablero.filas[indexFil + 1][indexCol].pieza == ""){
                            if (this.tablero.filas[indexFil + 2][indexCol + 1].pieza == "" || this.tablero.filas[indexFil + 2][indexCol + 1].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 2, c: indexCol + 1})
                            }
                        }
                    }
                    if(indexCol > 0 && indexFil < 8){
                        if(this.tablero.filas[indexFil + 1][indexCol].pieza == ""){
                            if (this.tablero.filas[indexFil + 2][indexCol - 1].pieza == "" || this.tablero.filas[indexFil + 2][indexCol - 1].color != item.color){
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
                        if(this.tablero.filas[indexFil - it][indexCol].pieza == ""){
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
                        if(this.tablero.filas[indexFil + it][indexCol].pieza == ""){
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
                        if(this.tablero.filas[indexFil][indexCol + it].pieza == ""){
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
                        if(this.tablero.filas[indexFil][indexCol - it].pieza == ""){
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
                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == "" || this.tablero.filas[indexFil - 1][indexCol].color != item.color){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil - 1, c: indexCol})
                            }
                        } else{ // Norte, este y oeste
                            if(indexCol != 8){ // Oeste
                                if (this.tablero.filas[indexFil][indexCol + 1].pieza == "" || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 0){
                                if (this.tablero.filas[indexFil][indexCol - 1].pieza == "" || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol - 1})
                                }
                            }
                            if(indexFil != 0){
                                if (this.tablero.filas[indexFil - 1][indexCol].pieza == "" || this.tablero.filas[indexFil - 1][indexCol].color != item.color ){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil - 1, c: indexCol})
                                }
                            }
                        }
                    } else{
                        if(indexFil <= 5){ // Solo para abajo
                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == "" || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
                                //COMPROBAR JAQUE
                                item.moves.push({f: indexFil + 1, c: indexCol})
                            }
                        } else{ // Norte, este y oeste
                            if(indexCol != 8){ // Oeste
                                if (this.tablero.filas[indexFil][indexCol + 1].pieza == "" || this.tablero.filas[indexFil][indexCol + 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol + 1})
                                }
                            }
                            if(indexCol != 0){
                                if (this.tablero.filas[indexFil][indexCol - 1].pieza == "" || this.tablero.filas[indexFil][indexCol - 1].color != item.color){
                                    //COMPROBAR JAQUE
                                    item.moves.push({f: indexFil, c: indexCol - 1})
                                }
                            }
                            if(indexFil != 9){
                                if (this.tablero.filas[indexFil + 1][indexCol].pieza == "" || this.tablero.filas[indexFil + 1][indexCol].color != item.color ){
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
                        if(this.tablero.filas[indexFil - it][indexCol].pieza == ""){
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
                        if(this.tablero.filas[indexFil + it][indexCol].pieza == ""){
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
                        if(this.tablero.filas[indexFil][indexCol + it].pieza == ""){
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
                        if(this.tablero.filas[indexFil][indexCol - it].pieza == ""){
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
                });
            } else{
                if(item.turno == this.turno){
                    item.moves.forEach(move => {
                        console.log(move)
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
        /*
        sendMessage() {
            var messages = [...this.messages];
            messages.push({nickname: 'pikanachi', message: this.message, mine: true});
            this.messages = messages;
            this.$refs.chat.scrollInView(this.messages.length - 1, 'to-end','auto');
            //this.$refs.chat.scrollTo(0, this.messages.length * 1000, 'auto');
            this.message = null;
        },*/

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
    background-image: url("/images/themes/boards/wooden1.jpg");
}

.wooden2 {
    background-image: url("/images/themes/boards/wooden2.jpg");
}

.wooden3 {
    background-image: url("/images/themes/boards/wooden3.jpg");
}

.metal1 {
    background-image: url("/images/themes/boards/metal1.jpg");
}

.metal2 {
    background-image: url("/images/themes/boards/metal2.jpg");
}

.marbled1 {
    background-image: url("/images/themes/boards/marbled1.jpg");
}

.marbled2 {
    background-image: url("/images/themes/boards/marbled2.jpg");
}

.marbled3 {
    background-image: url("/images/themes/boards/marbled3.jpg");
}

.marbled4 {
    background-image: url("/images/themes/boards/marbled4.jpg");
}

.checker1 {
    background-image: url("/images/themes/boards/checker1.jpg");
}

.concrete1 {
    background-image: url("/images/themes/boards/concrete1.jpg");
}

.concrete2 {
    background-image: url("/images/themes/boards/concrete2.jpg");
}

.casilla {
    transition: background-color 0.4s;
    border-radius: 100%;
}

.casilla:hover {
    background: rgba(39, 62, 84, 0.6);
    cursor: pointer;
    border-radius: 100%;
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
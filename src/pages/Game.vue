<template>
    <loader v-if="this.loading"/>
    <div v-else class="grid">
        <!--BARRA LATERAL v-if="perfil != null"-->
        <div class="centrar-mauto col-12 lg:col-4 align-items-center surface-section section p-6 text-left mb-4 lg:mb-0" style="max-width: 40rem"> 
            <div class="grid">
                <!--rivalInfo-->
                <rivalInfo v-if="rivalProfile!=null" :perfil="rivalProfile" :profileImage="rivalProfileImage"/>
                <Divider />
                <Button v-on:click="confirm()" class="col-12 mt-2 mb-2 w-full p-button-raised font-semibold h-3rem bg-pink-500 border-pink-500" style="border-radius: 1rem" icon="pi pi-save" label="Guardar y salir"/>
                <Divider />
                <!--Chat-->
                <chat :idSala="idSala" :myId="myid" :idOp="idOp"/>
                <Divider />
                <!--Game rules-->
                <gameRules />
                <Divider />
                <!--Theme changer-->
                <themeChanger ref="themeChanger" @change-board="changeBoard" @change-icons="changeIcons"/>
            </div>
        </div>

        <!--Divs del tablero-->
        <div class="col-12 lg:col-8 my-auto">

            <!--Info de la persona-->
            <div v-if="rivalProfile!=null" class="text-center">
                <!-- Si soy rojo y no es mi turno-->
                <div v-if="this.turno%2 != 0 && this.playerColor == 'rojo'">
                    <h3 class="mb-0">
                        <img id=profliePic :src="rivalProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        Turno de {{ this.rivalProfile.name }}
                        <img class="shadow-2 flag h-auto mr-1" :class="[rivalProfile.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                    <h4 class="mt-1">
                        <ProgressSpinner class="mt-2" style="width:20px; height:20px" strokeWidth="8" fill="transparent" animationDuration="2s"/>
                        Esperando jugada
                    </h4>
                </div>
                <div v-if="this.turno%2 != 0 && this.playerColor == 'negro'">
                    <h3>
                        <img id=profliePic :src="rivalProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        {{ this.rivalProfile.name }} 
                        <img class="shadow-2 flag h-auto mr-1" :class="[rivalProfile.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                </div>   
                <!--Si yo soy rojo y es mi turno-->
                <div v-if="this.turno%2 == 0 && this.playerColor == 'rojo'">
                    <h3>
                        <img id=profliePic :src="rivalProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        {{ this.rivalProfile.name }} 
                        <img class="shadow-2 flag h-auto mr-1" :class="[rivalProfile.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                </div>
                <!--Si yo soy negro y no es mi turno-->
                <div v-if="this.turno%2 == 0 && this.playerColor == 'negro'">
                    <h3 class="mb-0">
                        <img id=profliePic :src="rivalProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        Turno de {{ this.rivalProfile.name }}
                        <img class="shadow-2 flag h-auto mr-1" :class="[rivalProfile.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                    <h4 class="mt-1">
                        <ProgressSpinner class="mt-2" style="width:20px; height:20px" strokeWidth="8" fill="transparent" animationDuration="2s"/>
                        Esperando jugada
                    </h4>
                </div>
            </div>

            <!--Tablero-->
            <div v-if="selectedPiecesSet != null" class="col-12 tema-fondo mx-auto board-width" :class="{'wooden1': selectedBoard.id == '1', 'wooden2': selectedBoard.id == '2', 'wooden3': selectedBoard.id == '3', 'metal1': selectedBoard.id == '4', 'metal2': selectedBoard.id == '5', 
                'marbled1': selectedBoard.id == '6', 'marbled2': selectedBoard.id == '7', 'marbled3': selectedBoard.id == '8', 'marbled4': selectedBoard.id == '9', 'checker1': selectedBoard.id == '10', 'concrete1': selectedBoard.id == '11', 'concrete2': selectedBoard.id == '12'}">
                <div v-for="(item, indexFil) in tablero.filas" :key="indexFil" class="flex">
                    <div v-for="(itemFila, indexCol) in item" :key="indexCol" v-on:click="moves(indexFil, indexCol, itemFila);" class="h-3rem w-3rem sm:h-4rem sm:w-4rem md:h-5rem md:w-5rem border-600 border-0 flex-grow-1 flex align-items-center justify-content-center">
                        <!--Casilla sin pieza-->
                        <div v-if="itemFila.pieza == null" v-on:click="if (this.selectedPiece.selected) this.selectedPiece.selected = false;" class="flex align-content-center flex-wrap card-container w-full h-full">
                            <!--Lo que sale dentro si es pista y moverla, casilla movida se activa en amarillo para cuando el oponente mueve una ficha-->
                            <div v-on:click="moveSelectedPiece(indexFil, indexCol, itemFila, true)" class="flex align-items-center justify-content-center m-auto casilla w-2rem h-2rem" :class="{'casilla-pista': itemFila.esPista  && this.selectedPiece.selected, 'casilla-movida': indexFil == this.movedPiece.filini && indexCol == this.movedPiece.colini && this.movedPiece.filini != null && this.movedPiece.colini != null}"></div>
                        </div>
                        <!--Casilla con pieza-->
                        <div v-else class="h-full w-full">
                            <!--Hemos seleccionado una pieza-->
                            <img v-if="indexFil == this.selectedPiece.fil && indexCol == this.selectedPiece.col && this.selectedPiece.selected" class="pieza-responsive-selected selectedPiece" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.id + '/' + itemFila.pieza + itemFila.color + '.svg'">
                            <!--Pieza no seleccionada, vemos si es pista y la marcamos con otra pieza, moved piece se activa cuando el rival mueve su pieza-->
                            <img v-else-if="itemFila.esPista && this.selectedPiece.selected" class="pieza-player" v-on:click="moveSelectedPiece(indexFil, indexCol, itemFila, true)" style="border-radius: 100%; box-shadow: 4px 4px 10px black; cursor: pointer" :src="'images/themes/pieces/' + this.selectedPiecesSet.id + '/' + itemFila.pieza + itemFila.color + 'pista.svg'">
                            <img v-else class="pieza-responsive" :class="{'pieza-player-responsive': this.playerColor == itemFila.color, 'moved-piece': indexFil == this.movedPiece.fil && indexCol == this.movedPiece.col && this.movedPiece.fil != null && this.movedPiece.col != null}" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/themes/pieces/' + this.selectedPiecesSet.id + '/' + itemFila.pieza + itemFila.color + '.svg'">
                        </div>
                    </div>
                </div>
            </div>

            <!--Info de la persona-->
            <div v-if="myPerfil!=null" class="mt-4 text-center">
                <!--Si yo soy rojo no es mi turno-->
                <div v-if="this.turno%2 != 0 && this.playerColor == 'rojo'">
                    <h3>
                        <img id=myProfliePic :src="myProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        {{ this.myPerfil.name }}
                        <img class="shadow-2 flag h-auto mr-1" :class="[myPerfil.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                </div>         
                <!--Si yo soy negro y es mi turno-->
                <div v-if="this.turno%2 != 0 && this.playerColor == 'negro'">
                    <h3>
                        <img id=myProfliePic :src="myProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        Turno de {{ this.myPerfil.name }}
                        <img class="shadow-2 flag h-auto mr-1" :class="[myPerfil.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                </div>
                <!--Si yo soy rojo y es mi turno-->
                <div v-if="this.turno%2 == 0 && this.playerColor == 'rojo'">
                    <h3>
                        <img id=myProfliePic :src="myProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        Turno de {{ this.myPerfil.name }}
                        <img class="shadow-2 flag h-auto mr-1" :class="[myPerfil.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                </div>
                <!--Si yo soy negro y no es mi turno-->
                <div v-if="this.turno%2 == 0 && this.playerColor == 'negro'">
                    <h3>
                        <img id=myProfliePic :src="myProfileImage" class="foto-perfil-sm shadow-2 surface-50 mt-1 mb-2 mr-2" alt="foto de perfil">
                        {{ this.myPerfil.name }}
                        <img class="shadow-2 flag h-auto mr-1" :class="[myPerfil.country.flag]" src="images/flags/flag_placeholder.png">
                    </h3>
                </div>
            </div>            
        </div>
        <!--GameOver-->
        <gameover v-if="this.gameOverDispay" :ganador="ganador" />
        <confetti v-if="this.gameWinDisplay" />
    </div>
</template>

<script>

import rivalInfo from '../components/game/RivalInfo.vue'
import chat from '../components/game/Chat.vue';
import themeChanger from '../components/game/ThemeChanger.vue';
import gameRules from '../components/game/GameRules.vue';
import gameover from '../components/game/GameOver.vue';
import io from "socket.io-client";
import confetti from '../components/game/Confetti.vue';
import loader from '../components/Loader.vue';

export default  {
	inject: ['$accounts'],
    components: {
        rivalInfo,
        chat,
        themeChanger,
        gameRules,
        gameover,
        confetti,
        loader,
    },
      data() {
        return {
            //Tablero inicial
            tablero: {
                /*
                Negro: [
                    [{ pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "rojo"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "rojo"  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "elefante", color: "negro"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "negro"  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "torre", color: "negro", moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "negro" , moves: [], turno: -1, esPista: false }],
                ],
                
                filas: [
                    [{ pieza: "torre", color: "negro", moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "negro" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "elefante", color: "negro"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "negro"  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "rojo"  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "rojo"  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: "rojo" , moves: [], turno: -1, esPista: false }],
                ]
                */
                Negro: [
                    [{ pieza: "torre", color: "rojo", moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "rojo" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "torre", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "negro" , moves: [], turno: -1, esPista: false }],
                ],
                
                filas: [
                    [{ pieza: "torre", color: "negro", moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "negro" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: "canyon", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }, { pieza: null, color: null  , moves: [], turno: -1, esPista: false }],
                    [{ pieza: "torre", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "general", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "oficial", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "elefante", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: "torre", color: "rojo" , moves: [], turno: -1, esPista: false }],
                ]
                
                /*
               filas: [
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false }, { pieza: null, color: null, moves: [], turno: -1, esPista: false }, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "oficial", color: "negro", moves: [], turno: -1, esPista: false},{ pieza: "general", color: "negro" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false}],
                    [{ pieza: "torre", color: "negro", moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "caballo", color: "rojo" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: "torre", color: "negro", moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "caballo", color: "negro" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},  { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: "torre", color: "rojo", moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}],
                    [{ pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false}, { pieza: null, color: "rojo" , moves: [{f:1,c:1}], turno: -1}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false},{ pieza: "general", color: "rojo" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "soldado", color: "rojo" , moves: [], turno: -1, esPista: false}, { pieza: null, color: null, moves: [], turno: -1, esPista: false}, { pieza: "soldado", color: "negro" , moves: [], turno: -1, esPista: false}],]
             */              
            },
            
            //Selecciona el set de piezas con el que juegas
            playerColor: null, //negro,
            rivalProfile: null,
            myPerfil: null,
            myProfileImage: '',
            rivalProfileImage: '',
            idSala: null,
            socket: null,
            myid: null,
            idOp: null,

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

            //Casilla seleccionada por defecto
            selectedTile: null,

            //Casilla seleccionada por el user
            selectedPiece: {
                fil: null,
                col: null,
                selected: false
            },

            //Pieza movida por el oponente
            movedPiece: {
                fil: null,
                col: null,
                filini: null,
                colini: null
            },

            //Ha acabado la partida
            gameWinDisplay: false,
            gameOverDispay: false,

            //Ganador de la partida
            ganador: {
                id: '', 
                name: ''
            },

            //Set de piezas seleccionado por defecto, lo ponemos en el themechanger
            selectedPiecesSet: null,

            //Tema por defecto del tablero, lo ponemos en el themechanger
            selectedBoard: null,

            loading: true,
        }
    },
	created() {
        this.idSala = this.$route.params.idSala;
        this.myid = sessionStorage.getItem('id');
        if(this.socket == null){
            this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
        }
        //sessionStorage.removeItem("socket")
        this.playerColor = this.$route.params.color
        if(this.playerColor == "negro"){
            this.tablero.filas = this.tablero.Negro
            this.reyRojo.fil = 0
            this.reyRojo.col = 4
            this.reyNegro.fil = 9
            this.reyNegro.col = 4
        }
        this.idOp = this.$route.params.idOponent
        this.$accounts.getProfile(this.idOp).then(response => {
            this.loading = false;
			this.rivalProfile = response.perfil;

			if (this.rivalProfile.hasImage) {
				// Pedir al back la foto
				this.$accounts.getProfileImage(this.idOp).then(data => {
					this.rivalProfileImage = data;
				});
			} else {
				this.rivalProfileImage = "images/profilePlaceholder.svg";
			}
		});
        let movs = sessionStorage.getItem("movs")
        console.log(movs)
        if (movs != null){
            console.log(movs)
            //sessionStorage.removeItem("movs")
            // CAMBIAR EL TABLERO
            this.loadBoard(movs)
        }
        

        this.$accounts.getProfile(this.myid).then(response => {
			this.myPerfil = response.perfil;
            if (this.myPerfil.hasImage) {
				// Pedir al back la foto
				this.$accounts.getProfileImage(this.myid).then(data => {
					this.myProfileImage = data;
				});
			} else {
				this.myProfileImage = "images/profilePlaceholder.svg";
			}
		});

        //para ocultar de manera guarra el menu
		this.$loggedStatus.logged = false;
        this.$playing.game = true;
	},
    unmounted(){
        console.log("destroyed")
        this.socket.emit("leaveRoom", {'id': this.idSala})
        this.socket.off("opMov")
        this.socket.off("win")
    },
    mounted(){
        this.loadThemeChanger();
        this.socket.emit("enterRoom", {'id': this.idSala})
        this.socket.on("opMov", (data)=>{
            //console.log(data)
            //console.log("Movimiento del rival", data.mov[0])
            if(this.selectedPiece.fil != null){
                this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves.forEach(move => {
                    this.tablero.filas[move.f][move.c].esPista = false;
                });
            }
            this.selectedPiece.fil = data.mov[0]
            this.selectedPiece.col = data.mov[1]
            this.selectedPiece.selected = true
            this.tablero.filas[data.mov[2]][data.mov[3]].esPista = true
            this.moveSelectedPiece( data.mov[2],  data.mov[3], this.tablero.filas[data.mov[2]][data.mov[3]], false)
            this.selectedPiece.selected = false
            var audio = new Audio('sounds/move.wav');
            audio.loop = false;
            audio.play();
        })
        this.socket.on("win", ()=>{
            console.log("win")
            //AQUI ES DONDE HE GANADO
            this.ganador.id = this.myid
            this.ganador.name = this.myPerfil.name
            this.gameOverDispay = true;
            this.gameWinDisplay = true;
        })
    },
    methods: {
        loadThemeChanger(){
            if (this.$refs.themeChanger != null){
                this.selectedPiecesSet = this.$refs.themeChanger.getSelectedPiecesSet();
                this.selectedBoard = this.$refs.themeChanger.getSelectedBoard();
            }else
                setTimeout(this.loadThemeChanger, 100);
        },
        changeBoard(board){
            this.selectedBoard = board;
        },
        changeIcons(piecesSet){
            this.selectedPiecesSet = piecesSet;
        },
        playSound(itemFila) {
            if (itemFila.pieza != null && this.playerColor == itemFila.color) {
                //Hay otro sonido "capture.wav" que reproduciremos al caoturar una pieza
                var audio = new Audio('sounds/move.wav');
                audio.loop = false;
                audio.play();
            }
        },
        playCaptureSound() {
            var audio = new Audio('sounds/capture.wav');
            audio.loop = false;
            audio.play();
        },

        loadBoard(movs){
            console.log("Se han hecho: ", movs.length/4)
            let mov = 0;
            let filini;
            let colini;
            let fil;
            let col;
            for(let i = 0; i < movs.length/4 - 1; i++){
                if(this.playerColor == "rojo"){
                    filini = movs[(mov*4)];
                    colini = movs[(mov*4) + 1]
                    fil = movs[(mov*4) + 2]
                    col = movs[(mov*4) + 3]
                } else {
                    filini = 9 - movs[(mov*4)];
                    colini = 8- movs[(mov*4) + 1]
                    fil = 9 - movs[(mov*4) + 2]
                    col = 8 - movs[(mov*4) + 3]
                }
                
                console.log("Movimiento: ", filini, colini, fil, col)
                this.movePiece(filini, colini, fil, col)
                mov++;
            }
            if(this.playerColor == "rojo"){
                filini = movs[(mov*4)];
                colini = movs[(mov*4) + 1]
                fil = movs[(mov*4) + 2]
                col = movs[(mov*4) + 3]
            } else {
                filini = 9 - movs[(mov*4)];
                colini = 8- movs[(mov*4) + 1]
                fil = 9 - movs[(mov*4) + 2]
                col = 8 - movs[(mov*4) + 3]
            }
            console.log("Movimiento Final: ", filini, colini, fil, col)
            this.selectedPiece.fil = filini
            this.selectedPiece.col = colini
            this.selectedPiece.selected = true
            this.tablero.filas[fil][col].esPista = true
            this.moveSelectedPiece( fil,  col, this.tablero.filas[fil][col], false)
            this.selectedPiece.selected = false
        },

        movePiece(filini, colini, indexFil, indexCol){
            this.tablero.filas[indexFil][indexCol].pieza = this.tablero.filas[filini][colini].pieza
            this.tablero.filas[indexFil][indexCol].color = this.tablero.filas[filini][colini].color
            this.tablero.filas[indexFil][indexCol].esPista = this.tablero.filas[filini][colini].esPista
            this.tablero.filas[filini][colini].pieza = null
            this.turno++
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
            //console.log("Posicion del rey: ", reyCheck.fil, reyCheck.col )
            reyCheck.fil = parseInt(reyCheck.fil)
            reyCheck.col = parseInt(reyCheck.col)
            //Mirar el norte(Torre, soldado) | canyon cuando encuentre pieza
            let canyon = false
            let amenzas = ["soldado","torre","general"]
            let it = 1
            //console.log("NORTE")
            for(let i = reyCheck.fil; i > 0; i --){
                if(this.tablero.filas[reyCheck.fil - it][reyCheck.col].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil - it][reyCheck.col].color == amenaza){//Ficha 
                        //console.log(amenzas)
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil - it][reyCheck.col].pieza)){
                                //console.log("jaque", this.tablero.filas[reyCheck.fil - it][reyCheck.col].pieza, amenaza)
                            return false //Hay jaque
                        }
                    }
                    if(canyon == false){ // no nos amenazaba un canyon asi que ahora nos puede amenazar
                        //console.log("Nos amenaza el canyon")
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
            //console.log("S")
            canyon = false
            amenzas = ["soldado","torre","general"]
            it = 1
            for(let i = reyCheck.fil; i < 9; i ++){
                if(this.tablero.filas[reyCheck.fil + it][reyCheck.col].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil + it][reyCheck.col].color == amenaza){//Ficha 
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil + it][reyCheck.col].pieza)){
                                //console.log("jaque", this.tablero.filas[reyCheck.fil + it][reyCheck.col].pieza, amenaza)
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
            //console.log("E")
            //Mirar el este(Torre, soldado) | canyon cuando encuentre pieza
            canyon = false
            amenzas = ["soldado","torre","general"]
            it = 1
            for(let i = reyCheck.col; i < 8; i ++){
                if(this.tablero.filas[reyCheck.fil][reyCheck.col + it].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil][reyCheck.col + it].color == amenaza){//Ficha 
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil][reyCheck.col + it].pieza)){
                            this.$toast.add({severity:'info', summary: "Jaque", detail:"Has recibido un jaque", life: 5000});
                                //console.log("jaque", this.tablero.filas[reyCheck.fil][reyCheck.col + it].pieza, amenaza)
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
            //console.log("W")
            for(let i = reyCheck.col;  i > 0; i --){
                if(this.tablero.filas[reyCheck.fil][reyCheck.col - it].pieza != null){ // Encontramos fihca
                    if(this.tablero.filas[reyCheck.fil][reyCheck.col - it].color == amenaza){//Ficha 
                        if(amenzas.includes(this.tablero.filas[reyCheck.fil][reyCheck.col - it].pieza)){
                                //console.log("jaque", this.tablero.filas[reyCheck.fil][reyCheck.col - it].pieza, amenaza)
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
                        //console.log("Jaque caballo", amenaza)
                        this.$toast.add({severity:'info', summary: "Jaque", detail:"Has recibido un jaque del caballo", life: 5000});
                        return false
                    }
                }
            });
            //console.log("Jaque de", amenaza)
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


        /*
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        *---------------------------------------------------------------------------------------------------------------
        */

        moveSelectedPiece(indexFil, indexCol, itemFila, emit) {
            if(itemFila.esPista && this.selectedPiece.selected){
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
                    reyCheck = this.reyRojo
                    amenaza = "negro"
                } else{ //Comprobar el negro
                    reyCheck = this.reyNegro
                    amenaza = "rojo"
                }
                if(this.checkCheck(reyCheck, amenaza) == false && emit != false){
                    console.log("Movimiento no valido")
                    if(auxRey != null){
                        //console.log(this.tablero.filas[indexFil][indexCol])
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
                    
                } else {
                    //ENVIAR MOVIMIENTO
                    if(emit){
                        this.socket.emit("doMov", {'id': this.idSala, 'mov': [this.selectedPiece.fil,this.selectedPiece.col,indexFil,indexCol], 'color': this.playerColor})
                    }
                    this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves.forEach(move => {
                        this.tablero.filas[move.f][move.c].esPista = false;
                    });

                    this.movedPiece.fil = indexFil
                    this.movedPiece.col = indexCol
                    this.movedPiece.filini = this.selectedPiece.fil
                    this.movedPiece.colini = this.selectedPiece.col

                    this.playSound(itemFila)
                    if(this.turno%2 != 0 && this.playerColor == "rojo"){//Comprobar el rojo
                        let reyCheck = {fil: this.reyRojo.fil, col: this.reyRojo.col}
                        let amenaza = "negro"
                        if(this.checkCheck(reyCheck, amenaza) == false){
                            console.log("JMe hace jaque el negro")
                            this.calcMovesJaque("rojo","negro", reyCheck)
                        } 
                        console.log("Mueve Rojo")
                    } else if(this.turno%2 == 0 && this.playerColor == "negro"){ //Comprobar el negro
                        let reyCheck = {fil: this.reyNegro.fil, col: this.reyNegro.col}
                        let amenaza = "rojo"
                        if(this.checkCheck(reyCheck, amenaza) == false){
                            console.log("JMe hace jaque el rojo")
                            this.calcMovesJaque("negro","rojo", reyCheck)
                        } 
                        console.log("Mueve Negro")
                    }
                    this.turno += 1
                    console.log("movido, Truno actual: ", this.turno)
                    console.log("POSICION DE LOS REYES.\nRey Rojo: ", this.reyRojo, "\nRey Negro: ", this.reyNegro)
                }
            } else {
                this.selectedPiece.selected = false;
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
           //console.log(this.tablero.filas[filaActual][columnaActual], filaActual, columnaActual)
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
                    //console.log("Muevo al rey rojo: ", this.reyRojo)
                    reyCheck = this.reyRojo
                } else{
                    auxRey = {fil:this.reyNegro.fil, col: this.reyNegro.col}
                    this.reyNegro.fil = filaMov
                    this.reyNegro.col = columnaMov
                    //console.log("Muevo al rey negro: ", this.reyNegro)
                    reyCheck = this.reyNegro
                }
            }
            let valido = this.checkCheck(reyCheck, amenaza)
            if(general == true){
                if(pMover == "rojo"){
                    this.reyRojo.fil = auxRey.fil
                    this.reyRojo.col = auxRey.col
                    //console.log("El rey vuelve a: ", this.reyRojo)
                } else{
                    this.reyNegro.fil = auxRey.fil
                    this.reyNegro.col = auxRey.col
                    //console.log("El rey vuelve a: ", this.reyNegro)
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
                console.log("Movimiento valido")
                returnValue = 1
                this.tablero.filas[filaActual][columnaActual].moves.push({f: filaMov, c: columnaMov})
                this.tablero.filas[filaActual][columnaActual].turno = this.turno + 1
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
                    if(this.tablero.filas[j][i].pieza != null){
                        //console.log(i,j, this.tablero.filas[j][i])
                        if(this.tablero.filas[j][i].color == pMover){
                            //console.log(j,i, this.tablero.filas[j][i])
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
                            //MOVIMIENTOS POSIBLES DEL OFICIAAL
                            else if(this.tablero.filas[j][i].pieza == "oficial"){
                                if(this.tablero.filas[j][i].color == pMover){
                                    //console.log("ITAIYO")
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
                                        //console.log(1)
                                        if (this.tablero.filas[j + 1][i + 1].pieza == null || this.tablero.filas[j + 1][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 3 && j != 2){
                                        //console.log(2)
                                        if (this.tablero.filas[j + 1][i - 1].pieza == null || this.tablero.filas[j + 1][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 5 && j != 0){
                                        //console.log(3)
                                        if (this.tablero.filas[j - 1][i + 1].pieza == null || this.tablero.filas[j - 1][i + 1].color != this.tablero.filas[j][i].color){
                                            //COMPROBAR JAQUE
                                            totalMoves += this.moveJaque(j, i, j - 1, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                    if(i != 3 && j != 0){
                                        //console.log(4)
                                        if (this.tablero.filas[j - 1][i - 1].pieza == null || this.tablero.filas[j - 1][i - 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DEL ELEFANNTE
                            else if(this.tablero.filas[j][i].pieza == "elefante"){
                                if(this.tablero.filas[j][i].color == "rojo"){
                                    if(i < 8 && j < 9){
                                        if(this.tablero.filas[j + 1][i + 1].pieza == null){
                                            if (this.tablero.filas[j + 2][i + 2].pieza == null || this.tablero.filas[j + 2][i + 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j + 2, i + 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                    if(i > 0 && j < 9){
                                        if(this.tablero.filas[j + 1][i - 1].pieza == null){
                                            if (this.tablero.filas[j + 2][i - 2].pieza == null || this.tablero.filas[j + 2][i - 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j + 2, i - 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                    if(i < 8 && j > 5){
                                        if(this.tablero.filas[j - 1][i + 1].pieza == null){
                                            if (this.tablero.filas[j - 2][i + 2].pieza == null || this.tablero.filas[j - 2][i + 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j - 2, i + 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                    if(i > 0 && j > 5){
                                        if(this.tablero.filas[j - 1][i - 1].pieza == null){
                                            if (this.tablero.filas[j - 2][i - 2].pieza == null || this.tablero.filas[j - 2][i - 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j - 2, i - 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                } else {
                                    if(i < 8 && j < 4){
                                        if(this.tablero.filas[j + 1][i + 1].pieza == null){
                                            if (this.tablero.filas[j + 2][i + 2].pieza == null || this.tablero.filas[j + 2][i + 2].color != this.tablero.filas[j][i].color){
//console.log("AMENAZA")
                                                totalMoves += this.moveJaque(j, i, j + 2, i + 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                    if(i < 0 && j < 4){
                                        if(this.tablero.filas[j + 1][i - 1].pieza == null){
                                            if (this.tablero.filas[j + 2][i - 2].pieza == null || this.tablero.filas[j + 2][i - 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j + 2, i - 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                    if(i < 8 && j > 0){
                                        if(this.tablero.filas[j - 1][i + 1].pieza == null){
                                            if (this.tablero.filas[j - 2][i + 2].pieza == null || this.tablero.filas[j - 2][i + 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j - 2, i + 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                    if(i > 0 && j > 0){
                                        if(this.tablero.filas[j - 1][i - 1].pieza == null){
                                            if (this.tablero.filas[j - 2][i - 2].pieza == null || this.tablero.filas[j - 2][i - 2].color != this.tablero.filas[j][i].color){
                                                totalMoves += this.moveJaque(j, i, j - 2, i - 2,pMover ,false, reyCheck, amenaza)
                                            }
                                        }
                                    }
                                }    
                            }

                            // -------------------------------------------------------------------------------------------------
                            //MOVIMIENTOS POSIBLES DEL CABALLO
                            else if(this.tablero.filas[j][i].pieza == "caballo"){
                                if(i > 1 && j < 9){
                                    //console.log(1)
                                    if(this.tablero.filas[j][i - 1].pieza == null){
                                        if (this.tablero.filas[j + 1][i - 2].pieza == null || this.tablero.filas[j + 1][i - 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i - 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 7 && j < 9){
                                    //console.log(2)
                                    if(this.tablero.filas[j][i + 1].pieza == null){
                                        if (this.tablero.filas[j + 1][i + 2].pieza == null || this.tablero.filas[j + 1][i + 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 1, i + 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i > 1 && j > 0){
                                    //console.log(3)
                                    if(this.tablero.filas[j][i - 1].pieza == null){
                                        if (this.tablero.filas[j - 1][i - 2].pieza == null || this.tablero.filas[j - 1][i - 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i - 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 7 && j > 0){
                                    //console.log(4)
                                    if(this.tablero.filas[j][i + 1].pieza == null){
                                        if (this.tablero.filas[j - 1][i + 2].pieza == null || this.tablero.filas[j - 1][i + 2].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 1, i + 2,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 8 && j > 1){
                                    //console.log(5)
                                    if(this.tablero.filas[j - 1][i].pieza == null){
                                        if (this.tablero.filas[j - 2][i + 1].pieza == null || this.tablero.filas[j - 2][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j - 2, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i > 0 && j > 1){
                                    if(this.tablero.filas[j - 1][i].pieza == null){
                                        if (this.tablero.filas[j - 2][i - 1].pieza == null || this.tablero.filas[j - 2][i - 1].color != this.tablero.filas[j][i].color){
                                            //console.log(6)
                                            totalMoves += this.moveJaque(j, i, j - 2, i - 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i < 8 && j < 8){
                                    //console.log(7)
                                    if(this.tablero.filas[j + 1][i].pieza == null){
                                        if (this.tablero.filas[j + 2][i + 1].pieza == null || this.tablero.filas[j + 2][i + 1].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j + 2, i + 1,pMover ,false, reyCheck, amenaza)
                                        }
                                    }
                                }
                                if(i > 0 && j < 8){
                                    //console.log(8)
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
                                    //console.log("NORTE")
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
                                    //console.log("SUR")
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
                                    //console.log("ESTE")
                                    if(this.tablero.filas[j][i + it].pieza == null){
                                        totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                        //console.log(this.tablero.filas[j][i].moves)
                                    } else{
                                        if(this.tablero.filas[j][i + it].color != this.tablero.filas[j][i].color){
                                            totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                            //console.log(this.tablero.filas[j][i].moves)
                                        }
                                        break
                                    }
                                    it += 1
                                }
                                //Iterar al oeste
                                it = 1
                                for(let k = i; k > 0; k --){
                                    //console.log("WEST")
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
                                            //console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j - it, i,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            //console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j - it][i].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                //console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j - it, i,pMover ,false, reyCheck, amenaza)
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
                                //Iterar al sur
                                it = 1
                                saltar = false
                                for(let k = j; k < 9; k ++){
                                    if(this.tablero.filas[j + it][i].pieza == null){
                                        if(!saltar){
                                            //console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j + it, i,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            //console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j + it][i].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                //console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j + it, i,pMover ,false, reyCheck, amenaza)
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
                                for(let k = i; k < 8; k ++){
                                    if(this.tablero.filas[j][i + it].pieza == null){
                                        if(!saltar){
                                            //console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            //console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j][i + it].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                //console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j, i + it,pMover ,false, reyCheck, amenaza)
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
                                for(let k = i; k > 0; k --){
                                    if(this.tablero.filas[j][i - it].pieza == null){
                                        if(!saltar){
                                            //console.log("MOVEMOS")
                                            totalMoves += this.moveJaque(j, i, j, i - it,pMover ,false, reyCheck, amenaza)
                                        } else{
                                            //console.log("VOLAMOS")
                                        }
                                        
                                    } else{ // Encontramos una pieza
                                        if(this.tablero.filas[j][i - it].color != this.tablero.filas[j][i].color){
                                            if(saltar){
                                                //console.log("COMEMOS")
                                                totalMoves += this.moveJaque(j, i, j, i - it,pMover ,false, reyCheck, amenaza)
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
                            //console.log(totalMoves)
                        }
                        //console.log(this.tablero.filas[j][i])
                        this.tablero.filas[j][i].turno = this.turno + 1
                    }
                }
           }
           console.log("Tiene ", totalMoves, "Movimientos posibles")
           if(totalMoves == 0){
                console.log("Jaque mate")

                // emit le dire al back quien ha ganado
                this.socket.emit("lose", {'idSala': this.idSala, 'idGanador': this.idOp, 'idPerdedor': this.myid})
                //ESTO LE SALE AL PERDEDOR
                this.ganador.id = this.idOp
                this.ganador.name = this.rivalProfile.name
                this.gameOverDispay = true;
           }
       },


       moves(indexFil, indexCol, item) {
            //Mirar si el color seleccionado es el color con el que estoy jugando
            if (this.playerColor == item.color) {
                if((this.playerColor == "rojo" && this.turno%2 == 0) || (this.playerColor == "negro" && this.turno%2 != 0) ){
                    this.playSound(item)
                    this.tablero.filas[indexFil][indexCol].color = "rojo"
                    //Si la pieza no esta seleccionada ya (para deseleccionar al volver a clicar)
                    if (!this.selectedPiece.selected) {
                        if (this.selectedPiece.fil != null) {
                            //console.log("Entramos", this.selectedPiece)
                            this.tablero.filas[this.selectedPiece.fil][this.selectedPiece.col].moves.forEach(move => {
                                this.tablero.filas[move.f][move.c].esPista = false;
                            });
                        }
                        this.selectedPiece.fil = indexFil;
                        this.selectedPiece.col = indexCol;
                        this.selectedPiece.selected = true;
                        console.log("TURNOS: ",item.turno,this.turno )
                        if(item.turno == this.turno){
                                item.moves.forEach(move => {
                                //console.log("EN ITEM TURNO WAT", move)
                                this.tablero.filas[move.f][move.c].esPista = true;
                            });
                            //console.log("Ya visto")
                        } else {
                            item.moves = []
                            item.turno = this.turno

                            this.selectedTile = this.tablero.filas[indexFil][indexCol]
                            if(item.moves.length == 0){ //Cada vez que movamos una ficha sus movimientos pasaran a 0, pero si no calculamos sus movimientos y los guardamos hasta el movimiento
                                //MOVIMIENTOS POSIBLES DEL GENERAL
                                if(item.pieza == "general"){
                                    if(indexCol != 5){
                                        if (this.tablero.filas[indexFil][indexCol + 1].pieza == null || this.tablero.filas[indexFil][indexCol + 1].color != this.playerColor){
                                            //COMPROBAR JAQUE
                                            item.moves.push({f: indexFil, c: indexCol + 1})
                                        }
                                    }
                                    if(indexCol != 3){
                                        if (this.tablero.filas[indexFil][indexCol - 1].pieza == null || this.tablero.filas[indexFil][indexCol - 1].color != this.playerColor){
                                            //COMPROBAR JAQUE
                                            item.moves.push({f: indexFil, c: indexCol - 1})
                                        }
                                    }
                                    if(indexFil < 9){
                                        if(item.color == "rojo"){
                                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != this.playerColor ){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol})
                                            }
                                        }  
                                    }
                                    if(indexFil < 2){
                                        if(item.color == "negro"){
                                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != this.playerColor ){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol})
                                            }
                                        }  
                                    }
                                    if(indexFil > 7){
                                        if(item.color == "rojo"){
                                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != this.playerColor ){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol})
                                            } 
                                        }   
                                    }

                                    if(indexFil > 0){
                                        if(item.color == "negro"){
                                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != this.playerColor ){
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
                                            if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol + 1})
                                            }
                                        }
                                        if(indexCol != 3 && indexFil != 9){
                                            if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol - 1})
                                            }
                                        }
                                        if(indexCol != 5 && indexFil != 7){
                                            if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol + 1})
                                            }
                                        }
                                        if(indexCol != 3 && indexFil != 7){
                                            if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol - 1})
                                            }
                                        }
                                    } else {
                                        if(indexCol != 5 && indexFil != 2){
                                            if (this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol + 1})
                                            }
                                        }
                                        if(indexCol != 3 && indexFil != 2){
                                            if (this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol - 1})
                                            }
                                        }
                                        if(indexCol != 5 && indexFil != 0){
                                            if (this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol + 1})
                                            }
                                        }
                                        if(indexCol != 3 && indexFil != 0){
                                            if (this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol - 1})
                                            }
                                        }
                                    }
                                    
                                }

                                // -------------------------------------------------------------------------------------------------
                                //MOVIMIENTOS POSIBLES DEL ELEFANTE
                                else if(item.pieza == "elefante"){
                                    if(item.color == "rojo"){
                                        if(indexCol < 8 && indexFil < 9){
                                            if(this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null){
                                                if (this.tablero.filas[indexFil + 2][indexCol + 2].pieza == null || this.tablero.filas[indexFil + 2][indexCol + 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil + 2, c: indexCol + 2})
                                                }
                                            }
                                        }
                                        if(indexCol > 0 && indexFil < 9){
                                            if(this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null){
                                                if (this.tablero.filas[indexFil + 2][indexCol - 2].pieza == null || this.tablero.filas[indexFil + 2][indexCol - 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil + 2, c: indexCol - 2})
                                                }
                                            }
                                        }
                                        if(indexCol < 8 && indexFil > 5){
                                            if(this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null){
                                                if (this.tablero.filas[indexFil - 2][indexCol + 2].pieza == null || this.tablero.filas[indexFil - 2][indexCol + 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil - 2, c: indexCol + 2})
                                                }
                                            }
                                        }
                                        if(indexCol > 0 && indexFil > 5){
                                            if(this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null){
                                                if (this.tablero.filas[indexFil - 2][indexCol - 2].pieza == null || this.tablero.filas[indexFil - 2][indexCol - 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil - 2, c: indexCol - 2})
                                                }
                                            }
                                        }
                                    } else {
                                        if(indexCol < 8 && indexFil < 4){
                                            if(this.tablero.filas[indexFil + 1][indexCol + 1].pieza == null){
                                                if (this.tablero.filas[indexFil + 2][indexCol + 2].pieza == null || this.tablero.filas[indexFil + 2][indexCol + 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil + 2, c: indexCol + 2})
                                                }
                                            }
                                        }
                                        if(indexCol > 0 && indexFil < 4){
                                            if(this.tablero.filas[indexFil + 1][indexCol - 1].pieza == null){
                                                if (this.tablero.filas[indexFil + 2][indexCol - 2].pieza == null || this.tablero.filas[indexFil + 2][indexCol - 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil + 2, c: indexCol - 2})
                                                }
                                            }
                                        }
                                        if(indexCol < 8 && indexFil > 0){
                                            if(this.tablero.filas[indexFil - 1][indexCol + 1].pieza == null){
                                                if (this.tablero.filas[indexFil - 2][indexCol + 2].pieza == null || this.tablero.filas[indexFil - 2][indexCol + 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil - 2, c: indexCol + 2})
                                                }
                                            }
                                        }
                                        if(indexCol > 0 && indexFil > 0){
                                            if(this.tablero.filas[indexFil - 1][indexCol - 1].pieza == null){
                                                if (this.tablero.filas[indexFil - 2][indexCol - 2].pieza == null || this.tablero.filas[indexFil - 2][indexCol - 2].color != item.color){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil - 2, c: indexCol - 2})
                                                }
                                            }
                                        }
                                    }    
                                }

                                // -------------------------------------------------------------------------------------------------
                                //MOVIMIENTOS POSIBLES DEL CABALLO
                                else if(item.pieza == "caballo"){
                                    if(indexCol > 1 && indexFil < 9){
                                        if(this.tablero.filas[indexFil][indexCol - 1].pieza == null){
                                            if (this.tablero.filas[indexFil + 1][indexCol - 2].pieza == null || this.tablero.filas[indexFil + 1][indexCol - 2].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol - 2})
                                            }
                                        }
                                    }
                                    if(indexCol < 7 && indexFil < 9){
                                        if(this.tablero.filas[indexFil][indexCol + 1].pieza == null){
                                            if (this.tablero.filas[indexFil + 1][indexCol + 2].pieza == null || this.tablero.filas[indexFil + 1][indexCol + 2].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol + 2})
                                            }
                                        }
                                    }
                                    if(indexCol > 1 && indexFil > 0){
                                        if(this.tablero.filas[indexFil][indexCol - 1].pieza == null){
                                            if (this.tablero.filas[indexFil - 1][indexCol - 2].pieza == null || this.tablero.filas[indexFil - 1][indexCol - 2].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol - 2})
                                            }
                                        }
                                    }
                                    if(indexCol < 7 && indexFil > 0){
                                        if(this.tablero.filas[indexFil][indexCol + 1].pieza == null){
                                            if (this.tablero.filas[indexFil - 1][indexCol + 2].pieza == null || this.tablero.filas[indexFil - 1][indexCol + 2].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol + 2})
                                            }
                                        }
                                    }
                                    if(indexCol < 8 && indexFil > 1){
                                        if(this.tablero.filas[indexFil - 1][indexCol].pieza == null){
                                            if (this.tablero.filas[indexFil - 2][indexCol + 1].pieza == null || this.tablero.filas[indexFil - 2][indexCol + 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 2, c: indexCol + 1})
                                            }
                                        }
                                    }
                                    if(indexCol > 0 && indexFil > 1){
                                        if(this.tablero.filas[indexFil - 1][indexCol].pieza == null){
                                            if (this.tablero.filas[indexFil - 2][indexCol - 1].pieza == null || this.tablero.filas[indexFil - 2][indexCol - 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 2, c: indexCol - 1})
                                            }
                                        }
                                    }
                                    if(indexCol < 8 && indexFil < 8){
                                        if(this.tablero.filas[indexFil + 1][indexCol].pieza == null){
                                            if (this.tablero.filas[indexFil + 2][indexCol + 1].pieza == null || this.tablero.filas[indexFil + 2][indexCol + 1].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 2, c: indexCol + 1})
                                            }
                                        }
                                    }
                                    if(indexCol > 0 && indexFil < 8){
                                        if(this.tablero.filas[indexFil + 1][indexCol].pieza == null){
                                            if (this.tablero.filas[indexFil + 2][indexCol - 1].pieza == null || this.tablero.filas[indexFil + 2][indexCol - 1].color != this.playerColor){
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
                                            if(this.tablero.filas[indexFil - it][indexCol].color != this.playerColor){
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
                                            if(this.tablero.filas[indexFil + it][indexCol].color != this.playerColor){
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
                                            if(this.tablero.filas[indexFil][indexCol + it].color != this.playerColor){
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
                                            if(this.tablero.filas[indexFil][indexCol - it].color != this.playerColor){
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
                                            if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != this.playerColor){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil - 1, c: indexCol})
                                            }
                                        } else{ // Norte, este y oeste
                                            if(indexCol != 8){ // Oeste
                                                if (this.tablero.filas[indexFil][indexCol + 1].pieza == null || this.tablero.filas[indexFil][indexCol + 1].color != this.playerColor){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil, c: indexCol + 1})
                                                }
                                            }
                                            if(indexCol != 0){
                                                if (this.tablero.filas[indexFil][indexCol - 1].pieza == null || this.tablero.filas[indexFil][indexCol - 1].color != this.playerColor){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil, c: indexCol - 1})
                                                }
                                            }
                                            if(indexFil != 0){
                                                if (this.tablero.filas[indexFil - 1][indexCol].pieza == null || this.tablero.filas[indexFil - 1][indexCol].color != this.playerColor ){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil - 1, c: indexCol})
                                                }
                                            }
                                        }
                                    } else{
                                        if(indexFil <= 4){ // Solo para abajo
                                            if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != this.playerColor ){
                                                //COMPROBAR JAQUE
                                                item.moves.push({f: indexFil + 1, c: indexCol})
                                            }
                                        } else{ // Norte, este y oeste
                                            if(indexCol != 8){ // Oeste
                                                if (this.tablero.filas[indexFil][indexCol + 1].pieza == null || this.tablero.filas[indexFil][indexCol + 1].color != this.playerColor){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil, c: indexCol + 1})
                                                }
                                            }
                                            if(indexCol != 0){
                                                if (this.tablero.filas[indexFil][indexCol - 1].pieza == null || this.tablero.filas[indexFil][indexCol - 1].color != this.playerColor){
                                                    //COMPROBAR JAQUE
                                                    item.moves.push({f: indexFil, c: indexCol - 1})
                                                }
                                            }
                                            if(indexFil != 9){
                                                if (this.tablero.filas[indexFil + 1][indexCol].pieza == null || this.tablero.filas[indexFil + 1][indexCol].color != this.playerColor ){
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
                                                //console.log("VOLAMOS")
                                            }*/
                                            
                                        } else{ // Encontramos una pieza
                                            if(this.tablero.filas[indexFil - it][indexCol].color != this.playerColor){
                                                if(saltar){
                                                    //console.log("COMEMOS")
                                                    item.moves.push({f: indexFil - it, c: indexCol})
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
                                    //Iterar al sur
                                    it = 1
                                    saltar = false
                                    for(let i = indexFil; i < 9; i ++){
                                        if(this.tablero.filas[indexFil + it][indexCol].pieza == null){
                                            if(!saltar){
                                                //console.log("MOVEMOS")
                                                item.moves.push({f: indexFil + it, c: indexCol})
                                            } /*else{
                                                //console.log("VOLAMOS")
                                            }*/
                                            
                                        } else{ // Encontramos una pieza
                                            if(this.tablero.filas[indexFil + it][indexCol].color != this.playerColor){
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
                                            if(this.tablero.filas[indexFil][indexCol + it].color != this.playerColor){
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
                                            if(this.tablero.filas[indexFil][indexCol - it].color != this.playerColor){
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
                                    //console.log(move)
                                    this.tablero.filas[move.f][move.c].esPista = true;
                                });
                            }
                        }
                    } else {
                        this.selectedPiece.selected = false;
                    }
                    this.tablero.filas[indexFil][indexCol].color = this.playerColor
                }
           }
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

.casilla-pista {
    background-color: rgba(255, 107, 110);
}

.casilla-pista:hover {
    background: rgba(91, 137, 184);
    cursor: pointer;
}

.casilla-movida {
    background-color: rgb(255, 255, 0);
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

.selectedPiece:hover {
    cursor: pointer;
}

.moved-piece {
    border-width: 2px;
    border-style: solid;
    border-color: yellow;
}

.pieza-responsive {
    transition: opacity 0.5s;
}

.pieza-player-responsive {
    cursor: pointer;
}

.pieza-player-responsive:hover {
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

.foto-perfil-sm {
    vertical-align: middle;
	width: 3rem;
	height: 3rem;
	border-radius: 50%;
	object-fit: cover;
}

</style>
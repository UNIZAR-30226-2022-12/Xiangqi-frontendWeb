<template>
    <div class="card">
        <div class="col-12 fondo m-auto board-width">
            <div v-for="(item, indexFil) in tablero.filas" :key="indexFil" class="flex">
                <div v-for="(itemFila, indexCol) in item" :key="indexCol" v-on:click="tile(indexFil, indexCol, itemFila.pieza, itemFila.color)" class="h-3rem w-3rem sm:h-4rem sm:w-4rem md:h-5rem md:w-5rem border-600 border-0 flex-grow-1 flex align-items-center justify-content-center font-bold text-white casilla">
                    <img v-if="itemFila.pieza != ''" class="pieza" style="border-radius: 100%; box-shadow: 4px 4px 10px black;" :src="'images/pieces/set1/' + itemFila.pieza + itemFila.color + '.svg'">  
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
            tablero: {
                filas: [
                    [{ pieza: "torre", color: "negro"}, { pieza: "caballo", color: "negro" }, { pieza: "elefante", color: "negro" }, { pieza: "oficial", color: "negro" }, { pieza: "general", color: "negro" }, { pieza: "oficial", color: "negro" }, { pieza: "elefante", color: "negro" }, { pieza: "caballo", color: "negro" }, { pieza: "torre", color: "negro" }],
                    [{ pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: ""}, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }],
                    [{ pieza: "", color: "" }, { pieza: "canyon", color: "negro" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "canyon", color: "negro" }, { pieza: "", color: "" }],
                    [{ pieza: "soldado", color: "negro" }, { pieza: "", color: "" }, { pieza: "soldado", color: "negro" }, { pieza: "", color: "" }, { pieza: "soldado", color: "negro" }, { pieza: "", color: "" }, { pieza: "soldado", color: "negro" }, { pieza: "", color: "" }, { pieza: "soldado", color: "negro" }],
                    [{ pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }],
                    [{ pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }],
                    [{ pieza: "soldado", color: "rojo" }, { pieza: "", color: "" }, { pieza: "soldado", color: "rojo" }, { pieza: "", color: "" }, { pieza: "soldado", color: "rojo" }, { pieza: "", color: "" }, { pieza: "soldado", color: "rojo" }, { pieza: "", color: "" }, { pieza: "soldado", color: "rojo" }],
                    [{ pieza: "", color: "" }, { pieza: "canyon", color: "rojo" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "canyon", color: "rojo" }, { pieza: "", color: "" }],
                    [{ pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }, { pieza: "", color: "" }],
                    [{ pieza: "torre", color: "rojo" }, { pieza: "caballo", color: "rojo" }, { pieza: "elefante", color: "rojo" }, { pieza: "oficial", color: "rojo" }, { pieza: "general", color: "rojo" }, { pieza: "oficial", color: "rojo" }, { pieza: "elefante", color: "rojo" }, { pieza: "caballo", color: "rojo" }, { pieza: "torre", color: "rojo" }],
                ]
            },
            selectedTile: '',
        }
    },
	created() {
        //para ocultar de manera guarra el menu
		this.$loggedStatus.logged = false;
	},
    methods: {
        tile(indexFil, indexCol, pieza, color) {
            console.log(indexFil, indexCol, pieza, color);
        }
    }
}
</script>

<style scoped>

.fondo {
    background-position: center center;
    background-size: 100% 100%;
    background-repeat:no-repeat;
    background-image: url("/images/boards/wooden2.jpg");
    border-radius: 2.2rem;
    box-shadow: 4px 4px 10px black;
}

.casilla:hover {
    background-color: #3f3fff2a;
    cursor: pointer;
    border-radius: 100%;
}

@media (min-width: 768px) {
    .board-width{
        max-width: 46rem
    }
}

@media (max-width: 768px) {
    .board-width{
        max-width: 40rem;
        height: 41rem;
    }
}

@media (max-width: 580px) {
    .board-width{
        max-width: 38rem;
        height: auto;
    }
}

@media (max-width: 575px) {
    .board-width{
        max-width: 29rem;
        height: auto;
    }
}

@media (min-width: 768px) {
    .pieza {
        vertical-align: middle;
        margin: 0.5rem;
        object-fit: cover;
    }
}

@media (max-width: 768px) {
    .pieza {
        vertical-align: middle;
        margin: 0.4rem;
        object-fit: cover;
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

</style>
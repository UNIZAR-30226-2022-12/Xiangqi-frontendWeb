<template>
    <div class="card">
        <div class="flex card-container blue-container overflow-hidden">
            <div v-for="(item, index) in tablero.filas.fila" :key="index" class="border-500 border-3 flex-grow-1 flex align-items-center justify-content-center bg-blue-500 font-bold text-white">{{ index }} {{ item.pieza }}</div>
        </div>
    </div>
    <div class="grid">
        <div class="col-12 flex justify-content-center">
            <img class="board" src="../assets/images/boards/wooden2.jpg" alt="Tablero">
        </div>
    </div>
</template>

<script>

export default  {
	inject: ['$accounts'],
      data() {
        return {
            tablero: [{
                filas: [{
                        fila: [{ pieza: "Torre" }, { pieza: "Caballo" }, { pieza: "Elefante" }, { pieza: "Oficial" }, { pieza: "General" }, { pieza: "Oficial" }, { pieza: "Elefante" }, { pieza: "Caballo" }, { pieza: "Torre" }]
                    },
                    {
                        fila: [{ pieza: "" }, { pieza: "Caballo" }, { pieza: "Elefante" }, { pieza: "Oficial" }, { pieza: "General" }, { pieza: "Oficial" }, { pieza: "Elefante" }, { pieza: "Caballo" }, { pieza: "Torre" }]
                    },
                ]
            }]
        }
    },
	created() {
        //para ocultar de manera guarra el menu
		this.$loggedStatus.logged = false;
	}
}
</script>

<style scoped>


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
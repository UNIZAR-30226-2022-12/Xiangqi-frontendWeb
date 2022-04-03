<template>
    <div class="grid">
        <div class="col-12 flex justify-content-center">
            <img class="board" src="../assets/images/boards/wooden2.jpg" alt="Tablero">
        </div>
    </div>
</template>

<script>

export default  {
	inject: ['$accounts'],
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
<template>
    <h1> DEMO </h1>
    <div class="grid">
        <div class="col-12 flex justify-content-center">
            <img class="board" src="../assets/images/boards/basic_board.svg" alt="Tablero">
        </div>
    </div>
    <h1> DEMO </h1>
</template>

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
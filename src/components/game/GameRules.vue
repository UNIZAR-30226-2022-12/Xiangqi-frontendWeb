<!--BOTÓN Y DIALOGO PARA CREAR UN JUEGO NUEVO-->
<template>
  <Button v-on:click="this.display = true" class="col-12 mt-2  mb-2 w-full p-button-raised font-semibold h-3rem" style="border-radius: 1rem" icon="pi pi-search" label="Ver reglas del juego"/>
  <Dialog v-model:visible="display" class="dialogo-rules" :draggable="false" :modal="true"> <!--v-model:visible asociado con variable contentStyle="padding: 0px;"-->
    <template #header>
      <h3 class="mr-2">Reglas del juego</h3> 
    </template>
    <div class="card p-2">
      <div class="flex align-items-center flex-wrap card-container">
        <h3>El tablero</h3>
        <p>El tablero de juego esta compuesto por diez líneas horizontales y nueve verticales. Las piezas se ubican en sus intersecciones, llamados puntos. En el centro de cada lado del tablero se encuentra el "palacio", compuesta de tres puntos de ancho y tres de largo, cruzada por diagonales, en la que se encuentra el rey. En la mitad del tablero se encuentra un río, que divide el tablero en dos campos. </p>
        <h3 class="w-full">Las piezas</h3>
        <div v-for="(item, index) in pieces" :key="index">
            <div class="flex">
                <div class="flex-initial flex align-items-center justify-content-center text-2xl mb-3"> {{ item.dispName }}</div>
            </div>
            <div class="flex mb-3">
                <img :src="'images/themes/pieces/1/' + item.name + 'Negro.svg'" alt="soldado" class="w-4rem mr-3">
                <img :src="'images/themes/pieces/1/' + item.name + 'Rojo.svg'" alt="soldado" class="w-4rem mr-3">
                <img :src="'images/themes/pieces/2/' + item.name + 'Negro.svg'" alt="soldado" class="w-4rem mr-3">
                <img :src="'images/themes/pieces/2/' + item.name + 'Rojo.svg'" alt="soldado" class="w-4rem mr-3">
            </div>
            <p class="mb-5">{{ item.desc }}</p>
        </div>
        <h3>Fin de la partida</h3>
        <p>La partida termina cuando un jugador da jaque mate a su oponente. No hay ahogado en Xiangqi; en la situación en que un bando se halla sin movimiento legal, pierde la partida.</p>
      </div>
    </div>
    <template #footer>
      <Button label="Aceptar" class="p-button p-button-raised w-full h-3rem" style="border-radius: 1rem" v-on:click="this.display = false"/>
    </template>
  </Dialog>
</template>

<script>


export default {
  data() {
    return {
      display: false,
      pieces: [
          {name: 'soldado', dispName: 'El soldado', desc: 'Sólo puede mover un punto hacia adelante si se halla en su propio campo (antes de cruzar el rio); en campo enemigo (tras cruzar el rio), podrán moverse en forma horizontal. No puede retroceder, y al llegar a la última línea enemiga sólo mueven en forma lateral.'},
          {name: 'torre', dispName: 'La torre', desc: 'Mueve como la torre del ajedrez común.'},
          {name: 'canyon', dispName: 'El cañon', desc: 'Mueve igual que el carro, pero solo puede atacar si salta sobre otra pieza que se encuentre en la línea de ataque. La pieza que se interpone, conocida como plataforma del cañón, puede pertenecer a cualquier bando. El cañón sólo puede saltar si realiza un ataque, y no puede saltar sobre dos o más piezas.'},
          {name: 'caballo', dispName: 'El caballo', desc: 'Mueve un punto en dirección horizontal o vertical, seguida de otra en diagonal. Al realizar el primer movimiento (horizontal o vertical), el punto al que se mueve debe estar vacío.'},
          {name: 'elefante', dispName: 'El elefante (Xiang)', desc: 'Mueve dos puntos en diagonal, siempre y cuando el punto intermedio esté vacío. No puede atravesar el río.'},
          {name: 'oficial', dispName: 'El oficial', desc: 'Mueve un punto en dirección diagonal y no puede salir de las casillas marcadas como palacio.'},
          {name: 'general', dispName: 'El general o rey', desc: 'Mueve un punto en dirección horizontal o vertical, pero no puede salir de las casillas marcadas como palacio. Tampoco puede tener visión directa con el rey del oponente, es decir, si están en la misma columna debe haber al menos otra ficha entre medias de ellas dos, se puede aprovechar esto para forzar a no mover al otro jugador. No se puede realizar un movimiento que provoque amenaza al propio rey, y en caso de que esta en jaque, el jugador debe anular la amenaza en su turno.'},
      ],
    }
  },
}
</script>

<style>

.dialogo-rules {
  background-color: var(--surface-a); /* Get el current background del tema */
  border-radius: 15px;
  animation-duration: 0.6s;
  animation-name: lineIns derted;
  transition: height 0.6s, width 0.6s;
  border-radius: 15px;
  width: 60rem !important;
}

</style>
<template>
    <Dialog v-model:visible="display" class="dialog-success-verified" :draggable="false" :modal="true" :closable="false">
        <template #header :class="colorHeader">
        <h3 v-if="this.myid == this.ganador.id">Enhorabuena ¡Has ganado la partida!</h3>
        <h3 v-else>¡Has perdido!</h3>
        </template>
        <div class="text-center">
            <p v-if="this.myid == this.ganador.id" class="mt-4">Se ha acumulado una parida jugada y ganada más en tu perfil. Inicia una nueva partida para seguir jugando</p>
            <p v-else class="mt-4">Tu rival {{this.ganador.name}} ha ganado la partida. Inicia una nueva partida para seguir jugando</p>
            <Button type="submit" label="Volver a mi perfil" v-on:click="this.$router.push('/profile');" class="mt-3 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />  
        </div>
    </Dialog>
</template>
<script>

export default {
    props: {
        ganador: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            display: true,
            myid: localStorage.getItem('id')
        }
    },
    methods: {
        playTada: function() {
            if (this.myid == this.ganador.id) {
                var audio = new Audio('sounds/tada.mp3');
                audio.loop = false;
                audio.play();
            }
        }
    },
    created: function(){
        this.playTada()
    },
}
</script>
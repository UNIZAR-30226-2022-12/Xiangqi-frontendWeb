<template>
    <!--Div cochino para que la explosion salga del centro con z index 100 para que no me toque lo de abajo-->
    <div style="width: 1px; height: 1px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 1101;">
        <ConfettiExplosion :particleCount="300" :duration="10000" :stageHeight="2500" :stageWidth="5000"/>
    </div>
</template>

<script>
import ConfettiExplosion from 'vue-confetti-explosion'

export default  {
    components: {
        ConfettiExplosion,
    },
}

</script>
<template>
    <Dialog :visible="display" :closable="false" class="dialog-login resize-dialog" :draggable="false" :modal="true">
        <template #header :class="colorHeader">
            <h3>Puntos insuficientes</h3>
        </template>
        <div class="text-center">
            <p>No tienes puntos suficientes para comprar este artículo.</p>
            <p class="font-semibold">¡Gana más puntos jugando y vuelve más tarde!</p>
            <Button type="submit" label="Aceptar" v-on:click="this.$emit('ok-pressed');" class="mt-2 p-button-raised font-semibold h-3rem" style="border-radius: 1rem" />
        </div>
        <template #footer>
        </template>
    </Dialog>
</template>

<script>

export default {
    emits: ['ok-pressed'],
    props: {
        display: {
            type: Boolean,
            required: true
        },
    }
}

</script>

<style>

.dialog-no-points {
    height: 17rem;
    width: 30rem;
}

</style>
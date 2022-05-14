<template>
    <div class="block-content">
        <div class="">
            <div class="surface-section px-4 py-6 md:px-6 lg:px-8 text-center">
                <img :src="logo()" class="shadow-4" alt="Xiangqi logo" style="border-radius:20px" height="80">
                <div class="font-medium text-900 mt-4 mb-3">
                    © 2022 Xiangqi Online
                </div>
                <p class="text-600 line-height-3 mt-0 mb-4">Juega, gana y escala en el ranking de la aplicación número #1 para jugar al Xiangqi.</p>
                <div class="flex align-items-center justify-content-center">
                    <a class="cursor-pointer text-700 mr-5" href="https://www.twitter.com">
                        <i class="pi pi-twitter"></i>
                    </a>
                    <a class="cursor-pointer text-700 mr-5" href="https://www.facebook.com">
                        <i class="pi pi-facebook"></i>
                    </a>
                    <a class="cursor-pointer text-700" href="https://www.instagram.com">
                        <i class="pi pi-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>    
</template>

<script>
export default {
    methods: {
        logo() {
            return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
        },
    },
}
</script>

<style scoped>

</style>
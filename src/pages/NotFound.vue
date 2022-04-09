<template>
    <div class="surface-section section flex align-items-center justify-content-center overflow-hidden" style="height: calc(100vh - 9rem); min-height:40rem">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%;">
            <div class="col-11 xl:col-9 pt-7" style="border-radius:3rem; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                <div class="grid flex flex-column align-items-center">
                    <img :src="logo()" alt="Xiangqi logo" style="width:10rem;">
                    <h1>Xiangqi Online</h1>
                    <div class="grid m-auto">
                        <h1 class="col justify-content-center text-center font-bold text-5xl text-pink-500 m-0">
                            <i class="pi pi-fw pi-exclamation-circle text-4xl text-pink-500"></i>
                            Error 404: Not found
                        </h1>
                    </div>
                    <span class="text-600">La página pedida no se encuentra disponible.</span>
                    <div class="col-12 mt-5 text-center" v-if="this.$loggedStatus.logged">
                        <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align:center;"></i>
                        <router-link to="/profile" class="text-blue-500">Ir a mi perfil</router-link>
                    </div>
                    <div class="col-12 mt-5 text-center" v-else>
                        <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align:center;"></i>
                        <router-link to="/" class="text-blue-500">Volver a la página de inicio</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
	inject: ['$accounts'],
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	},
    methods: {
        logo() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
    }
}
</script>
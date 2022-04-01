<template>
    <div class="content-wrapper" style="margin: -30px;">
        <!-- surface section es el color de background -->
        <div class="grid grid-nogutter surface-section sombra text-800">
            <div class="col-12 md:col-6 p-8 text-center md:text-left flex align-items-center">
                <section>
                    <span class="block text-7xl font-bold mb-1">Xiangqi online</span>
                    <div class="text-4xl text-primary font-bold mb-3">Juega gratis al Xiangqi</div>
                    <p class="mt-0 mb-4 text-700 line-height-3">Xiangqi Online es una gran comunidad de jugadores del Xiangqi totalmente gratuita en donde puedes hacer amigos, chatear y pasar el rato juagando al ajedrez Chino. 
                        Haz estrategias, aprende las reglas del juego juagando contra amigos o contra otras personas, chatea y reta a tus rivales y asciende en el ranking global.</p>
                    <loginButton />
                </section>
            </div>
            <div class="col-12 md:col-6 overflow-hidden">
                <img src="../assets/images/1.png" alt="Xiangqi" class="md:ml-auto block md:h-full poligon-clip altura-img">
            </div>
        </div>

        <!--FEATURES-->
        <div class="py-4 px-4 lg:px-8 mx-0 lg:mx-8" id="features">
            <div class="grid justify-content-center">
                <div class="col-12 text-center mt-8 mb-4">
                    <h2 class="text-900 font-normal mb-2">Características</h2>
                    <span class="text-600 text-2xl">Xiangqi online te ofrece todo esto ¡Y más!</span>
                </div>

                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-yellow-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-users text-2xl text-yellow-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Juega tus amigos</h5>
                            <span class="text-600">Si tus amigos están registrados podrás agregarlos y jugar partidas contra ellos.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-cyan-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-mobile text-2xl text-cyan-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Juego en móvil</h5>
                            <span class="text-600">Descargate nuestra app para Android y juega desde tu móvil.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-indigo-200" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-dollar text-2xl text-indigo-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Juega gratis</h5>
                            <span class="text-600">Xiangqi online es totalmente gratuito.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-bluegray-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-save text-2xl text-bluegray-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Guarda partidas</h5>
                            <span class="text-600">Juega una partida hasta el final o guarda la partida para retomarla después.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-orange-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-star text-2xl text-orange-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Asciende en el ranking</h5>
                            <span class="text-600">Sube en el ranking según tus partidas ganadas y asciende de categoría.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pb-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-pink-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-moon text-2xl text-pink-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Dark Mode</h5>
                            <span class="text-600">Juega con el tema que quieras claro u oscuro ¡Tu elíges!.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-teal-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-shopping-cart text-2xl text-teal-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Usa los puntos</h5>
                            <span class="text-600">Xiangqi online ofrece un sistema de puntos acumulables con los que podrás desbloquear temas.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg:pr-5 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-blue-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-globe text-2xl text-blue-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Juega contra todo el mundo</h5>
                            <span class="text-600">Juega una partida contra cualquier persona al azar del mundo.</span>
                        </div>
                    </div>
                </div>
        
                <div class="col-12 md:col-12 lg:col-4 p-0 lg-4 mt-4 lg:mt-0">
                    <div style="height:160px; border-radius:10px;" class="sombra">
                        <div class="p-3 surface-card h-full" style="border-radius:8px;">
                            <div class="flex align-items-center justify-content-center bg-purple-200 mb-3" style="width:3.5rem;height:3.5rem; border-radius:10px;">
                                <i class="pi pi-fw pi-history text-2xl text-purple-700"></i>
                            </div>
                            <h5 class="mb-2 text-900">Consulta tus movimientos</h5>
                            <span class="text-600">Obtén información de los movimientos de cada partida y repasa tus jugadas.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-4 px-4 lg:px-8 mx-0 my-6 lg:mx-8" id="highlight">
            <div class="text-center">
                <h2 class="text-900 font-normal mb-2">Juega donde quieras</h2>
                <span class="text-600 text-2xl">Juega en móvil o escritorio</span>
            </div>
            <!--MOBILE APP-->
            <div class="grid my-8 md:pt-5">
                <div class="flex justify-content-center col-12 lg:col-6 bg-blue-100 p-0 flex-order-1 lg:flex-order-0" style="border-radius:8px;">
                    <img src="../assets/images/2.png" class="w-4" alt="mockup mobile">
                </div>
                <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-start align-items-center lg:pl-5">
                    <div class="flex align-items-center justify-content-center bg-blue-200" style="width:4.2rem; height:4.2rem; border-radius: 10px;">
                        <i class="pi pi-fw pi-mobile text-5xl text-blue-700"></i>
                    </div>
                    <h2 class="line-height-1 text-900 text-4xl font-normal">Continua en móvil</h2>
                    <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width:650px;">
                        Continua tus partidas de escritorio en móvil o accede a tu perfil y a tus partidas con nuestra app Android disponible en la PlayStore.
                    </span>
                </div>
            </div>

            <!--DESKTOP APP-->
            <div class="grid my-8 md:pt-5">
                <div class="col-12 lg:col-6 my-auto flex flex-column lg:align-items-start align-items-center">
                    <div class="flex align-items-center justify-content-center bg-yellow-200" style="width:4.2rem; height:4.2rem; border-radius:10px;">
                        <i class="pi pi-fw pi-desktop text-5xl text-yellow-700"></i>
                    </div>
                    <h2 class="line-height-1 text-900 text-4xl font-normal">Juega en escritorio</h2>
                    <span class="text-700 text-2xl line-height-3 mr-0 md:mr-2" style="max-width:650px;">Continua tus partidas también en la webapp en tu ordenador móvil o tablet.</span>
                </div>

                <div class="flex justify-content-end flex-order-1 sm:flex-order-2 col-12 lg:col-6 bg-yellow-100 p-0" style="border-radius:8px;">
                    <img src="../assets/images/3.png" class="w-11 pt-4" alt="mockup">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loginButton from '../components/Login.vue';
export default {
    created() {
        this.$loggedStatus.logged = false;
    },
    components: {
        loginButton,
    },
}
</script>

<style scoped>

/* Este estilo se activa cuando el tamaño de la ventana es > 768px */
@media (min-width: 768px) {
    .poligon-clip {
        clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%);
    }
}

/* Este estilo se activa cuando el tamaño de la ventana es < 768px */
@media (max-width: 768px) {
    .altura-img {
        width: 100%;
    }
}

.sombra {
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05), 0px 1px 4px rgba(0, 0, 0, 0.08);
}


</style>
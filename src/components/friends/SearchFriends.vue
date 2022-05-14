<template>
    <div class="grid grid-nogutter surface-section section">
        <div class="col-12 md:col-7 text-center md:text-left flex align-items-center">
            <section class="p-4">
                <span class="block text-7xl font-bold mb-1">Buscar amigos</span>
                <div class="text-4xl text-primary font-bold mb-3">Si conoces el nombre de usuario de alguien puedes buscarlo aquí y enviarle una solicitud</div>
                <div class="w-full">
                    <div class="relative w-20rem m-auto md:ml-0">
                        <InputText placeholder="Nombre de usuario" class="w-16rem h-3rem pl-4 pr-6" style="border-style: none; border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; border-top-right-radius: 0; border-bottom-right-radius: 0; box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);" v-model="searchFriendField"/>
                        <!--On click enviar evento-->
                        <Button v-if="this.showResults && this.show" v-on:click="clear()" class="border-circle p-button surface-400 border-400 border-3 mr-2 z-5 absolute" style="right: 4.5rem; width: 1.4rem; height: 1.25rem; margin-top: 0.8rem" icon="pi pi-times" iconPos="left" />
                        <Button v-on:click="search()" :disabled="this.searchFriendField == null" class="p-button-raised font-semibold w-4rem text-left h-3rem" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem" icon="pi pi-search" iconPos="left" />
                    </div>
                </div>
            </section>
        </div>
        <div class="col-12 md:col-5 overflow-hidden image-border">
            <img src="images/pictures/4.jpg" alt="Xiangqi" class="md:ml-auto block md:h-full poligon-clip altura-img">
        </div>
    </div>
</template>

<script>
export default {
    //Eventos que enviamos a Friends
    emits: ['clear-friends-pressed', 'search-friends-pressed', 'search-friend-field'],
    props: {
        show: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            searchFriendField: null,
            showResults: false,
            amigoSeleccionado: null,
            amigos: null,
        }
    },
    created() {
        this.amigos = [
            {id:'1', nickname: 'juanksp', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain'},
            {id:'2', nickname: 'pikanachi', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain'},
            {id:'3', nickname: 'alexzheng', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain'}];
    },
    methods: {
        //Metodo on click que envia las variables de los eventos
        search() {
            this.$emit('search-friend-field', this.searchFriendField);
            //this.searchFriendField = null;
            this.showResults = true;
            this.$emit('search-friends-pressed', this.showResults);
        },
        clear() {
            this.searchFriendField = null;
            this.$emit('clear-friends-pressed');
        }
    }
}
</script>

<style scoped>

.image-border {
    border-bottom-right-radius: 1rem !important;
}

/* Este estilo se activa cuando el tamaño de la ventana es > 768px */
@media (min-width: 768px) {
    .image-border {
        border-top-right-radius: 1rem !important; 
    }
}

/* Este estilo se activa cuando el tamaño de la ventana es < 768px */
@media (max-width: 768px) {
    .image-border {
        border-bottom-left-radius: 1rem !important;
    }
}

</style>
<template>
    <h2>Buscar usuarios</h2>
    <div class="grid grid-nogutter surface-section section">
        <!-- surface section es el color de background -->
        <div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center">
            <section>
                <span class="block text-7xl font-bold mb-1">Buscar amigos</span>
                <div class="text-4xl text-primary font-bold mb-3">Si conoces el nombre de usuario de alguien puedes buscarlo aquí y enviarle una solicitud</div>
                <InputText id="emailLog" placeholder="nickname" class="h-3rem pl-4" style=" border-style: none; border-top-left-radius: 1rem; border-bottom-left-radius: 1rem; border-top-right-radius: 0; border-bottom-right-radius: 0; box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);" v-model="searchField"/>
                <Button v-on:click="search()" :disabled="this.searchField == null" class="p-button-raised font-semibold w-4rem text-left h-3rem" style="border-top-left-radius: 0; border-bottom-left-radius: 0; border-top-right-radius: 1rem; border-bottom-right-radius: 1rem" icon="pi pi-search" iconPos="left" />
            </section>
        </div>
        <div class="col-12 md:col-6 overflow-hidden" style="border-top-right-radius: 1rem !important; border-bottom-right-radius: 1rem !important;">
            <img src="../../assets/images/1.png" alt="Xiangqi" class="md:ml-auto block md:h-full poligon-clip altura-img">
        </div>
    </div>
</template>

<script>
export default {
    emits: ['search-friends-pressed'],
    data() {
        return {
            searchField: null,
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
        search() {
            this.searchField = null;
            this.showResults = true;
            this.$emit('search-friends-pressed', this.showResults);
        }
    }
}
</script>

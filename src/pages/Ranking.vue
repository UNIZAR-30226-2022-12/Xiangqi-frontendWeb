<template>
	<!--<button @click="show = !show">Testea la animacion</button>
	<Transition name="bounce">
		<h1 v-if="show">OH MAI GOD!!</h1>
	</Transition>-->

    <h2>Ranking de jugadores</h2>
    <loader v-if="this.loading"/>
	<div v-else>
        <div class="surface-section section p-6">
            <DataTable :value="ranking" :paginator="true" :rows="20"
            :rowHover="true" v-model:selection="selectedRival" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[20,30,50]"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} entradas"
            :globalFilterFields="['nickname']" responsiveLayout="scroll">                
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="md:m-0 text-center md:text-left"> Ranking </h5>
                        <div class="flex flex-column flex-wrap card-container">
                            <div class="flex align-items-center justify-content-center">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" style="border-radius: 1rem" placeholder="Nombre de usuario" />
                                </span>
                            </div>
                        </div>
                    </div>
                </template>

                <template #empty>
                    El ranking está vacío
                </template>
                <template #loading>
                    Cargando el ranking. Por favor, espere.
                </template>
                <Column field="position" header="Posicion" sortable>
                    <template #body="{data}">
                        # {{data.position}}
                    </template>
                </Column>
                <Column field="nickname" header="Adversario" sortable style="min-width: 14rem">
                    <template #body="{data}">
                        <div class="card">
                            <div class="card-container blue-container overflow-hidden">
                                <div class="flex">
                                    <img src="images/profilePlaceholder.svg" class="foto-perfil-table" style="vertical-align: middle">
                                    <Button v-on:click="otherProfile(data.id)" :label="data.nickname" class="text-left p-button-link" />
                                </div>
                            </div>
                        </div>
                    </template>
                </Column>
                <Column field="flag" header="País" sortable style="min-width: 14rem">
                    <template #body="{data}">
                        <img class="flag h-auto" :class="[data.flag]" src="images/flags/flag_placeholder.png">
                        <span class="ml-2 image-text">{{data.country}}</span>
                    </template>
                </Column>
                <Column field="winnedGames" header="Partidas jugadas" sortable></Column>
                <Column field="playedGames" header="Partidas ganadas" sortable></Column>
            </DataTable>    
        </div>
    </div>
	
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';
import loader from '../components/Loader.vue';

export default {
	inject: ['$accounts', '$ranking'],
    components: {
		loader
	},
	data() {
		return {
			ranking: [],
			//show: true,
			loading: true,

			filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'nickname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            },
            selectedRival: null
		}
	},

	created() {
		//this.$loggedStatus.logged = this.$accounts.isAuthenticated();
		// CUANDO ESTE EL BACK HECHO:
		// CAMBIAR ESTO
		// ---------------------------------------------------------------------
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
        this.ranking= [
                {id:'1,', position: '1', nickname: 'Pikanachi', flag: 'flag-es', country: 'Spain', winnedGames:'40', playedGames:'60'},
                {id:'11,', position: '2', nickname: 'John', flag: 'flag-fr', country: 'France', winnedGames:'40', playedGames:'60'},
                {id:'12,', position: '3', nickname: 'Juanksp', flag: 'flag-es', country: 'Spain', winnedGames:'40', playedGames:'60'},
                {id:'10,', position: '4', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'7,', position: '5', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'9,', position: '6', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'5,', position: '7', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'19,', position: '8', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'12,', position: '9', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'13,', position: '10', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
				{id:'0,', position: '11', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'17,', position: '12', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
                {id:'18,', position: '13', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', winnedGames:'40', playedGames:'60'},
        ];

		this.loading = false;

		//POR ESTO
        // ---------------------------------------------------------------------
        /*
		this.$ranking.getRanking().then(response => {
			this.ranking = response;
            this.loading = false;
		});
        */
	},
	methods: {
        formatDate(value) {
            return value.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        },
	}        
}
</script>

<style scoped>

/* animacion */
/*
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}*/

</style>
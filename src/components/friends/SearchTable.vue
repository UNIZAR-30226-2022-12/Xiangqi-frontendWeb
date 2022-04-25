<template>
    <h2>Encontrados</h2>
    <Transition name="slide-fade">
        <div v-if="this.showResults" class="surface-section section p-6">
            <DataTable :value="columns" :paginator="true" :rows="10"
            :rowHover="true" v-model:selection="selectedRival" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[20,30,50]"
            currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} entradas"
            :globalFilterFields="['nickname']" responsiveLayout="scroll">
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                        <h5 class="m-0">Solicitudes</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" style="border-radius: 1rem" placeholder="Buscar por nickname" />
                        </span>
                    </div>
                </template>
                <template #empty>
                    No se han encontrado solicitudes de amistad
                </template>
                <template #loading>
                    Cargando solicitudes. Por favor, espere.
                </template>
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
                <Column field="birthday" header="Cumpleaños" sortable></Column>
                <Column field="requestDate" header="Fecha de solicitud" sortable></Column>
                <Column header="Aceptar">
                    <template #body>
                        <Button icon="pi pi-check" class="p-button-rounded p-button-success p-button-outlined" />
                    </template>
                </Column>
                <Column header="Rechazar">
                    <template #body>
                        <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined" />
                    </template>
                </Column>
            </DataTable>    
        </div>
    </Transition>
</template>

<script>

import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
	inject: ['$accounts'],
	data() {
		return {
            showResults: false,
			columns: null,
            loading: true,
			filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'nickname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            },
            selectedRival: null
		}
	},
	created() {
        
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

		//this.customerService = new CustomerService();
        this.columns= [
                {id: '1', nickname: 'Pikanachi', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'John', name:"Nacho Ortega", flag: 'flag-fr', country: 'France', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'Juanksp', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
				{id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
        ];
	},
    mounted() {
        this.loading = false;
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
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
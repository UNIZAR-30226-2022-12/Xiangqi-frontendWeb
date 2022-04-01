
<template>
    <h2>Mis partidas</h2>
	<div class="surface-section section p-6">
        <DataTable :value="games" :paginator="true" :rows="10"
        :rowHover="true" v-model:selection="selectedRival" v-model:filters="filters" filterDisplay="menu" :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        :globalFilterFields="['nickname']" responsiveLayout="scroll">
            <template #header>
                <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 class="m-0">Partidas</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" style="border-radius: 1rem" placeholder="Buscar por nickname" />
                    </span>
                </div>
            </template>
            <template #empty>
                No se han encontrado partidas
            </template>
            <template #loading>
                Cargando partidas. Por favor, espere.
            </template>
            <Column field="nickname" header="Adversario" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <div class="card">
                        <div class="card-container blue-container overflow-hidden">
                            <div class="flex">
                                <img :src="data.image" class="foto-perfil" style="vertical-align: middle">
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
            <Column field="startDate" header="Inicio de juego" sortable></Column>
            <Column field="lastMovDate" header="Último movimiento" sortable></Column>
            <Column field="myTurn" header="Toca mover" sortable>
                <template #body="{data}">
                    <i v-if="data.myTurn" class="pi pi-check-circle text-green-600"></i>
                    <i v-else class="pi pi-times-circle text-pink-600"></i>
                </template>
            </Column>
            <Column header="Continuar">
                <template #body>
                    <Button class="p-button-raised" style="border-radius: 1rem" label="Continuar"></Button>
                </template>
            </Column>
        </DataTable>    
    </div>
</template>

<script>
import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
    inject: ['$accounts'],
    // Para obtener el parametro columns
    props: {
        games: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            //columns: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'nickname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            },
            loading: true,
            selectedRival: null
        }
    },
    
    created() {
        /*this.customerService = new CustomerService();
        this.columns= [
                {image: 'images/profilePlaceholder.svg', nickname: 'Pikanachi', flag: 'flag-es', country: 'Spain', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: false},
                {image: 'images/profilePlaceholder.svg', nickname: 'John', flag: 'flag-fr', country: 'France', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'Juanksp', flag: 'flag-es', country: 'Spain', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: false},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/02/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2022', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'10/20/2022', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
                {image: 'images/profilePlaceholder.svg', nickname: 'AlexZheng', flag: 'flag-cn', country: 'China', startDate:'01/01/2020', lastMovDate:'01/01/2021', myTurn: true},
        ];*/
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
        otherProfile(id){
            this.$router.push({name: 'otherProfile', params: { id: id}});
        }
    }
}
</script>

<style lang="scss" scoped>

.foto-perfil {
    display: block; 
	vertical-align: middle;
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	border-style: solid;
	border-width: 1.5px;
	border-color: var(--surface-400);
	object-fit: cover;
}

::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>
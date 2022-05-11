<template>
    <Transition name="slide-fade">
        <div v-if="show">
            <h2 class="mt-4">Usuarios encontrados por {{searchedItem}}</h2>
            <div class="surface-section section p-6">
                <DataTable :value="notFriendOf" :paginator="true" :rows="10"
                :rowHover="true" v-model:selection="selectedUser" v-model:filters="filters" filterDisplay="menu" :loading="loading"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[20,30,50]"
                currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} entradas"
                :globalFilterFields="['nickname']" responsiveLayout="scroll">
                    <template #header>
                        <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 class="m-0">Solicitudes</h5>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" style="border-radius: 1rem" placeholder="Nombre de usuario" />
                            </span>
                        </div>
                    </template>
                    <template #empty>
                        No se han encontrado usuarios por {{searchedItem}}
                    </template>
                    <template #loading>
                        Cargando usuarios. Por favor, espere.
                    </template>
                    <Column field="nickname" header="Nombre de usuario" sortable style="min-width: 14rem">
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
                    <Column field="name" header="Nombre" sortable></Column>
                    <Column field="flag" header="País" sortable>
                        <template #body="{data}">
                            <img class="flag h-auto" :class="[data.flag]" src="images/flags/flag_placeholder.png">
                            <span class="ml-2 image-text">{{data.country}}</span>
                        </template>
                    </Column>
                    <Column field="birthday" header="Cumpleaños" sortable></Column>
                    <Column header="Enviar solicitud">
                        <template #body>
                            <Button class="p-button-raised" style="border-radius: 1rem" icon="pi pi-user-plus" label="Enviar solicitud"></Button>
                        </template>
                    </Column>
                </DataTable>    
            </div>
        </div>
    </Transition>
</template>

<script>

import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
	inject: ['$accounts'],
    props: {
        show: {
            type: Boolean,
            required: true
        },
        searchedItem: {
            type: String,
            required: true
        },
        notFriendOf: {
            type: Array,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
	data() {
		return {
			filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'nickname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            },
            selectedUser: null,
		}
	},
    methods: {
        otherProfile(id){
            this.$router.push({name: 'OtherProfile', params: { id: id}});
        },
    }  
}
</script>

<style scoped>

/* animacion */
.slide-fade-enter-active {
  transition: all 1s ease-out;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 1, 1, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

</style>
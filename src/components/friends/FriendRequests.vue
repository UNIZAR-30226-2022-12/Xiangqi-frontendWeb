<template>
    <h2>Solicitudes de amistad</h2>
	<div class="surface-section section md:p-6 lg:p-6 mobileBorder">
        <DataTable :value="friendRequests" :paginator="true" :rows="10"
        :rowHover="true" v-model:selection="selectedUser" v-model:filters="filters" filterDisplay="menu" :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[20,30,50]"
        currentPageReportTemplate="Mostrando del {first} al {last} de {totalRecords} entradas"
        :globalFilterFields="['nickname']" responsiveLayout="scroll">
            <template #header>
                <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 class="md:m-0 text-center md:text-left"> Solicitudes </h5>
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
                No se han encontrado solicitudes de amistad
            </template>
            <template #loading>
                Cargando solicitudes. Por favor, espere.
            </template>
            <Column field="nickname" header="Nombre de usuario" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <div class="card">
                        <div class="card-container blue-container overflow-hidden">
                            <div class="flex">
                                <img :src="getImage(data.id)" class="foto-perfil-table" style="vertical-align: middle">
                                <Button v-on:click="otherProfile(data.id)" :label="data.nickname" class="text-left p-button-link" />
                            </div>
                        </div>
                    </div>
                </template>
            </Column>
            <Column field="name" header="Nombre" sortable></Column>
            <Column field="flag" header="País" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <img class="flag h-auto shadow-2" :class="[data.flag]" src="images/flags/flag_placeholder.png">
                    <span class="ml-2 mobileNoDisplay image-text">{{data.country}}</span>
                </template>
            </Column>
            <Column field="birthday" header="Cumpleaños" sortable></Column>
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
</template>

<script>

import {FilterMatchMode, FilterOperator} from 'primevue/api';

export default {
	inject: ['$accounts'],    
    props: {
        friendRequests: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        },
        friendRequestsArrayImages: {
            type: Object,
            required: true
        }
    },
	data() {
		return {
			filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'nickname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            },
            selectedUser: null
		}
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
        getImage(id){
            for (let i = 0; i < this.friendRequestsArrayImages.length; i++) {
                if(this.friendRequestsArrayImages[i].id == id){
                    return this.friendRequestsArrayImages[i].image;
                }
            }
        }
	}        
}
</script>
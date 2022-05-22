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
                <template #body="{data}">
                    <Button icon="pi pi-check" v-on:click="onConfirm(data.id, data.nickname)" class="p-button-rounded p-button-success p-button-outlined" />
                </template>
            </Column>
			<Column header="Rechazar">
                <template #body="{data}">
                    <Button icon="pi pi-times" v-on:click="onReject(data.id, data.nickname)" class="p-button-rounded p-button-danger p-button-outlined" />
                </template>
            </Column>
        </DataTable>    
    </div>
</template>

<script>

import {FilterMatchMode, FilterOperator} from 'primevue/api';

export default {
	inject: ['$accounts'],  
    emits: ['remove-invitation-pressed', 'add-invitation-pressed'],  
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
            selectedUser: null,
		}
	},

	methods: {
        getImage(id) {
            return this.friendRequestsArrayImages[id];
        },
        onConfirm(id, nickname) {
            this.$emit('add-invitation-pressed', id);
            this.$toast.add({severity:'success', summary:'Invitacion Aceptada', detail:'La solicitud de ' + nickname + ' ha sido aceptada.', life: 3000});
        },
        onReject(id, nickname) {
            this.$confirm.require({
                message: 'Si rechaza la solicitud esta se borrará.',
                header: '¿Seguro que desea rechazar la invitación?',
                icon: 'pi pi-exclamation-triangle',
                rejectLabel: 'Rechazar',
                acceptLabel: 'No rechazar',
                accept: () => {
                },
                reject: () => {
                    this.$emit('remove-invitation-pressed', id);
                    this.$toast.add({severity:'error', summary:'Invitacion rechazara', detail:'La solicitud de ' + nickname + ' ha sido rechazada.', life: 3000});
                }
            });
        },
        otherProfile(id){
            this.$router.push({name: 'OtherProfile', params: { id: id}});
        },
	}  
}
</script>
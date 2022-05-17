<template>
    <Transition name="slide-fade">
        <div v-if="show">
            <h2 class="mt-4">Usuarios encontrados por {{searchedItem}}</h2>
            <div class="surface-section section md:p-6 lg:p-6 mobileBorder">
                <DataTable :value="notFriendOf" :paginator="true" :rows="10"
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
                        No se han encontrado usuarios por {{searchedItem}}
                    </template>
                    <template #loading>
                        Cargando usuarios. Por favor, espere.
                    </template>
                    <Column field="nickname" header="Nombre de usuario" sortable>
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
                    <Column field="flag" header="País" sortable>
                        <template #body="{data}">
                            <img class="flag h-auto" :class="[data.flag]" src="images/flags/flag_placeholder.png">
                            <span class="ml-2 mobileNoDisplay image-text">{{data.country}}</span>
                        </template>
                    </Column>
                    <Column field="birthday" header="Cumpleaños" sortable></Column>
                    <Column header="Enviar solicitud">
                        <template #body="{data}">
                            <Button :disabled="data.sended || sendClicked[data.id]" class="p-button-raised" style="border-radius: 1rem" v-on:click="sendFriendRequest(data.id, data.nickname)" icon="pi pi-user-plus" :label="putLabel(data.id, data.sended)"></Button>
                            <!--<Button v-else disabled="true" class="p-button-raised" style="border-radius: 1rem" icon="pi pi-user-plus" label="Solicitud enviada"></Button>-->
                        </template>
                    </Column>
                </DataTable>    
            </div>
        </div>
    </Transition>
</template>

<script>

import {FilterMatchMode,FilterOperator} from 'primevue/api';
import io from "socket.io-client";

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
            type: Object,
            required: true
        },
        notFriendOfImages: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
	data() {
		return {
            sendClicked: [],
			filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'nickname': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
            },
            selectedUser: null,
            socket: null,
		}
	},
    created() {
        for (let i = 0; i < this.notFriendOf.length; i++) {
            this.sendClicked[i] = false;
        } 
    },
    methods: {
        otherProfile(id){
            this.$router.push({name: 'OtherProfile', params: { id: id}});
        },
        sendFriendRequest(id, nickname){
            this.$toast.add({severity:'success', summary:'Solicitud enviada', detail:'Ha una solicitud de amistad ha sido enviada a ' + nickname, life: 5000});
            for (let i = 0; i < this.notFriendOf.length; i++) {
                if(this.notFriendOf[i].id == id){
                    this.sendClicked[id] = true; 
                }
            }
            if(this.socket == null){
                this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
            }
            this.socket.emit('sendFriendRequest',{'id': sessionStorage.getItem('id'), 'idFriend': id});
        },
        getImage(id){
            for (let i = 0; i < this.notFriendOfImages.length; i++) {
                if(this.notFriendOfImages[i].id == id){
                    return this.notFriendOfImages[i].image;
                }
            }
        },
        putLabel(id, sended) {
            if (sended || this.sendClicked[id]) {
                return 'Solicitud enviada';
            } else {
                return 'Enviar solicitud';
            }
        }
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
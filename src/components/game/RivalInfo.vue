<template>
    <div class="field col-12 mb-0">
        <h3 class="m-0 p-0">Partida contra {{rival.name}}</h3>
        <div class="flex card-container overflow-hidden mt-4">
            <div class="flex-none align-items-left justify-content-left mr-3">
                <img id=profliePic :src="profileImage" class="foto-perfil shadow-2 surface-50 ml-1 mt-1 mb-2" style="" alt="foto de perfil">
            </div>
            <div class="flex-grow-1 align-items-left justify-content-left">
                <p>
                    <img class="flag h-auto mr-1" :class="[rival.country.flag]" src="images/flags/flag_placeholder.png">
                        #{{ rival.nickname }}
                </p>
                <p>Puesto en ranking: {{ rival.range }} </p>
                <p>Cumpleaños: {{ rival.birthday }} </p>
            </div>
        </div>
        <Button v-if="!isFriend" class="col-12 w-full mt-2 w-full p-button-raised font-semibold h-3rem  font-semibold" style="border-radius: 1rem" label="Añadir a mis amigos" icon="pi pi-user-plus"/>
    </div>
</template>

<script>
export default {
    props: {
        isFriend: {
            type: Boolean,
            required: true
        },
        perfil: {
            type: Object,
            required: false
        },
        profileImage: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            rival: {
                mail:'',
                nickname: 'juanksp', 
                name: 'Juan Plo Andrés', 
                birthday: '05/10/2001', 
                country: {
                    flag: 'flag-es',
                },
                range: '2',
                points: '',
                registerDate: '20/02/2022',
            },
        }    
    },
    created(){
        this.rival = this.perfil
    }
}
</script>

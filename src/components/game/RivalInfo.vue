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
    </div>
</template>

<script>
export default {
    props: {
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
                mail: null,
                nickname: null, 
                name: null, 
                birthday: null, 
                country: {
                    flag: null,
                },
                range: null,
                points: null,
                registerDate: null,
            },
        }    
    },
    created(){
        this.rival = this.perfil
    }
}
</script>

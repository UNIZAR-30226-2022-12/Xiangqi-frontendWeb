<!--BOTÓN Y DIALOGO PARA ACEPTAR LA SOLICITUD DE PARTIDA-->
<template>
  <Dialog v-model:visible="display" class="dialogo-partida" :draggable="false" :modal="true" :closable="false">
    <template #header>
      <h3 class="mr-2">Solicitud de partida</h3> 
    </template>
    <div class="card p-2">
          <div class="text-center mb-5 mt-5">
            <h5> {{nickname}} te ha retado a una partida </h5>
          </div>

    </div>
    <template #footer>
    <div class="grid">
        <div class="col-6">
            <Button v-on:click="acceptInvitation()" :disabled="confirmDisabled" class="p-button-success p-button-raised font-semibold h-3rem w-full" :label="confirm" icon="pi pi-check" style="border-radius: 1rem">

            </Button>
        </div>
        <div class="col-6">
            <Button v-on:click="onConfirm()" :disabled="rejectDisabled" class="p-button-danger p-button-raised font-semibold h-3rem w-full" icon="pi pi-times" :label="reject" style="border-radius: 1rem">
            </Button>
        </div>
    </div>
    </template>
  </Dialog>
</template>

<script>
import io from "socket.io-client"

export default {
    props: {
        nickname: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        idSala: {
            type: Number,
            required: true
        },
    },
    data() {
        return {
            confirm: 'Aceptar',
            reject: 'Rechazar',
            confirmDisabled: false,
            rejectDisabled: false,
            //socket: null,
            display: true,
            searchingOponent: false,
            }
    },
    created(){
        console.log("GAMEREQUEST")
    },
    unmounted(){
        console.log("DESTRUCCION")
        this.confirmDisabled = false
        this.rejectDisabled = false
        //socket: null
        this.display = true
        this.searchingOponent = false
    },
    methods: {
        delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },
        onConfirm() {
            this.$confirm.require({
                message: 'Si rechaza la invitación deberá esta se borrará.',
                header: '¿Seguro que desea rechazar la invitación?',
                icon: 'pi pi-exclamation-triangle',
                rejectLabel: 'Rechazar',
                acceptLabel: 'No rechazar',
                accept: () => {
                },
                reject: () => {
                    let socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
                    socket.emit("rejectReq", {"id":this.id})
                    this.display = false;
                    
                    this.$toast.add({severity:'error', summary:'Invitacion rechazara', detail:'La invitación de ' + this.nickname + ' ha sido rechazada.', life: 3000});
                    socket = null
                    this.delay(1500).then(()=>{this.$router.go()})
                }
            });
        },
        acceptInvitation() {
            let socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
            socket.emit("acceptReq", {"id": sessionStorage.getItem("id"),"idFriend":this.id, "idSala": this.idSala})
            socket.on("startGame", (data)=>{
            console.log(data)
            this.display = false;

            var color;
            if(data.rojo) {
                color = "rojo"
            } else {
                color = "negro"
            }

            socket.off("startGame")
            socket.emit("leaveRoom", {'id': data.idSala})
            this.$router.push(`/game/${data.idOponent}/${data.idSala}/${color}`) //${this.timer}
            })
            console.log("ACEPTADO")
            /*
            //Ponemos el spinner
            this.searchingOponent = true;

            //Pasarle al back las opciones de la partida
            if(this.socket == null) {
            this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
            }
            this.socket.emit("searchRandomOpponent",{'id':sessionStorage.getItem('id')})
            this.socket.on("startGame", (data)=>{
            console.log(data)
            this.display = false;

            var color;
            if(data.rojo) {
                color = "rojo"
            } else {
                color = "negro"
            }

            this.socket.off("startGame")
            this.socket.emit("leaveRoom", {'id': data.idSala})
            this.$router.push(`/game/${data.idOponent}/${data.idSala}/${color}`) //${this.timer}
            })*/
        }
    }
}
</script>
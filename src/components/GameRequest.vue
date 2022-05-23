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

export default {
    emits: ['close-game-request'],
    inject: ['$game'],
    props: {
        nickname: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        idSala: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            confirm: 'Aceptar',
            reject: 'Rechazar',
            confirmDisabled: false,
            rejectDisabled: false,
            display: true,
            searchingOponent: false,
            }
    },
    unmounted(){
        //console.log("DESTRUCCION")
        this.confirmDisabled = false
        this.rejectDisabled = false
        this.display = true
        this.searchingOponent = false
    },
    methods: {
        delay(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        },
        onConfirm() {
            this.$confirm.require({
                message: 'Si rechaza la invitación esta se borrará.',
                header: '¿Seguro que desea rechazar la invitación?',
                icon: 'pi pi-exclamation-triangle',
                rejectLabel: 'Rechazar',
                acceptLabel: 'No rechazar',
                accept: () => {
                },
                reject: () => {
                    this.$game.socket.emit("rejectReq", {"id":this.id})
                    this.$emit('close-game-request');
                    this.$toast.add({severity:'error', summary:'Invitacion rechazara', detail:'La invitación de ' + this.nickname + ' ha sido rechazada.', life: 3000});
                    //this.delay(1500).then(()=>{this.$router.go()})
                }
            });
        },
        acceptInvitation() {
            this.confirmDisabled = true;
            this.$emit('close-game-request');
            this.$game.socket.emit("acceptReq", {"id": sessionStorage.getItem("id"),"idFriend":this.id, "idSala": this.idSala})
            this.$game.socket.on("startGame", (data)=>{
            //console.log(data)

            var color;
            if(data.rojo) {
                color = "rojo"
            } else {
                color = "negro"
            }
            this.$game.socket.off("startGame")
            this.$game.socket.emit("leaveRoom", {'id': data.idSala})
            this.$emit('close-game-request');
            this.$router.push(`/game/${data.idOponent}/${data.idSala}/${color}`) //${this.timer}
            })
            //console.log("ACEPTADO")
        }
    }
}
</script>
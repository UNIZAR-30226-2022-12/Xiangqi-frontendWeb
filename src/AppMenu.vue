<template>
	<div class="layout-menu-container">
		<AppSubmenu :onlineFriends="onlineFriends" :primera="true" :items="menu" @friends-notify-pressed="clearFriendReq" :root="true" :numFriendReq="this.numFriendReq" class="layout-menu" @menuitem-click="onMenuItemClick" @keydown="onKeyDown" />
        <GameReq v-if="showInvitaion" :nickname="nickname" :id="id" :idSala="idSala" @close-game-request="closeGameRequest"/>
        <RejectedInvitation/>
    </div>
</template>

<script>
import GameReq from './components/GameRequest.vue';
import RejectedInvitation from './components/RejectedInvitation.vue';
import AppSubmenu from './AppSubmenu';
import io from "socket.io-client";
export default {
    emits: ['menu-toggle', 'menuitem-click'],
    inject: ['$accounts'],
    components: {
		'AppSubmenu': AppSubmenu,
        GameReq,
        RejectedInvitation,
	},
	data() {
		return {
            showInvitaion: false,
            nickname: '',
            showRejectedInvitation: false,
            socket: null,
            numFriendReq: 0,
            onlineFriends: [],
            id: null,
            idSala: 1,

            menu: [
                {
                    label: 'Menú',
                    items: [
                        {label: 'Perfil', icon: 'pi pi-fw pi-home', to: '/Profile'},
                        {label: 'Amigos', icon: 'pi pi-fw pi-users', to: '/Friends/noNotify'},
                        {label: 'Ranking', icon: 'pi pi-fw pi-list', to: '/Ranking'},
                        {label: 'Tienda', icon: 'pi pi-fw pi-shopping-cart', to: '/Store'},
                        {label: 'Historial', icon: 'pi pi-fw pi-history', to: '/Historial'},
                    ]
                },
            ]
		}
	},
    created() {
        if(this.socket == null){
            this.socket = io("http://ec2-3-82-235-243.compute-1.amazonaws.com:3005");
        }
        this.socket.emit('enter',{'id': sessionStorage.getItem('id')})
        this.socket.on("friendRequest",(data)=>{
            console.log("FriendRequest de", data);
            //this.notifications.push({type: 'friendRequest', id: data.id});
            this.numFriendReq++;
            console.log("numFriendReq", this.numFriendReq);
        })
        this.socket.on("onlineFriends",(data)=>{
            console.log("Amigos conectados", data);
            data.forEach(friend => {
                this.onlineFriends.push({"id": friend['id'], "name": friend['nickname']});
            });
        })
        this.socket.on("gameRequest",(data)=>{
            console.log("GAMEREQ de", data);
            this.id = data["id"]
            this.idSala = data["idSala"]
            this.$accounts.getNickname(data["id"]).then(data => { //this.createAc.image
                console.log(data);
                this.nickname = data;
                this.showInvitaion = true;
                console.log(this.showInvitaion, this.idSala)
            });
        })
        this.socket.on("rejectReq",()=>{
            console.log("Me la rechaza");
            this.emitter.emit("open-rejected-invitation", true);

        })
        console.log("aaaaaaaaaaaaaaaaaaaaa")
		this.socket.emit('getOnlineFriends',{'id': sessionStorage.getItem('id')})
    },
    methods: {
        clearFriendReq() {
			//Ya hemos atendido la notificacion
            this.numFriendReq = 0;
            // Ir a la pagina de amigos y que muestre solo las solicitudes
			this.$router.push(`/Friends/notification`)
		},
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
        onMenuItemClick(event) {
            this.$emit('menuitem-click', event);
        },
		onKeyDown(event) {
			const nodeElement = event.target;
			if (event.code === 'Enter' || event.code === 'Space') {
				nodeElement.click();
				event.preventDefault();
			}
		},
        closeGameRequest(){
            console.log("CIERRO---------------");
            this.showInvitaion = false;
        },
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	}
}
</script>

<style>

.button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: var(--surface);
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.button:hover {
    background-color: var(--surface-hover);
}

.imagen {
    height: 35px;
    margin-right: 7px;
}

</style>
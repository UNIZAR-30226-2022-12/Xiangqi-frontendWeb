<template>
	<div class="layout-menu-container">
		<AppSubmenu :items="menu" @friends-notify-pressed="clearFriendReq" :notifications="notifications" class="layout-menu" :root="true" @menuitem-click="onMenuItemClick" @keydown="onKeyDown" />
	</div>
</template>

<script>
import AppSubmenu from './AppSubmenu';

export default {
	data() {
		return {

            notifications: [
                {type: 'friendRequest', nickname: 'juanksp'},
                {type: 'friendRequest', nickname: 'alexzheng'},
                {type: 'gameRequest', nickname: 'juanksp'},
                {type: 'gameRequest', nickname: 'alexzheng'},
            ],

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
    methods: {
        clearFriendReq() {
			//Ya hemos atendido la notificacion
			//Decirle al back que las borre






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
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		}
	},
	components: {
		'AppSubmenu': AppSubmenu
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
<template>
	<ul v-if="items">
		<!--Notificaciones-->
		<template v-if="this.numFriendReq > 0">
			<li class="layout-menuitem-category">
				<div class="layout-menuitem-root-text" aria-label="Notificaciones"> Notificaciones </div>
			</li>
			<div class="flex mb-3">
				<div class="flex-initial flex align-items-center justify-content-center mr-2">
					<Badge :value="this.numFriendReq"></Badge>
				</div>
				<div class="flex-initial flex align-items-center justify-content-center">
					<!-- Se emite el evento al componente padre AppMenu.vue -->
					<Button v-if="this.numFriendReq == 1" v-on:click="this.$emit('friends-notify-pressed')" label="Solicitud de amistad" class="p-button-link p-1" />
					<Button v-else v-on:click="this.$emit('friends-notify-pressed')" label="Solicitudes de amistad" class="p-button-link p-1" />
				</div>
			</div>
		</template>

		<template v-for="(item,i) of items">
			<li v-if="visible(item) && !item.separator" :key="item.label || i" :class="[{'layout-menuitem-category': root, 'active-menuitem': activeIndex === i && !item.to && !item.disabled}]" role="none">
				<template v-if="root">
					<div class="layout-menuitem-root-text" :aria-label="item.label">{{item.label}}</div>
					<!--NUEVA PARTIDA-->
					<newGameButton :onlineFriends="onlineFriends" />
					<appsubmenu :onlineFriends="onlineFriends" :primera="false" :items="visible(item) && item.items" @menuitem-click="$emit('menuitem-click', $event)"></appsubmenu>
				</template>
				<template v-else>
					<router-link v-if="item.to" :to="item.to" :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" :style="item.style" @click="onMenuItemClick($event,item,i)" :target="item.target" :aria-label="item.label" exact role="menuitem" v-ripple>
						<i :class="item.icon"></i>
						<span>{{item.label}}</span>
						<i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
						<Badge v-if="item.badge" :value="item.badge"></Badge>
					</router-link>
					<a v-if="!item.to" :href="item.url||'#'" :style="item.style" :class="[item.class, 'p-ripple', {'p-disabled': item.disabled}]" @click="onMenuItemClick($event,item,i)" :target="item.target" :aria-label="item.label" role="menuitem" v-ripple>
						<i :class="item.icon"></i>
						<span>{{item.label}}</span>
						<i v-if="item.items" class="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>
						<Badge v-if="item.badge" :value="item.badge"></Badge>
					</a>
					<transition name="layout-submenu-wrapper">
						<appsubmenu :primera="false" v-show="activeIndex === i" :items="visible(item) && item.items" @menuitem-click="$emit('menuitem-click', $event)"></appsubmenu>
					</transition>
				</template>
			</li>
			<li class="p-menu-separator" :style="item.style" v-if="visible(item) && item.separator" :key="'separator' + i" role="separator"></li>
		</template>
	</ul>
</template>
<script>
import newGameButton from '/src/components/NewGame.vue';
export default {
	// Definicion del evento emitido al clicar
	emits: ['friends-notify-pressed'],

	name: 'appsubmenu',
	props: {
		items: Array,
		root: {
			type: Boolean,
			default: false
		},
		numFriendReq: {
			type: Number,
			required: false
		},
		onlineFriends: {
			type: Array,
			required: false
		},
		primera: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			numGameReq: 0,
			activeIndex : null,
			socket: null,
		}
	},
	methods: {
		onMenuItemClick(event, item, index) {
			if (item.disabled) {
				event.preventDefault();
				return;
            }

            if (!item.to && !item.url) {
                event.preventDefault();
            }

			//execute command
			if (item.command) {
                item.command({originalEvent: event, item: item});
			}

			this.activeIndex = index === this.activeIndex ? null : index;

			this.$emit('menuitem-click', {
				originalEvent: event,
				item: item
			});
		},
		visible(item) {
			return (typeof item.visible === 'function' ? item.visible() : item.visible !== false);
		}
	},
	components: {
		newGameButton,
	},
}
</script>

<style>

.notification {
	background-color: red;
}

</style>


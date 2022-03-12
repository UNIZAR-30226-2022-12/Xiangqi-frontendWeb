<template>
	<div class="layout-topbar">
		<button v-if="$loggedStatus.logged" class="p-link layout-menu-button layout-topbar-button ml-0 mr-3" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>
		<router-link v-if="!$loggedStatus.logged" to="/" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>Xiangqi online</span>
		</router-link>

		<router-link v-else to="/profile" class="layout-topbar-logo">
			<img alt="Logo" :src="topbarImage()" />
			<span>Xiangqi online</span>
		</router-link>
		<!--<button class="p-link layout-topbar-menu-button layout-topbar-button ml-0 mr-3" style="display: inline-flex;">
			<i class="pi pi-cog"></i>
		</button>-->
		<button v-if="$loggedStatus.logged" class="p-link layout-topbar-menu-button layout-topbar-button"
			v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul v-if="$loggedStatus.logged" class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button class="p-link layout-topbar-button">
					<i class="pi pi-user"></i>
					<span>Profile</span>
				</button>
			</li>
			<li>
				<button id="miboton" class="p-link layout-topbar-button" @click="toggle" aria:haspopup="true" aria-controls="overlay_panel" >
					<i class="pi pi-cog"></i>
					<span>Ajustes</span>
				</button>
				<Toast />
				<ConfirmDialog></ConfirmDialog>
				<Transition name="slide-fade">
					<div v-if="mostrarPanel" v-click-outside="onClickOutside" class="fixed pl-3 pr-3 pb-3 dropDownCog">
						<div id="layout-config" >
							<div class="card pl-3 pt-1 pb-2">
								<div class="flex align-items-center flex-wrap card-container h-3rem">
									<div class="flex align-items-center justify-content-center mr-2"><i class="colorIcono pi pi-moon"></i></div>
									<div class="flex align-items-center justify-content-center colorIcono" style="margin-right: 1.82rem">Tema oscuro</div>
									<InputSwitch class="flex align-items-center justify-content-center" v-model="checked" @click="changeThemeOverlay()"/>
								</div>
							</div>
							<div class="card pb-3">
								<div class="flex align-items-center flex-wrap card-container h-3rem" style="padding-left: 0.3rem">
									<Button class="p-button-lupa" style="margin-right: .55rem;" icon="pi pi-search-minus" @click="decrementScale()" :disabled="scale === scales[0]"/>
									<i class="pi pi-circle-on text-slider" v-for="s of scales" :class="{'scale-active': s === scale}" :key="s"/>
									<Button class="p-button-lupa" icon="pi pi-search-plus"  @click="incrementScale()" :disabled="scale === scales[scales.length - 1]" />
								</div>
							</div>
							<Button @click="confirm()" class="m-auto w-full h-3rem text-left" style="border-radius: 1rem" icon="pi pi-lock" label="Cerrar sesión"></Button>
						</div>
					</div>
				</Transition>
			</li>
		</ul>
	</div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';

export default {
	data() {
		return {
			mostrarPanel: false,
			logged: false,
			checked: false,

			//menu overlaypanel
			scale: 14,
			scales: [12,13,14,15,16]
		}
	},
	directives: {
		clickOutside: vClickOutside.directive
	},
    methods: {
		confirm() {
            this.$confirm.require({
                message: '¿Estás seguro de que quieres cerrar sesión?',
                header: 'Cerrar sesión',
                icon: 'pi pi-exclamation-triangle',
				acceptLabel: 'Sí',
                accept: () => {
					//this.$toast.add({severity:'info', summary:'Sesión cerrada', detail:'Has cerrado sesión', life: 3000});
					this.$loggedStatus.logged = false;
					this.mostrarPanel = false;
					this.$router.push('/');
                },
                reject: () => {
                    this.$toast.add({severity:'error', summary:'Sesión activa', detail:'Sesión no cerrada', life: 3000});
                }
            });
		},
		onClickOutside () {
			this.mostrarPanel = false;
		},
        onMenuToggle(event) {
            this.$emit('menu-toggle', event);
        },
		onTopbarMenuToggle(event) {
            this.$emit('topbar-menu-toggle', event);
        },
		topbarImage() {
			return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
		},
		changeTheme(event) {
            this.$emit('change-theme', event);
        },
		//Settings menu
		toggle() {
            this.mostrarPanel = !this.mostrarPanel;
        },

		// opciones menu
		decrementScale() {
			this.scale--;
			this.applyScale();
		},
		incrementScale() {
			this.scale++;
			this.applyScale();
		},
		applyScale() {
			document.documentElement.style.fontSize = this.scale + 'px';
		},
		changeThemeOverlay() {
			if (!this.checked) {
				this.checked = true;
				this.$emit('change-theme', {theme: 'vela-blue', dark: true});
			} else {
				this.checked = false;
				this.$emit('change-theme', {theme: 'saga-blue', dark: false});
			}
		}
    },
	computed: {
		darkTheme() {
			return this.$appState.darkTheme;
		},
	},
}
</script>

<style scoped>
	/* Tamanyo texto */ 
	.p-button-lupa {
		border-radius: 2rem;
		background-color: var(--surface-100);
		color: var(--text-color-secondary);
		border: none;
	}
	
	.p-button-lupa:hover {
		background-color: var(--surface-hover);
		color: var(--text-color-primary);
	}


	.text-slider {
		margin-right: .54rem;
		font-size: .8rem;
		color: var(--text-color-secondary);
	}
	.scale-active {
		font-size: 1.5rem;
		color: var(--primary-color);
	}

	.colorIcono {
		color: var(--text-color-secondary);
	}

	/* Transicion slide fade para menu */
	.slide-fade-enter-active {
		transition: all 0.2s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateY(-20px);
		opacity: 0;
	}

	/* Este estilo se activa cuando el tamaño de la ventana es >= 992 */
	@media (min-width: 992px) {
		.dropDownCog {
			top: 4.5rem; 
			right: 1.8rem;
			border-radius: 1rem;
			box-shadow: 0px 2px 10px rgb(0 0 0 / 2%), 0px 0px 10px rgb(0 0 0 / 5%), 0px 2px 10px rgb(0 0 0 / 8%);
			background-color: var(--surface-overlay);
		}
	}

	/* Este estilo se activa cuando el tamaño de la ventana es <= 991px */
	@media (max-width: 991px) {
		.dropDownCog {
			margin-top: 0.3rem;
			right: 2rem;
			width: 15rem;
			border-radius: 0 0 1rem 1rem;
			box-shadow: 0px 4px 5px rgb(0 0 0 / 2%), 0px 3px 2px rgb(0 0 0 / 5%), 0px 5px 4px rgb(0 0 0 / 8%);
			background-color: var(--surface-overlay);
		}
	}

</style>

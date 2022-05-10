<template>
	<h2> Sets de {{ name }} </h2>
    <div class="surface-section section p-6">
        <DataView :value="set" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
            <template #header>
                <div class="grid grid-nogutter">
                    <div class="col-6" style="text-align: left">
                        <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por precio" @change="onSortChange($event)"/>
                    </div>
                    <div class="col-6" style="text-align: right">
                        <DataViewLayoutOptions v-model="layout" />
                    </div>
                </div>
            </template>
            <!-- Grid lista -->
            <template #list="slotProps">
                <div class="col-12">
                    <div class="product-list-item">
                        <img v-if="name == 'tableros'" class="store-item-list" :src="'images/themes/boards/' + slotProps.data.id + '.jpg'" :alt="slotProps.data.name">
                        <img v-else class="store-item-list store-item-grid-piece" :src="'images/themes/pieces/' + slotProps.data.id + '/canyonnegro.svg'">
                        <div class="product-list-detail">
                            <div class="product-name">{{slotProps.data.name}}</div>
                            <div class="product-description">{{slotProps.data.desc}}</div>
                            <!--<i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.category}}</span>-->
                        </div>
                        <div class="h-2"></div>
                        <div class="product-list-action">
                            <span class="product-price">{{slotProps.data.price}} ©</span>
                            <Button icon="pi pi-shopping-cart" label="Comprar" :disabled="slotProps.data.purchased"></Button>
                            <!--<span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>-->
                        </div>
                    </div>
                </div>
            </template>
            <!-- Grid cuadrada -->
            <template #grid="slotProps">
                <div class="col-12 md:col-4">
                    <div class="product-grid-item card">
                        <div class="product-grid-item-top">
                            <!--<div>
                                <i class="pi pi-tag product-category-icon"></i>
                                <span class="product-category">{{slotProps.data.category}}</span>
                            </div>
                            <span :class="'product-badge status-'+slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>-->
                        </div>
                        <div class="product-grid-item-content">
                            <img v-if="name == 'tableros'" class="store-item-grid" :src="'images/themes/boards/' + slotProps.data.id + '.jpg'" :alt="slotProps.data.name">
                            <img v-else class="store-item-grid-piece store-item-grid" :src="'images/themes/pieces/' + slotProps.data.id + '/canyonnegro.svg'">
                            <div class="product-name">{{slotProps.data.name}}</div>
                            <div class="product-description">{{slotProps.data.desc}}</div>
                            <!--<Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating>-->
                        </div>
                        <div class="h-2rem"></div>
                        <div class="product-grid-item-bottom">
                            <span class="product-price">{{slotProps.data.price}} ©</span>
                            <Button icon="pi pi-shopping-cart" :disabled="slotProps.data.purchased"></Button>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>


</template>

<script>

export default {
	inject: ['$accounts'],
    props: {
        set: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            required: true
        },
    },
    data() {
		return {
            layout: 'grid',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Precio de Mayor a Menor', value: '!price'},
                {label: 'Precio de Menor a Mayor', value: 'price'},
            ]
        }
    },
    methods: {
        comprado(index) {
            if(this.set[index].purchased) {
                return 'Comprado';
            } else {
                return 'Comprar';
            }
        },
        onSortChange(event){
            const value = event.value.value;
            const sortValue = event.value;

            if (value.indexOf('!') === 0) {
                this.sortOrder = -1;
                this.sortField = value.substring(1, value.length);
                this.sortKey = sortValue;
            }
            else {
                this.sortOrder = 1;
                this.sortField = value;
                this.sortKey = sortValue;
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.p-dataview{
border-width: 1px !important;
border-color: black !important;
border-style: solid;
border-radius: 1rem;
}
.store-item-list {
	vertical-align: middle;
	width: 5rem;
	height: 5rem;
	border-radius: 10%;
}

.store-item-grid {
	vertical-align: middle;
	width: 8rem;
	height: 8rem;
	border-radius: 10%;
}

.store-item-grid-piece {
    border-radius: 50%;
}

.board {
	vertical-align: middle;
	width: 8rem;
	height: 8rem;
	border-radius: 50%;
	object-fit: cover;
}

.card {
    padding: 2rem;
    /*box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);*/
    border-radius: 1rem;
    margin-bottom: 2rem;
}
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.2rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 0rem 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

::v-deep(.product-list-item) {
	display: flex;
	align-items: center;
	padding: 1rem;
	width: 100%;

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin-right: 2rem;
	}

	.product-list-detail {
		flex: 1 1 0;
	}

	.p-rating {
		margin: 0 0 .5rem 0;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: .5rem;
		align-self: flex-end;
	}

	.product-list-action {
		display: flex;
		flex-direction: column;
	}

	.p-button {
		margin-bottom: .5rem;
	}
}

::v-deep(.product-grid-item) {
	margin: .5rem;
	border: 1px solid var(--surface-border);
    min-height: auto;
    max-height: auto;

	.product-grid-item-top,
	.product-grid-item-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	img {
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		margin: 2rem 0;
	}

	.product-grid-item-content {
		text-align: center;
	}

	.product-price {
		font-size: 1.5rem;
		font-weight: 600;
	}
}

@media screen and (max-width: 576px) {
	.product-list-item {
		flex-direction: column;
		align-items: center;

		img {
			margin: 2rem 0;
		}

		.product-list-detail {
			text-align: center;
		}

		.product-price {
			align-self: center;
		}

		.product-list-action {
			display: flex;
			flex-direction: column;
		}

		.product-list-action {
			margin-top: 2rem;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
		}
	}
}
</style>
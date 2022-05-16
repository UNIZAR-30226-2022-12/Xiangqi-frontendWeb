
<template>
    <div class="surface-section section md:p-6 lg:p-6 mobileBorder">
        <h3 v-if="playerHistory.length == 0"> No se han encontrado partidas </h3>
        <TreeTable v-else :value="playerHistory" :paginator="true" :rows="10" sortMode="single">                      
            <template #header>
                <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 class="m-0 text-center md:text-left"> Historial de partidas </h5>
                </div>
            </template>
            <div v-if="playerHistory.length != 0">
                <Column field="date" header="Fecha de partida" :expander="true" style="width: 12rem" :sortable="true">
                    <template #body="slotProps">
                        {{slotProps.node.data.date}}
                        <span class="ml-2 md-visible sm-visible">{{slotProps.node.data.hour}}</span>
                        <span class="md-visible sm-visible">{{slotProps.node.data.winnerNickname}}</span>
                        <span class="md-visible sm-visible" style="margin-left: -55px; min-width: 20px;">{{slotProps.node.data.id}}</span>
                        <img v-if="slotProps.node.data.flag != null" :class="'md-visible shadow-2 flag ' + slotProps.node.data.flag" src="images/flags/flag_placeholder.png" />
                        <span class="md-visible sm-visible min-width-md min-width-sm"> {{slotProps.node.data.nickname}} </span>
                        <img v-if="slotProps.node.data.color != null" class="md-visible sm-visible piece piece-sm" :src="'images/themes/pieces/colors/' + slotProps.node.data.color + '.svg'">
                        <span class="md-visible sm-visible" style="min-width: 45px;">{{slotProps.node.data.origin}}</span>
                        <span class="md-visible sm-visible">{{slotProps.node.data.destination}}</span>
                    </template>
                </Column>
                <Column field="hour" class="text-center" header="Hora" headerClass="sm-invisible" bodyClass="sm-invisible" style="width: 5rem"></Column>
                <Column field="winnerNickname" class="text-center" header="Ganador" headerClass="sm-invisible" bodyClass="sm-invisible" style="width: 5rem">
                    <template #body="slotProps">
                        <span v-if="slotProps.node.data.winnerNickname != null">
                            {{slotProps.node.data.winnerNickname}}
                        </span>
                    </template>
                </Column>
                <Column field="id" class="text-center" header="Nº" headerClass="sm-invisible" bodyClass="sm-invisible" style="width: 4rem"></Column>
                <Column field="flag" class="text-center" header="País" headerClass="sm-invisible" bodyClass="sm-invisible" style="width: 5rem">
                    <template #body="slotProps">
                        <img v-if="slotProps.node.data.flag != null" src="images/flags/flag_placeholder.png" :class="'shadow-2 flag ' + slotProps.node.data.flag" />
                    </template>
                </Column>
                <Column field="nickname" class="text-center" header="Jugador" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
                <Column field="color" class="text-center" header="Color" headerClass="sm-invisible" bodyClass="sm-invisible">
                    <template #body="slotProps">
                            <img v-if="slotProps.node.data.color != null" class="piece piece-lg" :src="'images/themes/pieces/colors/' + slotProps.node.data.color + '.svg'">
                    </template>
                </Column>
                <Column field="origin" class="text-center" header="Origen" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
                <Column field="destination" class="text-center" header="Destino" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
            </div>
        </TreeTable>
    </div>                 
</template>

<script>
export default {
    props: {
        playerHistory: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scooped>

.p-treetable-header {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.p-treetable {
    border-width: 1px !important;
    border-style: solid;
    border-radius: 1rem;
    border-color: var(--surface-border);
    border-bottom-style: none !important;
    border-top-style: none !important;
}

.piece {
    border-radius: 100%;
    vertical-align: middle;
    object-fit: cover;
    transition: border-width 1s;
    box-shadow: 2px 2px 4px grey;
}

.piece-lg {
	width: 2.5rem;
}

.piece-sm {
	width: 2rem;
}
</style>

<style scoped lang="scss">
/* Tabla responsive */
.sm-visible {
    display: none;
}

.md-visible {
    display: none;
}

@media screen and (max-width: 80em) {
    ::v-deep(.sm-invisible) {
        display: none;
    }
    ::v-deep(.md-invisible) {
        display: none;
    }
    ::v-deep(.md-visible) {
        display: inline-flex;
        margin-right: 2rem;
        font-size: 15px;
    }
    .min-width-md {
        min-width: 150px;
    }
}


@media screen and (max-width: 50em) {
    ::v-deep(.sm-invisible) {
        display: none;
    }
    ::v-deep(.sm-visible) {
        display: inline-flex;
        margin-right: 1rem;
        font-size: 13px;
    }
    .min-width-sm {
        min-width: 100px;
    }
}

@media screen and (max-width: 35em) {
    ::v-deep(.sm-invisible) {
        display: none;
    }
    ::v-deep(.md-visible) {
        display: none;
    }
    ::v-deep(.sm-visible) {
        display: inline-flex;
        margin-right: 0.6rem;
        font-size: 11px;
    }
    .min-width-sm {
        min-width: 90px;
    }
}
</style>

<template>
    <div class="surface-section section p-6 mb-6">
        <h3 v-if="playerHistory.length == 0"> No se han encontrado partidas </h3>
        <TreeTable v-else :value="playerHistory" :paginator="true" :rows="10" sortMode="single" removableSort>
            <div v-if="playerHistory.length != 0">
                <Column field="date" header="Fecha de partida" :expander="true" style="width:11rem">
                    <template #body="slotProps">
                        {{slotProps.node.data.date}}
                        <span class="sm-visible">{{slotProps.node.data.hour}}</span>
                        <span class="sm-visible">{{slotProps.node.data.id}}</span>
                        <span class="sm-visible">{{slotProps.node.data.piece}}</span>
                        <span class="sm-visible">{{slotProps.node.data.origin}}</span>
                        <span class="sm-visible">{{slotProps.node.data.destination}}</span>
                    </template>
                </Column>
                <Column field="hour" header="Hora" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
                <Column field="id" header="Numero" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
                <Column field="nickname" header="Jugador" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
                <Column field="piece" header="Pieza" headerClass="sm-invisible" bodyClass="sm-invisible">
                    <template #body="slotProps">
                            {{slotProps.node.data.piece}}
                    </template>
                    <!--<template #header="fila">
                        <p v-if="fila != null"> {{fila.piece }}</p>
                    </template>-->
                    <!--<template #body=fila>
                        <h1> {{ fila.piece }} </h1>
                        <h1> {{ nodes[0].children[0].data.piece }} </h1>
                        <img :src="'images/themes/pieces/1/' + nodes[0].children[0].data.piece + '.svg'">
                    </template>--> 
                </Column>
                <Column field="origin" header="Origen" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
                <Column field="destination" header="Destino" headerClass="sm-invisible" bodyClass="sm-invisible"></Column>
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

.p-treetable {
    border-width: 1px !important;
    border-style: solid;
    border-radius: 1rem;
    border-color: var(--surface-border);
    border-bottom-style: none !important;
}

th {
    background-color: transparent !important;
}

</style>

<style scoped lang="scss">
.sm-visible {
    display: none;
}

@media screen and (max-width: 40em) {
    ::v-deep(.sm-invisible) {
        display: none;
    }

    ::v-deep(.sm-visible) {
        display: inline;
        margin-right: .5rem;
    }
}
</style>
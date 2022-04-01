<template>
    <h2 v-if="myProfile"> Mis estadísticas</h2>
    <h2 v-else>Estadísticas de {{perfil.name}}</h2>
	<div class="surface-section section p-6">
        <h3>Objetvo</h3>
        <div class="surface-section section mt-4 p-6">
            <div class="grid m-auto">
                <div class="col-fixed" style="padding: 0">
                    <h5>Partidas ganadas: {{wonGames}}/100</h5>
                </div>
                <div class="col-fixed" style="padding-left: 2rem; padding-top:0; padding-bottom:0">
                    <h5>Partidas jugadas: {{playedGames}}</h5>
                </div>
            </div>
            <ProgressBar :value="wonGames" :showValue="false"/>
        </div>
        <h3>Resumen semanal</h3>
        <div class="surface-section section mt-4 p-6 text-center">
            <Chart type="bar" :data="lastWeek" :options="basicOptions" />
        </div>
    </div>   
</template>

<script>
export default {
    props: {
		myProfile: {
			type: Boolean,
			required: true
		},
        perfil: {
            type: Object,
            required: false
        },
    },
    data() {
        return {
            wonGames: 10,
            playedGames: 40,
            historic: {
                labels: ['Jugadas', 'Ganadas'],
                datasets: [
                    {label: 'Total histórico', backgroundColor: '#42A5F5', data: [70, 30] },
                ]
            },
            lastWeek: {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                datasets: [
                    { label: 'Partidas jugadas', backgroundColor: '#42A5F5', data: [65, 59, 80, 81, 56, 55, 40] },
                    { label: 'Partidas ganadas',backgroundColor: '#FFA726', data: [28, 48, 40, 19, 86, 27, 90]}
                ]
            },
            basicOptions: {
                plugins: {
                    legend: { labels: { color: '#495057' } }
                },
            }
        }
    },
}
</script>
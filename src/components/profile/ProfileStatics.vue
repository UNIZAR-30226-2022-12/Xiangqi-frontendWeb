<template>
    <h2 v-if="myProfile"> Mis estadísticas</h2>
    <h2 v-else>Estadísticas de {{perfil.name}}</h2>
	<div class="surface-section section p-6">
        <h3>Resumen total</h3>
        <div class="surface-section section mt-4 p-6">
            <div class="grid m-auto">
                <div class="col-fixed" style="padding: 0">
                    <h5>Partidas ganadas: {{wonGames}}</h5>
                </div>
                <div class="col-fixed" style="padding-left: 2rem; padding-top:0; padding-bottom:0">
                    <h5>Partidas jugadas: {{playedGames}}</h5>
                </div>
            </div>
            <ProgressBar :value="progressBar" :showValue="false"/>
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
        games: {
            type: Object,
            required: false
        },
    },
    data() {
        return {
            diasMes: [31,28,31,30,31,30,31,31,30,31,30,31],
            wonGames: 10,
            playedGames: 40,
            progressBar: '',
            historic: {
                labels: ['Jugadas', 'Ganadas'],
                datasets: [
                    {label: 'Total histórico', backgroundColor: '#42A5F5', data: [70, 30] },
                ]
            },
            lastWeek: {
                labels: [],
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
    created(){
        /*
        *   LAST WEEK
        */
        //Cargar los datos de la tabla
        console.log(this.games)
        this.lastWeek.datasets[0].data = this.games.diaJugadas
        this.lastWeek.datasets[1].data = this.games.diaGanadas
        //Ponele las labels a la tabla horizontal
        let today = new Date()
        this.lastWeek.labels[6] = 'Hoy'
        for(let i = 5; i >= 0;i--){
            let dia = today.getDate();
            let mes = today.getMonth();
            let anyo = today.getFullYear();
            if(dia == 1){
                console.log("MES ANTERIOR")
                if(mes == 0){
                    console.log("AÑO ANATERIOR")
                    mes = 12;
                    anyo = anyo - 1;
                } else{
                    mes = mes - 1;
                }
                dia = this.diasMes[mes];
            } else {
                dia = dia - 1;
            }
            let dd = String(dia);
            let mm = String(mes + 1); //empieza en 0
            let yyyy = String(anyo);
            this.lastWeek.labels[i] = dd + '/' + mm + '/' + yyyy
            today = new Date(mm + '/' + dd + '/' + yyyy);
        }
        /*
        *   TOTAL
        */
        //this.wonGames = this.games.totalGanadas
        //this.playedGames = this.games.totalJugadas
        this.wonGames = 67
        this.playedGames = 400
        this.progressBar = this.wonGames/this.playedGames * 100
    },
}
</script>
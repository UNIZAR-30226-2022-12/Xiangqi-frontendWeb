<template>
    <h2>Mis amigos</h2>
    <div class="surface-section section p-6">
        <div class="card">
            <Carousel :value="friends" :numVisible="5" :numScroll="5" :responsiveOptions="responsiveOptions">
                <template #item="slotProps">
                    <div class="product-item">
                        <div class="product-item-content text-center">
                            <div class="mt-1 mb-3">
                                <img src="images/profilePlaceholder.svg" :alt="slotProps.data.name" class="shadow-2 foto-perfil" />
                            </div>
                            <div>
                                <h4 class="mb-2">{{slotProps.data.name}}</h4>
                                <img class="flag h-auto" :class="[slotProps.data.flag]" src="images/flags/flag_placeholder.png">
                                <span class="ml-2 image-text">{{slotProps.data.country}}</span>
                                <h6 class="mt-2 mb-2">#{{slotProps.data.nickname}}</h6>
                                <div class="car-buttons mt-3">
                                    <Button icon="pi pi-search" class="p-button-raised mb-2" style="border-radius: 1rem" label="Ver perfil"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </div>
</template>

<script>

export default {
	inject: ['$accounts'],
	data() {
		return {
			friends: null,			
            responsiveOptions: [
				{
					breakpoint: '1024px',
					numVisible: 3,
					numScroll: 3
				},
				{
					breakpoint: '600px',
					numVisible: 2,
					numScroll: 2
				},
				{
					breakpoint: '480px',
					numVisible: 1,
					numScroll: 1
				}
			]
		}
	},
	created() {
        
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

		//this.customerService = new CustomerService();
        this.friends= [
                {nickname: 'Pikanachi', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain'},
                {nickname: 'John', name:"John Doe", flag: 'flag-fr', country: 'France'},
                {nickname: 'Juanksp', name:"Juan Plo", flag: 'flag-es', country: 'Spain'},
                {nickname: 'AlexZheng', name:"Alex Zheng", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
				{nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
        ];
	},      
}
</script>
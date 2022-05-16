<template>
	<h2 v-if="$route.params.isNotification != 'notification'"> Amigos </h2>
	<loader v-if="loading"/>
	<!--<div v-else-if="notFriendOf != null && friendRequestsArray != null && friendsArray != null && !loading">-->
	<div v-else>
		<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
		<searchFriends v-if="$route.params.isNotification != 'notification'" :show="showResults" @clear-friends-pressed="clearFriendsPressed" @search-friends-pressed="searchFriendsPressed" @search-friend-field="getSearchFriendField"/>
		<searchTable v-if="$route.params.isNotification != 'notification'" :notFriendOf="notFriendOf" :notFriendOfImages="notFriendOfImages" :loading="loadingSearch" :show="showResults" :searchedItem="searchFriendField"/>
		<friendReq :loading="loadingRequests" :friendRequests="friendRequestsArray" />
		<myFriends v-if="$route.params.isNotification != 'notification'" :friends="friendsArray" :loading="loadingFriends"/>
	</div>
</template>

<script>

import loader from '../components/Loader.vue';
import searchFriends from '../components/friends/SearchFriends.vue';
import searchTable from '../components/friends/SearchTable.vue';
import friendReq from '../components/friends/FriendRequests.vue';
import myFriends from '../components/friends/MyFriends.vue';

export default {
	inject: ['$accounts', '$friends'],
	components: {
		loader,
		searchFriends,
		searchTable,
		friendReq,
		myFriends,
	},
	data() {
		return {
			showResults: false,
			loading: true,
			searchFriendField: '',
			notFriendOf: [],
			notFriendOfImages: [],
			loadingSearch: true,
			friendRequestsArray: [],
			loadingRequests: true,
			friendsArray: [],
			loadingFriends: true,
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

		// CUANDO ESTE EL BACK HECHO:
		// CAMBIAR ESTO
		// ---------------------------------------------------------------------
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
        /*this.friendRequests= [
                {id: '1', nickname: 'Pikanachi', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain', birthday:'13/09/2010'},
                {id: '1', nickname: 'John', name:"Nacho Ortega", flag: 'flag-fr', country: 'France', birthday:'13/09/2010'},
                {id: '1', nickname: 'Juanksp', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
				{id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010'},
        ];*/
		/*
        this.friends= [
                {id: '1', nickname: 'Pikanachi', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain'},
                {id: '1', nickname: 'John', name:"John Doe", flag: 'flag-fr', country: 'France'},
                {id: '1', nickname: 'Juanksp', name:"Juan Plo", flag: 'flag-es', country: 'Spain'},
                {id: '1', nickname: 'AlexZheng', name:"Alex Zheng", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
				{id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China'},
        ];*/
		/*
		this.loading = false;
		this.loadingRequests = false;
		this.loadingFriends = false;
		*/

		// POR ESTO
		// ---------------------------------------------------------------------
		this.$friends.getFriendRequests().then(response => {
			this.friendRequests = response;
			this.loadingRequests = false;
		});

		this.$friends.getFriends().then(response => {
			this.friends = response;
			this.loadingFriends = false;
			this.loading = false;
		});
	},
	methods: {
		// Metodos que recogen los eventos definidos en searchFriends
		searchFriendsPressed(results){
			// Hacer peticion al back
			this.loadingSearch = true;
			this.showResults = results;
			console.log(this.searchFriendField);
			this.notFriendOf = [];
			this.$friends.searchUser(this.searchFriendField).then(response =>{
				this.notFriendOf = response;

				//Buscar la foto
				// Pedir al back la foto
				for (var i = 0; i < this.notFriendOf.length; i++) {
					//llegan las fotos
					let id = this.notFriendOf[i].id;
					if (this.notFriendOf[i].hasImage) {
						this.$accounts.getProfileImage(id).then(data => {
							this.notFriendOfImages.push({id: id, image: data})
						});
					} else {
						this.notFriendOfImages.push({id: id, image: "images/profilePlaceholder.svg"})
					}
				}
				this.loadingSearch = false;
			});
        },
		getSearchFriendField(results) {
			this.searchFriendField = results;
		},
		clearFriendsPressed(){
			this.showResults = false;
			this.searchFriendField = '';
		}
	}
}
</script>


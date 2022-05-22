<template>
	<h2> Amigos </h2>
	<loader v-if="loading"/>
	<!--<div v-else-if="notFriendOf != null && friendRequestsArray != null && friendsArray != null && !loading">-->
	<div v-else>
		<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
		<searchFriends v-if="$route.params.isNotification != 'notification'" :show="showResults" @clear-friends-pressed="clearFriendsPressed" @search-friends-pressed="searchFriendsPressed" @search-friend-field="getSearchFriendField"/>
		<searchTable v-if="$route.params.isNotification != 'notification'" :notFriendOf="notFriendOf" :notFriendOfImages="notFriendOfImages" :loading="loadingSearch" :show="showResults" :searchedItem="searchFriendField"/>
		<friendReq :loading="loadingRequests" :friendRequests="friendRequestsArray" :friendRequestsArrayImages="friendRequestsArrayImages" @remove-invitation-pressed="removeInvitationPressed" @add-invitation-pressed="addInvitationPressed"/>
		<myFriends v-if="$route.params.isNotification != 'notification'" :friends="friendsArray" :friendsArrayImages="friendsArrayImages" :loading="loadingFriends"/>
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
			friendRequestsArrayImages: [],
			loadingRequests: true,
			friendsArray: [],
			friendsArrayImages: [],
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
			this.friendRequestsArray = response;
			for (var i = 0; i < this.friendRequestsArray.length; i++) {
				//llegan las fotos
				let id = this.friendRequestsArray[i].id;
				if (this.friendRequestsArray[i].hasImage && this.friendRequestsArrayImages[id] == null) {
					this.friendRequestsArrayImages[id] = '';
					this.$accounts.getProfileImage(id).then(data => {
						this.friendRequestsArrayImages[id] = data;
					});
				} else if (!this.friendRequestsArray[i].hasImage && this.friendRequestsArrayImages[id] == null) {
					this.friendRequestsArrayImages[id] = "images/profilePlaceholder.svg";
				}
			}
			this.loadingRequests = false;
		});

		this.$friends.getFriends().then(response => {
			this.friendsArray = response;
			for (var i = 0; i < this.friendsArray.length; i++) {
				//llegan las fotos
				let id = this.friendsArray[i].id;
				if (this.friendsArray[i].hasImage && this.friendsArrayImages[id] == null) {
					this.friendsArrayImages[id] = '';
					this.$accounts.getProfileImage(id).then(data => {
						this.friendsArrayImages[id] = data;
					});
				} else if (!this.friendsArray[i].hasImage && this.friendsArrayImages[id] == null) {
					this.friendsArrayImages[id] = "images/profilePlaceholder.svg";
				}
			}
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
			//console.log(this.searchFriendField);
			this.notFriendOf = [];
			this.$friends.searchUser(this.searchFriendField).then(response =>{
				this.notFriendOf = response;

				//Buscar la foto
				for (var i = 0; i < this.notFriendOf.length; i++) {
					//llegan las fotos
					let id = this.notFriendOf[i].id;
					if (this.notFriendOf[i].hasImage && this.notFriendOfImages[id] == null) {
						this.notFriendOfImages[id] = '';
						this.$accounts.getProfileImage(id).then(data => {
							this.notFriendOfImages[id] = data;
						});
					} else if (!this.notFriendOf[i].hasImage && this.notFriendOfImages[id] == null) {
						this.notFriendOfImages[id] = "images/profilePlaceholder.svg";
					}
				}
				this.loadingSearch = false;
			});
        },
		//Rechazamos la peticion de amistad
		removeInvitationPressed(id) {
			for (var i = 0; i < this.friendRequestsArray.length; i++) {
				if (this.friendRequestsArray[i].id == id) {
					this.friendRequestsArray.splice(i, 1);
					this.friendRequestsArrayImages.splice(i, 1);
				}
			}
			this.$friends.rejectRequest(id);
		},
		//Aceptamos la peticion de amistad
		addInvitationPressed(id) {
			for (var i = 0; i < this.friendRequestsArray.length; i++) {
				if (this.friendRequestsArray[i].id == id) {
					this.friendRequestsArray.splice(i, 1);
					this.friendRequestsArrayImages.splice(i, 1);
				}
			}
			this.$friends.acceptRequest(id);
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


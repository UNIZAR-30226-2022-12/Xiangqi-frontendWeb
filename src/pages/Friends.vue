<template>
	<h2> Amigos </h2>
	<loader v-if="this.loading"/>
	<div v-else>
		<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
		<searchFriends :show="this.showResults" @clear-friends-pressed="clearFriendsPressed" @search-friends-pressed="searchFriendsPressed" @search-friend-field="getSearchFriendField"/>
		<searchTable :notFriendOf="this.notFriendOf" :loading="this.loadingSearch" :show="this.showResults" :searchedItem="this.searchFriendField"/>
		<friendReq :loading="this.loadingRequests" :friendRequests="this.friendRequests" />
		<myFriends :loading="this.loadingFriends" :friends="this.friends"/>
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
			loadingSearch: true,
			friendRequests: [],
			loadingRequests: true,
			friends: [],
			loadingFriends: true,
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

		// CUANDO ESTE EL BACK HECHO:
		// CAMBIAR ESTO
		// ---------------------------------------------------------------------
		// EJEMPLO DE JSON DE RESPONSE (NO BORRAR)
        this.friendRequests= [
                {id: '1', nickname: 'Pikanachi', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'John', name:"Nacho Ortega", flag: 'flag-fr', country: 'France', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'Juanksp', name:"Nacho Ortega", flag: 'flag-es', country: 'Spain', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
				{id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
                {id: '1', nickname: 'AlexZheng', name:"Nacho Ortega", flag: 'flag-cn', country: 'China', birthday:'13/09/2010', requestDate: '13/09/2010'},
        ];

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
        ];

		this.loading = false;
		this.loadingRequests = false;
		this.loadingFriends = false;

		// POR ESTO
		// ---------------------------------------------------------------------
		/*
		this.$friends.getFriendRequests().then(response => {
			this.friendRequests = response.friendRequests;
			this.loadingRequests = false;
		});

		this.$friends.getFriends().then(response => {
			this.friends = response.friends;
			this.loadingFriends = false;
		});
		*/
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
				// Cuando este el back bien hecho cambiar el for por
				// this.notFriendOf = response.notFriendOf;
				for(let i = 0; i < response.length; i++){
					this.notFriendOf.push({id: response[i][0], nickname: response[i][5], name:response[i][6], flag: 'flag-es', country: response[i][8], birthday:response[i][13]})
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


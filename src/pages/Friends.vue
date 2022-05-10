<template>
	<loader v-if="this.loading"/>
	<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
	<searchFriends :show="this.showResults" @clear-friends-pressed="clearFriendsPressed" @search-friends-pressed="searchFriendsPressed" @search-friend-field="getSearchFriendField"/>
	<searchTable :notFriendOf="this.notFriendOf" :loading="this.loadingSearch" :show="this.showResults" :searchedItem="this.searchFriendField"/>
	<!--<div class="animate-down" :class="{'push-down': this.showResults }">-->
	<friendReq />
	<myFriends />
</template>

<script>
import loader from '../components/Loader.vue';
import searchFriends from '../components/friends/SearchFriends.vue';
import searchTable from '../components/friends/SearchTable.vue';
import friendReq from '../components/friends/FriendRequests.vue';
import myFriends from '../components/friends/MyFriends.vue';

export default {
	inject: ['$accounts', '$friends'],
	data() {
		return {
			showResults: false,
			loading: false,
			searchFriendField: '',
			notFriendOf: [],
			loadingSearch: true,
		}
	},
	components: {
		loader,
		searchFriends,
		searchTable,
		friendReq,
		myFriends,
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	},
	methods: {
		//Metodos que recogen los eventos definidos en searchFriends
		searchFriendsPressed(results){
			//Hacer peticion al back
			this.loadingSearch = true;
			this.showResults = results;
			console.log(this.searchFriendField);
			this.notFriendOf = [];
			this.$friends.searchUser(this.searchFriendField).then(response =>{
				for(let i = 0; i < response.length; i++){
					this.notFriendOf.push({id: response[i][1], nickname: response[i][5], name:response[i][6], flag: 'flag-es', country: response[i][8], birthday:response[i][13]})
				}
				this.loadingSearch = false;
			});
			
			//Pasarle el rsultado  al componente searchTable
        },
		getSearchFriendField(results) {
			this.searchFriendField = results;
		},
		clearFriendsPressed(){
			console.log('clearResults');
			this.showResults = false;
			this.searchFriendField = '';
		}
	}
}
</script>

<style>
/*
.push-down {
	transform: translateY(1rem);
}

.animate-down {
	transition: transform 1000ms ease-in-out;
}
*/
</style>


<template>
	<loader v-if="this.loading"/>
	<div v-else>
		<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
		<searchFriends :show="this.showResults" @clear-friends-pressed="clearFriendsPressed" @search-friends-pressed="searchFriendsPressed" @search-friend-field="getSearchFriendField"/>
		<searchTable :notFriendOf="this.notFriendOf" :loading="this.loadingSearch" :show="this.showResults" :searchedItem="this.searchFriendField"/>
		<friendReq :friendRequests="this.friendRequests" />
		<myFriends :loading="this.loadingRequests" :friends="this.friends"/>
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
	data() {
		return {
			showResults: false,
			loading: false,
			searchFriendField: '',
			notFriendOf: [],
			loadingSearch: true,
			friendRequests: [],
			loadingRequests: true,
			friends: [],
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

		//CUANDO ESTE EL BACK HECHO:
		//CAMBIAR ESTO
		this.loading = false;

		//POR ESTO
		/*
		this.$friends.getFriendRequests().then(response => {
			this.friendRequests = response.friendRequests;
			this.loadingRequests = false;
		});

		this.$friends.getFriends().then(response => {
			this.friends = response.friends;
			this.loading = false;
		});
		*/
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


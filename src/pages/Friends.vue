<template>
	<loader v-if="this.loading"/>
	<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
	<searchFriends :show="this.showResults" @clear-friends-pressed="clearFriendsPressed" @search-friends-pressed="searchFriendsPressed" @search-friend-field="getSearchFriendField"/>
	<searchTable :show="this.showResults" :searchedItem="this.searchFriendField"/>
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
	inject: ['$accounts'],
	data() {
		return {
			showResults: false,
			loading: false,
			searchFriendField: '',

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
            this.showResults = results;
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


<template>
	<loader v-if="this.loading"/>
	<searchFriends @search-friends-pressed="searchFriendsPressed"/>
	<!--<Transition name="slide-fade">
		<div v-if="this.showResults">
			<h3> Debe de salir la tabla con la info de la busqueda que le paso </h3>
			<h4>Add another one</h4>
			<h4>Add another one</h4>
			<h4>Add another one</h4>
			<h4>Add another one</h4>
			<h4>Add another one</h4>
			<h4>Add another one</h4>
		</div>-->
		<!-- pasarle al search table el show results!!-->
		<searchTable/>
	<!--</Transition>-->
	<friendReq />
	<myFriends />
</template>

<script>
import loader from '../components/Loader.vue';
import searchFriends from '../components/friends/SearchFriends.vue';
//import searchTable from '../components/friends/SearchTable.vue';
import friendReq from '../components/friends/FriendRequests.vue';
import myFriends from '../components/friends/MyFriends.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			showResults: false,
			loading: false,
		}
	},
	components: {
		loader,
		searchFriends,
		//searchTable,
		friendReq,
		myFriends,
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	},
	methods: {
		searchFriendsPressed(results){
			console.log("eventoo");
			console.log(results);
            this.showResults = results;
        },
	}
}
</script>


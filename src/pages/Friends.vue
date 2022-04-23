<template>
	<loader v-if="this.loading"/>
	<friendReq />
	<myFriends />
</template>

<script>
import loader from '../components/Loader.vue';
import friendReq from '../components/friends/FriendRequests.vue';
import myFriends from '../components/friends/MyFriends.vue';

export default {
	inject: ['$accounts'],
	data() {
		return {
			loading: false,
		}
	},
	components: {
		loader,
		friendReq,
		myFriends,
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	}
}
</script>
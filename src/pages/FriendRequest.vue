<template>

	<loader v-if="loading"/>
	<div v-else>
		<!--Para recoger el evento definido en searchFriends y el metodo al que invocan-->
		<friendReq :loading="loadingRequests" :friendRequests="friendRequestsArray" :friendRequestsArrayImages="friendRequestsArrayImages" @remove-invitation-pressed="removeInvitationPressed" @add-invitation-pressed="addInvitationPressed"/>
	</div>
</template>

<script>

import loader from '../components/Loader.vue';
import friendReq from '../components/friends/FriendRequests.vue';

export default {
	inject: ['$accounts', '$friends'],
	components: {
		loader,
		friendReq,
	},
	data() {
		return {
			loading: true,
			loadingSearch: true,
			friendRequestsArray: [],
			friendRequestsArrayImages: [],
			loadingRequests: true,
		}
	},
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();

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
            this.loading = false;
		});
	},
	methods: {
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
	}
}
</script>


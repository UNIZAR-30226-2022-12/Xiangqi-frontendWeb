<template>
	<div class="grid">
		<div class="col-12">
			<div class="card">
				<h5>Tomodachos</h5>
				<p>Página por hacer.</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	inject: ['$accounts'],
	created() {
		this.$loggedStatus.logged = this.$accounts.isAuthenticated();
	}
}
</script>
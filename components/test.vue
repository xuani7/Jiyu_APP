<template>
	<view>
		<u-popup v-model="show" mode="center" border-radius="14" @close="changeTarget">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
		<button type="default" @click="this.show = true"></button>
	</view>
</template>

<script>
	export default {
		name:"test",
		data() {
			return {
				show:false
			};
		},
		methods: {
			changeTarget(){
				this.show = !this.show
				console.log("切换~"+this.show);
			}
		},
	}
</script>

<style>

</style>
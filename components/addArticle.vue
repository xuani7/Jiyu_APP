<template>
	<view v-if="isShow" class="role" @click="add()">
		<image :src="src" mode="widthFix" />
	</view>
</template>

<script>
	export default {
		name: "role",
		props: {
			src: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: ''
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			tab: {
				type: Boolean,
				default: false
			},
            isShow:{
                type: Boolean,
                default: false
            }
		},
		data() {
			return {
                
			}
		},
		methods: {
            add(){
                
            }
		}

	}
</script>

<style>
	.mescroll-lazy-in,
	.mescroll-fade-in {
		-webkit-animation: mescrollFadeIn .3s linear forwards;
		animation: mescrollFadeIn .3s linear forwards;
	}

	.role {
		z-index: 999;
		position: fixed;
		right: 20upx;
		bottom: 200upx;
		/* #ifdef H5 */
		bottom: 220upx;
		/* #endif */
		width: 72upx;
		height: 72upx;
		border-radius: 50%;
		transform: translateZ(0);
		-webkit-transform: translateZ(0);
	}

	.role image {
		width: 100%;
		height: 100%;
	}
</style>

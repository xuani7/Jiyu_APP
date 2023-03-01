<template>
    <view class="navBar">
        <u-sticky offsetTop="44px">
            <uni-nav-bar status-bar color={$font-color-base} style={background-color:$page-color-base;} leftIcon="contact"
                @clickLeft="showUser()" :title="title" />
        </u-sticky>
    </view>
</template>

<script>
	
    export default {
        name: "navBar",
		props:['title'],
        data() {
            return {
                height: "44px"
            }
        },
        methods: {
            showUser() {
				// #ifdef APP-PLUS
				uni.navigateTo({
				    url: "/pages/user/user",
				    animationType: 'fade-in',
				    animationDuration: 300
				});
				// #endif
            }
        },
    }
</script>

<style lang="scss">
	.navBar{
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 100;
	}
</style>

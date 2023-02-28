<template>
    <view class="navBar">
        <u-sticky offsetTop="48px">
            <uni-nav-bar status-bar color="#FFF6E5" backgroundColor="#2185C5" leftIcon="contact"
                @clickLeft="showUser()" />
        </u-sticky>
    </view>
</template>

<script>
    export default {
        name: "navBar",
        data() {
            return {
                height: "48px"
            }
        },
        methods: {
            showUser() {
                uni.navigateTo({
                    url: "/pages/user/user",
                    animationType: 'slide-in-left',
                    animationDuration: 300
                });
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

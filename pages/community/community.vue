<template>
    <view class="container">
        <navBar></navBar>
    </view>
</template>

<script>
 import navBar from '../../components/navBar.vue'
    export default {
        components: {
            navBar
        },
        data() {
            return {
                title: "社区"
            }
        }
    }
</script>

<style lang="scss">
</style>
<script>
    import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js'
    export default {
        onLaunch: async function() {
            await uniIdPageInit()
            /* #ifdef APP-PLUS */
            uni.onTabBarMidButtonTap(() => {
                uni.navigateTo({
                    url:'/pages/timer/timer',
                    animationDuration:300,
                    animationType:'fade-in'
                })
            })
            /* #endif */
            
        },
        onShow: function() {

        },
        onHide: function() {

        }
    }
</script>

<style lang="scss">
    /*每个页面公共css */
    @import '@/uni_modules/uni-scss/index.scss';
    @import url("@/static/css/iconfont/iconfont.css");
    /* #ifndef APP-NVUE */
    @import '@/static/customicons.css';

    // 设置整个项目的背景色
    page {
        background-color: #F8F8F8;
    }

    /* #endif */
    .example-info {
        font-size: 14px;
        color: #333;
        padding: 10px;
    }
</style>

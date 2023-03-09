<script>
    import uniIdPageInit from '@/uni_modules/uni-id-pages/init.js'
    export default {
        onLaunch: async function() {
            
            // #ifdef APP-PLUS
                plus.navigator.closeSplashscreen();
                var w = plus.webview.open(
                    'hybrid/html/advertise/advertise.html',
                    '本地地址', {
                        top: 0,
                        bottom: 0,
                        zindex: 999
                    },
                    'fade-in',
                    500
                );
                //设置定时器，4s后关闭启动广告页
                setTimeout(function() {
                    plus.webview.close(w);
                }, 2000);
                // #endif
            
            await uniIdPageInit()
            // #ifdef APP-PLUS
            uni.onTabBarMidButtonTap(() => {
                uni.navigateTo({
                    url:'/pages/timer/timer',
                    animationDuration:300,
                    animationType:'fade-in'
                })
            })
            // #endif 
            
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

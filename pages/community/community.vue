<template>
    <view class="container" @touchstart="touchStart" @touchend="touchEnd">
        <navBar :title="title"></navBar>
       <Dynamic v-for="(item,index) in list" :key="item._id" 
            :imgList="item.imgList" 
            :avatar="item.avatar"
            :name="item.name" 
            :publishTime="item.publishTime" 
            :content="item.content" 
            :isLike="item.isLike"
            :isCollect="item.isCollect" 
            :likeNumber="item.likeNumber" 
            :collectNumber="item.collectNumber"
            @clickDynamic="clickDynamic(index)" 
            @clickThumbsup="clickThumbsup(item._id)"
            @clickCollect="clickCollect(item._id)" 
            @clickShare="clickShare(item._id)">
        </Dynamic>
        <loadMore mode="loading1" color="#686870" :status="status" textSize="12px" textColor="#808080"></loadMore>
    </view>
</template>

<script>
    import navBar from '../../components/navBar.vue'
    import Dynamic from "../../components/dynamic/Dynamic.vue"
    import loadMore from "../../components/loadMore/loadMore.vue"
    import {
        methods
    } from '../../uni_modules/uview-ui/libs/mixin/mixin'
    import appShare, { closeShare } from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare'
    export default {
        components: {
            navBar,
            Dynamic,
            loadMore
        },
        data() {
            return {
                title: "社区",
                startX: 0,
                list: [],
                status: "loading",
                page: 1,
                flag: false
            }
        },
        onReachBottom() {
            this.status = 'loading';
            setTimeout(()=>{
                this.page = ++this.page;
                this.getArticles(0, this.page)
                if (this.flag) {
                    this.status = "down"
                    this.flag = false
                } else {
                    this.status = "normal"
                }
            },1000)
        },
        onUnload() {
            this.list = []
        },
        methods: {
            // 点赞
            async clickThumbsup(e) {
                let res = await this.getClickArticle(e)
                if(res.result.data[0].isLike){
                    res.result.data[0].isLike = false
                    res.result.data[0].likeNumber -= 1
                }else{
                    res.result.data[0].isLike = true
                    res.result.data[0].likeNumber += 1
                }
                uniCloud.callFunction({
                    name:'setArticleById',
                    data:res.result.data[0]
                }).then(res=>{
                    console.log(res)
                })
            },
            // 收藏
            async clickCollect(e) {
                let res = await this.getClickArticle(e)
                if(res.result.data[0].isCollect){
                    res.result.data[0].isCollect = false
                    res.result.data[0].collectNumber -= 1
                }else{
                    res.result.data[0].isCollect = true
                    res.result.data[0].collectNumber += 1
                }
                uniCloud.callFunction({
                    name:'setArticleById',
                    data:res.result.data[0]
                }).then(res=>{
                    console.log(res)
                })
            },
            // 转发
            async clickShare(e) {
                let shareData = {
                    shareUrl:"https://bilibili.com/",
                    shareTitle:"快来看看吧~",
                    shareContent:"分享的描述",
                    shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
                    appId : "wxd0e0881530ee4444", // 默认不传type的时候，必须传appId和appPath才会显示小程序图标
                    appPath : "pages/home/home",
                    appWebUrl : "https://bilibili.com/",
                };
                let res = await this.getClickArticle(e)
                console.log(res);
                shareData.shareContent = res.result.data[0].content
                shareData.shareImg = res.result.data[0].imgList[0]
                // 调用
                let shareObj = appShare(shareData,res => {
                    console.log("分享成功回调",res);
                    // 分享成功后关闭弹窗
                    closeShare();
                });
                setTimeout(() => {
                    shareObj.close();
                },5000);
             },
            getClickArticle(id){
                return uniCloud.callFunction({
                    name:'getArticleById',
                    data:{"_id":id}
                })
            },
            getArticles(e, page) {
                
                uniCloud.callFunction({
                    name: "getArticles",
                    data: {
                        page
                    }
                }).then(res => {

                    if (Object.keys(res.result.data).length !== 0) {
                        this.list.push(...res.result.data)
                        this.flag = true
                    }else if(Object.keys(res.result.data).length < 5){
                        this.flag = false
                        this.status = "normal"
                    }else{
                        this.flag = false
                    }
                })
                if (e === 1) {
                    uni.stopPullDownRefresh()
                }
            },

            /**
             * 触摸开始
             * @param {Object} e
             */
            touchStart: function(e) {
                if (e.touches.length == 1) {
                    //设置触摸起始点水平方向位置
                    this.startX = e.touches[0].clientX;
                }
            },
            /**
             * 触摸结束
             * @param {Object} e
             */
            touchEnd: function(e) {
                if (e.changedTouches.length == 1) {
                    //手指移动结束后水平位置
                    var endX = e.changedTouches[0].clientX;
                    let diff = endX - this.startX;
                    if (Math.abs(diff) > 200) {
                        if (diff > 200) {
                            // #ifdef APP-PLUS
                            uni.navigateTo({
                                url: "/pages/user/user",
                                animationType: 'fade-in',
                                animationDuration: 300
                            })
                            // #endif
                        }
                    }
                }
            },
        },
        onLoad() {
            this.$nextTick(() => {
                this.getArticles(0, this.page)
            })

        },
        onPullDownRefresh() {
            this.$nextTick(() => {
                this.page = 1
                this.getArticles(1, this.page)
            });

        }
    }
</script>

<style lang="scss">

</style>

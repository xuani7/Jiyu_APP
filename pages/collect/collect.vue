<template>
    <view class="container" @touchstart="touchStart" @touchend="touchEnd">
        <navBar :title="title"></navBar>
       <Dynamic v-for="(item,index) in list" :key="item._id._value"
            :imgList="item.imgList" 
            :avatar="item.user_id[0].avatarUrl"
            :name="item.user_id[0].nickname?item.user_id[0].nickname:item.user_id[0].username" 
            :publishTime="item.publishTime" 
            :content="item.content" 
            :isLike="item._id.user_article[0].isLike?item._id.user_article[0].isLike:false"
            :isCollect="item._id.user_article[0].isCollect?item._id.user_article[0].isCollect:false" 
            :likeNumber="item.likeNumber" 
            :collectNumber="item.collectNumber"
            @clickDynamic="clickDynamic(index)" 
            @clickThumbsup="clickThumbsup(item._id._value)"
            @clickCollect="clickCollect(item._id._value)" 
            @clickShare="clickShare(item._id._value)">
        </Dynamic>
        <backTop :src="backTop.src"  :scrollTop="backTop.scrollTop"></backTop>
        <loadMore mode="loading1" color="#686870" :status="status" textSize="12px" textColor="#808080"></loadMore>
    </view>
</template>

<script>
    import navBar from '../../components/navBar.vue'
    import Dynamic from "../../components/dynamic/Dynamic.vue"
    import loadMore from "../../components/loadMore/loadMore.vue"
    import backTop from '@/components/back-top/back-top.vue'
    import {
        methods
    } from '../../uni_modules/uview-ui/libs/mixin/mixin'
    import appShare, { closeShare } from '@/uni_modules/zhouWei-APPshare/js_sdk/appShare'
    export default {
        components: {
            navBar,
            Dynamic,
            loadMore,
            backTop
        },
        data() {
            return {
                backTop: {
                	src: '../../static/back-top/top.png',
                	scrollTop: 0
                },
                scrollTop: 0,
                title: "ζηζΆθ",
                startX: 0,
                list: [],
                status: "loading",
                page: 1,
                flag: false
            }
        },
        onPageScroll(e) {
        	this.backTop.scrollTop = e.scrollTop;
        },
        onReachBottom() {
            this.status = 'loading';
            setTimeout(()=>{
                this.page = ++this.page;
                this.getCollectArticle(0, this.page)
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
            // ηΉθ΅
            async clickThumbsup(e) {
                let res = await this.getClickArticle(e)
                // console.log(res);
                if(res.result.data[0]._id.user_article[0].isLike){
                    res.result.data[0]._id.user_article[0].isLike = false
                    res.result.data[0].likeNumber -= 1
                }else{
                    res.result.data[0]._id.user_article[0].isLike = true
                    res.result.data[0].likeNumber += 1
                }
                uniCloud.callFunction({
                    name:'setArticleById',
                    data:res.result.data[0]
                }).then(res=>{
                    console.log(res)
                })
            },
            // ζΆθ
            async clickCollect(e) {
                let res = await this.getClickArticle(e)
                if(res.result.data[0]._id.user_article[0].isCollect){
                    res.result.data[0]._id.user_article[0].isCollect = false
                    res.result.data[0].collectNumber -= 1
                }else{
                    res.result.data[0]._id.user_article[0].isCollect = true
                    res.result.data[0].collectNumber += 1
                }
                uniCloud.callFunction({
                    name:'setArticleById',
                    data:res.result.data[0]
                }).then(res=>{
                    console.log(res)
                })
            },
            // θ½¬ε
            async clickShare(e) {
                let shareData = {
                    shareUrl:"https://bilibili.com/",
                    shareTitle:"εΏ«ηζεη°δΊδ»δΉε?θ~",
                    shareContent:"",
                    shareImg:"http://qn.kemean.cn//upload/202004/18/1587189024467w6xj18b1.jpg",
                    appId : "wxd0e0881530ee4444", // ι»θ?€δΈδΌ typeηζΆεοΌεΏι‘»δΌ appIdεappPathζδΌζΎη€Ίε°η¨εΊεΎζ 
                    appPath : "pages/home/home",
                    appWebUrl : "https://bilibili.com/",
                };
                let res = await this.getClickArticle(e)
                console.log(res);
                shareData.shareContent = res.result.data[0].content
                shareData.shareImg = res.result.data[0].imgList[0]
                // θ°η¨
                let shareObj = appShare(shareData,res => {
                    console.log("εδΊ«ζεεθ°",res);
                    // εδΊ«ζεεε³ι­εΌΉηͺ
                    closeShare();
                });
                setTimeout(() => {
                    shareObj.close();
                },5000);
             },
            getClickArticle(id){
                return uniCloud.callFunction({
                    name:'getArticleById',
                    data:{"id":id}
                })
            },
            getCollectArticle(e, page) {
                
                uniCloud.callFunction({
                    name: "getCollectArticle",
                    data: {
                        page
                    }
                }).then(res => {

                    if (Object.keys(res.result.data).length !== 0) {
                        this.list.push(...res.result.data)
                        this.flag = true
                    }else if(Object.keys(res.result.data).length < 5 && Object.keys(res.result.data).length > 0){
                        this.flag = false
                        this.status = "normal"
                    }else{
                        this.page -= 1
                        this.flag = false
                        this.status = "normal"
                    }
                })
                if (e === 1) {
                    uni.stopPullDownRefresh()
                }
            },

            /**
             * θ§¦ζΈεΌε§
             * @param {Object} e
             */
            touchStart: function(e) {
                if (e.touches.length == 1) {
                    //θ?Ύη½?θ§¦ζΈθ΅·ε§ηΉζ°΄εΉ³ζΉεδ½η½?
                    this.startX = e.touches[0].clientX;
                }
            },
            /**
             * θ§¦ζΈη»ζ
             * @param {Object} e
             */
            touchEnd: function(e) {
                if (e.changedTouches.length == 1) {
                    //ζζη§»ε¨η»ζεζ°΄εΉ³δ½η½?
                    var endX = e.changedTouches[0].clientX;
                    let diff = endX - this.startX;
                    if (Math.abs(diff) > 200) {
                        if (diff > 200) {
                            // #ifdef APP-PLUS
                            uni.navigateBack()
                            // #endif
                        }
                    }
                }
            },
        },
        onLoad() {
            this.$nextTick(() => {
                this.getCollectArticle(0, this.page)
            })
            

        },
        onPullDownRefresh() {
            this.$nextTick(() => {
                this.list = []
                this.page = 1
                this.getCollectArticle(1, this.page)
            });

        }
    }
</script>

<style lang="scss">

</style>

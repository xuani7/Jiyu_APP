<template>
    <view class="container" @touchstart="touchStart" @touchend="touchEnd">
        <navBar :title="title"></navBar>
        <Dynamic v-for="(item,index) in list" :key="item._id" :imgList="item.imgList" :avatar="item.avatar"
            :name="item.name" :publishTime="item.publishTime" :content="item.content" :isLike="item.isLike"
            :isGiveReward="item.isGiveReward" :likeNumber="item.likeNumber" :giveRewardNumber="item.giveRewardNumber"
            :chatNumber="item.chatNumber" @clickDynamic="clickDynamic(index)" @clickUser="clickUser(item.id)"
            @clickFocus="clickFocus(index)" @clickThumbsup="clickThumbsup(item.id)"
            @clickGiveReward="clickGiveReward(item.id)" @clickChat="clickChat(item.id)">
        </Dynamic>
        <loadMore mode="loading1" color="#686870" :status="status"></loadMore>
    </view>
</template>

<script>
    import navBar from '../../components/navBar.vue'
    import Dynamic from "../../components/dynamic/Dynamic.vue"
    import loadMore from "../../components/loadMore/loadMore.vue"
    import {
        methods
    } from '../../uni_modules/uview-ui/libs/mixin/mixin'
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
                status: 'normal',
                page: 1
            }
        },
        onReachBottom() {
         	this.status = 'loading';
            this.page = this.page++;
            let flag = this.getArticles(0,this.page)
            if(flag){
                this.status = "normal"
            }else{
                this.status = "down"
            }
        },
        
        methods: {
            clickDynamic(e) {
                console.log('childDynamic');
            },
            // 点击用户信息
            clickUser(e) {
                console.log(e);
                console.log('childUser');
            },
            // 点赞
            clickThumbsup(e) {
                console.log(e);
                console.log('childThumbsup');
            },
            // 点击打赏
            clickGiveReward(e) {
                console.log(e);
                console.log('clickGiveReward');
            },
            // 点击聊天
            clickChat(e) {
                console.log(e);
                console.log('clickChat');
            },
            getArticles(e, page) {
                uniCloud.callFunction({
                    name: "getArticles",
                    data: {
                        page
                    }
                }).then(res => {
                    if(res.result.data.length){
                        this.list.push(res.result.data)
                        return true
                    }else{
                        return false
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
            this.getArticles(0, this.page)
        },
        onPullDownRefresh() {
            this.getArticles(1, this.page)
        }
    }
</script>

<style lang="scss">

</style>

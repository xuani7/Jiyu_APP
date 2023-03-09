<template>
    <view class="container">
        <navBar :title="title"></navBar>
        <uni-card  v-for="(item,index) in list" :key="item._id._value">
            <image slot='cover' style="width: 100%; margin-top: 10px;" :src="item.imgList[0]"></image>
        	<text>{{item.content}}</text>
        	<template v-slot:actions>
        		<view class="card-actions">
                    <u-button class="btn" icon="trash" text="删除"  color="#FF7F66" iconColor="#FFFFFF" @click="remove(item._id._value)"></u-button>
                    <u-button class="btn" icon="edit-pen" text="修改"  color="#7ECEFD" iconColor="#FFFFFF" @click="update(item._id._value)"></u-button>
        		</view>
        	</template>
        </uni-card>
        <u-modal :show="show" :content='content' @confirm="removeArticle()" :showCancelButton="showCancelButton"></u-modal>
        <backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
        <listAdd ref="add" @clickAdd="clickAdd"/>
        <!-- <add :src="add.src" :scrollTop="add.scrollTop" :isShow="add.isShow"></add> -->
        <loadMore mode="loading1" color="#686870" :status="status" textSize="12px" textColor="#808080"></loadMore>
    </view>
</template>

<script>
    import navBar from '../../components/navBar.vue'
    import loadMore from "../../components/loadMore/loadMore.vue"
    import backTop from '@/components/back-top/back-top.vue'
    import add from "../../components/addArticle.vue"
    import listAdd from "../../components/wm-list-add/wm-list-add.vue"
    import {
        methods
    } from '../../uni_modules/uview-ui/libs/mixin/mixin'
    export default {
        components: {
            navBar,
            loadMore,
            backTop,
            add,
            listAdd
        },
        data() {
            return {
                showCancelButton:true,
                id:'',
                backTop: {
                    src: '../../static/back-top/top.png',
                    scrollTop: 0
                },
                add:{
                    src:'../../static/image/加.png',
                    scrollTop: 0,
                    isShow:true
                },
                scrollTop: 0,
                show:false,
                content:'确定要删除吗？',
                title: "文章管理",
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
            setTimeout(() => {
                this.page = ++this.page;
                this.getArticles(0, this.page)
                if (this.flag) {
                    this.status = "down"
                    this.flag = false
                } else {
                    this.status = "normal"
                }
            }, 1000)
        },
        onUnload() {
            this.list = []
        },
        methods: {
            clickAdd(){
                uni.navigateTo({
                    url:'/pages/role/add'
                })
            },
            
            async removeArticle(){
                let articleId = this.id
                this.show = false
                uniCloud.callFunction({
                    name:'removeArticle',
                    data: {articleId}
                }).then(res => {
                    this.list = []
                    this.getArticles(0, this.page)
                })
                uniCloud.callFunction({
                    name:'removeArticleInit',
                    data: {articleId}
                }).then(res => {
                    console.log(res);
                })
                

            },
            update(id){
                uni.setStorageSync("articleId",id)
                uni.navigateTo({
                    url:'/pages/role/update'
                })
            },
            remove(id){
                this.id = id
                this.show = true
                
            },
            getClickArticle(id) {
                return uniCloud.callFunction({
                    name: 'getArticleById',
                    data: {
                        "id": id
                    }
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
                    } else if (Object.keys(res.result.data).length < 5 && Object.keys(res.result.data).length >
                        0) {
                        this.flag = false
                        this.status = "normal"
                    } else {
                        this.page -= 1
                        this.flag = false
                    }
                })
                if (e === 1) {
                    uni.stopPullDownRefresh()
                }
            }
        },
        onShow() {
            this.list = []
            this.getArticles(0, this.page)
        },
        onPullDownRefresh() {
            this.$nextTick(() => {
                this.list = []
                this.page = 1
                this.getArticles(1, this.page)
            });
        }
    }
</script>

<style lang="scss">
    .card-actions{
        display: flex;
        justify-content:space-around;
        margin-bottom: 10px;
        .btn{
            padding: 20px;
            width: 120px;
            height: 40px;
        }
    }
</style>

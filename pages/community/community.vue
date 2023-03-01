<template>
    <view class="container">
        <navBar :title="title"></navBar>
		<Dynamic v-for="(item,index) in list" key="index"
		    :imgList="item.imgList" 
		    :avatar="item.avatar"
		    :name="item.name"
		    :publishTime="item.publishTime"
		    :content="item.content"
		    :isLike="item.isLike"
		    :isGiveReward="item.isGiveReward"
		    :likeNumber="item.likeNumber"
		    :giveRewardNumber="item.giveRewardNumber"
		    :chatNumber="item.chatNumber"
		    @clickDynamic="clickDynamic(index)"
		    @clickUser="clickUser(item.id)"
		    @clickFocus="clickFocus(index)"
		    @clickThumbsup="clickThumbsup(item.id)"
		    @clickGiveReward="clickGiveReward(item.id)"
		    @clickChat="clickChat(item.id)">
		</Dynamic>
    </view>
</template>

<script>
 import navBar from '../../components/navBar.vue'
import Dynamic from "../../components/dynamic/Dynamic.vue"
import { methods } from '../../uni_modules/uview-ui/libs/mixin/mixin'
    export default {
        components: {
            navBar,
			Dynamic
        },
        data() {
            return {
                title: "社区",
				list:[
				        {
				            id:1,
				            avatar:'../../static/image/维克兹.jpg',
				            name:'小新',
				            publishTime:1617086756,
				            content:'中国外交官这样讽加拿大总理，算不算骂？该不该骂？',
				            imgList:[
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				            ],
				            isLike:true,
				            isGiveReward:true,
				            likeNumber:2,
				            giveRewardNumber:2,
				            chatNumber:2,
				            isFocusOn:true,
				        },
				        
				        {
				            id:2,
				            avatar:'../../static/image/维克兹.jpg',
				            name:'小白',
				            publishTime:1617036656,
				            content:'  足不出户享国内核医学领域顶级专家云诊断，“中山-联影”分子影像远程互联融合创新中心揭牌 ',
				            imgList:[
				                '../../static/image/维克兹.jpg',
				            ],
				            isLike:false,
				            isGiveReward:false,
				            likeNumber:0,
				            giveRewardNumber:0,
				            chatNumber:2,
				            isFocusOn:false,
				        },
				        {
				            id:3,
				            avatar:'../../static/image/维克兹.jpg',
				            name:'小新',
				            publishTime:1617046556,
				            content:'  外交部：一小撮国家和个人编造所谓新疆“强迫劳动”的故事，其心何其毒也！ ',
				            imgList:[
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				            ],
				            isLike:true,
				            isGiveReward:false,
				            likeNumber:4,
				            giveRewardNumber:22,
				            chatNumber:52,
				        },
				        {
				            id:4,
				            avatar:'../../static/image/维克兹.jpg',
				            name:'小龙马',
				            publishTime:1616086456,
				            content:'DCloud有800万开发者,uni统计手机端月活12亿。是开发者数量和案例最丰富的多端开发框架。 欢迎知名开发商提交案例或接入uni统计。 新冠抗疫专区案例 uni-app助力',
				            imgList:[
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				            ],
				            isLike:true,
				            isGiveReward:false,
				            likeNumber:25,
				            giveRewardNumber:0,
				            chatNumber:7,
				        },
				        {
				            id:5,
				            avatar:'../../static/image/维克兹.jpg',
				            name:'风清扬',
				            publishTime:1607086356,
				            content:'划个水',
				            imgList:[
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				                '../../static/image/维克兹.jpg',
				            ],
				            isLike:true,
				            isGiveReward:true,
				            likeNumber:3,
				            giveRewardNumber:2,
				            chatNumber:2,
				        }
				]
            }
        },
		methods: {
			clickDynamic(e){
			    console.log('childDynamic');
			},
			// 点击用户信息
			clickUser(e){
			    console.log(e);
			    console.log('childUser');
			},
			// 点击关注
			clickFocus(e){
			    this.list[e].isFocusOn = this.list[e].isFocusOn ? false : true;
			    console.log(e);
			    console.log('childUser');
			},
			// 点赞
			clickThumbsup(e){
			    console.log(e);
			    console.log('childThumbsup');
			},
			// 点击打赏
			clickGiveReward(e){
			    console.log(e);
			    console.log('clickGiveReward');
			},
			// 点击聊天
			clickChat(e){
			    console.log(e);
			    console.log('clickChat');
			}
		},
    }
</script>

<style lang="scss">
	
</style>
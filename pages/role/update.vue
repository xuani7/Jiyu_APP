<template>
	<view class="edit">	
        <view class="status_bar">
            
        </view>
		<form @submit="onSubmit">
			<view class="item">
				<textarea v-model="formValue.content" name="content" placeholder="请输入详细内容"></textarea>
			</view>
			
			<view class="item">
				<uni-file-picker 
					v-model="imageValue" 
					fileMediatype="image" 
					mode="grid"
					@success="uploadSuccess" 					
				/>
			</view>
			
			<view class="item">
				<button form-type="reset">重置</button>
				<button form-type="submit" type="primary" :disabled="inDisabled(formValue)">提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	let id;
	export default {
		data() {
			return {
				picurls:[],
				imageValue:[],
				formValue:{
					content:""
				}
			};
		},
		onLoad(e){			
			id=e.id;
			this.getDetail();
		},
		methods:{
			//图片上传成功
			uploadSuccess(e){				
				this.picurls=e.tempFilePaths
			},
			
			//获取详情
			getDetail(){
                let id = uni.getStorageSync('articleId')
				uniCloud.callFunction({
					name:"getArticleById",
					data:{
						id
					}
				}).then(res=>{					
					this.formValue.content= res.result.data[0].content
                    this.picurls = res.result.data[0].imgList
					if(!this.picurls) return;
					let urls=this.picurls.map(item=>{
						return {url:item}
					})
                    console.log(urls);
					this.imageValue=urls;
				})
			},
			
			//判断按钮是否禁用
			inDisabled(obj){
				let {title,author,content} = obj;
				let nobj={title,author,content};
				let bool= Object.keys(nobj).some((key,value)=>{
					return nobj[key]==''
				})
				return bool;
			},
			//点击提交
			onSubmit(){
                let id = uni.getStorageSync('articleId')
				let _picurls=this.imageValue.map(item=>{
					return item.url;
				})
				uniCloud.callFunction({
                    
					name:"updateArticle",
					data:{
                        id:id,
						detail:this.formValue,
						picurls:_picurls
					}
				}).then(res=>{
					uni.showToast({						
						title:"修改成功"
					})
					setTimeout(()=>{
						uni.navigateBack()
					},800)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
    
    .status_bar {
    		height: var(--status-bar-height);
    		width: 100%;
    }
.edit{
	padding:30rpx;
	.item{
		padding-bottom:20rpx;
		input,textarea{
			border:1rpx solid #eee;
			height: 80rpx;
			padding:0 20rpx;
		}
		textarea{
			height: 200rpx;
			width: 100%;
			box-sizing: border-box;
		}
		button{
			margin-bottom:20rpx;
		}
	}
}
</style>

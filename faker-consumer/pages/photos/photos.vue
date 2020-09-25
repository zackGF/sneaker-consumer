<template>
	<view>
		<!-- 引入样式 -->
		<view v-for="(pt_item, index) in photos" :key="index">
			<view class="p-item">
				<view class="title">{{ pt_item.name }}</view>
				<view class="info">{{ pt_item.info }}</view>
				<view id="p-time" class="cnow">{{ pt_item.ctime }}</view>
				<view>
					<swiper style="height: 400rpx; padding-bottom: 20rpx;text-align: center;" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item v-for="(img, index) in pt_item.fakerPhotoImages">
							<view class="b-img"><image class="s-img" :src="img.image" mode="aspectFit"></image></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view v-show="isLoadMore">
			<view :status="loadStatus" ></view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 5,
				photos: [],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				
				isLoadMore:false,
				loadStatus:'loading'
			};
		},
		methods: {
			OnShowPhotos() {
				const page = this.pageNum;
				const size = this.pageSize;
				uni.request({
					url: this.imglURL + '/fakerPhotoDesc/search/' + page + '/' + size,
					success: res => {
						// console.log(res.data.data);
						
						if(res.data.flag){
							if(res.data.data.list){
								this.photos = this.photos.concat(res.data.data.list)
								if (res.data.data.list.length<this.pageSize) {
									this.isLoadMore = true
									this.loadStatus = 'nomore'
								} else{
									this.isLoadMore = false
								}
							}else{
								this.isLoadMore = true
								this.loadStatus = 'nomore'
							}
						} else{
							this.isLoadMore = false
							if (this.pageNum>1){
								this.pageNum-=1
							}
						}						
						// this.pageNum = res.data.data.pageNum;
						// this.pageSize = res.data.data.pageSize;
						// this.photos = res.data.data.list;
					}
				});
			}
		},
		onLoad() {
			this.OnShowPhotos();
		}
	};
</script>

<style>
	.title {
		font-size: 52rpx;
	}

	.info {
		font-size: 32rpx;
	}

	.p-item {
		margin: 10rpx;
		background: rgb(248, 248, 248);
		border-radius: 20rpx;
		padding-top: 5rpx;
	}

	.title {
		margin: 20rpx;
	}

	.info {
		margin: 0 20rpx;
	}

	.cnow {
		margin: 20rpx;
		font-size: 22rpx;
		color: #999;
	}

	.b-img {
		width: 686rpx;
		height: 400rpx;
		overflow: hidden;
	}

	.s-img {
		/* margin-left: 20rpx;
		width: 686rpx; */
		width: 100%;
		height: 100%;
		object-fit: cover
	}
</style>

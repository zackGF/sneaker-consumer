<template>
	<view>
		<view style="margin: 20rpx 0 20rpx 0;">
			<view style="height: 400rpx; text-align: center;">
				<image style="max-height: 400rpx;" :src="brand.image" mode="aspectFit"></image>
			</view>
			<view class="b-name">
				{{ brand.name }}
			</view>
		</view>
		
		<view class="v_1">
			<view v-for="(good_item,index) in goods" :key="index" class="v1_item bd">
				<view @click="ShowInfo(good_item.id)">
					<view class="v_1 v_1_1">
						<image :src="good_item.image" mode=""></image>
						<view class="title">
							{{ good_item.name }}
						</view>
						<view class="info">
							{{ good_item.price }}元
						</view>
					</view>
				</view>
			</view>
			<view v-show="isLoadMore"><view :status="logoodstatus"></view></view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				pageSize:5,
				brand: {},
				goods:[],
				isLoadMore: false,
				logoodstatus: 'loading',
				goodspir:''
			}
		},
		methods: {
			ShowBrand(brandId) {
				uni.request({
					url: this.globalURL + "/fakerBrand/" + brandId,
					success: (res) => {
						// console.log(res.data.data.image);
						this.brand = res.data.data
					}
				})
			},
			ShowGoods(brandId){
				let page = this.pageNum;
				let size = this.pageSize;
				uni.request({
					url:this.globalURL+"/fakerGoods/search/"+page+"/"+size+"/"+brandId,
					success: (res) => {
						// console.log(res.data.data.list);
						if (res.data.flag) {
							if (res.data.data.list) {
								this.goods = this.goods.concat(res.data.data.list);
								if (res.data.data.list.length < this.pageSize) {
									this.isLoadMore = true;
									this.logoodstatus = 'nomore';
								} else {
									this.isLoadMore = false;
								}
							} else {
								this.isLoadMore = true;
								this.logoodstatus = 'nomore';
							}
						} else {
							this.isLoadMore = false;
							if (this.pageNum > 1) {
								this.pageNum -= 1;
							}
						}
						
						// this.pageNum = res.data.data.pageNum;
						// this.goods = res.data.data.list
					}
					
				})
			},
			ShowInfo(goodsId){
				uni.navigateTo({
					url: "../details/details?goods="+goodsId
				})
			}
		},
		onLoad(option) {
			this.goodspir = option.brand
			this.ShowBrand(option.brand)
			this.ShowGoods(option.brand)
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.isLoadMore = true;
				this.pageNum += 1;
				this.ShowGoods(this.goodspir)
			}
		}
	}
</script>

<style>
.b-name{
	margin: 0 auto;
	width: 667rpx;
	color: #000;
	font-size: 34rpx;
	line-height: 50rpx;
	text-align: center;
	margin-top: 40rpx;
}


.bd {
		border: 1px solid #f4f5f9;
		 margin:0px 0px -1px -1px;
	}

	.v_1 {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.v1_item {
		padding: 75.5rpx 0 40rpx;
	}

	.v_1_1 {
		width: 350rpx;
		height: 488rpx;
		padding: 10rpx;
		align-items: center;
		justify-content: center;
	}

	.v_1_1 image {
		width: 260rpx;
		height: 166rpx;
	}

	.title {
		height: 84rpx;
		font-size: 20rpx;
		overflow: hidden;
		padding: 0 30rpx 0 30rpx;
		line-height: 36rpx;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.info {
		height: 42rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: flex-end;
	}
</style>

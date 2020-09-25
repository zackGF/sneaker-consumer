<template>
	<view>
		<view class="head"><image :src="details.image" mode=""></image></view>
		<view class="hear_name">{{ details.name }}</view>
		<view class="head_price">
			{{ details.price }}
			<span style="font-size: 35rpx;">元</span>
		</view>
		<view class="line">
			<view class="left_line"></view>
			<view class="zi">展图</view>
			<view class="right_line"></view>
		</view>

		<view v-for="(item, index) in images" :key="index" style="margin-bottom: 20rpx;">
			<image :src="item.goodsImage" mode="widthFix" style="width: 750rpx;"></image>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			details: {},
			images: []
		};
	},
	methods: {
		DetailInfo(goodsId) {
			uni.request({
				url: this.globalURL + '/fakerGoods/' + goodsId,
				success: res => {
					this.details = res.data.data;
				}
			});
		},
		GoodsImages(goodsId) {
			uni.request({
				url: this.globalURL + '/fakerGoodsImage/' + goodsId,
				success: res => {
					this.images = res.data.data;
				}
			});
		}
	},
	onLoad(option) {
		this.DetailInfo(option.goods);
		this.GoodsImages(option.goods);
	}
};
</script>

<style>
.head {
	height: 480rpx;
	width: 750rpx;
}

.head image {
	width: 584rpx;
	height: 374rpx;
	margin: 60rpx 83rpx 0 83rpx;
}

.hear_name {
	margin: 0 auto;
	width: 667rpx;
	color: #000;
	font-size: 34rpx;
	line-height: 50rpx;
	text-align: center;
	margin-top: 40rpx;
}

.head_price {
	height: 74rpx;
	margin: 24rpx 0;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
}

.line {
	width: 750rpx;
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.left_line {
	width: 300rpx;
	height: 8rpx;
	background: -webkit-linear-gradient(right, #007aff82, #fff);
}
.right_line {
	width: 300rpx;
	height: 8rpx;
	background: -webkit-linear-gradient(left, #007aff82, #fff);
}
.zi {
	margin: 0 10rpx 0 10rpx;
	font-size: 30rpx;
}

/* .main_images{
		padding: 30px 41px 0 41px
	}
	
	.main_images image{
		width: 584rpx;
		height: 374rpx;
	} */
</style>

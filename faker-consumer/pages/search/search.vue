<template>
	<view>
		<view data-v-de0a31c6="" data-v-52c69a3a="" data-v-12cd01d4="" class="search-view" style="display: flex; justify-content: center; align-items: center;">
			<view
			@click="OnHome()"
				data-v-de0a31c6=""
				style="display: inline-block; margin: 72px 0px 72px 1px; border-top: 1px solid; border-right: 1px solid; width: 15px; height: 15px; transform: rotate(225deg);"
			></view>
			<view data-v-de0a31c6="" data-v-52c69a3a="" class="search-background-view">
				<uni-icon data-v-de0a31c6="" data-v-52c69a3a=""><i data-v-de0a31c6="" role="img" class="uni-icon-search" style="font-size: 14px;"></i></uni-icon>
				<view data-v-de0a31c6="" data-v-52c69a3a="" class="search-title">
					<view data-v-de0a31c6="" class="uni-form-item uni-column">
						<uni-input data-v-de0a31c6="" class="uni-input">
							<div class="uni-input-wrapper">
								<input maxlength="140" step="" autocomplete="off" type="" class="uni-input-input" v-model="keyword"/>
							</div>
						</uni-input>
					</view>
				</view>
			</view>
			<view
			@click="OnSearchGoods()"
				data-v-de0a31c6=""
				style="background-color: rgb(1, 194, 195); display: flex; justify-content: center; align-items: center; width: 8.5vw; height: 8.533vw; margin-left: 3vw; border-radius: 6px;"
			>
				<span data-v-de0a31c6="" style="font-size: 10px; color: rgb(255, 255, 255);">搜索</span>
			</view>
		</view>
		
		<view data-v-07559a4c="" data-v-12cd01d4="" class="hot-list">
			<view data-v-07559a4c="" class="item" v-for="(ad_item, index) in ads" :key="index">
				<view data-v-07559a4c="" @click="ShowInfo(ad_item.goodsId)">
					<image :src="ad_item.goodsImage" style="width: 260rpx;height: 166rpx;margin-top: 60rpx;" mode="aspectFit"></image>
					<!---->
					<view data-v-07559a4c="" class="productTitle">{{ ad_item.goodsName }}</view>
					<view data-v-07559a4c="" class="priceInfo">
						<view data-v-07559a4c="" class="unit-price-view">
							<view data-v-07559a4c="" class="unit">¥</view>
							<view data-v-07559a4c="" class="price">{{ ad_item.goodsPrice }}</view>
							<!---->
						</view>
						<view data-v-07559a4c="" class="soldNum">****人付款</view>
					</view>
				</view>
				<!---->
			</view>
			<view v-show="isLoadMore"><view :status="loadStatus"></view></view>
		</view>
	
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageNum: 1,
			pageSize: 7,
			keyword:'',
			ads:[],
			isLoadMore: false,
			loadStatus: 'loading',
		};
	},
	onReachBottom() {
		if (!this.isLoadMore) {
			this.isLoadMore = true;
			this.pageNum += 1;
			this.OnLoadGoods(this.keyword);
		}
	},
	methods: {
		OnHome(){
			uni.switchTab({
				url:"../index/index"
			})
		},
		OnLoadGoods(keyword){
			// console.log(keyword);
			const page = this.pageNum;
			const size = this.pageSize;
			// const query = this.keyword
			uni.request({
				url: this.globalURL + '/fakerAds/search/',
				method:'POST',
				data:{
					currentPage:page,
					pageSize:size,
					queryString:keyword
				},
				success: res => {
					// console.log(res.data.data.rows);
					if (res.data.flag) {
						if (res.data.data.rows) {
							this.ads = this.ads.concat(res.data.data.rows);
							if (res.data.data.rows.length < this.pageSize) {
								this.isLoadMore = true;
								this.loadStatus = 'nomore';
							} else {
								this.isLoadMore = false;
							}
						} else {
							this.isLoadMore = true;
							this.loadStatus = 'nomore';
						}
					} else {
						this.isLoadMore = false;
						if (this.pageNum > 1) {
							this.pageNum -= 1;
						}
					}
				}
			});
		},	
		
		OnSearchGoods(){
			uni.navigateTo({
				url:'../search/search?keyword='+this.keyword
			})
		}
	},
	onLoad(option) {
		// console.log(option.keyword);
		this.OnLoadGoods(option.keyword)
		this.keyword = option.keyword
	}
};
</script>

<style>
.search-view[data-v-52c69a3a] {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	padding-top: 2.133vw;
	width: 100%;
	height: 11.733vw;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	background: #fff;
}
.search-background-view[data-v-52c69a3a] {
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	margin-left: 0.333vw;
	padding-left: 4vw;
	background: #f5f5f9;
	border-radius: 0.4vw;
	width: 74.933vw;
	height: 8.533vw;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
}
.search-title[data-v-52c69a3a] {
	margin-left: 2vw;
	font-family: PingFang-SC-Regular;
	font-size: 3.733vw;
	color: #aab;
}

.index-series[data-v-52c69a3a] {
	padding-left: 4.8vw;
	padding-top: 0.533vw;
	width: 5.6vw;
	height: 7.467vw;
}
uni-image {
	display: inline-block;
	overflow: hidden;
	position: relative;
}

.declaration[data-v-7ca3fdb1] {
	padding: 0 5.333vw;
	height: 12.267vw;
	/* display: -webkit-box; */
	/* display: -webkit-flex; */
	display: -ms-flexbox;
	display: flex;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-align: center;
	/* -webkit-align-items: center; */
	-ms-flex-align: center;
	align-items: center;
	background: #fff;
	border-bottom: #f5f5f9 solid 0.5px;
}

.item[data-v-7ca3fdb1] {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	font-family: PingFangSC-Medium;
	font-size: 3.067vw;
	color: #14151a;
	letter-spacing: 0.667vw;
	line-height: 4.267vw;
}
.item image[data-v-7ca3fdb1] {
	width: 4.533vw;
	height: 4.533vw;
	margin-right: 1.6vw;
}

.series-view[data-v-2a07f489] {
	margin-top: 0.267vw;
	margin-bottom: 0.267vw;
	background-color: #fff;
	overflow: hidden;
}

.series-cell[data-v-2a07f489]:first-child {
	padding-left: 5.333vw;
}
.series-cell[data-v-2a07f489] {
	-webkit-box-flex: 0;
	-webkit-flex: 0 0 13.333vw;
	-ms-flex: 0 0 13.333vw;
	flex: 0 0 13.333vw;
	padding: 0 6vw;
	height: 19.733vw;
	display: -webkit-inline-box;
	display: -webkit-inline-flex;
	display: -ms-inline-flexbox;
	display: inline-flex;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-webkit-justify-content: center;
	-ms-flex-pack: center;
	justify-content: center;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
	max-width: 25%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}
.series-image[data-v-2a07f489] {
	width: 13.333vw;
	height: 8.533vw;
}
.series-text[data-v-2a07f489] {
	width: 20vw;
	color: #000;
	margin-top: 2vw;
	font-family: PingFangSC-Semibold;
	font-size: 2.933vw;
	text-align: center;
}

.hot-list[data-v-07559a4c] {
	margin-top: 16rpx;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-flex-wrap: wrap;
	-ms-flex-wrap: wrap;
	flex-wrap: wrap;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #f5f5f9;
}

.item[data-v-07559a4c]:nth-child(odd) {
	border-right: #f5f5f9 solid 0.267vw;
}

.item[data-v-07559a4c] {
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	text-align: center;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	width: 50%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom: #f5f5f9 solid 0.267vw;
}

.item[data-v-07559a4c] {
	position: relative;
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	text-align: center;
	-webkit-box-orient: vertical;
	-webkit-box-direction: normal;
	-webkit-flex-direction: column;
	-ms-flex-direction: column;
	flex-direction: column;
	width: 50%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom: #f5f5f9 solid 0.267vw;
}

.productImage[data-v-07559a4c] {
	width: 34.667vw;
	height: 22.133vw;
	margin-top: 10.667vw;
}

.productImage {
	width: 320px;
	height: 240px;
	display: inline-block;
	overflow: hidden;
	position: relative;
}

.productTitle[data-v-07559a4c] {
	margin-top: 6.667vw;
	font-size: 3.733vw;
	text-align: left;
	font-family: PingFangSC-Thin;
	letter-spacing: 0.5px;
	padding-left: 4vw;
	padding-right: 4vw;
	line-height: 1.2em;
	height: 2.4em;
	overflow: hidden;
	color: #000;
}

.priceInfo[data-v-07559a4c] {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	-ms-flex-direction: row;
	flex-direction: row;
	-webkit-box-pack: justify;
	-webkit-justify-content: space-between;
	-ms-flex-pack: justify;
	justify-content: space-between;
	margin-left: 4vw;
	margin-right: 4vw;
	margin-top: 2.667vw;
	margin-bottom: 5.333vw;
	-webkit-box-align: center;
	-webkit-align-items: center;
	-ms-flex-align: center;
	align-items: center;
}

.unit-price-view[data-v-07559a4c] {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-webkit-flex-direction: row;
	-ms-flex-direction: row;
	flex-direction: row;
	-webkit-box-align: baseline;
	-webkit-align-items: baseline;
	-ms-flex-align: baseline;
	align-items: baseline;
}
.unit[data-v-07559a4c] {
	font-family: HelveticaNeue-CondensedBold;
	font-size: 2.933vw;
	color: #14151a;
	letter-spacing: 0;
}
.price[data-v-07559a4c] {
	font-size: 4vw;
	font-family: HelveticaNeue-CondensedBold;
	color: #14151a;
	line-height: 4vw;
	margin-left: 0.667vw;
}
.priceInfo .soldNum[data-v-07559a4c] {
	font-family: PingFangSC-Light;
	color: #7f7f8e;
	font-size: 2.933vw;
	letter-spacing: 0;
}
</style>

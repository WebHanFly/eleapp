<template>

<div class="ratings" ref="ratings">
	<div class="ratings-content">
		<div class="overview">
			<div class="overview-left">
				<h1 class="score">{{seller.score}}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="overview-right">
				<div class="score-wrapper">
					<span class="title">服务态度</span>
					<star :size="36" :score="seller.serverScore"></star>
					<span>{{seller.serverScore}}</span>
				</div>
				<div class="score-wrapper">
					<span class="title">商品评分</span>
					<star :size="36" :score="seller.foodScore"></star>
					<span>{{seller.foodScore}}</span>
				</div>
				<div class="delivery-wrapper">
					<span class="title">送达时间</span>
					<span class="delivery">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<split></split>
		<ratingSelect :select-type="selectType" :only-content="myonlyContent" :ratings="ratings" v-on:increment="changeselectType"></ratingSelect>
		<div class="rating-wrapper">
			<ul>
				<li v-for="(rating,index) in ratings" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
					<div class="avatar">

						<img :src="rating.avatar" width="28" height="28">
					</div>
					<div class="content">
						<h1 class="name">{{rating.username}}</h1>
						<div class="star-wrapper">
							<star :size="24" :score="rating.score"></star>
							<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
						</div>
						<p class="text">{{rating.text}}</p>
						<div class="recommend" v-show="rating.recommend && rating.recommend.length">
							<span class="icon_up"></span>
							<span v-for="(item,index) in rating.recommend" class="item">{{item}}</span>
						</div>
						<div class="time">{{rating.rateTime}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
  
</div>

</template>


<script type = "text/ecmascript-6">
import BScroll  from "better-scroll";
import star from '../../components/star/star';
import split from "../../components/split/split";
import ratingSelect from "../../components/ratingSelect/ratingSelect";

const ALL = 2;
const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			},
			onlyContent: false
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				myonlyContent:this.onlyContent
			};
		},
		
		created(){
			this.$http.get('api/ratings').then((response) => {
				response = response.body;
				if(response.errno == ERR_OK){
					this.ratings = response.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings,{
							click: true
						})
					})
				}
				// console.log(this.ratings);
			})
		},
		methods: {
			changeselectType(val) {    //v-on ：increment的监听事件
				if( typeof(val) === "number" ){
					this.selectType = val;
					this.$nextTick(() => {
						this.scroll.refresh();
					});
				}else{
					// console.log(val);return;
					this.onlyContent = val;
					this.$nextTick( () => {
						this.scroll.refresh();
					});
				}
			},
			needShow(type,text) {
				if(this.onlyContent && !text) {
					return false;
				}
				// console.log(this.selectType+'-----'+ALL+'------'+type);
				if(this.selectType === ALL) {
					return true;
				}else{
					return type === this.selectType;
				}
			}
		},
		components: {
			star,
			split,
			ratingSelect
		},
		// watch: {
		// 	onlyContent(val) {
		// 		// this.$emit('update:onlyContent',val);
		// 		console.log(val);
		// 		myonlyContent: val;

		// 	}
		// }
	}
</script>


<style>
.ratings {position: absolute;top: 174px;bottom: 0;width: 100%;left: 0;overflow: hidden;}
.ratings .overview {display: flex;padding: 18px 0;}
.ratings .overview .overview-left{flex: 0 0 137px;width: 137px;border-right: 1px solid rgba(7,17,27,0.1);text-align: center;padding: 6px 0;}
.ratings .overview .overview-left .score{line-height: 28px;color: rgb(255,153,0);font-size: 24px;margin-bottom: 6px;}
.ratings .overview .overview-left .title{line-height: 12px;font-size: 12px;color: rgb(7,17,27);font-weight: bold;margin-bottom: 8px;}
.ratings .overview .overview-left .rank {line-height: 10px;font-size: 10px;color: rgb(147,153,159);}
.ratings .overview .overview-right{flex:1;padding-left: 24px;}
.ratings .overview .overview-right .score-wrapper {margin-bottom: 8px;font-size: 0;}
.ratings .overview .overview-right .score-wrapper .title{line-height: 18px;font-size: 12px;color: rgb(7,17,27);display: inline-block;}
.ratings .overview .overview-right .score-wrapper .star {display: inline-block;vertical-align: top;margin: 0 12px;}
.ratings .overview .overview-right .score-wrapper  .score {display: inline-block;font-size: 12px;color: rgb(255,153,0);line-height: 18px;}
.ratings .overview .overview-right  .delivery-wrapper {
	font-size: 0;
}
.ratings .overview .overview-right  .delivery-wrapper .title {line-height: 18px;font-size: 12px;color: rgb(7,17,27);}
.ratings .overview .overview-right  .delivery-wrapper .delivery {font-size: 12px;color: rgb(147,153,159);margin-left: 12px;}
.ratings .overview .overview-left @media only screen and (max-width:320px) {
	flex:0 0 120px;width:120px;
}

.ratings .rating-wrapper {padding: 0 18px;}
.ratings .rating-wrapper .rating-item {display: flex;padding: 18px 0;border-bottom: 1px solid rgba(7,17,27,0.1);}
.ratings .rating-wrapper .rating-item .avatar {flex: 0 0 28px;width: 28px;margin-right: 12px;}
.ratings .rating-wrapper .rating-item .avatar img{border-radius: 50%;}
.ratings .rating-wrapper .rating-item .content {position: relative;flex: 1;}
.ratings .rating-wrapper .rating-item .content .name {line-height: 12px;font-size: 10px;margin-bottom: 4px;color: rgb(7,17,27);font-weight: bold;}
.ratings .rating-wrapper .rating-item .content .star-wrapper {margin-bottom: 6px;font-size: 0;}
.ratings .rating-wrapper .rating-item .content .star-wrapper .star {display: inline-block;vertical-align: top;margin-right: 6px;}
.ratings .rating-wrapper .rating-item .content .star-wrapper .delivery{display: inline-block;vertical-align: top;font-size: 10px;color: rgb(147,153,159);}
.ratings .rating-wrapper .rating-item .content  .text {line-height: 18px;color: rgb(7,17,27);font-size: 12px;}
.ratings .rating-wrapper .rating-item .content .recommend {line-height: 16px;font-size: 0;}
.ratings .rating-wrapper .rating-item .content .recommend .icon_up, .item{display: inline-block;margin: 0 8px 4px 0;font-size: 10px;}
.ratings .rating-wrapper .rating-item .content .recommend .icon_up {color: rgb(0,160,220);width: 12px;height: 12px;background:rgb(0,160,220);border-radius: 50%;vertical-align: middle; }
.ratings .rating-wrapper .rating-item .content .recommend .item {padding: 0 6px;border:1px solid rgba(7,17,27,0.1);border-radius: 1px;color: rgb(147,153,159);background: #fff;vertical-align: middle;}
.ratings .rating-wrapper .rating-item .content  .time {position: absolute;right: 0;top: 0;line-height: 12px;font-size: 10px;color: rgb(147,153,159);}
</style>
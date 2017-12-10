<template>

<transition name="move">
	<div v-show="showFlag" class="food" ref="food"> <!-- better-scroll绑在这个层上 -->
	  	<div class="food-content">
	  		<div class="image-header">
	  			<img :src="food.image"/>
	  			<div class="back" @click="hide()">
	  				<span class="arrow">&lsaquo;</span>
	  			</div>
		  		<div class="f-content">
		  			<div class="title">{{food.name}}</div>
		  			<div class="f-detail">
		  				<span class="sell-count">月售{{food.sellCount}}份</span>
		  				<span class="rating">好评率{{food.rating}}</span>
		  			</div>
		  			<div class="price">
		  				<span class="now">￥{{food.price}}</span>
						<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
		  			</div>
		  			<div class="cartcontrol-wrapper">
		  				<cartcontrol :food="food"></cartcontrol>
		  			</div>
		  			<transition name="fade">
		  				<div class="buy" v-show="!food.count || food.count === 0" @click.stop.prevent="addFirst()">加入购物车</div>
		  			</transition>
		  			
		  		</div>
		  		<split v-show="food.info"></split>
		  		<div class="info" v-show="food.info">
		  			<h1 class="title">商品信息</h1>
		  			<p class="text">{{food.info}}</p>
		  		</div>
		  		<split></split>
		  		<div class="rating">
		  			<h1 class="title">商品评价</h1>
					<ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingSelect>
		  		</div>
 			</div>
	  	</div>
	</div>
</transition>
</template>


<script type = "text/ecmascript-6">
import BScroll  from "better-scroll";
import Vue from "Vue";
import cartcontrol from "../../components/cartcontroll/cartcontroll";
import split from "../../components/split/split";
import ratingSelect from "../../components/ratingSelect/ratingSelect";

// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					ALL: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods: {
			show() {    //被外部调用，不用'_' 私有的方法需要带下划线；
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click : true
						});
					}else{
							this.scroll.refresh();
						}
				});
			},
			hide() {
				this.showFlag = false;
			},
			addFirst() {
				if(!event._constructed){
					return;
				}

				if(!this.food.count){
					Vue.delete(this.food, 'count');  
					Vue.set(this.food, 'count', 1);
					// this.food.count = 1;
				}
			}

		},
		components: {
			cartcontrol,
			split,
			ratingSelect
		}
	}
</script>


<style>
.food {position:  fixed;left: 0;top: 0;bottom: 48px;z-index: 30;background: #fff;width: 100%;transform: translate3d(0,0,0);}
.move-enter-active, .move-leave-active {transition: all 0.2s linear;}
.move-enter {transform: translate3d(100%,0,0);}
.move-leave-to {transform: translate3d(100%,0,0);}


.food .food-content .image-header {position: relative;width: 100%;height: 0;padding-top: 100%;/*此处是根据盒子的宽度来计算padding的高度值*/}
.food .food-content .image-header img {position: absolute;top: 0;left: 0;width: 100%;height: 100%;}
.food .food-content .image-header .back {position: absolute;top: 10px;left: 0;}
.food .food-content .image-header .back .arrow {display: block;padding: 10px;color:rgb(0,160,220);font-size: 50px;line-height: 20px;}
.food .food-content .f-content {padding: 18px;position: relative;}
.food .food-content .f-content .title {line-height: 14px;font-weight: bold;margin-bottom: 8px;font-size: 14px;color: rgb(7,17,27);}
.food .food-content .f-content .f-detail {margin-bottom: 18px;line-height: 10px;font-size: 0;height: 10px;}
.food .food-content .f-content .f-detail .sell-count , .rating{font-size: 10px;color: rgb(147,153,159);}
.food .food-content .f-content .f-detail .sell-count {margin-right: 12px;}
.food .food-content .f-content   .price{
	font-weight: 700;line-height: 24px;
}
.food .food-content .f-content  .price .now{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.food .food-content .f-content  .price .old{
	text-decoration: line-through;
	margin-right: 8px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food .food-content .f-content .cartcontrol-wrapper {position: absolute;right: 12px;bottom: 12px;}
.food .food-content .f-content .buy {position: absolute;right: 18px;bottom: 20px;z-index: 10;line-height: 24px;height: 24px;padding: 0 12px;box-sizing: border-box;font-size: 10px;border-radius: 12px;color: #fff;background: rgb(0,160,220);opacity:1;}
.food .food-content .f-content .fade-enter-active {transition: all 0.4s; }
.food .food-content .f-content .fade-leave-active {transition: all 0.4s; }
.food .food-content .f-content .fade-enter {opacity: 0}
.food .food-content .f-content .fade-leave-to {opacity: 0}

.food .food-content  .info {padding: 18px;}
.food .food-content  .info .title {line-height: 14px;margin-bottom: 6px;font-size: 14px;color: rgb(7,17,27);}
.food .food-content  .info .text {color: rgb(77,85,93);line-height: 24px;padding: 0 8px;font-size: 12px;}
.food .food-content .rating {padding-top: 18px;}
.food .food-content .rating .title {line-height: 14px;margin-left: 18px;font-size: 14px;color: rgb(7,17,27);}
</style>
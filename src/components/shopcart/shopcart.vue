<template>

<div class="shopcart">
  	<div class="content" @click="toggleList">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo" :class="{'highlight':totalCount>0}">
  					<span class="icon-shopping_cart" :class="{'highlight':totalCount>0}">购</span>
  				</div>
  				<div class="num" v-show="totalCount>0">{{totalCount}}</div>
  			</div>
  			<div class="price" :class="{'highlight':totalPrice>0}">
  				￥{{totalPrice}}
  			</div>
  			<div class="desc">
  			另需配送费￥{{deliveryPrice}}元
  			</div>
  		</div>
  		<div class="content-right">
  			<div class="pay" :class="payClass">
  				{{payDesc}}
  			</div> <!-- 绑定一个计算属性 -->
  		</div>
  	</div>
  	<div class="ball"></div>  <!-- 动画球效果 -->
  	<transition name="fold">
	<div class="shopcart-list" v-show="listShow">
		<div class="list-header">
			<div class="title">购物车</div>
			<sapn class="empty">清空</sapn>
		</div>
		<div class="list-content">
			<ul>
				<li class="food" v-for="(food,index) in selectFoods" v-show="food.count>0">
					<!-- {{food}} -->
					<span class="name">{{food.name}}</span>
					<div class="price">
						<span>￥{{food.price*food.count}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
				</li>
			</ul>
		</div>
	</div>	
	</transition>					
</div>

</template>


<script type = "text/ecmascript-6">
import cartcontrol from "../../components/cartcontroll/cartcontroll";
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			},
			
		},
		data() {
			return {
				fold: true
			}
			
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food)=>{
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0){
					return '￥'+this.minPrice+'元起送';
				}else if(this.totalPrice<this.minPrice){
					let diff = this.minPrice - this.totalPrice;
					return '还差￥'+diff+'元起送';
				}else{
					return '去结算';
				}
			},
			payClass() {
				if(this.totalPrice < this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			},
			listShow() {
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				return show;
			}
		},
		components: {
			cartcontrol
		},
		methods: {
			toggleList() {
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			}
		}
	}
</script>


<style>
.shopcart {position: fixed;left: 0;bottom: 0;z-index: 50;width: 100%;height: 48px;}
.shopcart .content {display: flex;background: #141d27;}
.shopcart .content .content-left{
	flex: 1;
	font-size: 0;
}
.shopcart .content .content-left .logo-wrapper{display: inline-block;position: relative;top: -10px;margin: 0 12px;padding: 6px;width: 56px;height: 56px;box-sizing: border-box;vertical-align: top;border-radius: 50%;background: #141d27;}
.shopcart .content .content-left .logo-wrapper .logo {width: 100%;height: 100%;border-radius: 50%;background: #2b343c;text-align: center;}
.shopcart .content .content-left .logo-wrapper .highlight {background: rgb(0,160,220);}
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {font-size: 24px;color: #80858a;line-height: 44px;}

.shopcart .content .content-left .logo-wrapper .logo .highlight{color: #fff;}
.shopcart .content .content-left .logo-wrapper .num {
	position: absolute;top: 0;right: 0;width: 24px;
	height: 16px;line-height: 16px;
	text-align: center;
	color: #fff;
	font-size: 9px;
	border-radius: 16px;
	background: rgb(240,20,20);
	box-shadow: rgba(0,0,0,0.4);
}
.shopcart .content .content-left .logo-wrapper .numblock{display: none;}
.shopcart .content .content-left .price{display: inline-block;vertical-align: top;line-height: 24px;margin-top: 12px;box-sizing: border-box;padding-right: 12px;border-right: 1px solid rgba(255,255,255,0.2);font-size: 16px;font-weight: 700;color: rgba(255,255,255,0.5);}
.shopcart .content .content-left .highlight {color: #fff;}
.shopcart .content .content-left .desc{display: inline-block;font-size: 12px;font-weight: 700;color: rgba(255,255,255,0.5);vertical-align: top;margin: 18px 0 0 12px;}
.shopcart .content .content-right{
	flex: 0 0 105px;
	width: 105px;
	background: #2b333b;
}
.shopcart .content .content-right .pay{font-size: 12px;height: 48px;line-height: 48px;color: #80858a;font-weight: 900;text-align: center;}
.shopcart .content .content-right .not-enough{background: #2b333b;}
.shopcart .content .content-right .enough {background: #00b43c;color: #fff;}


.shopcart .shopcart-list {position: absolute;z-index: -1;width: 100%;left: 0;transform: translate3d(0,-100%,0);top: 0%;}



.shopcart .fold-enter-active{transition: all 0.5s;}
.shopcart .fold-leave-active{transition: all 0.5s;}
.shopcart .fold-enter, .fold-leave-to{transform: translate3d(0,0,0);}
/*.shopcart .fold-enter-to, .fold-leave-to{-webkit-transform:  translate3d(0,0,0);transform: translate3d(0,0,0);}*/
/*.shopcart   .fold-leave-to  {-webkit-transform:  translate(0,-100%);transform: translate(0,-100%);}*/



.shopcart .shopcart-list .list-header {height: 40px;line-height: 40px;padding: 0 18px;background-color: #f3f5f7;border-bottom: 1px solid rgba(7,17,27,0.1);}
.shopcart .shopcart-list .list-header .title {float: left;font-size: 14px;color: rgb(7,17,27)}
.shopcart .shopcart-list .list-header .empty {float: right;font-size: 12px;color: rgb(0,160,220);}
.shopcart .shopcart-list .list-content {padding: 0 18px;max-height: 217px;background-color: #fff;overflow: hidden;}
</style>
<template>

<div class="shopcart">
  	<div class="content">
  		<div class="content-left">
  			<div class="logo-wrapper">
  				<div class="logo">
  					<span class="icon-shopping_cart">购</span>
  				</div>
  			</div>
  			<div class="price">
  				￥{{totalPrice}}
  			</div>
  			<div class="desc">
  			另需配送费￥{{deliveryPrice}}元
  			</div>
  		</div>
  		<div class="content-right">
  			<div class="pay">
  				￥{{minPrice}}元起送
  			</div>
  		</div>
  	</div>
</div>

</template>


<script type = "text/ecmascript-6">
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [
						{
							price:20,
							count:5
						}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				})
				return total;
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
.shopcart .content .content-left .logo-wrapper .logo .icon-shopping_cart {font-size: 24px;color: #80858a;line-height: 44px;}
.shopcart .content .content-left .price{display: inline-block;vertical-align: top;line-height: 24px;margin-top: 12px;box-sizing: border-box;padding-right: 12px;border-right: 1px solid rgba(255,255,255,0.2);font-size: 16px;font-weight: 700;color: rgba(255,255,255,0.5);}
.shopcart .content .content-left .desc{display: inline-block;font-size: 12px;font-weight: 700;color: rgba(255,255,255,0.5);vertical-align: top;margin: 18px 0 0 12px;}
.shopcart .content .content-right{
	flex: 0 0 105px;
	width: 105px;
	background: #2b333b;
}
.shopcart .content .content-right .pay{font-size: 12px;height: 48px;line-height: 48px;color: #80858a;font-weight: 900;text-align: center;}
</style>
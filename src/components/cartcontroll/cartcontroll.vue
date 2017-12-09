<template>

<div class="cartcontrol">
	
		<div class="cart-decreace"  @click="decrease">
			<transition name="fade">
				<div class="inner" v-show="calculate"><i>-</i></div>
			</transition>
		</div>
	
	<div class="cartcount" v-show="calculate">{{food.count}}</div>

	<div class="cart-add" @click="addCart"><span><i>+</i></span></div>
</div>

</template>


<script type = "text/ecmascript-6">
import Vue from "Vue";   //来检测count的数量的额改变及时渲染dom
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created() {
			// 
			// .log(this.food);
		},
		computed: {
			calculate() {
				return this.food.count;
			}
		},
		methods: {
			addCart(event) {
				if(!event._constructed){
					return;
				}
				// console.log('click');
				// console.log(this.food.count);
				if(!this.food.count){
					Vue.delete(this.food, 'count');  
					Vue.set(this.food, 'count', 1);
					// this.food.count = 1;
				}else{
					this.food.count++;
					let foodCount = this.food.count;  
        			Vue.delete(this.food, 'count');  
          			Vue.set(this.food, 'count', foodCount); 
				}
				
			},
			decrease(event) {
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
					let foodCount = this.food.count;  
        			Vue.delete(this.food, 'count');  
          			Vue.set(this.food, 'count', foodCount); 
				}
				// console.log(this.food.count);
			},
			
		}
	}
</script>


<style>
.cartcontrol {font-size: 0}

.cartcontrol .cart-decreace{font-size: 24px;line-height: 24px;padding: 2px;display: inline-block;}
.cartcontrol .cart-decreace .inner {border: 1px solid rgb(0,160,220);width: 16px;height: 16px;border-radius: 50%; transform: rotate(180deg);background: #fff;opacity: 1;}
.cartcontrol .cart-decreace .inner i {position: relative;top: -6px;right: -3px;color: rgb(0,160,220);}

/*旋转效果*/
.cartcontrol .fade-enter-active{transition: all 0.4s; }
.cartcontrol .fade-leave-active{transition: all 0.4s; }
.cartcontrol .cart-decreace .fade-enter {transform:rotate(0deg);opacity: 0;transform: translateX(60px);} 
.cartcontrol .cart-decreace .fade-leave-to {transform:rotate(0deg);opacity: 0;transform: translateX(26px);}



.cartcontrol .cartcount {display: inline-block;vertical-align: top;width: 12px;padding: 4px 10px 0 10px;line-height: 24px;text-align: center;font-size: 16px;}
.cartcontrol .cart-add {font-size: 24px;line-height: 24px;padding: 6px;color: rgb(0,160,220);display: inline-block;}
.cartcontrol .cart-add span {border: 1px solid rgb(0,160,220);display: inline-block;width: 16px;height: 16px;border-radius: 50%;background:rgb(0,160,220) }
.cartcontrol .cart-add span i {position: relative;top: -3px;color: #fff;}
</style>
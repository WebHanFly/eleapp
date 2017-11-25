<template>

<div class="cartcontrol">
	<transition name="fade">
		<div class="cart-decreace" v-show="calculate()" @click="decrease">
			<span class="inner"><i>-</i></span>
		</div>
	</transition>
	<div class="cartcount" v-show="calculate()">{{food.count}}</div>

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
			// console.log(this.food);
		},
		// computed() {

		// },
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
			calculate() {
				return this.food.count;
			}

		}
	}
</script>


<style>
.cartcontrol {font-size: 0}

.cartcontrol .cart-decreace{font-size: 24px;line-height: 24px;padding: 2px;display: inline-block;}
.cartcontrol .cart-decreace span {border: 1px solid rgb(0,160,220);display: inline-block;width: 16px;height: 16px;border-radius: 50%;background:#fff; }
.cartcontrol .cart-decreace span i {position: relative;top: -6px;right: -3px;color: rgb(0,160,220);}
.cartcontrol .fade-enter-active, .fade-leave-active{
  transition: all 0.3s ease ;transform:translate3d(0,0,0);background: #fff;
}
.cartcontrol .fade-enter, .fade-leave-active{
  transform: translate3d(24px ,0 ,0);background: #fff;
}
.cartcontrol .cart-decreace .fade-enter-active, .fade-leave-active .inner{transition: all 0.3s ease;transform:rotate(0);}
.cartcontrol .cart-decreace .fade-enter, .fade-leave-active .inner{transform:rotate(180);} 
.cartcontrol .cartcount {display: inline-block;vertical-align: top;width: 12px;padding: 4px 10px 0 10px;line-height: 24px;text-align: center;font-size: 16px;}
.cartcontrol .cart-add {font-size: 24px;line-height: 24px;padding: 6px;color: rgb(0,160,220);display: inline-block;}
.cartcontrol .cart-add span {border: 1px solid rgb(0,160,220);display: inline-block;width: 16px;height: 16px;border-radius: 50%;background:rgb(0,160,220) }
.cartcontrol .cart-add span i {position: relative;top: -3px;color: #fff;}
</style>
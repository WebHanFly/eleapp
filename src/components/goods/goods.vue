<template>

<div class="goods">

  	<div class="menu-wrapper"  ref="menuWrapper"> <!--  -->
  		<ul>
  			<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
  				<span class="text">
  					<!-- {{currentIndex}} -->
  					<span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
  					{{item.name}}
  				</span>
  			</li>
  		</ul>
  	</div>
  	<div class="foods-wrapper" ref="foodsWrapper"> <!--  -->
  		<ul>
  			<li v-for="item in goods" class="food-list food-list-hook">
  				<h1 class="title">{{item.name}}</h1>
  				<ul>
  					<li @click="selectFood(food,$event)" v-for="(food, index) in item.foods" class="food-item" >
  						<!-- {{food.name+food.count}} -->
  						<div class="icon">
  							<img :src="food.icon" alt="" width="57">
  						</div>
						<div class="content">
							<h2 class="name">{{food.name}}</h2>
							<p class="desc">{{food.description}}</p>
							<div class="extra">
								<span class="count">月售{{food.sellCount}}</span>
								<span>好评率{{food.rating}}</span>
							</div>
							<div class="price">
								<span class="now">￥{{food.price}}</span>
								<span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
							</div>
							<!-- 引入“+ cartcontrol-”组件 -->
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>  <!-- 通过子组件改变了父级的对象的属性，增加了food.count属性 -->
							</div>
							
						</div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
	
  	<shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
  	</shopcart> <!-- shopcart components组件 --> <!-- 传递配送费参数 -->
  	<food :food="selectedFood" ref="food"></food>
</div>
	
</template>


<script type = "text/ecmascript-6">
import BScroll  from "better-scroll";
import shopcart from "../../components/shopcart/shopcart";
import food from "../../components/food/food";
import cartcontrol from "../../components/cartcontroll/cartcontroll";
const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				goods:[],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			}
		},

		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('api/goods').then((response)=> {
				response = response.body
				if(response.errno === ERR_OK){
					this.goods = response.data;
					// console.log(this.goods)  所有商品列表对象
					this.$nextTick(()=>{  //初始化dom之前需要计算高度
						this._initScroll();
						this._calculateHeight();
						// this.selectFoods();
						// console.log(this.listHeight);
					})
					
				}
			}) 
		},
		computed: {
			currentIndex() {
				for(let i=0;i<this.listHeight.length;i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					// console.log(height1+"-------"+height2);
					// console.log(scrollY);
					if(!height2 || 	(this.scrollY>=height1 && this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach((good)=>{   //遍历goods下的foods，有count属性，点击cartcontroll组件会使foods.count +1;
					// console.log(good.foods);
					good.foods.forEach((food)=>{
						  // console.log(food);//所有商品的食物对象的数量。
						if(food.count>=0){
						foods.push(food)
						}
					});
				});
				return foods; 
			}
		},

		methods: {
			
			_initScroll() {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {
					click:true
				})
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					probeType:3,  //probeType: 3,其作用就是实时获取y值，相当于探针的作用
					click:true   //better-scroll点击事件开启，PC会算两侧，要传递event事件
				}),
				this.foodsScroll.on('scroll',(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));   //7-7节
				});

			},
			// 获取到区块的高度
			_calculateHeight() {
				// console.log(this.$refs.foodsWrapper)
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); //获取到每个food list的li
				// console.log(foodList);
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				// console.log(this.listHeight);
				}
			},
			selectMenu(index,event) {
				if(!event._constructed){
					return false; //pc点击事件只执行一次。
				}
				// console.log(index);
				let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);//滚动到index的位置。
			},
			selectFood(food,event) {
				if(!event._constructed){
					return false;
				}
				this.selectedFood = food;
				// console.log(this.$refs.food);
				this.$refs.food.show();
			}

		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	}
</script>


<style>
.goods{
	display: flex;
	overflow: hidden;
	position: absolute;
	width: 100%;
	top: 174px;
	bottom:46px;
}
.goods .menu-wrapper{
	flex: 0 0 80px;
	width: 80px;
	background: #f3f5f7;
}
.goods .foods-wrapper{
	flex:1;
}


.menu-wrapper .menu-item {
	display: table;
	height: 54px;
	width: 56px;
	line-height: 14px;
	padding: 0 12px;

}

.menu-wrapper .menu-item .decrease {
	background: url("../../../resource/img/decrease_1@2x.png");
	
}
.menu-wrapper .menu-item .discount{
	background: url("../../../resource/img/discount_1@2x.png");
}
.menu-wrapper .menu-item  .guarantee {
	background: url("../../../resource/img/guarantee_1@2x.png");
}
.menu-wrapper .menu-item  .invoice {
	background: url("../../../resource/img/invoice_1@2x.png");
}
.menu-wrapper .menu-item .special {
	background: url("../../../resource/img/special_1@2x.png");
}
.menu-wrapper .menu-item .icon {
	display: inline-block;
	vertical-align: -2px;
	width: 12px;
	height: 12px;
	margin-right: 2px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.menu-wrapper .menu-item  .text {font-size: 12px;
	display: table-cell;
	width: 56px;
	vertical-align: middle;
	border-bottom: 1px solid rgba(7,17,27,0.1);
}
.menu-wrapper .current {background: #fff;position: relative;margin-top: -1px;z-index: 10;font-weight: 700;}
.menu-wrapper .current .text {border: none;}
.foods-wrapper {flex: 1}
.foods-wrapper .title {padding-left: 14px;
height: 26px;line-height: 26px;border-left:2px solid #d9dde1;font-size: 12px;color: rgb(147,153,159);background: #f3f7fe;}
.foods-wrapper .food-item{
	display: flex;
	margin: 18px;
	border-bottom: 1px solid rgba(7,17,27,0.1);
	padding-bottom: 18px;
}
.foods-wrapper .food-item:last-child{border-bottom:none;margin-bottom: 0;}
.foods-wrapper .food-item .icon {flex:0 0 57px;
margin-right: 10px;}
.foods-wrapper .food-item .content {flex: 1;position: relative;}
.foods-wrapper .food-item .content .name {margin: 2px 0 8px 0; height: 14px; line-height: 14px; font-size: 14px; font-weight: 700; color: rgb(7,17,27)}
.foods-wrapper .food-item .content .desc,.extra{
	
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.foods-wrapper .food-item .content .desc {margin-bottom: 8px;line-height: 12px;}
.foods-wrapper .food-item .content .extra {
	
}
.foods-wrapper .food-item .content .extra .count {
	margin-right: 12px;
}
.foods-wrapper .food-item .content .price{
	font-weight: 700;line-height: 24px;
}
.foods-wrapper .food-item .content .price .now{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.foods-wrapper .food-item .content .price .old{
	text-decoration: line-through;
	margin-right: 8px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.foods-wrapper .food-item .content .cartcontrol-wrapper {position: absolute;bottom: -10px;right: 0;}
</style>
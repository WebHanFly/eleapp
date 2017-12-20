<template>

<div class="seller" ref="seller">
	<div class="seller-content">
		<div class="overview">
			<h1 class="title">{{seller.name}}</h1>
			<div class="desc">
				<star :size="36" :score="seller.score" class="star"></star>
				<span class="text">({{seller.ratingCount}})</span>
				<span class="text">月售{{seller.sellCount}}单</span>
			</div>
			<ul class="remark">
				<li class="block">
					<h2>起送价</h2>
					<div class="content">
						<span class="stress">{{seller.minPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>商家配送</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryPrice}}</span>元
					</div>
				</li>
				<li class="block">
					<h2>平均配送时间</h2>
					<div class="content">
						<span class="stress">{{seller.deliveryTime}}</span>分钟
					</div>
				</li>
			</ul>
			<div class="favorite">
				<span class="icon-shoucan" :class="{'active':favorite}"></span>
				<span class="text">{{favorite}}</span>
			</div>
		</div>
		<split></split>
		<div class="bulletin">
			<h1 class="title">公告与活动</h1>
			<div class="content-wrapper"><span class="content">{{seller.bulletin}}</span></div>
			<ul class="supports" v-if="seller.supports">
  					<li class="support-item" v-for="(item, index) in seller.supports">
  						<!-- {{seller.supports[index]}} -->
  						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
  						<span class="text">{{seller.supports[index].description}}</span>
  					</li>
  			</ul>
		</div>
		<split></split>
		<div class="pics">
			<h1 class="title">商家实景</h1>
			<div class="pic-wrapper" ref="picwrapper">
				<ul class="pic-list" ref="piclist">
					<li class="pic-item" v-for="(pic,index) in seller.pics">
						<img :src="pic" alt="" width="120" height="90">
					</li>
				</ul>
			</div>
		</div>
		<split></split>
		<div class="info">
			<h1 class="title">商家信息</h1>
			<ul>
				<li class="info-item" v-for="(info,index) in seller.infos">{{info}}</li>
			</ul>
		</div>
		
	</div>
  	
</div>

</template>


<script type = "text/ecmascript-6">
import star from '../../components/star/star';
import split from '../../components/split/split';
import BScroll  from "better-scroll";


const ERR_OK = 0;
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {
			return {
				favorite: false
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已收藏' : '未收藏';
			}
		},
		components: {
			star,
			split
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

		},
		watch: {
			// console.log('qqq');
			'seller'() {
				this._initScroll();
			}
		},
		methods: {
			_initScroll() {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.seller,{
						click: true
					})
				}else{
					this.scroll.refresh();
				}
			},
			_initPics() {
				if(this.seller.pics){
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth+margin)*this.seller.pics.length-margin;
					// console.log(this.$refs.piclist);
					this.$refs.piclist.style.width = width+'px';
					this.$nextTick(() => {
						this.picScroll = new BScroll(this.$refs.picwrapper,{
							scrollX: true,
							eventPassthough: 'vertical'
						});
					})
				}
			}
		},
		mounted() { //dom渲染后执行
			// console.log(this.seller);
			// this.scroll =new BScroll(this.$refs.seller,{
			// 	click: true
			// }) 
			this._initScroll();
			// console.log('aaa');
			this._initPics();

			
		}
		
	}
</script>


<style>
.seller {position: absolute;top: 174px;bottom: 0;width: 100%;left: 0;overflow: hidden;}
.seller .overview {padding: 18px;}
.seller .overview .title {margin-bottom: 8px;line-height: 14px;color: rgb(7,17,27);font-size: 14px;font-weight: 700;}
.seller .overview .desc {padding-bottom: 18px;font-size: 0;border-bottom: 1px solid rgba(7,17,28,0.1);}
.seller .overview  .desc .star {display: inline-block;margin-right: 8px;vertical-align: top;}
.seller .overview  .desc .text {margin-right: 12px;display: inline-block;vertical-align: top;font-size: 10px;color: rgb(77,86,93);line-height: 18px;}
.seller .overview .remark {display: flex;padding-top: 18px;}
.seller .overview .remark .block {flex: 1;text-align: center;border-right: 1px solid rgba(7,17,27,0.1);}
.seller .overview .remark .block:last-child {border: none;}
.seller .overview .remark .block h2 {margin-bottom: 4px;line-height: 10px;font-size: 10px;color: rgb(147,153,159);font-weight: 700;}
.seller .overview .remark .block .content {line-height: 24px;font-size: 10px;color: rgb(7,17,27);}
.seller .overview .remark .block .content .stress {font-size: 24px;}
.seller .bulletin {padding: 18px 18px 0 18px;}
.seller .bulletin .title {margin-bottom: 8px;line-height: 14px;color: rgb(7,17,27);font-size: 14px;font-weight: 700;}
.seller .bulletin  .content-wrapper {padding: 16px 12px;border-bottom: 1px solid rgba(7,17,27,0.1)}
.seller .bulletin  .content-wrapper .content {line-height: 24px;font-size: 12px;color: rgb(240,20,20)}


.seller  .supports {vertical-align: top;}
.seller  .supports .support-item {padding: 16px 12px;font-size: 0;border-bottom: 1px solid rgba(7,17,27,0.1)}
.seller  .supports .support-item:last-child {border:none;}
.seller  .supports  .decrease {
	background: url("../../../resource/img/decrease_1@2x.png");
	
}
.seller  .supports  .discount {
	background: url("../../../resource/img/discount_1@2x.png");
}
.seller  .supports  .guarantee {
	background: url("../../../resource/img/guarantee_1@2x.png");
}
.seller  .supports  .invoice {
	background: url("../../../resource/img/invoice_1@2x.png");
}
.seller  .supports  .special {
	background: url("../../../resource/img/special_1@2x.png");
}
.seller  .supports .icon{
	display: inline-block;
	vertical-align: -2px;
	width: 12px;
	height: 12px;
	margin-right: 4px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
	
	/*background-position: center;*/
}
.seller  .supports .text {font-size: 12px;line-height: 16px;color: rgb(7,17,27);}
.seller   .supports-count{
	position: absolute;right: 35px;bottom: 39px;padding: 0 8px;height: 24px;
	line-height: 24px;border-radius: 14px;background-color: rgba(0,0,0,0.2);text-align: center;
}
.seller   .supports-count .count {
	font-size: 10px;
}
.seller   .supports-count .icon-keyboard_arrow_right {font-size: 10px;}

.seller .pics {padding: 18px;}
.seller .pics .title {margin-bottom: 12px;line-height: 14px;color: rgb(7,17,27);font-size: 14px;font-weight: 700;}
.seller .pics .pic-wrapper {width: 100%;overflow: hidden;white-space: nowrap;}
.seller .pics .pic-wrapper .pic-list {font-size: 0;}
.seller .pics .pic-wrapper .pic-list .pic-item {display: inline-block;margin-right: 6px;width: 120px;height: 90px;}
.seller .pics .pic-wrapper .pic-list .pic-item:last-child {margin: 0;}
.seller .info {padding: 18px 18px 0 18px;}
.seller .info .title {padding-bottom: 8px;line-height: 14px;color: rgb(7,17,27);font-size: 14px;font-weight: 700;border-bottom: 1px solid rgba(7,17,27,0.1);}
.seller .info .info-item {border-bottom:1px solid rgba(7,17,27,0.1);padding: 16px 12px;line-height: 16px;font-size: 12px; color: rgb(7,17,27)}
.seller .info .info-item:last-child{border: none;}
</style>
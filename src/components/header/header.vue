<template>

<div id="header">
  	<div class="content-wrap">
  		<div class="avatar">
  			<img :src="seller.avatar" alt="" width="64" height="64">
  		</div>
  		<div class="content">
  			<div class="title">
  				<span class="brand"></span>
  				<span class="name">{{seller.name}}</span>
  			</div>
  			<div class="description">
  				{{seller.description}}/{{seller.deliveryTime}}分钟送达
  			</div>
  			<div v-if="seller.supports" class="supports">
  				<span class="icon" :class="classMap[seller.supports[0].type]"></span>
  				<span class="text">{{seller.supports[0].description}}</span>
  			</div>
  			<div v-if="seller.supports" class="supports-count" @click="showDetail">
  				<span class="count">{{seller.supports.length}}个</span>
  				<i class="icon-keyboard_arrow_right">></i>
  			</div>
  		</div>
  	</div>
  	<div class="bulletin-wrap" @click="showDetail">
  		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
  		<i class="icon-keyboard_arrow_right">></i>

  	</div>
  	<div class="background">
  		<img :src="seller.avatar" width="100%" height="100%">
  	</div>
  	<div class="detail" v-show="detailShow">
  	<transition name="fade">
  		<div class="detail-wrapper clearfix">
  			<div class="detail-main">
  				<h1 class="name">{{seller.name}}</h1>
  				<div class="star-wrapper">
  					<star :size="48" :score="seller.score"></star>
  				</div>
  				<!-- flex布局 -->
  				<div class="title">
  					<div class="line"></div>
  					<div class="text">优惠信息</div>
  					<div class="line"></div>
  				</div>
  				<ul class="supports" v-if="seller.supports">
  					<li class="support-item" v-for="(item, index) in seller.supports">
  						<!-- {{seller.supports[index]}} -->
  						<span class="icon" :class="classMap[seller.supports[index].type]"></span>
  						<span class="text">{{seller.supports[index].description}}</span>
  					</li>
  				</ul>
  				<div class="title">
  					<div class="line"></div>
  					<div class="text">商家广告</div>
  					<div class="line"></div>
  				</div>
  				<div class="bulletin">
  					<p class="content">{{seller.bulletin}}</p>
  				</div>
  			</div>
  		</div>
  		</transition>
  		<div class="detail-close" @click="detailClose">×</div>
  	
  	</div>
</div>

</template>


<script type = "text/ecmascript-6">
import star from '../../components/star/star'
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		data() {    //控制detailShow的是否显示
			return {
				detailShow: false
				
			}
		},
		methods: {
			showDetail(){
				this.detailShow = true
			},
			detailClose() {
				this.detailShow = false
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
		},
		components: {
			star
		}
	}
</script>


<style>


#header {color:#fff;position: relative;background-color: rgba(7,17,27,0.5);overflow: hidden;}
#header .content-wrap{padding:24px 12px 18px 24px;font-size: 0;}
#header .content-wrap .avatar {display: inline-block;vertical-align: top;border-radius: 2px;}
#header .content-wrap .content {display: inline-block;font-size: 14px;margin-left: 16px;}
#header .content-wrap .content .title {margin: 2px 0 8px 0;}
#header .content-wrap .content .title .brand {width: 30px;height: 18px;display: inline-block;background-image: url("../../../resource/img/brand@2x.png");background-size: 30px 18px;
background-repeat: no-repeat;vertical-align: top;}
#header .content-wrap .content .title .name {margin-left: 6px;font-size: 16px;line-height: 18px;font-weight: bold;}
#header .content-wrap .content .description{
	margin-bottom: 10px;line-height: 12px;font-size: 12px;
}

#header .content-wrap .content {}
#header .content-wrap .content .supports {vertical-align: top;}
#header .content-wrap .content .supports  .decrease {
	background: url("../../../resource/img/decrease_1@2x.png");
	
}
#header .content-wrap .content .supports  .discount {
	background: url("../../../resource/img/discount_1@2x.png");
}
#header .content-wrap .content .supports  .guarantee {
	background: url("../../../resource/img/guarantee_1@2x.png");
}
#header .content-wrap .content .supports  .invoice {
	background: url("../../../resource/img/invoice_1@2x.png");
}
#header .content-wrap .content .supports  .special {
	background: url("../../../resource/img/special_1@2x.png");
}
#header .content-wrap .content .supports .icon{
	display: inline-block;
	vertical-align: -2px;
	width: 12px;
	height: 12px;
	margin-right: 4px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
	
	/*background-position: center;*/
}
#header .content-wrap .content .supports .text {font-size: 10px;line-height: 12px;}
#header .content-wrap .content  .supports-count{
	position: absolute;right: 35px;bottom: 39px;padding: 0 8px;height: 24px;
	line-height: 24px;border-radius: 14px;background-color: rgba(0,0,0,0.2);text-align: center;
}
#header .content-wrap .content  .supports-count .count {
	font-size: 10px;
}
#header .content-wrap .content  .supports-count .icon-keyboard_arrow_right {font-size: 10px;}

.bulletin-wrap {height: 28px;line-height: 28px;padding: 0 22px 0 12px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.bulletin-wrap .bulletin-title {
	display: inline-block;width: 22px;height: 12px;background-image: url("../../../resource/img/bulletin@2x.png");background-size: 22px 12px;background-repeat: no-repeat;vertical-align: top;
	margin-top: 9px;
}
.bulletin-wrap .bulletin-text {font-weight: 200;font-size: 10px;margin: 0 4px;	vertical-align: top;}


.bulletin-wrap .icon-keyboard_arrow_right{position: absolute;font-size: 10px;right: 12px;bottom: 0px;}
.background{position: absolute;top: 0;left: 0;
width: 100%;height: 100%;z-index: -1;filter: blur(10px);}
.detail {position: fixed;
	top: 0;left: 0;z-index: 100;width: 100%;height: 100%;overflow: auto;
	transition: all 0.5s;
	background: rgba(7,17,27,0.8);
	backdrop-filter:blur(80px);  /*ios背景滤镜*/
}
/*fade效果*/
/*.fade-transition {
 opacity: 1;
 background: rgba(7,17,27,0.8);
 transition: all 0.5s;
}
..fade-enter-active, .fade-leave-active{
	opacity: 0;
 background: rgba(7,17,27,0);
}
*/
.fade-enter-active, .fade-leave-active{
  opacity: 1;
 background: rgba(7,17,27,0.8);    
}
.fade-enter, .fade-leave{
  opacity: 0;
  background: rgba(7,17,27,0);
}


.clearfix {}
.clearfix::after{
	content: "";display: block;height: 0;line-height: 0;clear: both;visibility: hidden;
}
.detail .detail-wrapper {min-height: 100%;width: 100%;}
.detail .detail-wrapper .detail-main {margin-top: 64px;padding-bottom: 64px;}
.detail .detail-wrapper .detail-main h1 {
	line-height: 16px;
	text-align: center;
	font-size: 16px;
	font-weight: 700;
}
.detail .detail-wrapper .detail-main .star-wrapper {margin-top: 18px;padding: 2px 0;text-align: center;}
.detail .detail-wrapper .detail-main .title{
	width: 80%;display: flex;
	margin: 28px auto 24px auto;
}
.detail .detail-wrapper .detail-main .title .line {
	flex: 1;
	position: relative;
	top: -6px;
	border-bottom: 1px solid rgba(255,255,255,0.2);

}
.detail .detail-wrapper .detail-main .title .text{
	padding: 0 12px;
	font-weight: 700;
	font-size: 14px;
}
.detail .detail-wrapper .detail-main .supports {
	width: 80%;
	margin: 0 auto;

}
.detail .detail-wrapper .detail-main .supports .support-item {
	padding: 0 12px;
	margin-bottom: 12px;
	font-size: 0;

}
.detail .detail-wrapper .detail-main .supports .support-item :last-child {
	margin-bottom: 0;
}

/*icon图片*/
.detail .detail-wrapper .detail-main .supports .support-item  .decrease {
	background: url("../../../resource/img/decrease_1@2x.png");
	
}
.detail .detail-wrapper .detail-main .supports .support-item .discount{
	background: url("../../../resource/img/discount_1@2x.png");
}
.detail .detail-wrapper .detail-main .supports .support-item  .guarantee {
	background: url("../../../resource/img/guarantee_1@2x.png");
}
.detail .detail-wrapper .detail-main .supports .support-item  .invoice {
	background: url("../../../resource/img/invoice_1@2x.png");
}
.detail .detail-wrapper .detail-main .supports .support-item  .special {
	background: url("../../../resource/img/special_1@2x.png");
}
/*.icon样式*/
.detail .detail-wrapper .detail-main .supports .support-item .icon {
	display: inline-block;
	width: 16px;
	height: 16px;
	vertical-align: top;
	margin-right: 6px;
	background-size: 16px 16px;
	background-repeat: no-repeat;

}


.detail .detail-wrapper .detail-main .supports .support-item .text {
	line-height: 12px;
	font-size: 12px;

}
.detail .detail-wrapper .detail-main .bulletin{
	width: 80%;
	margin: 0 auto;
}
.detail .detail-wrapper .detail-main .bulletin .content{
	padding: 0 12px;
	line-height: 24px;
	font-size: 12px;

}

.detail  .detail-close {position: relative;width: 32px;height: 32px;margin: -64px auto;clear: both;font-size: 32px;}
</style>
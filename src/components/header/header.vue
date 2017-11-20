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
  			<div v-if="seller.supports" class="supports-count">
  				<span class="count">{{seller.supports.length}}个</span>
  				<i class="icon-keyboard_arrow_right">></i>
  			</div>
  		</div>
  	</div>
  	<div class="bulletin-wrap">
  		<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
  		<i class="icon-keyboard_arrow_right">></i>

  	</div>
  	<div class="background">
  		<img :src="seller.avatar" width="100%" height="100%">
  	</div>
</div>

</template>


<script type = "text/ecmascript-6">
	export default {
		props: {
			seller: {
				type: Object
			}
		},
		created() {
			this.classMap = ['decrease','discount','guarantee','invoice','special'];
		}
	}
</script>


<style>


#header {color:#fff;position: relative;background-color: rgba(7,17,27,0.5);}
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
</style>
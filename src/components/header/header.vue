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
  		</div>
  	</div>
  	<div class="bulletin-wrap"></div>
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


#header {color:#fff;background: #000;}
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
#header .content-wrap .content .supports .text {font-size: 12px;line-height: 12px;}





</style>
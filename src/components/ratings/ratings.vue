<template>

<div class="ratings" ref="ratings">
	<div class="ratings-content">
		<div class="overview">
			<div class="overview-left">
				<h1 class="score">{{seller.score}}</h1>
				<div class="title">综合评分</div>
				<div class="rank">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="overview-right">
				<div class="score-wrapper">
					<span class="title">服务态度</span>
					<star :size="36" :score="seller.serverScore"></star>
					<span>{{seller.serverScore}}</span>
				</div>
				<div class="score-wrapper">
					<span class="title">商品评分</span>
					<star :size="36" :score="seller.foodScore"></star>
					<span>{{seller.foodScore}}</span>
				</div>
				<div>
					<span class="title">送达时间</span>
					<span class="delivery">{{seller.deliveryTime}}</span>
				</div>
			</div>
		</div>
	</div>
  
</div>

</template>


<script type = "text/ecmascript-6">
import star from '../../components/star/star';
	export default {
		props: {
			seller: {
				type: Object
			}
		}
	}
</script>


<style>
.ratings {position: absolute;top: 174px;bottom: 0;width: 100%;left: 0;overflow: hidden;}
.ratings .overview {display: flex;padding: 18px 0;}
.ratings .overview .overview-left{flex: 0 0 137px;width: 137px;border-right: 1px solid rgba(7,17,27,0.1);text-align: center;padding: 6px 0;}
.ratings .overview .overview-left .score{line-height: 28px;color: rgb(255,153,0);font-size: 24px;margin-bottom: 6px;}
.ratings .overview .overview-left .title{line-height: 12px;font-size: 12px;color: rgb(7,17,27);font-weight: bold;margin-bottom: 8px;}
.ratings .overview .overview-left .rank {line-height: 10px;font-size: 10px;color: rgb(147,153,159);}
.ratings .overview .overview-right{flex:1;padding-left: 24px;}

</style>
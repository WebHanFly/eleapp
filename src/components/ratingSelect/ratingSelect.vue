<template>

	<div class="ratingSelect">
	  	<div class="rating-type">
	  		{{desc.negative}}
	  		<span class="block positive">{{desc.all}}<span class="count">{{desc.positive}}</span></span>
	  		<span class="block positive">{{desc.positive}}<span class="count">57</span></span>
	  		<span class="block nagetive">{{desc.negative}}<span class="count">27</span></span>

	  	</div>
	  	<div class="switch">
	  		<span class="circle"></span>
	  		<span>只看内容的评价</span>
	  	</div>
	</div>

</template>


<script type = "text/ecmascript-6">
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '满意',
						positive: '满意',
						negative: '不满意',
					};
				}
			}
		}
	}
</script>


<style>
.ratingSelect .rating-type {padding: 18px 0;margin: 0 18px;border-bottom: 1px solid rgba(7,17,27,0.1);font-size: 0}
.ratingSelect .rating-type .block {display: inline-block;padding: 8px 12px;border-radius: 1px;margin-right: 8px;color: rgb(77,85,93);font-size: 12px;}
.ratingSelect .rating-type .positive {background: rgba(0,160,220,0.2); }
.ratingSelect .rating-type .negative {background: rgba(77,85,93,0.2);}
</style>
<template>

	<div class="ratingSelect">
	  	<div class="rating-type">
	  		<span @click="select(2,$event)" class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
	  		<span @click="select(0,$event)" class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
	  		<span @click="select(1,$event)" class="block nagetive" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>

	  	</div>
	  	<div @click="toggleContent($event)" class="switch" :class="{'on':onlyContent}">
	  		<span class="circle"><span>&nbsp√</span></span>
	  		<span class="text">只看内容的评价</span>
	  	</div>
	</div>

</template>


<script type = "text/ecmascript-6">
const POSITIVE = 0;
const NEGATIVE = 1;
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
						positive: '满意',
						all: '全部',
						negative: '不满意',
					};
				}
			}
		},
		methods: {
			select(type,event) {
				if(!event._constructed) {
					return;
				}
				this.$emit('increment',type);  //用来改变父组件监听selectType的值
				// this.$dispatch('ratingtype.select',type); //父子组件的通讯。子组件告诉父组件变化。
			},
			toggleContent(event) {
				if(!event._constructed) {
					return;
				}
				this.onlyContent = !this.onlyContent;
				this.$emit('increment',this.onlyContent);
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE; // 0 => positive
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE; // 0 => positive
				})
			}
		}
	}
</script>


<style>
.ratingSelect {}
.ratingSelect .rating-type {padding: 18px 0;margin: 0 18px;border-bottom: 1px solid rgba(7,17,27,0.1);font-size: 0}
.ratingSelect .rating-type .block {display: inline-block;padding: 8px 12px;border-radius: 1px;margin-right: 8px;color: rgb(77,85,93);font-size: 12px;}
.ratingSelect .rating-type .block .count {font-size: 8px;margin-left: 2px;line-height: 16px;}
.ratingSelect .rating-type .positive {background: rgba(0,160,220,0.2); }
.ratingSelect .rating-type .active {color: #fff;}
.ratingSelect .rating-type .active {background:rgba(0,160,220,1); }
.ratingSelect .rating-type .nagetive {background: rgba(77,85,93,0.2);}
.ratingSelect .rating-type .nagetive.active {background: rgba(77,85,93,1);}

.ratingSelect .switch {padding: 12px 18px;line-height: 24px;border-bottom: 1px solid rgba(7,17,27,0.1);color: rgb(147,153,159);}
.ratingSelect .switch .circle {background: rgba(77,85,93,0.2);border-radius: 50%; width: 16px;height: 16px;display: inline-block;position: relative;top: 3px;}
.ratingSelect .on .circle {background:rgba(0,160,220,1);border-radius: 50%; width: 16px;height: 16px;display: inline-block;position: relative;top: 3px;}

.ratingSelect .switch .circle span {font-size: 14px;margin-right: 4px;color: #fff;font-weight: bold;line-height: 6px;}
.ratingSelect .switch .text {font-size: 12px;/*height: 140px;display: inline-block;*/}
</style>
<template>
	<view class="orderBox" v-if="orderInfo.fkdbh">
		<view class="ul">
			<view class="li">
				<view class="title span">当事人姓名：</view>
				<view class="span">{{orderInfo.xingming}}</view>
			</view>
			<view class="li">
				<view class="title span">罚款单编号：</view>
				<view class="span">{{orderInfo.fkdbh}}</view>
			</view>
			<view class="li">
				<view class="title span">车牌号：</view>
				<view class="span">{{orderInfo.cph}}</view>
			</view>
			<view class="li">
				<view class="title span">认罚时间：</view>
				<view class="span">{{orderInfo.clsj}}</view>
			</view>
			<view class="li">
				<view class="title span">手机号：</view>
				<view class="span">{{orderInfo.mobile}}</view>
			</view>
			<view class="li">
				<view class="title span">滞纳金：</view>
				<view class="span">￥{{orderInfo.znj}}</view>
			</view>
			<view class="li">
				<view class="title span">服务费：</view>
				<view class="span">￥{{orderInfo.feiyong}}</view>
			</view>
			<view class="li">
				<view class="title span">罚款总金额：</view>
				<view class="span">￥{{orderInfo.total}}</view>
			</view>
			<view class="li">
				<view class="title span">订单状态：</view>
				<view class="span">{{orderInfo.wcstr}}</view>
			</view>
			<view class="li">
				<view class="title span">支付状态：</view>
				<view class="span">{{orderInfo.zfstr}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: null
			}
		},
		onLoad: function (option) {
			const {
				id
			} = option
			this.getDetail(id)
		},
		methods: {
			getDetail (id){
				const params = {
					id,
					user_id: getApp().globalData.userId,
				}
				this.$api.orderInfo(params).then(res => {
					this.orderInfo = res.data
				})
			}
		}
	}
</script>

<style lang="less">
	.orderBox{
		min-height: 100vh;
		background: #eee;
		.result{
			position: absolute;
			padding-left: 10px;
			bottom: 0;
			left: 0;
			right: 0;
			height: 50px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 16px;
			background: #ffffff;
			.submit{
				padding: 0 20px;;
			}
		}
		.price{
			color: #FFA200;
		}
		.ulTitle{
			background: #eeeeee;
			line-height: 40px;
			padding: 0 10px;
			font-size: 16px;
		}
		.ul{
			background: #fff;
			padding: 20px;
			.label{
				display: block;
			}
			.li{
				padding: 10px 0px;
				display: flex;
				align-items: center;
				.span{
					color: #333;
				}
				.title{
					width: 100px;
					padding-right: 0;
					text-align: right;
				}
			}
			.flexSpace{
				justify-content: space-between;
				.priceBox{
					display: flex;
				}
				input{
					flex: 1;
					margin-left: 30px;
					font-size: 14px;
					
				}
			}
			.fontWeight{
				font-weight: bold;
			}
		}
		.dl{
			background: #FFFFFF;
			.dt{
				background: #eeeeee;
				line-height: 40px;
				padding: 0 10px;
				font-size: 16px;
			}
			.dd{
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
				height: 35px;
				align-items: center;
			}
		}
	}
</style>

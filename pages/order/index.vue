<template>
	<view class="orderBox">
		<view class="ulTitle">
			<image mode="widthFix" src="../../static/icon1.png"></image>
			<text>处罚决定书基本信息</text>
		</view>
		<view class="ul">
			<view class="li">
				<view class="span">被处罚人：</view>
				<view class="span">{{orderInfo.dsr}}</view>
			</view>
			<view class="li">
				<view class="span">认罚时间：</view>
				<view class="span">{{orderInfo.clsj}}</view>
			</view>
			<view class="li">
				<view class="span">处罚决定书编号：</view>
				<view class="span">{{orderInfo.jdsbh}}</view>
			</view>
			<view class="li">
				<view class="span">车牌号：</view>
				<view class="span">{{orderInfo.hphm}}</view>
			</view>
			<view class="li">
				<view class="span">违法地点：</view>
				<view class="span">{{orderInfo.wfdz}}</view>
			</view>
		</view>
		<view class="ulTitle" v-if="isShow">
			<image mode="widthFix" src="../../static/icon2.png"></image>
			<text>服务费</text>
		</view>
		<view class="ul" v-if="isShow">
            <radio-group @change="radioChange">
                <label class="label" v-for="(item, index) in items" :key="item.value">
                    <view class="li flexSpace">
                    	<view class="priceBox">
                    		<view>{{item.name}}</view>
                    		<view class="span">{{item.introduction}}</view>
                    		<view class="price">￥{{item.price}}</view>
                    	</view>
                    	<view class="priceRadio">
                    		<radio :value="item.value" :checked="index === priceType" />
                    	</view>
                    </view>
                </label>
            </radio-group>
		</view>
		<view class="ulTitle" v-if="isShow">
			<image mode="widthFix" src="../../static/icon3.png"></image>
			<text>通知手机</text>
		</view>
		<view class="ul" v-if="isShow">
			<view class="li flexSpace">
				<view>手机号码</view>
				<input class="uni-input" @input="onKeyInput" type="number" placeholder="请输入手机号" />
			</view>
		</view>
		<view class="ulTitle">
			<image mode="widthFix" src="../../static/icon6.png"></image>
			<text>费用明细</text>
		</view>
		<view class="ul">
			<view class="li">
				<view class="span">罚款总金额：</view>
				<view class="span">{{orderInfo.fkje}}</view>
			</view>
			<view class="li">
				<view class="span">滞纳金：</view>
				<view class="span">{{orderInfo.znj}}</view>
			</view>
			<view class="li" v-if="isShow">
				<view class="span">服务费：</view>
				<view class="span">￥{{current ===0 ? orderInfo.jiage : orderInfo.jiaji_fee}}</view>
			</view>
		</view>
		<view class="result" v-if="isShow">
			<view class="span">
				<text>实付款：</text>
				<text class="price">{{current ===0 ? orderInfo.total : orderInfo.jiaji_total }}</text>
				<text>元</text>
			</view>
			<button @click="handleSubmit" class="submit" type="primary">提交订单</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo: getApp().globalData.orderInfo,
				isShow: getApp().globalData.isShow,
				priceType: 0,
				type: 1,
				list: [],
				items: [
					{
						value: 0,
						name: '普通',
						introduction: '',
						price: getApp().globalData.orderInfo.jiage
					},
					{
						value: 1,
						name: '加急',
						introduction: '',
						price: getApp().globalData.orderInfo.jiaji_fee
					}
				],
				current: 0
			}
		},
		onLoad: function (option) {
			const {
				id
			} = option
			console.log(id)
		},
		methods: {
			radioChange: function(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (this.items[i].value === evt.target.value) {
						this.current = i;
						break;
					}
				}
			},
			handleTab (type) {
				this.type = type
			},
			auth (auth){
				const params = {
					'auth_code': auth
				}
				this.$api.auth(params).then(res => {
					console.log(res)
				})
			},
	        onKeyInput: function(event) {
	            this.mobile = event.target.value
	        },
			handleSubmit (){
				if (!this.mobile) {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
			　　　　　})
					return false;
				}
				const params = {
					fkdbh: this.orderInfo.jdsbh,
					user_id: getApp().globalData.userId,
					jiaji: this.current,
					mobile: this.mobile,
					total: this.current ===0 ? this.orderInfo.total : this.orderInfo.jiaji_total
				}
				this.$api.pay(params).then(res => {
					my.tradePay({
					  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
						tradeNO: res.trade_no,
						success: (r) => {
							if (r.resultCode === "9000" || r.resultCode === "8000"){
								this.$api.payOver({trade_no:res.trade_no}).then(over => {
									uni.switchTab({
										url: `/pages/record/index`
									});
								})
							}
							console.log(r)
							// my.alert({
							//   content: JSON.stringify(r),
							// });
						},
						fail: (res) => {
							my.alert({
							  content: JSON.stringify(res),
							});
						}
					});
				})
			}
		}
	}
</script>

<style lang="less">
	.orderBox{
		min-height: 100vh;
		background: #eee;
		padding: 0px 20px;
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
			display: flex;
			background: #eeeeee;
			line-height: 40px;
			padding: 0 10px;
			font-size: 16px;
			align-items: center;
			image{
				width: 20px;
				height: auto;
				margin-right: 5px;
			}
			&:after{
				content: ' ';
				display: block;
				margin-left: 5px;
				flex: 1;
				border-bottom: 1px dotted #ccc;
			}
		}
		.ul{
			background: #fff;
			border-radius: 10px;
			padding: 10px 0;
			color: #333;
			.label{
				display: block;
			}
			.li{
				height: 30px;
				line-height: 30px;
				padding: 0 10px;
				display: flex;
				align-items: center;
			}
			.flexSpace{
				justify-content: space-between;
				.priceBox{
					display: flex;
				}
				input{
					flex: 1;
					margin-left: 10px;
					font-size: 14px;
					
				}
			}
			.fontWeight{
				font-weight: bold;
			}
		}
		.dl{
			background: #FFFFFF;
			border-top: 10px solid #eee;
			.dt{
				font-weight: bold;
				line-height: 30px;
				padding: 0 10px;
				font-size: 16px;
			}
			.dd{
				display: flex;
				justify-content: space-between;
				padding: 0 10px;
				height: 30px;
				align-items: center;
			}
		}
	}
</style>

<template>
	<view class="orderBox">
		<view class="auth" v-if="false">
			<view class="dl">
				<view class="dt"></view>
				<view class="dd"></view>
			</view>
			<button @click="getAuth">
			    点击授权
			</button>
		</view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" :active-color="color()">
		</uni-segmented-control>
		<view class="orderCont" v-if="list && list.length">
			<view class="orderItem" @click="goDetail(item.id)" v-for="item in list">
				<view class="orderName">罚单号:{{item.fkdbh}}</view>
				<view class="orderDes">订单号:{{item.ordersn}}</view>
				<view class="orderPrice">
					<text>￥{{item.total}}</text>
					<text class="state">{{item.wcstr}}</text>
				</view>
			</view>
		</view>
		<view class="orderCont" v-if="!list.length">
			<view class="orderNone">
				暂无订单
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	export default {
		components: {uniSegmentedControl},
		data() {
			return {
				items: ['全部','办理中','已完成','已退单'],
				states: [
					'未完成',
					'已完成',
				],
				current: 0,
				isLogin: getApp().globalData.userId,
				list: null
			}
		},
		created (){
			this.getList('all');
		},
		methods: {
			color(){
				if (this.$type === 1) {
					return '#007aff'
				} else if (this.$type === 2) {
					return '#dd524d'
				} else if (this.$type === 3) {
					return '#4cd964'
				} else if (this.$type === 4) {
					return '#f0ad4e'
				}
			},
			getList (index) {
				this.list = null
				const params = {
					user_id: getApp().globalData.userId,
					appid: '2021001198645779',
					status: index < 0 ? 'all' : index
				}
				if (this.$type === 1) {
					params.appid = '2019101468369526'
				}
				else if (this.$type === 2) {
					params.appid = '2021001198661407'
				}
				else if (this.$type === 3) {
					params.appid = '2021001198645779'
				}
				else if (this.$type === 4) {
					params.appid = '2021001193682570'
				}
				this.$api.orderList(params).then(res => {
					this.list = res.data
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/orderInfo/index?id=${id}`
				});
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				this.getList((index - 1))
			},
			getAuth () {
				my.getAuthCode({
					scopes: ['auth_user'],
					success: (res) => {
						console.log(res, 111)
						this.auth(res.authCode)
					},
				});
			},
			auth (auth){
				const params = {
					'auth_code': auth
				}
				this.$api.auth(params).then(res => {
					getApp().globalData.userId = res.user_id
					this.getList(-1)
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style lang="less">
	.segmented-control{
		width: 100%;
		border-radius: 0;
		border: 0 none;
		background: #fff;
		.segmented-control-item{
			height: 40px;
			line-height: 40px;
			border: 0 none;
			background: #fff;
		}
	}
	.orderBox{
		background: #eee;
		min-height: 100vh;
	}
	.orderCont{
		.orderNone{
			display: flex;
			align-items: center;
			justify-content: center;
			height: 400px;
		}
		.orderItem{
			font-size: 14px;
			line-height: 22px;
			border-top: 1px solid #ccc;
			background: #fff;
			padding: 5px 10px;
			margin-top: 10px;
			position: relative;
			.orderName{
				font-size: 16px;
				font-weight: bold;
			}
			.orderDes{
				color: #666;
			}
			.orderTime{
				color: #999;
			}
			.orderPrice{
				color: #CE3C39;
				.state{
					margin-left: 20px;
					color: #999;
				}
			}
			&:after{
				content: ">";
				color: #999;
				display: flex;
				position: absolute;
				right: 20px;
				top: 0;
				bottom: 0;
				align-items: center;
				
				
			}
		}
	}
</style>

<template>
    <view class="box">
		<view class="titleBox" v-if="isShow">
			<image mode="widthFix" class="images" src="../../static/icon5.png"></image>
		</view>
		<view class="searchBox">
			<view class="title">处罚决定书编号：</view>
			<input confirm-type="search" @input="onKeyInput" maxlength="16" type="idcard" placeholder="《处罚决定书》编号15或16位" />
		</view>
		<view class="noticeTit" v-if="isShow">
			<view>
				*订单36小时内完成，加急单60分钟
			</view>
			<view>
				<icon type="info" size="16"/>
				<text @click="noticeModal">办理须知</text>
			</view>
		</view>
		<button class="button" @click="searchInfo">查询</button>
		<view class="cjsTit" v-if="isShow">
			请参照下图填写[处罚决定书编号]
		</view>
		<view class="cjsCont" v-if="isShow">
			<image mode="widthFix" class="images" src="../../static/icon4.png"></image>
			<image mode="widthFix" class="images" src="../../static/icon12.png"></image>
		</view>
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
				isShow: getApp().globalData.isShow,
	            inputValue: '',
				isLoad: false,
	        }
	    },
		onLoad() {
			this.getConfig()
		},
	    methods: {
			getConfig () {
				this.isLoad = true;
				this.$api.config().then(res => {
					my.navigateToMiniProgram({
						appId: '2018122562686742',
						path: `pages/index/index?originAppId=2019101468369526&newUserTemplate=${res.activity_id || 'KP20191216000002176162'}`,
						success: (res) => {
							console.log(1, res)
						},
						fail: (res) => {}
					});
					getApp().globalData.isShow = res.is_show_jf === '1'
					this.isShow = res.is_show_jf === '1'
					if (res.is_show_jf === '1') {
						const appId = '123'
						const templateId = '123'
						this.getAuth()
						this.noticeModal()
						uni.showTabBar()
					} else {
						uni.hideTabBar()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			getAuth () {
				my.getAuthCode({
					scopes: ['auth_user'],
					success: (res) => {
						this.auth(res.authCode)
					},
				});
			},
			auth (auth){
				const params = {
					'auth_code': auth
				}
				this.$api.auth(params).then(res => {
					console.log(res)
					getApp().globalData.userId = res.user_id
					if (this.inputValue) {
						this.searchInfo()
					}
				}).catch(err => {
					console.log(err)
				})
			},
			noticeModal(){
				uni.showModal({
				    title: '业务处理通知',
				    content: '订单处理周期1个工作日，加急订单60分钟（早上8：30-晚上20：30）。告知单，通知书系统无法处理。',
					showCancel: false,
					confirmText: '我知道了',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			searchInfo (){
				if (!getApp().globalData.userId) {
					this.getAuth()
					// 		uni.showToast({
					// 			title: '请您先授权，未授权不能查询',
					// 			icon: 'none'
					// 　　　　　})
					return
				}
				try {
					const params = {
						fkdbh: this.inputValue,
						user_id: getApp().globalData.userId,
					};
					this.$api.search(params).then(res => {
						uni.navigateTo({
							url: `/pages/order/index?id=${this.inputValue}`
						});
						getApp().globalData.orderInfo = res
						console.log(res, this.inputValue)
					}).catch(err => {
						console.log(err)
					})
				} catch (e) {
					uni.showToast({
						title: '暂无数据',
						icon: 'none'
			　　　　　})
				}
			},
	        onKeyInput: function(event) {
	            this.inputValue = event.target.value
	        }
	    }
	}
</script>

<style lang="less">
	.box{
		.titleBox{
			border: 1px solid #ccc;
			background: #fff;
			.images{
				width: 99%;
			}
		}
		min-height: 100vh;
		background: #eee;
		color: #fff;
		.searchTitle{
			font-size: 16px;
			font-weight: bold;
			line-height: 30px;
			color: #333;
			padding: 10px;
			border-bottom:1rpx solid #ccc;
		}
		.searchBox{
			background: #fff;
			display: flex;
			height: 60px;
			border-top: 10px solid #eee;
			padding: 0 10px;
			align-items: center;
			justify-content: space-between;
			.title{
				font-weight: bold;
				font-size: 14px;
				color: #333;
				width: 120px;
			}
			input{
				flex: 1;
				padding: 0;
				color: #007AFF;
				font-size: 14px;
			}
		}
	}
	.noticeTit{
		padding: 10px 10px 0;
		display: flex;
		justify-content: space-between;
		color: #666;
		align-items: center;
		view{
			display: flex;
			align-items: center;
		}
		text{
			margin-left: 5px;
		}
	}
	.cjsTit{
		color: #333;
		font-size: 12px;
		text-align: center;
	}
	.cjsTit2{
		padding-top: 10px;
	}
	.cjsCont{
		padding-bottom: 20px;
		text-align: center;
		image{
			display: block;
			margin: 10px auto 0;
		}
	}
	.button{
		width: 150px;
		height: 40px;
		line-height: 40px;
		margin: 10px auto;
		border-radius: 30px;
		background: #007AFF;
		color: #fff;
		border: 1px solid #0066CC;
	}
</style>

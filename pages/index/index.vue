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
				*订单24小时内完成，加急单60分钟
			</view>
			<view>
				<icon type="info" size="16"/>
				<text @click="noticeModal">办理须知</text>
			</view>
		</view>
		<button class="button" @click="searchInfo">查询</button>
		<!--button v-if="canIUseAuthButton" open-type="getAuthorize"
		        @onGetAuthorize="onGetAuthorize" @onError="onAuthError" scope='phoneNumber'>
		    授权手机号
		</button-->
		<view class="cjsTit" v-if="isShow">
			请参照下图填写[处罚决定书编号]
		</view>
		<view class="cjsCont" v-if="isShow">
			<image mode="widthFix" class="images" src="../../static/icon4.png"></image>
			<image mode="widthFix" class="images" src="../../static/icon12.png"></image>
		</view>
		<view class="gs">
			<text v-if="kefu">服务热线：{{kefu}}</text>
			<text>工作时间早8:00到晚8:00</text>
		</view>
    </view>
</template>

<script>
	export default {
	    data() {
	        return {
				isShow: getApp().globalData.isShow,
	            inputValue: '',
				kefu: null,
				isLoad: false,
				canIUseAuthButton: true,
	        }
	    },
		onLoad() {
			this.getConfig()
		},
	    methods: {
			onAuthError(err){
				console.log(err, 'err')
			},
			onGetAuthorize(){
				console.log(123)
				my.getPhoneNumber({
				    success: (res) => {
						console.log(res, 999)
				        let encryptedData = res.response;
				        my.request({
				            url: '你的后端服务端',
				            data: encryptedData,
				        });
				    },
				    fail: (res) => {
				        console.log(res);
				        console.log('getPhoneNumber_fail');
				    },
				});
			},
			color(){
				if (this.$type === 1) {
					return '#007aff'
				} else if (this.$type === 2) {
					return '#dd524d'
				} else if (this.$type === 3) {
					return '#f0ad4e'
				} else if (this.$type === 4) {
					return '#4cd964'
				}
			},
			getActivity(type, res) {
				// 第一个app
				if (type === 1) {
					my.navigateToMiniProgram({
						appId: '2018122562686742',
						path: `pages/index/index?originAppId=2019101468369526&newUserTemplate=${res.activity_id || 'KP20191216000002176162'}`,
						success: (res) => {
							console.log(1, res)
						},
						fail: (res) => {}
					});
				} else if (type === 2) {
					// 第二个app
					my.navigateToMiniProgram({
						appId: '2018122562686742',
						path: `pages/index/index?originAppId=2021001198661407&newUserTemplate=${res.activity_id2 || 'KP20201017000002732219'}`,
					});
				} else if (type === 3) {
					// 第三个app
					my.navigateToMiniProgram({
						appId: '2018122562686742',
						path: `pages/index/index?originAppId=2021001198645779&newUserTemplate=${res.activity_id3 || 'KP20201017000002732087'}`,
					});
				} else if (type === 4) {
					// 第四个app
					my.navigateToMiniProgram({
						appId: '2018122562686742',
						path: `pages/index/index?originAppId=2021001193682570&newUserTemplate=${res.activity_id4 || 'KP20201017000002732089'}`,
					});
				}
				getApp().globalData.isShow = res['is_show_jf'+ type] === '1'
				this.isShow = res['is_show_jf'+ type] === '1'
				this.kefu = res.kefu_mobie
				if (res['is_show_jf'+ type] === '1') {
					const appId = '123'
					const templateId = '123'
					this.getAuth()
					// this.noticeModal()
					uni.showTabBar()
				} else {
					uni.hideTabBar()
				}
			},
			getConfig () {
				this.isLoad = true;
				this.$api.config().then(res => {
					this.getActivity(this.$type, res)
				}).catch(err => {
					console.log(err)
				})
			},
			getAuth () {
				my.getAuthCode({
					scopes: ['auth_user'],
					success: (res) => {
						// this.auth(res.authCode)
						this.getUserInfo(res.authCode)
					},
				});
			},
			getUserInfo(auth){
				const params = {
					'auth_code': auth,
					'appid': '2021001198645779'
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
				this.$api.getUserInfo(params).then(res => {
					// console.log(res)
					getApp().globalData.userId = res.user_id
					if (this.inputValue) {
						this.searchInfo()
					}
				}).catch(err => {
					console.log(err)
				})
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
		position: relative;
		padding-bottom: 60px;
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
				color: #4cd964;
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
		background: #4cd964;
		color: #fff;
		border: 1px solid #4cd964;
	}
	.gs{
		background: #4cd964;
		color: #fff;
		text-align: center;
		font-size: 14px;
		padding: 10px 20px;
		position: absolute;
		bottom:0;
		left: 0;
		right: 0;
		text{
			margin: 0 10px
		}
		
	}
</style>

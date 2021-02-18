<template>
    <view class="box">
		<!--navigator class="boxBtn" url="plugin://myPlugin/index?pid=2088631566090921&appId=2019101468369526">
			<image mode="widthFix" src="../../static/banner.jpg">
		</navigator-->
		<view class="navHeader">
			<view class="navBox">
				<view @click="goUrl()">
					<image src="../../static/b_03.png" mode="widthFix"></image>
					罚单缴纳
				</view>
				<view v-if="types.is_show_wz === '1'">
					<image src="../../static/b_05.png" mode="widthFix"></image>
					违章查询
				</view>
				<view v-if="types.is_show_xx === '1'">
					<image src="../../static/b_07.png" mode="widthFix"></image>
					限行查询
				</view>
				<view v-if="types.is_show_cf === '1'">
					<image src="../../static/b_09.png" mode="widthFix"></image>
					驾照查分
				</view>
			</view>
		</view>
		<view class="navBg">
			<view class="searchBox">
				<input confirm-type="search" @input="onKeyInput" maxlength="16" type="idcard" placeholder="《处罚决定书》编号15或16位" />
			</view>
			<button class="button" @click="searchInfo">立即查询</button>
		</view>
		<image v-if="types.is_show_wz === '1'" @click="goUrl()" src="../../static/a_03.png" mode="widthFix"></image>
		<image v-if="types.is_show_xx === '1'" src="../../static/a_04.png" mode="widthFix"></image>
		<image v-if="types.is_show_cf === '1'" src="../../static/a_05.png" mode="widthFix"></image>
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
	  types: null,
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
    onAuthError(err) {
      console.log(err, 'err')
    },
    onGetAuthorize() {
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
    color() {
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
		this.types = res
      if (type === 1) {
        getApp().globalData.isShow = res['is_show_jf'] === '1'
        this.isShow = res['is_show_jf'] === '1'
        if (res['is_show_jf'] === '1') {
          const appId = '123'
          const templateId = '123'
          this.getAuth()
          // this.noticeModal()
          uni.showTabBar()
        } else {
          uni.hideTabBar()
        }
      } else {
        getApp().globalData.isShow = res['is_show_jf' + type] === '1'
        this.isShow = res['is_show_jf' + type] === '1'
        if (res['is_show_jf' + type] === '1') {
          const appId = '123'
          const templateId = '123'
          this.getAuth()
          // this.noticeModal()
          uni.showTabBar()
        } else {
          uni.hideTabBar()
        }
      }
      this.kefu = res.kefu_mobie
    },
    getConfig() {
      this.isLoad = true;
      this.$api.config().then(res => {
		  console.log(res, 99)
        this.getActivity(this.$type, res)
      }).catch(err => {
        console.log(err)
      })
    },
    getAuth() {
      my.getAuthCode({
        scopes: ['auth_user'],
        success: (res) => {
          // this.auth(res.authCode)
          this.getUserInfo(res.authCode)
        },
      });
    },
    getUserInfo(auth) {
      const params = {
        'auth_code': auth,
        'appid': '2021002125610923'
      }
      if (this.$type === 1) {
        params.appid = '2021002125610923'
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
    auth(auth) {
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
	goUrl() {
		uni.switchTab({
			url: '../index/index'
		})
	},
    searchInfo() {
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
    onKeyInput: function (event) {
      this.inputValue = event.target.value
    }
  }
}
</script>

<style lang="less">
.box {
	padding-bottom: 40px;
	position: relative;
	image{
		width: 100%;
		display: block;
	}
	.navHeader{
		height: 904rpx;
		background: url(../../static/a_01.png) no-repeat;
		background-size: 100%;
		position: relative;
		.navBox{
			position: absolute;
			left: 50rpx;
			right: 50rpx;
			bottom: 30rpx;
			height: 156rpx;
			display: flex;
			justify-content: center;
			
			view{
				width: 150rpx;
				text-align: center;
				color: #fff;
				font-size: 25rpx;
				font-weight: bold;
				image{
					width: 75rpx;
					margin: 20rpx auto 10rpx;
				}
			}
		}
	}
	.navBg{
		padding: 110rpx 60rpx 0;
		height: 666rpx;
		box-sizing: border-box;
		background: url(../../static/a_02.png) no-repeat;
		background-size: auto 666rpx;
	}
  .boxBtn {
    image {
      width: 100%;
      display: block;
    }
  }
  .searchBox {
    background: #fff;
    display: flex;
    height: 80rpx;
    padding: 0 10px;
    align-items: center;
    justify-content: space-between;
	border-radius: 10rpx;
	box-shadow: 0 -5rpx 10rpx #1874d9;
    .title {
      font-weight: bold;
      font-size: 14px;
      color: #333;
      width: 120px;
    }
    input {
      flex: 1;
      padding: 0;
      color: #007aff;
      font-size: 14px;
    }
  }
}
.button {
  width: 260rpx;
  height: 64rpx;
  line-height: 64rpx;
  margin: 40rpx auto 0;
  border-radius: 64rpx;
  background: #f4af4d;
  color: #fff;
  font-size: 20rpx;
  font-weight: bold;
  border: 0 none;
  box-shadow: 0 -5rpx 10rpx #1874d9;
}
.gs {
  background: #007aff;
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding: 10px 10rpx;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text {
    margin: 0 10px;
  }
}
</style>

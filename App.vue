<script>
	export default {
		globalData: {
			cityList: null,
			isShow: false,
			orderInfo: null,
			isLogin: false,
			userId: null
		},
		onLaunch: function() {
			// uni.hideTabBar()
			// this.getConfig()
		},
		onShow: function() {
			// this.getConfig()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			getConfig () {
				this.$api.config().then(res => {
					getApp().globalData.isShow = res.is_show_jf === '1'
					if (res.is_show_jf === '1') {
						this.getAuth()
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
					console.log(res)
					getApp().globalData.userId = res.user_id
				}).catch(err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>

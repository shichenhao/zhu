import urlConfig from './config.js'

const request = {}
const headers = {}
    
request.globalRequest = (url, method, data) => {
	uni.showLoading({
	    title: '加载中'
	});
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
        if (res[1].data.code && res[1].data.code == 200) {
			uni.hideLoading()
            return res[1].data
        } else {
			uni.showToast({
				title: res[1].data.message || '接口错误',
				icon: 'none'
	　　　　　})
			setTimeout(()=>{
				uni.hideLoading()
			}, 3000)
　　　　　	return Promise.reject(res[1].data)
        }
    }).catch(err => {
		uni.showToast({
			title: err.message || '接口错误',
			icon: 'none'
　　　　　})
		setTimeout(()=>{
			uni.hideLoading()
		}, 3000)
　　　　　return Promise.reject(err)
　　})
 } 

export default request
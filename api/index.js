import request from './request.js'

const api = {}
api.getUserInfo = params => request.globalRequest('/Auth/getuserinfo', 'GET', params)

api.config = params => request.globalRequest('/Config/config', 'GET', params)

api.auth = params => request.globalRequest('/Auth/index', 'GET', params)

api.search = params => request.globalRequest('/Getdata/index', 'GET', params)

api.pay = params => request.globalRequest('/Pay/index', 'GET', params)

api.payOver = params => request.globalRequest('/Pay/pay_callback', 'GET', params)

api.orderList = params => request.globalRequest('/Orderlist/index', 'GET', params)

api.orderInfo = params => request.globalRequest('/Orderdetails/index', 'GET', params)

export default api
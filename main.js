import Vue from 'vue'
import App from './App'

import request from './api/request.js'
import api from './api/index.js'
import url from './api/config.js'

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.prototype.$type = 4

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

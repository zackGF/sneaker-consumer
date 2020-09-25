import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.globalURL = "http://47.101.39.4:8081"
Vue.prototype.imglURL = "http://47.101.39.4:8081"
// Vue.prototype.globalURL = "http://127.0.0.1:8081"
// Vue.prototype.imglURL = "http://127.0.0.1:8092"


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

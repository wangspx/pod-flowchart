import Vue from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";

import "./assets/font-awesome-4.7.0/css/font-awesome.min.css"

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

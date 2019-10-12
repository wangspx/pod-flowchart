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

if (localStorage.getItem("elements")) {
  localStorage.setItem("elements", JSON.stringify([
    {
      name: "web",
      type: "pod",
      status: "running",
      time: "2019-10-9 17:50:26",
      dependencies: [{name: "nginx", label: "80"}],
      position: {
        x: 94,
        y: 211
      }
    },
    {
      name: "nginx",
      type: "pod",
      status: "running",
      time: "2019-10-9 17:50:26",
      dependencies: [{name: "app1", label: "8080"},{name: "app2", label: "8081"}],
      position: {
        x: 310,
        y: 211
      }
    },
    {
      name: "nginx1",
      type: "pod",
      status: "running",
      time: "2019-10-9 17:50:26",
      dependencies: [],
      position: {
        x: 310,
        y: 611
      }
    },
    {
      name: "app1",
      type: "deploy",
      status: "running",
      dependencies: [{name: "redis", label: "6379"},{name: "mysql", label: "3306"}],
      time: "2019-10-9 17:50:26",
      position: {
        x: 583,
        y: 133
      }
    },
    {
      name: "app2",
      type: "deploy",
      status: "running",
      dependencies: [{name: "redis", label: "6379"},{name: "mysql", label: "3306"}],
      time: "2019-10-9 17:50:26",
      position: {
        x: 583,
        y: 370
      }
    },
    {
      name: "redis",
      type: "deploy",
      status: "running",
      dependencies: [{name: "fs", label: "/data/redis"}],
      time: "2019-10-9 17:50:26",
      position: {
        x: 859,
        y: 520
      }
    },
    {
      name: "mysql",
      type: "deploy",
      status: "failed",
      dependencies: [{name: "fs", label: "/data/redis"}],
      time: "2019-10-9 17:50:26",
      position: {
        x: 857,
        y: 108
      }
    },
    {
      name: "fs",
      type: "volumes",
      status: "pending",
      time: "2019-10-9 17:50:26",
      dependencies: [],
      position: {
        x: 1111,
        y: 211
      }
    }
  ]))
}

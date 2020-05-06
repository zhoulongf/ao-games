import Vue from 'vue'
import router from './router/index'
import './utils/resetScreenSize'
import { Toast, Search, Tab, Tabs, Icon, PullRefresh, List, DropdownMenu, DropdownItem, Collapse, CollapseItem, Tabbar, TabbarItem, Swipe, SwipeItem, Lazyload, Overlay, DatetimePicker, Popup } from 'vant'
import '@/assets/css/reset.css'
import App from './App.vue'
import 'vant/lib/index.css'
Vue.config.productionTip = false
Vue.use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(PullRefresh)
  .use(List)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Collapse)
  .use(CollapseItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Overlay)
  .use(DatetimePicker)
  .use(Popup)
  .use(Toast)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

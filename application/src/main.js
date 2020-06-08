import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css';
import store from './store';
import router from './router'

Vue.config.productionTip = false;

// eslint-disable-next-line
delete L.Icon.Default.prototype._getIconUrl;
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');


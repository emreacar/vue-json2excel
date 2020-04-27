import VueJson2Excel from "./vue-json2excel.vue";

export default {
  install(Vue, options) {
    Vue.component("vue-json2excel", VueJson2Excel);
  }
};
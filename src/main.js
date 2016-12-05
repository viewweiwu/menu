import Vue from 'vue';
import list from './views/list';

import './assets/less/main.less';

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<list/>',
    components: { list }
})
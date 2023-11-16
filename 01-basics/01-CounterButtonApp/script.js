// import { createApp } from './vendor/vue.esm-browser.js';
import { createApp } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const app = createApp({
  name: 'App',
  data() {
    return {
      increment: 0,
    };
  },
});

const vm = app.mount('#app');

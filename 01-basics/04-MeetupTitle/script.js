import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const app = createApp({
  data() {
    return {
      meetupId: 0,
      meetup: ''
    }
  },
  watch: {
    async meetupId(newValue, oldValue) {
      this.meetup = await fetchMeetupById(newValue);
    }
  }
});

const vm = app.mount('#app');
import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';
import MeetupView from '../../06-MeetupView/components/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  data() {
    return {
      meetup: null,
      loading: true,
      error: '',
    };
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async getCurrernMeetup(meetupId) {
      try {
        this.error = '';
        this.loading = true;
        this.meetup = await fetchMeetupById(meetupId);
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.error = error.message;
      }
    },
  },
  watch: {
    meetupId: {
      immediate: true,
      handler(newValue, oldValue) {
        this.getCurrernMeetup(newValue);
      },
    },
  },
  template: `
    <div class="page-meetup">
      <MeetupView v-if="!loading && !error" :meetup="meetup"/>
      <UiContainer v-else-if="loading">
        <UiAlert>Загрузка...</UiAlert>
      </UiContainer>
      <UiContainer v-else-if="!loading && error">
        <UiAlert>{{ error }}</UiAlert>
      </UiContainer>
    </div>`,
});

import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated } from '../services/authService.js';

const router = createRouter({
  history: createWebHistory('/05-vue-router/05-AuthGuard'),
  routes: [
    {
      name: 'index',
      path: '/',
      alias: '/meetups',
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      name: 'login',
      path: '/login',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageLogin.vue'),
    },
    {
      name: 'register',
      path: '/register',
      meta: {
        requireGuest: true,
      },
      component: () => import('../views/PageRegister.vue'),
    },
    {
      name: 'create',
      path: '/meetups/create',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageCreateMeetup.vue'),
    },
    {
      name: 'edit',
      path: '/meetups/:meetupId(\\d+)/edit',
      meta: {
        requireAuth: true,
      },
      component: () => import('../views/PageEditMeetup.vue'),
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requireGuest && isAuthenticated()) {
    return { name: 'index' };
  }
  if (to.meta.requireAuth && !isAuthenticated()) {
    return { name: 'login', query: { from: to.path } };
  }
});

export { router };

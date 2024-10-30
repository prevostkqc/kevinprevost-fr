import { createRouter, createWebHistory } from 'vue-router';
import Sarting  from '../components/Starting.vue';
import Home     from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'starting',
    component: Sarting,
    meta: {
      title: 'Kévin Prévost - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content: 'Découvrez mes projets réalisés.'
        },
        {
          property: 'og:description',
          content: 'Découvrez mon portfolio et les projets que j\'ai réalisés pour mes clients.'
        }
      ]
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      title: 'Kévin Prévost - Développeur Web',
      metaTags: [
        {
          name: 'description',
          content: 'Bienvenue dans mon univers.'
        },
        {
          property: 'og:description',
          content: 'Boostez votre présence en ligne !'
        }
      ]
    }
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title || 'Default Title';

  const oldMetaTags = document.querySelectorAll('meta[name="description"], meta[property^="og:"]');
  oldMetaTags.forEach(tag => tag.remove());

  if (to.meta.metaTags) {
    to.meta.metaTags.forEach(tagDef => {
      const tag = document.createElement('meta');
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      document.head.appendChild(tag);
    });
  }
});

export default router;
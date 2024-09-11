import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Portfolio from '../components/Portfolio.vue';

const routes = [
  {
    path: '/',
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
  {
    path: '/portfolio',
    name: 'portfolio',
    component: Portfolio,
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
  }
];


// Création du routeur
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Mise à jour du titre de la page et des meta tags après chaque navigation
router.afterEach((to) => {
  // Mettre à jour le titre de la page
  document.title = to.meta.title || 'Default Title';

  // Supprimer les anciennes balises meta
  const oldMetaTags = document.querySelectorAll('meta[name="description"], meta[property^="og:"]');
  oldMetaTags.forEach(tag => tag.remove());

  // Ajouter les nouvelles balises meta
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
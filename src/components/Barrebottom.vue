<template>
    <div>
      <!-- Barre de notifications -->
      <section class="kp_notification__zone">
        <div class="kp_notification__demarrer">
          <div class="kp_notification--titre">
            <p class="kp_notification--titre-p">
              <span class="kp_notification--titre-span">Démarrer</span>
            </p>
            <div>
              <img class="kp_menu_start--img" :src="logo2024" alt="Logo 2024">
            </div>
          </div>
        </div>
  
        <div class="kp_notification--applications">
          <article 
            v-for="app in visibleApplications" 
            :key="app.id" 
            :class="['kp_barre-une-app', app.class]" 
            :id="`kp_barre-app--${app.id}`">
            <div class="kp_barre-une-app--icn" v-if="app.isText">
              {{ app.icon }}
            </div>
            <div class="kp_barre-une-app--icn" v-else>
              <img class="kp_barre-une-app--img" :src="app.icon" :alt="app.title">
            </div>
            <p class="kp_barre-une-app--title">{{ app.title }}</p>
          </article>
        </div>
  
        <div class="kp_notification--zone">
          <div id="kp_lang__user"></div>
          <div id="kp_battery__user--img">
            <img class="kp_battery--img" :src="batteryIcon" alt="Batterie">
          </div>
          <div id="kp_battery__user"></div>
          <div class="kp_date-heure">
            <div class="kp_date-heure--heure"></div>
          </div>
          <div class="kp_date-heure--date"></div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import logo2024 from '@/assets/images/logo-2024.png';
  import batteryIcon from '@/assets/images/icn_battery100.png';
  import folderIcon from '@/assets/images/folder.png';
  import internetIcon from '@/assets/images/icn_internet.png';
  import textIcon from '@/assets/images/text.png';
  import pokecardIcon from '@/assets/images/pokecard_icn.png';
  import cvIcon from '@/assets/images/cv.png';
  
  export default {
  name: 'Barrebottom',
  props: {
    openWindows: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      logo2024,
      batteryIcon,
      applications: [
        {
          id: 'terminal',
          class: 'kp_barre-une-app--terminal',
          icon: 'KP:\\',
          title: 'Qui suis-je ?',
          isText: true
        },
        {
          id: 'folder',
          class: 'kp_barre-une-app--folder-projects',
          icon: folderIcon,
          title: 'Mes réalisations',
          isText: false
        },
        {
          id: 'browser',
          class: 'kp_barre-une-app--browser',
          icon: internetIcon,
          title: 'Internet',
          isText: false
        },
        {
          id: 'autoportrait',
          class: 'kp_barre-une-app--text',
          icon: textIcon,
          title: 'Autoportrait',
          isText: false
        },
        {
          id: 'profil',
          class: 'kp_barre-une-app--profil',
          icon: textIcon,
          title: 'Profil',
          isText: false
        },
        {
          id: 'pokemon',
          class: 'kp_barre-une-app--pokemon',
          icon: pokecardIcon,
          title: 'Ma passion',
          isText: false
        },
        {
          id: 'monparcours',
          class: 'kp_barre-une-app--quisuisje',
          icon: cvIcon,
          title: 'Mon parcours',
          isText: false
        }
      ]
    };
  },
    computed: {
      visibleApplications() {
        // Filtre les applications pour ne montrer que celles ouvertes
        return this.applications.filter(app => this.openWindows.includes(app.id));
      }
    }
  };

  </script>
  
  <style scoped>
  /* Styles pour Barrebottom.vue */
  
  </style>
  
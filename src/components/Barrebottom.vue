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
          :id="`kp_barre-app--${app.id}`"
          @click="emitDesktopClick(app.id)"> <!-- Ajout de l'appel à emitDesktopClick -->
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
        <div id="kp_lang__user">{{ langue }}</div>
        <div id="kp_battery__user--img">
          <img class="kp_battery--img" :src="batteryIcon" alt="Batterie">
          <p class="kp_battery--text">{{ percentbattery }}%</p>
        </div>
        <div class="kp_date-heure">
          <div class="kp_date-heure--heure">{{ heure }}</div>
        </div>
        <div class="kp_date-heure--date">{{ date }}</div>
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
    },
    windowClasses: { 
      type: Object,
      required: true,
      default: () => ({})
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
      ],
      percentbattery: 0,
      langue: 'FR - fr',
      heure: '00:00:00',
      date: 'vendredi 12 mars 2021'
    };
  },
  computed: {
    visibleApplications() {
      return this.applications.filter(app => this.openWindows.includes(app.id));
    }
  },
  methods: {
    emitDesktopClick(appId) {
      console.log(`Barre de notification: clic détecté pour "${appId}"`);
      this.$emit('simulateDesktopClick', appId); // Émet l'événement pour gérer le clic sur la barre de notification
    },
    calculerBatterie() {
      const battery = navigator.getBattery();
      battery.then((batterie) => {
        this.percentbattery = Math.floor(batterie.level * 100);
      });
    },
    afficherLangue() {
      const lang = navigator.language.split('-');
      this.langue = `${lang[0].toUpperCase()} - ${lang[1].toLowerCase()}`;
    },
    isWindowClosed(windowId) {
      return this.windowClasses && this.windowClasses[windowId] === 'kp_item_hide';
    },  
    emitDesktopClick(appId) {
      console.log(`Simulation du clic sur l'icône du bureau pour ${appId}`);
      this.$emit('simulateDesktopClick', appId); // Emit the event to simulate a desktop click
    },
    updateNotificationClass(windowName, newClass) {
      const notifElement = document.querySelector(`#kp_barre-app--${windowName}`);
      if (notifElement) {
        // On affiche l'état actuel de l'élément de notification
        console.log(`État actuel de ${windowName} avant mise à jour: ${notifElement.className}`);

        // On supprime les classes 'notif_show' et 'notif_hide' pour éviter les conflits
        notifElement.classList.remove('notif_show', 'notif_hide');
        
        // On ajoute la nouvelle classe 'notif_show' ou 'notif_hide'
        notifElement.classList.add(newClass);
        
        // On affiche l'état après la mise à jour
        console.log(`État après mise à jour de ${windowName}: ${notifElement.className}`);
      } else {
        console.error(`Élément de notification pour ${windowName} non trouvé.`);
      }
    },
    handleCloseWindow(windowName) {
      const index = this.openWindows.indexOf(windowName);
      if (index !== -1) {
        console.log(`Fermeture de la fenêtre "${windowName}"`);
        this.updateWindowClass(windowName, 'kp_item_hide');
        this.updateNotificationClass(windowName, 'notif_hide');  // Ajoute la classe notif_hide à l'icône de la notification
        setTimeout(() => {
          this.openWindows.splice(index, 1);
          console.log(`Fenêtre "${windowName}" retirée de openWindows. Nouvel état :`, this.openWindows);
        }, 300);
      } else {
        console.log(`Fenêtre "${windowName}" n'était pas ouverte.`);
      }
    },
    manageWindowNotifications() {
      this.applications.forEach(app => {
        const isClosed = this.windowClasses[app.id] === 'kp_item_hide';
        const newClass = isClosed ? 'notif_hide' : 'notif_show';

        this.updateNotificationClass(app.id, newClass);  // On met à jour la classe de notification ici
      });
    }
  },
  watch: {
    windowClasses: {
      deep: true,
      handler() {
        this.manageWindowNotifications();  // On surveille les changements dans windowClasses
      }
    }
  },
  mounted() {
    this.calculerBatterie();
    this.afficherLangue();
    setInterval(() => {
      const now = new Date();
      this.heure = now.toLocaleTimeString();
      this.date = now.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, 1000);

    navigator.getBattery().then(battery => {
      this.percentbattery = Math.floor(battery.level * 100);

      battery.addEventListener('levelchange', () => {
        this.percentbattery = Math.floor(battery.level * 100);
      });
    });
  }
};
</script>

<style scoped>
#kp_battery__user--img{
  display: flex;
  align-items: center;
  padding: 0 15px;
}
#kp_lang__user{
  border-right: solid 1px white;
}
.kp_battery__user{
  position: fixed;
  bottom: 20px;
  right: 20px;
}
.kp_date-heure{
  border-left: solid 1px white;
  padding-left: 15px;
}
.closed {
  opacity: 0.5; /* Fenêtre fermée, applique un style spécifique */
}
</style>

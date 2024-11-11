<template>
  <div>
    <!-- Barre de notifications -->
    <section class="kp_notification__zone">
      <div class="kp_notification__demarrer"  @click="$emit('toggleMenu')">
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
          v-for="app in applications" 
          :key="app.id" 
          :class="['kp_barre-une-app', app.class, windowClasses[app.id] === 'kp_item_hide' ? 'notif_hide' : 'notif_show']" 
          :id="`kp_barre-app--${app.id}`"
          @click="callBringToFront(app.id); handleBringToFront(app.id);">
          <div class="kp_barre-une-app--icn" v-if="app.isText">
            {{ app.icon }}
          </div>
          <div class="kp_barre-une-app--icn" v-else>
            <img class="kp_barre-une-app--img" :src="app.icon" :alt="app.title">
          </div>
          <p class="kp_barre-une-app--title">{{ app.title }}</p>
        </article>
      </div>

      <div class="kp_notification--zone" @click="$emit('childClicked')">
        <div id="kp_lang__user">{{ langue }}</div>
        <div id="kp_battery__user--img">
          <div class="kp_battery__content">
            <div class="kp_battery__charge" :style="{ height: `calc(${percentbattery}% - 2px)`, backgroundColor: batteryColor }"></div>
            <img class="kp_battery--img" :src="batteryIcon" alt="Batterie">
          </div>
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
import logo2024         from '@/assets/images/logo-2024.png';
import batteryIcon      from '@/assets/images/icn_batteryvide.png';
import batteryIconLoad  from '@/assets/images/icn_batteryvide_load.png';
import folderIcon       from '@/assets/images/icon-archive.png';
import internetIcon     from '@/assets/images/icn_internet.png';
import terminalIcon     from '@/assets/images/icon-terminalkp.png';
import textIcon         from '@/assets/images/text.png';
import pokecardIcon     from '@/assets/images/pokecard_icn.png';
import cvIcon           from '@/assets/images/cv.png';
import heartIcon        from '@/assets/images/icon-heart.png';
import paintIcon        from '@/assets/images/icon-paint.png';
import mailIcon         from '@/assets/images/icon-mail.png';
import mediaIcon        from '@/assets/images/icon-media.png';

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
      batteryIconLoad,
      applications: [
        {
          id: 'terminal',
          class: 'kp_barre-une-app--terminal',
          icon: terminalIcon,
          title: 'Qui suis-je ?',
          isText: false
        },
        {
          id: 'folder',
          class: 'kp_barre-une-app--folder-projects',
          icon: folderIcon,
          title: 'Mes réalisations',
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
          id: 'pokemon',
          class: 'kp_barre-une-app--pokemon',
          icon: pokecardIcon,
          title: 'Ma passion',
          isText: false
        },
        {
          id: 'paint',
          class: 'kp_barre-une-app--paint',
          icon: paintIcon,
          title: 'Paint',
          isText: false
        },
        {
          id: 'passions',
          class: 'kp_barre-une-app--passions',
          icon: heartIcon,
          title: 'Mes passions',
          isText: false
        },
        {
          id: 'monparcours',
          class: 'kp_barre-une-app--quisuisje',
          icon: cvIcon,
          title: 'Mon parcours',
          isText: false
        },
        {
          id: 'mail',
          class: 'kp_barre-une-app--mail',
          icon: mailIcon,
          title: 'Contactez-moi',
          isText: false
        },
        {
          id: 'media',
          class: 'kp_barre-une-app--media',
          icon: mediaIcon,
          title: 'Lecteur média',
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
  },
    batteryColor() {
      const green = { r: 18, g: 255, b: 0 };
      const red = { r: 217, g: 14, b: 12 };
      const percentage = this.percentbattery / 100;

      const r = Math.round(red.r + percentage * (green.r - red.r));
      const g = Math.round(red.g + percentage * (green.g - red.g));
      const b = Math.round(red.b + percentage * (green.b - red.b));

      return `rgb(${r}, ${g}, ${b})`;
    }
  },
  methods: {
    emitClick() {
        this.$emit('childClicked');
    },
    callBringToFront(appId) {
      this.$emit('callBringToFront', appId);
    },
    handleBringToFront(appId) {
      this.$emit('handleBringToFront', appId);
    },
    calculerBatterie() {
      if ('getBattery' in navigator) {
        navigator.getBattery().then((batterie) => {
          this.percentbattery = Math.floor(batterie.level * 100);
        }).catch((error) => {
          console.error("Erreur lors de l'obtention de l'état de la batterie :", error);
          this.percentbattery = null;
        });
      } else {
        console.warn("L'API Battery Status n'est pas supportée par ce navigateur.");
        this.percentbattery = null;
      }
    },
    afficherLangue() {
      const lang = navigator.language.split('-');
      this.langue = `${lang[0].toUpperCase()} - ${lang[1].toLowerCase()}`;
    },
    isWindowClosed(windowId) {
      return this.windowClasses && this.windowClasses[windowId] === 'kp_item_hide';
    },  
    updateNotificationClass(windowName, newClass) {
      const notifElement = document.querySelector(`#kp_barre-app--${windowName}`);
      if (notifElement) {
        notifElement.classList.remove('notif_show', 'notif_hide');
        notifElement.classList.add(newClass);
      } else {
        console.error(`Élément de notification pour ${windowName} non trouvé.`);
      }
    },
    handleCloseWindow(windowName) {
      const index = this.openWindows.indexOf(windowName);
      if (index !== -1) {
        this.updateWindowClass(windowName, 'kp_item_hide');
        this.updateNotificationClass(windowName, 'notif_hide');
        setTimeout(() => {
          this.openWindows.splice(index, 1);
        }, 300);
      } else {
        console.log(`Fenêtre "${windowName}" n'était pas ouverte.`)
      }
    },
    manageWindowNotifications() {
      this.applications.forEach(app => {
        const isClosed = this.windowClasses[app.id] === 'kp_item_hide';
        const newClass = isClosed ? 'notif_hide' : 'notif_show';

        this.updateNotificationClass(app.id, newClass);
      });
    },
  },
  watch: {
    windowClasses: {
      deep: true,
      handler() {
        this.manageWindowNotifications();
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
      
      this.batteryIcon = (battery.charging && this.percentbattery < 100) ? this.batteryIconLoad : batteryIcon;

      battery.addEventListener('levelchange', () => {
        this.percentbattery = Math.floor(battery.level * 100);
        this.batteryIcon = (battery.charging && this.percentbattery < 100) ? this.batteryIconLoad : batteryIcon;
      });

      battery.addEventListener('chargingchange', () => {
        this.batteryIcon = (battery.charging && this.percentbattery < 100) ? this.batteryIconLoad : batteryIcon;
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


/* ----------------- */
/* kp_menu__barre-etat */
.kp_menu__barre-etat{
  position: fixed;
  bottom: -10px;
  left: 0;
  background: white;
  width: 100%;
  max-width: 600px;
  transform: translateY(100%);
  transition: 0.3s;
}
.kp_menu__barre-etat--show{
  
  transform: translateY(0%);
}
.kp_menu__barre-etat--titre{
  background: rgb(3, 82, 226);
  background: linear-gradient(90deg, rgb(3, 82, 226) 0%, rgb(60, 148, 255) 100%);
  padding: 5px;
  border: solid 1px #4e7cd3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #0053e3;
  box-shadow: inset 0 0 13px rgb(45, 145, 255);
  padding: 20px 10px;
  font-size: 20px;
  width: calc(100% - 22px);
  gap: 20px;
  position: relative;
  border-radius: 10px 10px 0 0;
  top: -5px;
  &:hover{
    cursor: pointer;
  }
  &:hover .kp_titre-profil-barre{
    text-decoration: underline;
  }
  &:hover .kp_menu__barre-etat--photo-container{
    filter: drop-shadow(4px 3px 0px rgba(0, 0, 0, 0.3333333333));
  }
  &:hover .kp_menu__barre-etat--photo{
    opacity: 0.9;
  }
}
.kp_menu__barre-etat--titre:after{
content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  left: -1px;
  background: red;
  bottom: -5px;
  border: solid 1px white;
  border-top: solid 1px #002c77;
  background: rgb(255,255,255);
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,143,41,1) 33%, rgba(241,138,32,1) 50%, rgba(240,142,41,1) 66%, rgba(211,229,250,1) 100%);
}
.kp_notification__demarrer{
  width: 172px;
  height: 44px;
  position: fixed;
  bottom: 0;
  left: 0;
}
.kp_menu__barre-etat--photo{
width: 60px;
}
.kp_menu__barre-etat--container{
  position: relative;
  top: -5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 400px;
}
#kp_lang__user,
#kp_battery__user{
padding-right: 20px;
}
.kp_battery--img{
  width: 13px;
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 238, 0.3333333333));
  padding: 0 10px;
}

/* ----------------- */
.kp_element--action--reduct{
        display:none;
    }
    .kp_barre-une-app--show{
        display:flex;
    }
    .kp_element--action--resize{
        width: 100%;
        max-width: calc(100% - 10px);
        top: 0;
        left: 0;
        height: 100%;
        max-height: calc(100vh - 80px);
        border-bottom: 30px solid white;
    }

    .kp_folder--un-ico-container-img{
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

.kp_element--enable{
  height: calc(100% - 39px);
}
.kp_window--border{
  height: calc(100% - 2px);
}
.kp_item__window {
  max-height: fit-content;
  border-radius: 10px 10px 0 0;
  outline: solid 1px #003fad; 
  border: solid 3px #0053e3;
  border-top: solid 1px #0053e3;
}


    
  .kp_item_window--full,
  .kp_element--action--resize{
    top:0 !important;
    left:0 !important;
    width: calc(100% - 9px) !important;
    height: calc(100vh - 80px) !important;
    max-height:100% !important;
    max-width: 100% !important;
    right: auto !important;
    bottom: auto !important;
  }

  .kp_battery__content{
    display: flex;
    position: relative;
  }
  .kp_battery__charge{
    position: absolute;
    background: #12ff00;
    width: calc(100% - 20px);
    left: 10px;
    bottom: 0px;
  }

.kp_date-heure--date{
  display:none;
}
.kp_notification--zone:hover .kp_date-heure--date {
  display: block;
  position: fixed;
  bottom: 47px;
  right: 0px;
  background: #FFFFFF;
  padding: 5px 20px;
  border: solid 1px #004ac9;
  color:#000000;
}

.kp_notification--titre{
    top: -2px;
    position: absolute;
    left: -10px;
    padding: 0 30px 0 60px;
    height: calc(100% + 2px);
    display: flex;
    align-items: center;
    border-radius: 0 17px 19px 0;
    overflow: hidden;
    border: solid #2d6f2e 1px;
    filter: drop-shadow(2px 4px 6px #003289);
    cursor: pointer;
    z-index: 1;
    /* outline: solid 1px #2f551a; */
    border-right: solid 2px #1b612f;
    background: rgb(51, 85, 23);
    background: linear-gradient(180deg, rgba(51, 85, 23, 1) 0%, rgb(104 181 104) 5%, rgba(67, 164, 67, 1) 17%, rgba(67, 164, 67, 1) 85%, rgba(54, 123, 60, 1) 100%);
  }
  .kp_notification--titre:hover{
    border: solid 1px rgb(7,42,23);
    border-right: solid 2px #1b612f;
    /* outline: solid 1px rgb(7,42,23); */
    background: rgb(7,42,23);
background: linear-gradient(180deg, rgba(7,42,23,1) 0%, rgba(51,115,51,1) 5%, rgba(28,146,28,1) 17%, rgba(28,146,28,1) 85%, rgba(18,93,18,1) 100%);
  }

  @media screen and (max-width: 960px) {
    .kp_barre-une-app--title{
      display:none;
    }
  }
</style>

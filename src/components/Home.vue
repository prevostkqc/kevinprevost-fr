<template>
  <Starting v-show="showStarting" @close="handleCloseStarting" />
  <main class="kp_main" v-show="!showStarting">
    <!-- Appel à Desktop avec écoute de l'événement openWindow -->
    <Desktop @openWindow="toggleWindow" ref="desktop" @callBringToFront="callBringToFront" />

    <div class="container--clipy">
      <div class="clipy">
        <Clipy @update-class="updateWindowClass('clipy', $event)" @close="handleCloseWindow('clipy')"
          @actionSelected="handleAction" />
      </div>
    </div>

    <div class="container--terminal">
      <div @click="bringToFront($event)" v-show="openWindows.includes('terminal')"
        :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.terminal]">
        <Terminal @update-class="updateWindowClass('terminal', $event)" @close="handleCloseWindow('terminal')"
          :context="'terminal'" :title="'terminal'" />
      </div>
    </div>


    <div class="container--messervices" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('messervices')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.messervices]">
      <Messervices @update-class="updateWindowClass('messervices', $event)" @close="handleCloseWindow('messervices')"
        :context="'messervices'" :title="'messervices'" />
    </div>

    
    <div class="container--mescompetences" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('mescompetences')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.mescompetences]">
      <Mescompetences @update-class="updateWindowClass('mescompetences', $event)" @close="handleCloseWindow('mescompetences')"
        :context="'mescompetences'" :title="'mescompetences'" />
    </div>

    <div class="container--folder" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('folder')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.folder]">
      <Folderprojects @update-class="updateWindowClass('folder', $event)" @close="handleCloseWindow('folder')"
        @show-popup="showPopup" :context="'folder'" :title="'folder'" />
    </div>

    <!-- Popup d'image -->
    <div v-if="isPopupOpen"  :class="['image-popup', popupType]">
      <div class="popup-overlay" @click="closePopup"></div>
      <div class="popup-content">

        <div :class="[`kp_icon_zone`, `kp_icon_zone--close`, `kp_icon--close-pop`,  `kp_icon--close-${context}`]"
          :id="`kp_action--close--${context}`" @click="closePopup">
          <img class="kp_icon_zone--img" :src="navigationClose" alt="close">
        </div>

        <div class="container-pop">
          <img :src="popupImageSrc" alt="Image en grand format" class="popup-image" />
        </div>
      </div>
    </div>

    <div class="container--autoportrait" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('autoportrait')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.autoportrait]">
      <Autoportrait @update-class="updateWindowClass('autoportrait', $event)" @close="handleCloseWindow('autoportrait')"
        :context="'autoportrait'" :title="'autoportrait'" />
    </div>


    <div class="container--paint" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('paint')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.paint]">
      <Paint @update-class="updateWindowClass('paint', $event)" @close="handleCloseWindow('paint')" :context="'paint'"
        :title="'paint'" />
    </div>

    <div class="container--exemples" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('exemples')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.exemples]">
      <Exemples @update-class="updateWindowClass('exemples', $event)" @close="handleCloseWindow('exemples')"
        :context="'exemples'" :title="'exemples'" />
    </div>

    <div class="container--personnaliser" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('personnaliser')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.personnaliser]">
      <Personnaliser @update-class="updateWindowClass('personnaliser', $event)"
        @close="handleCloseWindow('personnaliser')" :context="'personnaliser'" :title="'personnaliser'" />
    </div>

    <div class="container--monparcours" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('monparcours')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.monparcours]">
      <Monparcours @update-class="updateWindowClass('monparcours', $event)" @close="handleCloseWindow('monparcours')"
        :context="'monparcours'" :title="'monparcours'" />
    </div>

    <div class="container--pokemon" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('pokemon')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.pokemon]">
      <Cardpokemon @update-class="updateWindowClass('pokemon', $event)" @close="handleCloseWindow('pokemon')"
        :context="'pokemon'" :title="'Pokémon Card'" />
    </div>

    <div class="container--passions" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('passions')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.passions]">
      <Mespassions @update-class="updateWindowClass('passions', $event)" @close="handleCloseWindow('passions')"
        :context="'passions'" :title="'Mes passions'" />
    </div>

    <div class="container--media" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('media')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.media]">
      <Media @update-class="updateWindowClass('media', $event)" @close="handleCloseWindow('media')" :context="'media'"
        :title="'Mes media'" />
    </div>

    <div class="container--demineur" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('demineur')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.demineur]">
      <Demineur @update-class="updateWindowClass('demineur', $event)" @close="handleCloseWindow('demineur')"
        :context="'demineur'" :title="'Démineur'" />
    </div>

    <div class="container--mail" v-bring-to-front-on-show @click="bringToFront($event)"
      v-show="openWindows.includes('mail')"
      :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.mail]">
      <Mail @update-class="updateWindowClass('mail', $event)" @close="handleCloseWindow('mail')" :context="'mail'"
        :title="'mail'" />
    </div>


    <div class="scanlines-v"></div>

    <div v-if="!menuIsVisible" class="kp_menu__backdrop" @click="toggleMenu()"></div>
    <div class="container--menuderoulant" :class="['window', 'kp_item__window_draggable']">
      <Menuderoulant :isVisible="menuIsVisible" @fermersession="fermersession" ref="menuDeroulant"
        @click="handleContainerClick" @actionSelected="handleAction" />
    </div>

    <Barrebottom :openWindows="openWindows" @handleBringToFront="handleBringToFront" :windowClasses="windowClasses"
      @childClicked="handleContainerClick" @callBringToFront="callBringToFront" @openMenuDeroulant="openMenuDeroulant"
      @toggleMenu="toggleMenu" class="barrenotif" />
  </main>
</template>



<script>
import Desktop from '@/components/Desktop.vue';
import Terminal from '@/components/Terminal.vue';
import Messervices from '@/components/Messervices.vue';
import Mescompetences from '@/components/Mescompetences.vue';
import Folderprojects from '@/components/Folderprojects.vue';
import Autoportrait from '@/components/Autoportrait.vue';
import Paint from '@/components/Paint.vue';
import Exemples from '@/components/Exemples.vue';
import Personnaliser from '@/components/Personnaliser.vue';
import Monparcours from '@/components/Monparcours.vue';
import Cardpokemon from '@/components/Cardpokemon.vue';
import Clipy from '@/components/Clipy.vue';
import Barrebottom from '@/components/Barrebottom.vue';
import Starting from '@/components/Starting.vue';
import Menuderoulant from '@/components/Menuderoulant.vue';
import Mespassions from '@/components/Mespassions.vue';
import Mail from '@/components/mail.vue';
import Media from '@/components/Lecteurmedia.vue';
import Demineur from '@/components/Demineur.vue';


import navigationClose from '@/assets/images/close_icn.svg';

export default {
  name: 'Home',
  components: {
    Desktop,
    Terminal,
    Messervices,
    Mescompetences,
    Folderprojects,
    Autoportrait,
    Paint,
    Exemples,
    Personnaliser,
    Monparcours,
    Cardpokemon,
    Clipy,
    Barrebottom,
    Starting,
    Menuderoulant,
    Mespassions,
    Mail,
    Media,
    Demineur,
  },
  data() {
    return {
      openWindows: ['terminal', 'clipy'],
      windowClasses: {
        terminal: 'kp_item_show',
        folder: 'kp_item_hide',
        autoportrait: 'kp_item_hide',
        messervices: 'kp_item_hide',
        mescompetences: 'kp_item_hide',
        paint: 'kp_item_hide',
        exemples: 'kp_item_hide',
        personnaliser: 'kp_item_hide',
        monparcours: 'kp_item_hide',
        pokemon: 'kp_item_hide',
        passions: 'kp_item_hide',
        clipy: 'kp_item_hide',
        starting: 'kp_item_hide',
        menuderoulant: 'kp_item_hide',
        mail: 'kp_item_hide',
        media: 'kp_item_hide',
        demineur: 'kp_item_hide',
      },
      windowMinimized: {
        terminal: false,
        folder: false,
        autoportrait: false,
        paint: false,
        exemples: false,
        meservices: false,
        mescompetences: false,
        personnaliser: false,
        monparcours: false,
        pokemon: false,
        passions: false,
        clipy: false,
        starting: false,
        mail: false,
        media: false,
        demineur: false,
      },
      zIndexCounter: 10,
      isDragging: false,
      isResizing: false,
      offsetX: null,
      offsetY: null,
      lastElementDragable: null,
      lastValidPosition: { left: 0, top: 0 },
      isBeingDragged: false,
      barrenotifClass: 'barrenotifClass',
      menuIsVisible: true,
      showStarting: true,
      isPopupOpen: false,
      popupImageSrc: '',
      navigationClose,
      opupType: '',
    };
  },
  props: {
    context: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.initDragAndResize();


    const lastVisit = localStorage.getItem('lastVisit');
    const cooldownTime = 15 * 60 * 1000;
    if (!lastVisit || Date.now() - lastVisit > cooldownTime) {
      localStorage.setItem('lastVisit', Date.now());
    } else {
      this.showStarting = false;
    }
  },
  methods: {

    fermersession() {
      this.showStarting = true;
    },
    handleCloseStarting() {
      localStorage.setItem('hasVisited', true);
      this.showStarting = false;
    },
    handleBringToFront(appId) {
      if (this.windowClasses[appId] === 'kp_item_hide' || this.windowClasses[appId] === 'kp_item_reduct') {
        this.updateWindowClass(appId, 'kp_item_show');
        if (!this.openWindows.includes(appId)) {
          this.openWindows.push(appId);
        }
        this.$nextTick(() => {
          const element = document.querySelector(`.container--${appId}`);
          if (element) {
            this.bringToFront({ currentTarget: element });
          }
        });
      }
    },
    updateWindowClass(windowName, newClass) {
      if (this.windowClasses.hasOwnProperty(windowName)) {
        this.$set(this.windowClasses, windowName, newClass);
      } else {
        console.error(`Nom de fenêtre non valide : ${windowName}`);
      }
    },

    showPopup({ imageSrc, type }) {
      this.popupImageSrc = imageSrc;
      this.popupType = type;
      this.isPopupOpen = true;
    },
    closePopup() {
      this.isPopupOpen = false;
      this.popupType = '';
    },

    initDragAndResize() {
      document.querySelectorAll('.kp_element--title').forEach(element => {
        element.addEventListener('mousedown', this.startDrag);
      });

      document.querySelectorAll('.resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', this.startResize);
      });
    },
    openMenuDeroulant() {
      this.isVisible = !this.isVisible;
    },

    async updateWindowClass(windowName, newClass) {
      if (this.windowClasses.hasOwnProperty(windowName)) {
        const previousClass = this.windowClasses[windowName];
        this.windowClasses[windowName] = newClass;

        if (newClass === 'kp_item_show' && previousClass === 'kp_item_hide') {
          this.$nextTick(() => {
            const element = document.querySelector(`.container--${windowName}`);
            if (element) {
              this.bringToFront({ currentTarget: element });
            } else {
              console.error(`Élément non trouvé pour ${windowName}`);
            }
          });
        }
      } else {
        console.error(`La fenêtre "${windowName}" n'existe pas.`);
      }
    },
    handleAction(actionType) {
      this.toggleWindow(actionType);

    },

    callBringToFront(appId) {
      const element = document.querySelector(`.container--${appId}`);
      if (!element) {
        console.error(`callBringToFront - Élément pour "${appId}" non trouvé`);
        return;
      }
      this.bringToFront({ currentTarget: element });
    },



    bringToFront(event) {
      const element = event.currentTarget;
      if (!element) {
        console.error("bringToFront - Élément non trouvé");
        return;
      }
      // Trouver le z-index le plus élevé parmi toutes les fenêtres
      const windows = document.querySelectorAll('.window');
      let highestZIndex = Math.max(...Array.from(windows).map(w => parseInt(w.style.zIndex) || 0));
      element.style.zIndex = highestZIndex + 1;
      const firstChild = element.firstElementChild;
      if (firstChild) {
        firstChild.style.zIndex = highestZIndex + 1;
      }
      this.updateWindowClasses();
    },

    updateWindowClasses() {
      const windows = Array.from(document.querySelectorAll('.kp_item__window_header'));
      let highestZIndex = 0;
      let topWindow = null;

      windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex, 10) || 0;
        if (zIndex > highestZIndex) {
          highestZIndex = zIndex;
          topWindow = window;
        }
      });
      windows.forEach(window => {
        if (window === topWindow) {
          window.classList.remove('window-behind');
          window.classList.add('window-top');
        } else {
          window.classList.remove('window-top');
          window.classList.add('window-behind');
        }
      });
    },

    onMouseMove(e) {
      if (!this.isDragging || !this.lastElementDragable) return;

      const newLeft = Math.max(0, e.clientX - this.offsetX);
      const newTop = Math.max(0, e.clientY - this.offsetY);

      this.lastElementDragable.style.left = `${newLeft}px`;
      this.lastElementDragable.style.top = `${newTop}px`;
      this.lastValidPosition = { left: newLeft, top: newTop };
    },
    handleContainerClick() {
      const backdropElement = document.querySelector('.kp_menu__backdrop');
      if (backdropElement) {
        backdropElement.click();
      }
    },

    startDrag(e) {
      const draggableElement = e.target.closest('.kp_item__window_draggable');
      if (draggableElement) {
        if (!this.isBeingDragged) { // Ne pas réappeler bringToFront si déjà en cours
          this.bringToFront({ currentTarget: draggableElement });
        }

        this.isBeingDragged = true; // On commence le drag

        this.lastElementDragable = draggableElement;
        this.isDragging = true;

        const rect = draggableElement.getBoundingClientRect();
        this.lastValidPosition = {
          left: rect.left,
          top: rect.top,
        };

        this.offsetX = e.clientX - rect.left;
        this.offsetY = e.clientY - rect.top;

        document.body.style.cursor = 'grabbing';
        document.body.classList.add('no-select');

        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.stopDrag);
      } else {
        console.error("Aucun élément draggable trouvé");
      }
    },


    stopDrag() {
      this.isDragging = false;
      this.isBeingDragged = false;

      document.body.style.cursor = 'default';
      document.body.classList.remove('no-select');

      const rect = this.lastElementDragable.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const isOutOfBoundsLeft = rect.left < 0;
      const isOutOfBoundsRight = rect.right > windowWidth;
      const isOutOfBoundsTop = rect.top < 0;
      const isOutOfBoundsBottom = rect.bottom > windowHeight;

      let newLeft = this.lastValidPosition.left;
      let newTop = this.lastValidPosition.top;

      if (isOutOfBoundsLeft) {
        newLeft = 0;
      } else if (isOutOfBoundsRight) {
        newLeft = windowWidth - rect.width;
      }

      if (isOutOfBoundsTop) {
        newTop = 0;
      } else if (isOutOfBoundsBottom) {
        newTop = windowHeight - rect.height;
      }

      this.lastElementDragable.style.left = `${newLeft}px`;
      this.lastElementDragable.style.top = `${newTop}px`;

      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.stopDrag);
    },

    handleDesktopClick(windowId) {
      //this.toggleWindow(windowId);
      bringToFront(windowId);
    },

    updateNotificationClass(windowName, newClass) {
      const notifElement = document.querySelector(`#kp_barre-app--${windowName}`);
      if (notifElement) {
        notifElement.classList.remove('notif_show', 'notif_hide');
        notifElement.classList.add(newClass);
      } else {
        console.error(`Élément de notification pour "${windowName}" non trouvé.`);
      }
    },

    startResize(e) {
      if (e.button !== 0) return;

      e.preventDefault();
      this.isResizing = true;
      this.lastElementDragable = e.target.parentElement;
      this.lastElementDragable.classList.add('item-resizing');
      this.initialWidth = this.lastElementDragable.offsetWidth;
      this.initialHeight = this.lastElementDragable.offsetHeight;
      this.startX = e.clientX;
      this.startY = e.clientY;

      document.addEventListener('mousemove', this.onResize);
      document.addEventListener('mouseup', this.stopResize);

      document.body.style.userSelect = 'none';
    },

    onResize(e) {
      if (!this.isResizing) return;

      const deltaX = e.clientX - this.startX;
      const deltaY = e.clientY - this.startY;

      const newWidth = this.initialWidth + deltaX;
      const newHeight = this.initialHeight + deltaY;
      if (newWidth > 150) {
        this.lastElementDragable.style.width = `${newWidth}px`;
      }
      if (newHeight > 150) {
        this.lastElementDragable.style.height = `${newHeight}px`;
      }
    },

    stopResize() {
      this.isResizing = false;
      document.removeEventListener('mousemove', this.onResize);
      document.removeEventListener('mouseup', this.stopResize);
      if (this.lastElementDragable) {
        this.lastElementDragable.classList.remove('is-resizing');
      }

      document.body.style.userSelect = 'auto';
    },

    toggleWindow(windowName) {
      const index = this.openWindows.indexOf(windowName);

      if (index === -1) {
        this.openWindows.push(windowName);
        this.updateWindowClass(windowName, 'kp_item_show');
      } else if (this.windowClasses[windowName] === 'kp_item_reduct' || this.windowClasses[windowName] === 'kp_item_hide') {
        this.restoreWindow(windowName);
      }
    },

    minimizeWindow(windowName) {
      if (this.openWindows.includes(windowName)) {
        this.updateWindowClass(windowName, 'kp_item_reduct');
      } else {
        console.error(`Impossible de réduire la fenêtre "${windowName}" car elle n'est pas ouverte.`);
      }
    },

    restoreWindow(windowName) {
      this.updateWindowClass(windowName, 'kp_item_show');

      this.$nextTick(() => {
        const element = document.querySelector(`.${windowName}`);
        if (element) {
          this.bringToFront({ currentTarget: element });
        }
        this.updateNotificationClass(windowName, 'notif_show');
      });
    },

    handleCloseWindow(windowName) {
      const index = this.openWindows.indexOf(windowName);

      this.updateNotificationClass(windowName, 'notif_hide');

      if (index !== -1) {
        this.updateWindowClass(windowName, 'kp_item_hide');
        this.openWindows.splice(index, 1);
      } else {
        console.log(`La fenêtre "${windowName}" n'était pas ouverte.`);
      }
    },

    toggleMenu() {
      this.menuIsVisible = !this.menuIsVisible;
      this.$refs.menuDeroulant.toggleClass(this.menuIsVisible);
    },
    openMenuDeroulant() {
      this.menuIsVisible = true;
    },
    handleWindowAction(windowName, action) {
      if (action === 'close') {
        this.handleCloseWindow(windowName);
      } else if (action === 'resize') {
        this.toggleWindow(windowName, 'resize');
      } else if (action === 'reduct') {
        this.minimizeWindow(windowName);
      }
    },

  },
  directives: {
    bringToFrontOnShow: {
      update(el, binding, vnode) {
        const oldValue = binding.oldValue;
        const newValue = binding.value;

        if (oldValue !== newValue && newValue.includes('kp_item_show')) {
          vnode.context.bringToFront({ currentTarget: el });
        } else {
        }
      }
    }
  },
  computed: {
    barrenotif() {
      return this.openWindows.includes('menuderoulant') ? 'classe-active' : '';
    },
  },

};
</script>

<style scoped>
.window {
  position: absolute;
  top: 50px;
  left: 100px;
  width: 400px;
  height: 300px;
  background-color: white;
  border: 1px solid black;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.kp_element--title {
  cursor: move;
  background-color: #333;
  color: white;
  padding: 10px;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 15px;
  height: 15px;
  background: red;
  cursor: se-resize;
}

.kp_clipy_desktop {
  position: fixed;
  bottom: 0;
  right: 0;
  top: auto;
  left: auto;
}

.window {
  position: absolute;
  z-index: 1;
}

.barrenotif {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999999;
}

.kp_menu__backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  opacity: 0;
  z-index: 9990;
}

.container--menuderoulant {
  position: fixed;
  z-index: 9991;
  bottom: 0;
  left: 0;
  top: auto;
  right: auto;
  pointer-events: none;
  height: 100vh;
  width: 100%;
  max-width: 600px;
}

.container--terminal .window {
  width: 800px;
}

.container--terminal .kp_item__window_draggable {
  top: 200px;
  left: 200px;
}

.container--folder {
  top: 50px;
  left: 130px;
}

.container--monparcours {
  top: 120px;
  left: 180px;
}

.container--autoportrait {
  top: 40px;
  left: 140px;
}

.container--paint {
  top: 80px;
  left: 180px;
}

.container--mail {
  top: 20px;
  left: 120px;
}

.container--media {
  top: 180px;
  left: 180px;
}

.container--demineur {
  top: 60px;
  left: 120px;
}

.container--messervices {
  top: 80px;
  left: 130px;
}

.container--mescompetences {
  top: 100px;
  left: 140px;
}




.image-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 35px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0 0 0 / 93%);
  z-index: 1000;
}

.popup-overlay {
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  width: 100vw;
  height: calc(100vh - 35px);
}

.kp_icon--close-folder {
  left: auto;
  position: fixed;
  top: 10px;
  right: 10px;
}

.container-pop{
  height: calc(100vh - 90px);
  overflow-y: scroll;
  max-width: 1400px;
  width: calc(100% - 40px);
  margin: auto;
}
.image-popup.gsm .container-pop {

  max-width: 600px;
}
.popup-content {
  position: relative;
  width: calc(100% - 40px);
  max-height: calc(100% - 40px);
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.popup-image {
  display: block;
  outline: solid 1px #CCCCCC;
  width: 100%;
  height: auto;
}

.kp_icon--close-pop{
  position: fixed;
  top: 10px;
  right: 10px;
  left: auto;
}


.kp_main {
    background-image: url('/src/assets/images/windows-spring.jpg');
    background-size: cover;
}

@media screen and (max-width : 960px) {
  .popup-content {
    padding: 10px;
  }
  .container-pop{
    width: 100%;
  }
}
</style>
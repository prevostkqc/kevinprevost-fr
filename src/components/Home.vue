<template>
  <main class="kp_main">
    <!-- Appel à Desktop avec écoute de l'événement openWindow -->
    <Desktop @openWindow="toggleWindow" ref="desktop"  @callBringToFront="callBringToFront"  />

    <div class="container--clipy">
      <div class="clipy">
        <Clipy @update-class="updateWindowClass('clipy', $event)" @close="handleCloseWindow('clipy')" />
      </div>
    </div>
    
    <div class="container--terminal">
      <div @click="bringToFront($event)" v-show="openWindows.includes('terminal')" :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.terminal]">
        <Terminal @update-class="updateWindowClass('terminal', $event)" @close="handleCloseWindow('terminal')" 
        :context="'terminal'"
        :title="'terminal'" />
      </div>
    </div>

    <div class="container--folder"
        v-bring-to-front-on-show
        @click="bringToFront($event)"
        v-show="openWindows.includes('folder')"
        :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.folder]">
      <Folderprojects @update-class="updateWindowClass('folder', $event)" @close="handleCloseWindow('folder')" 
        :context="'folder'"
        :title="'folder'" />
    </div>

    <div class="container--autoportrait"
        v-bring-to-front-on-show
        @click="bringToFront($event)"
        v-show="openWindows.includes('autoportrait')"
        :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.autoportrait]">
      <Autoportrait @update-class="updateWindowClass('autoportrait', $event)" @close="handleCloseWindow('autoportrait')"
        :context="'autoportrait'"
        :title="'autoportrait'" />
    </div>

    <div class="container--personnaliser"
        v-bring-to-front-on-show
        @click="bringToFront($event)"
        v-show="openWindows.includes('personnaliser')"
        :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.personnaliser]">
      <Personnaliser @update-class="updateWindowClass('personnaliser', $event)" @close="handleCloseWindow('personnaliser')"
        :context="'personnaliser'"
        :title="'personnaliser'" />
    </div>

    <div class="container--monparcours"
        v-bring-to-front-on-show
        @click="bringToFront($event)"
        v-show="openWindows.includes('monparcours')"
        :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.monparcours]">
      <Monparcours @update-class="updateWindowClass('monparcours', $event)" @close="handleCloseWindow('monparcours')"
        :context="'monparcours'"
        :title="'monparcours'" />
    </div>

    <div class="container--pokemon"
        v-bring-to-front-on-show
        @click="bringToFront($event)"
        v-show="openWindows.includes('pokemon')"
        :class="['window', 'kp_item__window_draggable', 'kp_item__window_header', windowClasses.pokemon]">
      <Cardpokemon @update-class="updateWindowClass('pokemon', $event)" @close="handleCloseWindow('pokemon')"
        :context="'pokemon'"
        :title="'Pokémon Card'" />
    </div>


    <div class="container--starting">
      <div v-show="openWindows.includes('starting')" :class="['window', windowClasses.starting]">
        <Starting @update-class="updateWindowClass('starting', $event)" />
      </div>
    </div>

    <div class="scanlines-v"></div>

    <div
      v-if="!menuIsVisible"
      class="kp_menu__backdrop"
      @click="toggleMenu()"
    ></div> 
    <div 
      class="container--menuderoulant" 
      :class="['window', 'kp_item__window_draggable']">
      <Menuderoulant :isVisible="menuIsVisible"  ref="menuDeroulant" @click="handleContainerClick" @actionSelected="handleAction"/>
    </div>

    <Barrebottom :openWindows="openWindows" :windowClasses="windowClasses" @childClicked="handleContainerClick"  @callBringToFront="callBringToFront"  @openMenuDeroulant="openMenuDeroulant"  @toggleMenu="toggleMenu"  class="barrenotif" />
  </main>
</template>



<script>
import Desktop        from '@/components/Desktop.vue';
import Terminal       from '@/components/Terminal.vue';
import Folderprojects from '@/components/Folderprojects.vue';
import Autoportrait   from '@/components/Autoportrait.vue';
import Personnaliser  from '@/components/Personnaliser.vue';
import Monparcours    from '@/components/Monparcours.vue';
import Cardpokemon    from '@/components/Cardpokemon.vue';
import Clipy          from '@/components/Clipy.vue';
import Barrebottom    from '@/components/Barrebottom.vue';
import Starting       from '@/components/Starting.vue';
import Menuderoulant from './Menuderoulant.vue';

export default {
  name: 'Home',
  components: {
    Desktop,
    Terminal,
    Folderprojects,
    Autoportrait,
    Personnaliser,
    Monparcours,
    Cardpokemon,
    Clipy,
    Barrebottom,
    Starting,
    Menuderoulant,
  },
  data() {
    return {
      openWindows: ['terminal', 'clipy'],
      windowClasses: {
        terminal:     'kp_item_show',
        folder:       'kp_item_hide',
        autoportrait: 'kp_item_hide',
        personnaliser:'kp_item_hide',
        monparcours:  'kp_item_hide',
        pokemon:      'kp_item_hide',
        clipy:        'kp_item_hide',
        starting:     'kp_item_hide',
        menuderoulant:'kp_item_hide',
      },
      windowMinimized: {
        terminal:     false,
        folder:       false,
        autoportrait: false,
        personnaliser:false,
        monparcours:  false,
        pokemon:      false,
        clipy:        false,
        starting:     false
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
    };
  },
  mounted() {
    this.initDragAndResize();
  },
  methods: {
    

    updateWindowClass(windowName, newClass) {
      if (this.windowClasses.hasOwnProperty(windowName)) {
        this.$set(this.windowClasses, windowName, newClass);
      } else {
        console.error(`Nom de fenêtre non valide : ${windowName}`);
      }
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
      
      console.log(`Fermeture de la fenêtre "${windowName}"`);
      
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
.kp_clipy_desktop{
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
.barrenotif{
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

.container--menuderoulant{
  position: fixed;
  z-index: 9991;
  bottom: 0;
  left: 0;
  top: auto;
  right: auto;
  pointer-events: none;
  height: 100vh;
  width:100%;
  max-width: 600px;
}
</style>
<template>
  <main class="kp_main">
    <!-- Appel à Desktop avec écoute de l'événement openWindow -->
    <Desktop @openWindow="toggleWindow" />

    <div @click="bringToFront($event)" v-show="openWindows.includes('terminal')" :class="['window', 'kp_item__window_draggable', windowClasses.terminal]">
      <Terminal @update-class="updateWindowClass('terminal', $event)" @close="handleCloseWindow('terminal')" />
    </div>

    <div @click="bringToFront($event)" v-show="openWindows.includes('folder')" :class="['window', 'kp_item__window_draggable', windowClasses.folder]">
      <Folderprojects @update-class="updateWindowClass('folder', $event)" @close="handleCloseWindow('folder')" />
    </div>

    <div @click="bringToFront($event)" v-show="openWindows.includes('autoportrait')" :class="['window', 'kp_item__window_draggable', windowClasses.autoportrait]">
      <Autoportrait @update-class="updateWindowClass('autoportrait', $event)" @close="handleCloseWindow('autoportrait')" />
    </div>

    <div @click="bringToFront($event)" v-show="openWindows.includes('personnaliser')" :class="['window', 'kp_item__window_draggable', windowClasses.personnaliser]">
      <Personnaliser @update-class="updateWindowClass('personnaliser', $event)" @close="handleCloseWindow('personnaliser')" />
    </div>

    <div @click="bringToFront($event)" v-show="openWindows.includes('monparcours')" :class="['window', 'kp_item__window_draggable', windowClasses.monparcours]">
      <Monparcours @update-class="updateWindowClass('monparcours', $event)" @close="handleCloseWindow('monparcours')" />
    </div>

    <div @click="bringToFront($event)" v-show="openWindows.includes('pokemon')" :class="['window', 'kp_item__window_draggable', windowClasses.pokemon]">
      <Cardpokemon @update-class="updateWindowClass('pokemon', $event)" @close="handleCloseWindow('pokemon')" />
    </div>

    <div @click="bringToFront($event)" v-show="openWindows.includes('portfolio')" :class="['window', 'kp_item__window_draggable', windowClasses.portfolio]">
      <Portfolio ref="portfolio" @update-class="updateWindowClass('portfolio', $event)" @projet-selectionne="afficherProjet" @close="handleCloseWindow('portfolio')" />
    </div>

    <div v-show="openWindows.includes('clipy')" :class="['window', 'kp_item__window_draggable', 'kp_clipy_desktop', windowClasses.clipy]">
      <Clipy @update-class="updateWindowClass('clipy', $event)" @close="handleCloseWindow('clipy')" />
    </div>

    <div v-show="openWindows.includes('starting')" :class="['window', 'kp_item__window_draggable', windowClasses.starting]">
      <Starting @update-class="updateWindowClass('starting', $event)" />
    </div>

    <div class="scanlines-v"></div>
    <Barrebottom :openWindows="openWindows" />
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
import Portfolio      from '@/components/Portfolio.vue';
import Clipy          from '@/components/Clipy.vue';
import Barrebottom    from '@/components/Barrebottom.vue';
import Starting       from '@/components/Starting.vue';

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
    Portfolio,
    Clipy,
    Barrebottom,
    Starting,
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
        portfolio:    'kp_item_hide',
        clipy:        'kp_item_hide',
        starting:     'kp_item_hide'
      },
      windowMinimized: {
        terminal:     false,
        folder:       false,
        autoportrait: false,
        personnaliser:false,
        monparcours:  false,
        pokemon:      false,
        portfolio:    false,
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
    };
  },
  mounted() {
    this.initDragAndResize();
  },
  methods: {
    afficherProjet(compagnie) {
      console.log('afficherProjet appelé avec compagnie:', compagnie);
      
      const projet = this.rechercherProjetParCompagnie(compagnie);
      if (projet) {
        console.log('Projet trouvé:', projet);
        
        this.$refs.portfolio.changerProjet(projet);
        
        this.updateWindowClass('portfolio', 'kp_item_show');
      } else {
        console.log('Projet non trouvé pour la compagnie:', compagnie);
      }
    },

    rechercherProjetParCompagnie(compagnie) {
      const projets = this.$refs.portfolio?.projets || [];
      const projet = projets.find(projet => projet.compagnie === compagnie);
      console.log('rechercherProjetParCompagnie:', projet);
      return projet;
    },

    updateWindowClass(windowName, newClass) {
      console.log(`Avant mise à jour, classe actuelle de ${windowName}: ${this.windowClasses[windowName]}`);
      this.$set(this.windowClasses, windowName, newClass);
      console.log(`Après mise à jour, classe de ${windowName}: ${this.windowClasses[windowName]}`);
      if (this.windowClasses.hasOwnProperty(windowName)) {
        this.$set(this.windowClasses, windowName, newClass);
      } else {
        console.error(`Invalid window name: ${windowName}`);
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

    updateWindowClass(windowName, newClass) {
      if (this.windowClasses.hasOwnProperty(windowName)) {
        this.windowClasses[windowName] = newClass;
        console.log(`Classe de la fenêtre "${windowName}" mise à jour en : ${newClass}`);
      } else {
        console.error(`La fenêtre "${windowName}" n'existe pas dans windowClasses`);
      }
    },
    
    handleCloseWindow(windowName) {
      if (!windowName) {
        console.error("Aucun nom de fenêtre passé à handleCloseWindow.");
        return;
      }
      
      const index = this.openWindows.indexOf(windowName);
      if (index !== -1) {
        console.log(`Fermeture de la fenêtre "${windowName}"`);
        this.updateWindowClass(windowName, 'kp_item_hide');
        setTimeout(() => {
          this.openWindows.splice(index, 1);
          console.log(`Fenêtre "${windowName}" retirée de openWindows. Nouvel état :`, this.openWindows);
        }, 300); // Délai pour permettre une animation de fermeture
      } else {
        console.log(`Fenêtre "${windowName}" n'était pas ouverte.`);
      }
    },

    
    onMouseMove(e) {
      if (!this.isDragging || !this.lastElementDragable) return;

      const newLeft = e.clientX - this.offsetX;
      const newTop = e.clientY - this.offsetY;

      const adjustedLeft = Math.max(0, newLeft);
      const adjustedTop = Math.max(0, newTop);

      this.lastElementDragable.style.left = `${adjustedLeft}px`;
      this.lastElementDragable.style.top = `${adjustedTop}px`;

      this.lastValidPosition = {
        left: adjustedLeft,
        top: adjustedTop,
      };

    },

    startDrag(e) {
      const draggableElement = e.target.closest('.kp_item__window_draggable');
      if (draggableElement) {
        this.bringToFront({ currentTarget: draggableElement }); // Passer immédiatement la fenêtre au premier plan

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
      document.body.style.cursor = 'default';
      document.body.classList.remove('no-select');

      const rect = this.lastElementDragable.getBoundingClientRect();

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const isOutOfBoundsLeft = rect.right < 0;
      const isOutOfBoundsRight = rect.left > windowWidth; 
      const isOutOfBoundsTop = rect.bottom < 0;
      const isOutOfBoundsBottom = rect.top > windowHeight; 

      const isPartiallyOutOfBounds = rect.left < 0 || rect.top < 0 || rect.right > windowWidth || rect.bottom > windowHeight;

      if (isOutOfBoundsLeft || isOutOfBoundsRight || isOutOfBoundsTop || isOutOfBoundsBottom) {
        let newLeft = this.lastValidPosition.left;
        let newTop = this.lastValidPosition.top;
        if (isOutOfBoundsLeft) {
          newLeft = 10;
        } else if (isOutOfBoundsRight) {
          newLeft = windowWidth - rect.width - 10; 
        }
        if (isOutOfBoundsTop) {
          newTop = 10; 
        } else if (isOutOfBoundsBottom) {
          newTop = windowHeight - rect.height - 10;
        }
        this.lastElementDragable.style.left = `${newLeft}px`;
        this.lastElementDragable.style.top = `${newTop}px`;
      } else if (isPartiallyOutOfBounds) {
      }
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.stopDrag);
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
      
      if (index === -1 || this.windowClasses[windowName] === 'kp_item_hide') {
        // Si la fenêtre est fermée ou cachée, l'ouvrir
        this.openWindows.push(windowName);
        this.updateWindowClass(windowName, "kp_item_show");
        this.$nextTick(() => {
          const element = document.querySelector(`.${windowName}`);
          if (element) {
            this.bringToFront({ currentTarget: element });
          }
        });
      } else if (this.windowClasses[windowName] === 'kp_item_reduct') {
        // Si la fenêtre est réduite, la restaurer
        this.restoreWindow(windowName);
      } 
    },
    minimizeWindow(windowName) {
      if (this.openWindows.includes(windowName)) {
        console.log(`Réduction de la fenêtre "${windowName}"`);
        this.updateWindowClass(windowName, 'kp_item_reduct'); // Passe la classe à 'kp_item_reduct' pour cacher visuellement la fenêtre
      } else {
        console.error(`Impossible de réduire la fenêtre "${windowName}" car elle n'est pas ouverte.`);
      }
    },
    restoreWindow(windowName) {
      console.log(`Restauration de la fenêtre "${windowName}"`);
      this.updateWindowClass(windowName, 'kp_item_show'); // Passe la classe à 'kp_item_show'
      this.$nextTick(() => {
        const element = document.querySelector(`.${windowName}`);
        if (element) {
          this.bringToFront({ currentTarget: element });
        }
      });
    },

    bringToFront(event) {
      const element = event.currentTarget;
      if (!element) {
        console.error("Élément non trouvé dans bringToFront");
        return;
      }
      const windows = document.querySelectorAll('.kp_item__window_draggable');
      let highestZIndex = 0;
      windows.forEach(win => {
        const zIndex = parseInt(window.getComputedStyle(win).zIndex, 10);
        if (!isNaN(zIndex) && zIndex > highestZIndex) {
          highestZIndex = zIndex;
        }
      });
      element.style.zIndex = highestZIndex + 1;
    },
    handleCloseWindow(windowName) {
      const index = this.openWindows.indexOf(windowName);
      if (index !== -1) {
        console.log(`Fermeture de la fenêtre "${windowName}"`);
        this.updateWindowClass(windowName, 'kp_item_hide'); // Fermer complètement
        setTimeout(() => {
          this.openWindows.splice(index, 1); // Retirer l'icône de la barre de notification
          console.log(`Fenêtre "${windowName}" retirée de openWindows. Nouvel état :`, this.openWindows);
        }, 300);
      } else {
        console.log(`Fenêtre "${windowName}" n'était pas ouverte.`);
      }
    },
  },
  watch: {
    'windowClasses.portfolio': function (newVal, oldVal) {
      console.log('Changement de la classe pour portfolio :', oldVal, '->', newVal);
    }
  }
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
  position: absolute; /* ou fixed si nécessaire */
  z-index: 1;
}
</style>
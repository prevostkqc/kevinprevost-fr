<template>
  <section class="kp_desktop" @mousedown="checkForSelection">
    <article 
      v-for="item in desktopItems" 
      :key="item.id" 
      :class="['kp_folder--un-ico', item.class, { 'is-selecting': isSelecting }]"
      @click="!localIsSelecting  && handleClick(item.id); !localIsSelecting  && callBringToFront(item.id)
      ">
      <div class="kp_folder--un-ico-container-img">
        <div v-if="item.isTextIcon" class="kp_terminal--icn">{{ item.icon }}</div>
        <img v-else :class="['kp_folder--img', item.imageClass]" :src="item.icon" :alt="item.altText" />
      </div>
      <p class="kp_folder--un-ico-container-text">
        {{ item.text }}
      </p>
    </article>
    
    <div 
        v-if="localIsSelecting" 
        :style="selectionStyle" 
        class="selection-overlay"
    ></div>
  </section>

</template>

<script>
import mailIcon from '@/assets/images/icon-mail.png';
import folderIcon from '@/assets/images/icon-archive.png';
import cvIcon from '@/assets/images/cv.png';
import textIcon from '@/assets/images/text.png';
import passionIcon from '@/assets/images/icon-heart.png';
import paintIcon from '@/assets/images/icon-paint.png';
import terminalIcon from '@/assets/images/icon-terminalkp.png';
import mediaIcon from '@/assets/images/icon-media.png';
import demineurIcon from '@/assets/images/icon-demineur.png';
import servicesIcon from '@/assets/images/icon-services.png';
import exemplesIcon from '@/assets/images/icon-exemples.png';

export default {
  name: 'Desktop',
  emits: ['openWindow', 'callBringToFront'],
  props: {
    isSelecting: {
      type: Boolean,
      default: false
    },
    maillink: {
      type: String,
      default: ''
    },
    windowStateClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      
      desktopItems: [
        {
          id: 'terminal',
          class: 'kp_folder--terminal',
          icon: terminalIcon,
          isTextIcon: false,
          text: 'Qui suis-je ?',
          altText: 'Terminal',
        },
        {
          id: 'messervices',
          class: 'kp_folder--messervices',
          icon: servicesIcon,
          isTextIcon: false,
          text: 'Mes services',
          altText: 'Messervices',
        },
        {
          id: 'mail',
          class: 'kp_folder--mail',
          icon: mailIcon,
          isTextIcon: false,
          text: 'Me contacter',
          altText: 'Mail',
        },
        {
          id: 'folder',
          class: 'kp_folder--folder',
          icon: folderIcon,
          isTextIcon: false,
          text: 'Mes réalisations',
          altText: 'Mes projets',
        },
        {
          id: 'exemples',
          class: 'kp_folder--exemples',
          icon: exemplesIcon,
          isTextIcon: false,
          text: 'Mes exemples',
          altText: 'Mes exemples',
        },
        {
          id: 'monparcours',
          class: 'kp_folder--quisuisje',
          icon: cvIcon,
          isTextIcon: false,
          text: 'Mon parcours',
          altText: 'Mon parcours',
        },
        {
          id: 'passions',
          class: 'kp_folder--passions',
          icon: passionIcon,
          isTextIcon: false,
          text: 'Mes passions',
          altText: 'Mes passions',
        },
        {
          id: 'autoportrait',
          class: 'kp_folder--autoportrait',
          icon: textIcon,
          isTextIcon: false,
          text: 'Notes.txt',
          altText: 'Ma tête',
        },
        {
          id: 'media',
          class: 'kp_folder--Media',
          icon: mediaIcon,
          isTextIcon: false,
          text: 'Lecteur Média',
          altText: 'Média',
        },
        {
          id: 'paint',
          class: 'kp_folder--paint',
          icon: paintIcon,
          isTextIcon: false,
          text: 'Paint',
          altText: 'paint',
        },
        {
          id: 'demineur',
          class: 'kp_folder--demineur',
          icon: demineurIcon,
          isTextIcon: false,
          text: 'Démineur',
          altText: 'Démineur',
        },
      ],
      localIsSelecting: this.isSelecting, // Copie locale de isSelecting
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
    };
  },

  computed: {
    selectionStyle() {
      const x = Math.min(this.startX, this.currentX);
      const y = Math.min(this.startY, this.currentY);
      const width = Math.abs(this.currentX - this.startX);
      const height = Math.abs(this.currentY - this.startY);
      return {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        border: '1px dashed #FFFFFF',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        pointerEvents: 'none',
      };
    }
  },
  
  methods: {
    handleClick(id) {
      this.$emit('openWindow', id);
    },
    
    callBringToFront(appId) {
      this.$emit('callBringToFront', appId);
    },
    startSelection(event) {
      this.localIsSelecting = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.currentX = this.startX;
      this.currentY = this.startY;
      window.addEventListener('mousemove', this.updateSelection);
      window.addEventListener('mouseup', this.endSelection);
    },
    updateSelection(event) {
      this.currentX = event.clientX;
      this.currentY = event.clientY;
    },
    endSelection() {
      this.localIsSelecting = false;
      window.removeEventListener('mousemove', this.updateSelection);
      window.removeEventListener('mouseup', this.endSelection);
    },
    checkForSelection(event) {
      if (!event.target.closest('.kp_folder--un-ico')) {
        this.startSelection(event);
      }
    },
  }
};
</script>

<style scoped>
  .kp_terminal--icn{
    background: black;
      font-size: 10px;
      display: flex;
      align-items: flex-end;
      padding: 2px;
      font-family: "Raster", "Courier New", Courier, monospace;
      border-top: solid 5px #5089eb;
      outline: #3b93ff solid 1px;
      margin-right: 8px;
  }


.kp_desktop {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.selection-overlay {
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px dashed #ffffff;
  pointer-events: none;
}
.is-selecting {
  pointer-events: none;
  user-select: none;
}

.kp_folder--exemples{
  display:none;
}
@media (max-width: 960px) {
  .kp_desktop {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    gap: 20px;
  }
  .kp_folder--un-ico{
    height: 50px;
  }
  .kp_notification--applications{
    position: absolute;
    left: 190px;
    top: 3px;
    display: flex;
    gap: 2px;
    margin-left: 12px;
    width: calc(100% - 60px);
    overflow-x: scroll;
  }
}
</style>

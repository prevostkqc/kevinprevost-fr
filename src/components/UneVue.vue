<template>
    <!-- Media -->
    <section :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - Contactez-moi</span>
                </p>
            </div>
            <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title" :context="context" :customClass="customClass" />
        </div>
        <section class="fake-menu-top-folder">
            <div class="fake-menu--top">
                <ul class="liste-fake-menu">
                    <li class="liste-fake-menu--li  liste-fake-menu--li-nouveau">Fichier
                        <ul class="fake-sous-menu">
                            <li class="fake-sous-menu--li" @click="clearCanvas">
                                <p class="p-texte">Nouveau</p>
                                <p class="p-texte">Ctrl+N</p>
                            </li>
                            <li class="fake-sous-menu--li">
                                <p class="p-texte">Ouvrir...</p>
                                <p class="p-texte">Ctrl+O</p>
                            </li>
                            <li class="fake-sous-menu--li">
                                <p class="p-texte">Enregistrer</p>
                                <p class="p-texte">Ctrl+S</p>
                            </li>
                        </ul>
                    </li>
                    <li class="liste-fake-menu--li">Edition</li>
                    <li class="liste-fake-menu--li">Affichage</li>
                    <li class="liste-fake-menu--li">Image</li>
                    <li class="liste-fake-menu--li">Couleurs</li>
                    <li class="liste-fake-menu--li">?</li>
                </ul>
            </div>
        </section>

       
            <div class="kp_content--block--content kp_element--enable  kp_content--mail">
                
            </div>
        <div class="resize-handle"></div>
    </section>
    <!-- Media -->
</template>

<script>

import Navigation   from  '@/components/Navigation.vue';
import textIcon     from  '@/assets/images/icon-mail.png'; 

export default {
  name: 'Media',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
  },
  props: {
    context: {
      type: String,
      default: 'media'
    },
    title: {
      type: String,
      default: 'media'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
    data() {
        return {
            textIcon,
        };
    },
    methods: {
        handleClose() {
            this.$emit('update-class', 'kp_item_hide');
            this.$emit('close');
        },
        handleResize() {
            if (this.windowStateClass === 'kp_item_resize') {
                this.windowStateClass = ''; 
            } else {
                this.windowStateClass = 'kp_item_resize';
            }
            this.$emit('update-class', this.windowStateClass);
        },
        handleReduct() {
            this.$emit('update-class', 'kp_item_reduct');
        },
    },
    mounted() {
    },
};
</script>

<style scoped>    

.kp_window--show{
  display: block !important;
  overflow-y: hidden;
}
.kp_content--block--content{
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
  position: relative;
}
.kp_content--block--content{
    max-width: calc(100% - 20px) !important;
    overflow-y: hidden;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    max-height: 100vh;
}
.kp_content--block{
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 800px;
  width: 700px;
  height: 750px;
  background: #cdcabb;
  position: absolute;
  max-height: 100vh;
  max-width: 100vw;
  
}
</style>
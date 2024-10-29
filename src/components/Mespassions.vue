<template>
    <!-- Texte image -->
    <section :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - Mes passions</span>
                </p>
            </div>
            <!-- Utilisation du composant Navigation avec le bon contexte -->
            <Navigation @close="handleClose"  @resize="handleResize"  @reduct="handleReduct"  :viewName="title" :context="context" :customClass="customClass" />
        </div>
        <FakeMenu></FakeMenu>
        <div  class="kp_content--block--content kp_element--enable">

        </div>
           
           <div class="resize-handle"></div>
       </section>
       <!-- Texte image -->
</template>

<script>
import Navigation from  '@/components/Navigation.vue';
import FakeMenu     from '@/components/Fakemenu.vue';

import textIcon from    '@/assets/images/icon-heart.png'; 

export default {
  name: 'Passions',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
    FakeMenu
  },
  props: {
    context: {
      type: String,
      default: 'passions'
    },
    title: {
      type: String,
      default: 'Passions'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
  data() {
    return {
        textIcon,
        windowStateClass: 'kp_item_window_hide',
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
    }
  }
}
</script>

<style scoped>
.kp_window--show{
  display: block !important;
  overflow: hidden;
}
.kp_content--block--content{
  overflow: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
  position: relative;
}
.kp_content--block{
  max-width: none !important;
}

.kp_image-text--show,
.kp_text--show{
  display: block;
}
.kp_content--block--content{
  overflow: scroll;
  overflow: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
}
.kp_content--block{
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 800px;
  width: 50%;
  height: fit-content;
  background: #eeecdf;
  position: absolute;
}


@media screen and (max-width: 900px){
  .kp_content--block--content{
    overflow: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    position: relative;
    height: calc(100% - 36px) !important;
    font-size: 9px;
    display: flex;
    align-items: flex-end;
  }
}

</style>
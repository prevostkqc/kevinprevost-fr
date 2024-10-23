<template>
    <!-- Profil -->
    <section :class="['kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', 'kp_element--action--close']" :id="`kp_${context}`">
      <div class="kp_element--title">
        <div class="kp_element--icon-title">
          <p class="kp_element--enable">
            <div class="kp_ascii--icn">
              <img class="kp_icon_zone--img" :src="iconSource" alt="icon">
            </div>
            <span>{{ title }}</span>
          </p>
        </div>
        <Navigation @close="handleClose"  @resize="handleResize"  @reduct="handleReduct"  :viewName="title" :context="context" :customClass="customClass" />
      </div>
      <div :class="['kp_element_container--part-content', 'kp_element--enable', `kp_element__${context}--container`]">
        <div class="kp_element__main-content">
          <div :class="['kp_element_zone__profil--left', `kp_element_zone__${context}--left`]">
            <div :class="['kp_menu__barre-etat--photo-container', `kp_menu__barre-etat--photo-container-${context}`]">
              <img :class="['kp_menu__barre-etat--photo', `kp_menu__barre-etat--photo-${context}`]" :src="profileImage" alt="Kévin Prévost">
            </div>
            <p :class="['kp_title--ssmenu-profil', `kp_title--ssmenu-${context}`]">xxx</p>
          </div>
          <div :class="['kp_element_zone__profil--right', `kp_element_zone__${context}--right`]">
            <p :class="['kp_title--ssmenu-profil', `kp_title--ssmenu-${context}`]">xxx</p>
          </div>
        </div>
      </div>
      <div class="resize-handle"></div>
    </section>
    <!-- Profil -->
  </template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';
  import profileImage from '@/assets/images/kevinprevost.jpg';
  
  export default {
    name: 'Personnaliser',
    emits: ['close', 'resize', 'reduct'],
    components: {
      Navigation
    },
    props: {
      context: {
        type: String,
        default: 'profil'
      },
      title: {
        type: String,
        default: 'Mon Profil'
      },
      iconSource: {
        type: String,
        default: '/images/text.png'
      },
      customClass: {
        type: String,
        default: 'kp_element--incons-zone'
      }
    },
    data() {
      return {
        profileImage 
      };
    },
    methods: {
      toggleShow() {
        this.buttonText = this.buttonText === 'Afficher plus d\'informations' ? 'Masquer les informations' : 'Afficher plus d\'informations';
      },
      handleClose() {
        this.$emit('update-class', 'kp_item_hide');
      },
      handleResize() {
        this.$emit('update-class', 'kp_item_resize');
      },
      handleReduct() {
        this.$emit('update-class', 'kp_item_reduct');
      },
      toggleShow(event) {
          const parentElement = event.target.parentElement;
          parentElement.classList.toggle('kp-cv--show');
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  
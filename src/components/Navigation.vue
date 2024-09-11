<template>
  <div :class="customClass">
    <div :class="['kp_icon_zone', `kp_icon_zone--reduct`, `kp_icon--reduct-${context}`]" 
         :id="`kp_action--reduct--${context}`"
         @click="handleAction('reduct')">
      <img class="kp_icon_zone--img" :src="navigationReduct" alt="reduct">
    </div>
    <div :class="['kp_icon_zone', `kp_icon_zone--resize`, `kp_icon--resize-${context}`]" 
         :id="`kp_action--resize--${context}`"
         @click="handleAction('resize')">
      <img class="kp_icon_zone--img" :src="navigationResize" alt="resize">
    </div>
    <div :class="['kp_icon_zone', `kp_icon_zone--close`, `kp_icon--close-${context}`]" 
         :id="`kp_action--close--${context}`"
         @click="handleAction('close')">
      <img class="kp_icon_zone--img" :src="navigationClose" alt="close">
    </div>
  </div>
</template>

<script>
import navigationClose from '@/assets/images/close_icn.svg';
import navigationResize from '@/assets/images/resize_icn.svg';
import navigationReduct from '@/assets/images/reduct_icn.svg';

export default {
  name: 'Navigation',
  props: {
    viewName: {
      type: String,
      required: true
    },
    context: {
      type: String,
      default: 'browser' // Par défaut, on assume un contexte de navigateur
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
  data() {
    return {
      navigationClose,
      navigationResize,
      navigationReduct
    };
  },
  methods: {
    handleAction(action) {
      console.log(`Action "${action}" triggered for view: ${this.viewName} in context: ${this.context}`);
      
      if (action === 'close') {
        console.log(`Emitting 'close' event for view: ${this.viewName}`);
        this.$emit('close');  // Émettre l'événement 'close'
      }

      if (action === 'resize') {
        console.log(`Emitting 'resize' event for view: ${this.viewName}`);
        this.$emit('resize');  // Émettre l'événement 'close'
      }

      if (action === 'reduct') {
        console.log(`Emitting 'reduct' event for view: ${this.viewName}`);
        this.$emit('reduct');  // Émettre l'événement 'close'
      }
    }
  }
};
</script>

<style scoped>
</style>

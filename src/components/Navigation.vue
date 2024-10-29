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
    context: {
      type: String,
      default: 'browser'
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
      if (action === 'close') {
        this.$emit('close');
      }

      if (action === 'resize') {
        this.$emit('resize'); 
      }

      if (action === 'reduct') {
        this.$emit('reduct');
      }
    }
  }
};
</script>

<style scoped>
</style>

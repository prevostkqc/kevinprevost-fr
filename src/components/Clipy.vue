<template>
    <!-- Clipy -->
    <section class="kp_clipy__zone">
      <article :class="['kp_clipy', customClass]" :id="`kp_${context}`">
        <img :class="['kp_clipy--img']" :src="clipyImage" alt="Clipy">
      </article>
      <div :class="['kp_clipy--bulle', `kp_bulle--${context}`]">
        {{ message }}
      </div>
  </section>
    <!-- Clipy -->
  </template>
  
  <script>
  import clipyImage from '@/assets/images/clipy.gif';   
  export default {
    name: 'Clipy',
    props: {
      context: {
        type: String,
        default: 'clipy'
      },
      message: {
        type: String,
        default: 'Bonjour, je suis Clipy, votre assistant personnel. Comment puis-je vous aider ?'
      },
      customClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        clipyImage
      };
    }
  };
  </script>
  
  <style scoped>
  .kp_clipy__zone {
    width: 70px;  
    position: fixed;
    bottom: 50px;
    right: 30px;
    z-index: 1000;
  }
  
  .kp_clipy--img {
    width: 100%;
    filter: drop-shadow(2px 4px 4px black);
  }
  
  @media screen and (max-width: 900px) {
    .kp_clipy {
      width: 50px;
      bottom: 50px;
      right: 10px;
    }
    .kp_clipy--bulle {
      max-width: 50vw;
      min-width: 50vw;
    }
    .kp_clipy--bulle::after {
      right: 40px;
    }
  }
  </style>
  
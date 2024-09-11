<template>
    <!-- Starting -->
    <div v-if="showAnimation">
      <div :class="customClass"></div>
      <section :class="['kp_starting', `kp_${context}`]">
        <div class="kp_ecran-container">
          <img class="kp_ecran kp_ecran--step1" :src="screenOffImage" alt="écran">
          <img class="kp_ecran kp_ecran--step0 kp_ecran--step3" :src="screenImage2" alt="écran click">
          <img class="kp_ecran kp_ecran--step0 kp_ecran--step2" :src="screenImage1" alt="écran click">
          <img class="kp_ecran kp_ecran--step0 kp_ecran--step5" :src="screenImage41" alt="écran click">
          <img class="kp_ecran kp_ecran--step0 kp_ecran--step4" :src="screenImage5" alt="écran click">
          <img class="kp_ecran kp_ecran--step0 kp_ecran--step6" :src="screenImage6" alt="écran click">
        </div>
      </section>
    </div>
    <!-- Starting -->
  </template>
  
  <script>
  // Import des images
  import screenOffImage from '@/assets/images/ecran_eteint.png';
  import screenImage1 from '@/assets/images/ecran1.png';
  import screenImage2 from '@/assets/images/ecran2.png';
  import screenImage41 from '@/assets/images/ecran41.png';
  import screenImage5 from '@/assets/images/ecran5.png';
  import screenImage6 from '@/assets/images/ecran6.png';
  
  export default {
    name: 'Starting',
    props: {
      context: {
        type: String,
        default: 'starting'
      },
      customClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        showAnimation: false,
        screenOffImage,
        screenImage1,
        screenImage2,
        screenImage41,
        screenImage5,
        screenImage6
      };
    },
    methods: {
      checkAndShowAnimation() {
        const ANIMATION_INTERVAL = 15 * 60 * 1000;
        const lastAnimationTime = localStorage.getItem('lastAnimationTime');
        const now = Date.now();
  
        if (!lastAnimationTime || (now - lastAnimationTime) > ANIMATION_INTERVAL) {
          this.showAnimation = true;
          localStorage.setItem('lastAnimationTime', now);
          setTimeout(() => {
            this.showAnimation = false;
          }, 5000);
        }
      }
    },
    mounted() {
      this.checkAndShowAnimation();
    }
  };
  </script>
  
  <style scoped>
  .kp_starting {
    width: 100vw;
    height: 100vh;
    background: rgb(0, 0, 0);
    background-image: url('@/assets/images/windows-spring.jpg');
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99999;
    display: flex;
    overflow: hidden;
    animation: fadeIn 1s 3.5s forwards;
  }
  
  .kp_ecran-container {
    width: 60vw;
    height: 90vh;
    top: 0;
    left: 0;
    margin: auto;
    position: relative;
    padding-top: 5vh;
    max-width: 1200px;
    display: flex;
    justify-content: center;  
    align-items: center;     
    overflow: hidden;         
    animation: entrerdanslecran 2.5s 3s forwards;
    filter: drop-shadow(0 0 2.5rem #000);
}

.kp_ecran {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;  
    object-position: center; 
    pointer-events: none;
}
  
  
  .kp_ecran--step0 {
    opacity: 0;
  }
  
  .kp_ecran--step2 {
    animation: step2 0.5s 0.5s forwards;
  }
  
  .kp_ecran--step3 {
    animation: step3 0.1s 0.5s forwards;
  }
  
  .kp_ecran--step4 {
    animation: step4 0.5s 1s forwards;
  }
  
  .kp_ecran--step5 {
    animation: step5 1s 0.5s forwards;
  }
  
  .kp_ecran--step6 {
    animation: step6 0.5s 1.5s forwards;
  }
  
  @keyframes step2 {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  
  @keyframes step3 {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes step4 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes step5 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes step6 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      pointer-events: none;
    }
  }
  
  @keyframes entrerdanslecran {
    0% {
      transform: scale(1);
      opacity: 1;
      top: 0;
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: scale(10);
      top: 40%;
    }
  }
  
  @keyframes entrerdanslecranmobile {
    0% {
      transform: scale(1);
      opacity: 1;
      top: 25vh;
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: scale(10);
      top: 300%;
    }
  }
  
  @media screen and (max-width: 900px) {
    .kp_ecran-container {
      animation: entrerdanslecranmobile 2.5s 3s forwards;
      top: 25vh;
    }
  }
  </style>
  
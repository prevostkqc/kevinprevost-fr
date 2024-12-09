<template>
  <!-- Clipy -->
  <input type="checkbox" id="clippyactivated">
  <section class="kp_clipy__zone">
    <label for="clippyactivated" class="clippyclick"></label>
    <article :class="['kp_clipy', customClass]" :id="`kp_${context}`">
      <img :class="['kp_clippy--img', 'kp_clipy--feuille']" :src="clippyfeuille" alt="Clipy">
      <div class="kp_clippy--container">
        <img :class="['kp_clippy--img', 'kp_clipy--corps']" :src="clippy" alt="Clipy">
        <div class="kp_clippy--yeux-container">
          <img :class="['kp_clippy--img', 'kp_clipy--blancyeux']" :src="clippyblancyeux" alt="Clipy">
          <img :class="['kp_clippy--img', 'kp_clipy--vision', 'kp_clipy--vision1']" :src="clippyvision1" alt="Clipy">
          <img :class="['kp_clippy--img', 'kp_clipy--vision', 'kp_clipy--vision2']" :src="clippyvision2" alt="Clipy">
          <img :class="['kp_clippy--img', 'kp_clipy--yeux']" :src="clippyyeux" alt="Clipy">
          <img :class="['kp_clippy--img', 'kp_clipy--sourcil1']" :src="clippysourcil1" alt="Clipy">
          <img :class="['kp_clippy--img', 'kp_clipy--sourcil2']" :src="clippysourcil2" alt="Clipy">
        </div>
      </div>
    </article>
    <div :class="['kp_clipy--bulle', `kp_bulle--${context}`]">
      {{ message }}
      <br>
      <div class="text-content">
        <p class="kp_p  text_bulle" @click="emitAction('messervices')">
          <span class="btn_text">Mes ser<span class="under-windows">v</span>ices</span>
        </p>
        <p class="kp_p  text_bulle" @click="emitAction('mail')">
          <span class="btn_text">Me <span class="under-windows">c</span>ontacter</span>
        </p>
        <a class="kp_p  text_bulle" target="_blank" :href="cv" @click="emitAction('moncv')">
          <span class="btn_text">M<span class="under-windows">o</span>n CV</span>
        </a>
      </div>
      <label class="kp_icon_zone  kp_icon_zone--close" for="clippyactivated">
        <img :src="close" class="kp_icon_zone--img" alt="close">
      </label>
    </div>
  </section>
  <!-- Clipy -->
</template>

<script>
import clippyfeuille from '@/assets/images/clippy/feuille.svg';
import clippy from '@/assets/images/clippy/clippy.svg';
import clippyblancyeux from '@/assets/images/clippy/blancyeux.svg';
import clippyvision1 from '@/assets/images/clippy/vision1.svg';
import clippyvision2 from '@/assets/images/clippy/vision2.svg';
import clippyyeux from '@/assets/images/clippy/yeux.svg';
import clippysourcil1 from '@/assets/images/clippy/sourcil1.svg';
import clippysourcil2 from '@/assets/images/clippy/sourcil2.svg';

import close from '@/assets/images/close_icn.svg';

import cv from '/cv_kevin_prevost.pdf';


export default {
  emits: ['updateClass', 'close', 'actionSelected'],
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
      clippyfeuille,
      clippy,
      clippyblancyeux,
      clippyvision1,
      clippyvision2,
      clippyyeux,
      clippysourcil1,
      clippysourcil2,
      close,
      cv
    };
  },
  methods: {
    emitAction(actionType) {
      this.$emit('actionSelected', actionType);
    }
  }
};
</script>

<style scoped>
.kp_clipy__zone {
  width: 0px;
  height: 80px;
  position: fixed;
  bottom: 50px;
  right: 5px;
  z-index: 0;
}

.kp_clipy {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: transparent;
  cursor: pointer;
}

.kp_clippy--img {
  position: absolute;
  top: 0;
  left: -350px;
}

/* Clippy Corps */
.kp_clipy--corps {
  animation: clippycorps 5s infinite;
}

@keyframes clippycorps {
  0% {
    transform: scaleY(1) translateY(0);
  }

  90% {
    transform: scaleY(1) translateY(0);
  }

  95% {
    transform: scaleY(0.8) translateY(12px);
  }

  100% {
    transform: scaleY(1) translateY(0);
  }
}

/* Clippy Corps */
.kp_clippy--yeux-container {
  animation: clippyyeux 5s infinite;
}

@keyframes clippyyeux {
  0% {
    transform: translateY(0);
  }

  90% {
    transform: translateY(0);
  }

  95% {
    transform: translateY(7px);
  }

  100% {
    transform: translateY(0);
  }
}

/* Clippy sourcil1 */
.kp_clipy--sourcil1 {
  animation: clippysourcil1 3s infinite linear;
}

@keyframes clippysourcil1 {
  0% {
    transform: rotate(0) translate(0, 0);
  }

  15% {
    transform: rotate(0) translate(0, 0);
  }

  20% {
    transform: rotate(-2deg) translate(0, 0);
  }

  25% {
    transform: rotate(0) translate(0, 0);
  }

  75% {
    transform: rotate(0) translate(0, 0);
  }

  80% {
    transform: rotate(-2deg) translate(0, 0);
  }

  85% {
    transform: rotate(0) translate(0, 0);
  }

  100% {
    transform: translateY(0);
  }
}

/* Clippy sourcil2 */
.kp_clipy--sourcil2 {
  animation: clippysourcil1 4s infinite linear;
}

@keyframes clippysourcil1 {
  0% {
    transform: rotate(0) translate(0, 0);
  }

  18% {
    transform: rotate(0) translate(0, 0);
  }

  20% {
    transform: rotate(-2deg) translate(0, 0);
  }

  22% {
    transform: rotate(0) translate(0, 0);
  }

  77% {
    transform: rotate(0) translate(0, 0);
  }

  80% {
    transform: rotate(-2deg) translate(0, 0);
  }

  82% {
    transform: rotate(0) translate(0, 0);
  }

  100% {
    transform: translateY(0);
  }
}

/* clippy vision */
.kp_clipy--vision {
  animation: clippyvision 8s infinite;
}

@keyframes clippyvision {
  0% {
    transform: translate(0, 0);
  }

  5% {
    transform: translate(-5px, 0);
  }

  8% {
    transform: translate(-5px, -2px);
  }

  10% {
    transform: translate(0, 0);
  }

  35% {
    transform: translate(0, 0);
  }

  45% {
    transform: translate(5px, 0);
  }

  50% {
    transform: translate(0, 0);
  }

  55% {
    transform: translate(3px, 2px);
  }

  60% {
    transform: translate(-3px, 2px);
  }

  65% {
    transform: translate(0, 0);
  }

  85% {
    transform: translate(3px, -2px);
  }

  90% {
    transform: translate(0, 0);
  }

  95% {
    transform: translate(-3px, 2px);
  }

  100% {
    transform: translate(0, 0);
  }
}

.kp_clippy--container {
  user-select: none;
  pointer-events: none;
  position: relative;
  width: 100%;
  height: 100%;
  animation: clippymove 5s infinite;
}

.kp_clipy--feuille {
  user-select: none;
  pointer-events: none;
}

.text_bulle {
  font-size: 16px;
  color: #000000;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;
  border: solid 1px #c1c0a5;
  padding: 5px 30px;
}
.btn_text{
  color: #000000;;
  border: dotted 2px #c1c0a500;
}
.text_bulle:hover .btn_text{
  border: dotted 2px #c1c0a5;
}

.kp_clipy--bulle {
  padding-right: 50px;
}


.text-content {
  margin: 20px 0 0;
}

.kp_icon_zone--close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.clippyclick {
  position: fixed;
  bottom: 46px;
  right: 0;
  width: 100px;
  height: 90px;
  cursor: pointer;
}

#clippyactivated {
  display: none;
}

#clippyactivated:checked~.kp_clipy__zone .kp_clipy--bulle {
  display: none;
}

.text-content {
  display: flex;
  gap: 20px;
}
@keyframes clippymove {
  0% {
    transform: scaleY(1) translateY(0);
  }

  20% {
    transform: scaleY(1) translateY(0);
  }

  21% {
    transform: scaleY(1) translateY(3px);
  }

  26% {
    transform: scaleY(0.8) translateY(-15px);
  }

  30% {
    transform: scaleY(1) translateY(0);
  }

  35% {
    transform: scaleY(1) translateY(0);
  }

  38% {
    transform: scaleY(0.95) translateY(1px);
  }

  40% {
    transform: scaleY(1) translateY(0);
  }
}

@media screen and (max-width: 960px) {
  .kp_clipy {
    width: 50px;
    bottom: 50px;
    right: 10px;
  }

  .kp_clipy--bulle {
    max-width: 50vw;
    min-width: 50vw;
    right: -30px;
    bottom: 145px;
  }

  .kp_clipy--bulle::after {
    right: 40px;
  }

  .kp_clipy__zone {
    bottom: 16px;
    right: 40px;
    transform: scale(0.8);
  }

  .text-content{
    display:none;
  }
}
</style>
<template>
    <!-- Starting -->
    <!-- <div v-if="showAnimation"> -->
    <div>
      <section :class="['kp_starting', `kp_${context}`]">
        <div class="kp_container-home">
          <div class="kp_container--left">
            <div class="open-light"></div>
            <img :src="logo" alt="Kévin Prévost" class="kp_starting--logo"/>
            <div class="kp_container--left-text">
              <h1>Kévin Prévost</h1>
              <h2>Développeur web</h2>
            </div>
            
          </div>
            
          <div class="kp_separation">
            <div class="kp_sep"></div>
          </div>

          <div class="kp_container--right">
            <div @click="handleClose" class="link-profil">
              <div>

                <div class="kp_right-content">
                  <div class="kp_photo-container">
                    <img class="kp_photo" :src="maphoto" alt="Kévin Prévost">
                  </div>
                  <div class="kp_titre-profil-barre">
                    <h3 class="session-titre">Kévin Prévost</h3>
                    <h4 class="session-sstitre">Développeur Web</h4>
                    <div class="btn-windows-xp  btn-windows-xp-ok" ><span class="btn-windows-xp--texte">Me découvrir</span></div>
                  </div>
                </div>
                <div class="message-alerte">
                  <div class="texte-alerte">
                    <img :src="caution" alt="Kévin Prévost" class="kp_caution"/>
                    <p>Pour une expérience optimale, visitez ce site depuis un ordinateur plutôt que sur un téléphone.</p>
                  </div>
                </div>
              </div>
            </div>
          
          </div>


          <div class="part  part--top">
            <div class="part-color"></div>
            <div class="part-line"></div>
          </div>
          <div class="part  part--bottom">
            <div class="part-line"></div>
            <div class="part-color"></div>
          </div>
            
        </div>
      </section>
      <div class="kp_starting--screen-off">
      </div>
    </div>
    <!-- Starting -->
  </template>
  
  <script>
  import logo from '@/assets/images/logo.png';
  import maphoto from '@/assets/images/kevinprevost.jpg';
  import caution from '@/assets/images/icon-caution-blue.png';
  
  export default {
    name: 'Starting',
    props: {
      context: {
        type: String,
        default: 'Kévin prévost'
      },
      customClass: {
        type: String,
        default: ''
      },
      goToHome() {
        this.$router.push('/home'); // Navigue vers la vue "Home"
      }
    },
    data() {
      return {
        showAnimation: false,
        logo,
        maphoto,
        caution
      };
    },
    methods: {
      handleClose() {
        this.$emit('close');
      },
      /*
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
        */
    },
    mounted() {
      /*
      this.checkAndShowAnimation();
      */
    }
  };
  </script>
  
  <style scoped>
  *{
    font-family: Tahoma;
  }
  .kp_starting {
    width: 100vw;
    height: 100vh;
    background: #010101;
  }
  h1{
    font-size: 40px;
    color: #fff;
    margin: 0;
  }
  h2{
    font-size: 31px;
    color: #fff;
    margin: 0;
  }
  .kp_container-home {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    animation: changeColor 1s forwards;
    animation-delay: 2s;
  }
  @keyframes changeColor {
    0% { 
      background: #010101;
      flex-wrap: wrap;
    }
    100% { 
      background: #5a7edc;
    }
  }
  .kp_separation{
    width:2px;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    pointer-events: none;
  }
  .kp_sep{
    position: relative;
    width:2px;
    height:0;
    background: #5a7edc;
    background: rgb(90,126,220);
    background: linear-gradient(0deg, rgba(90,126,220,0) 0%, rgba(140,169,236,1) 20%, rgba(140,169,236,1) 80%, rgba(175,200,247,0) 100%);
    animation: sepanim 1.0s forwards;
    animation-delay: 1.5s;
  }

  @keyframes sepanim{
    0% { height: 0;}
    100% { height: 80%;}
  }

  @media screen and (min-width: 960px) {

    .kp_container--left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      flex-direction: column;
      width:100%;
      max-width: 100%;
      animation: leftmove 1.5s forwards linear;
      user-select: none;
      pointer-events: none;
    }
    @keyframes leftmove{
      0% {
        max-width: 100%;
      }
      100% {   
        max-width: 50%;
      }
    }
  }

@media screen and (max-width: 960px) {

  .kp_container--left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    flex-direction: column;
    width:100%;
    max-width: 80%;
    animation: leftmove 1.5s forwards linear;
    user-select: none;
    pointer-events: none;
  }
  @keyframes leftmove{
    0% {
      max-width: 100%;
    }
    100% {   
      max-width: 80%;
    }
  }
}

  .kp_starting--logo {
    width: 100%;
    max-height: 100%;
    max-width: 500px;
    object-fit: contain;
    animation: fadeinUp 0.8s forwards;
    opacity:0;
    animation-delay: 0.3s;
  }
  .kp_container--left-text{
    opacity: 0;
    animation: fadein 0.7s forwards;
    animation-delay: 1s;
    position: relative;
    top:-40px;
    left:-14px;
  }
  @keyframes fadein{
    from { opacity: 0;}
    to { opacity: 1;}
  }
  @media screen and (min-width: 960px) {
      @keyframes fadeinUp{
        from { opacity: 0; transform: translateY(5%);}
        to { opacity: 1; transform: translateY(0); }
      }
  }
  @media screen and (max-width: 960px) {
    @keyframes fadeinUp{
        from { opacity: 0;}
        to { opacity: 1; }
      }
  }


  @media screen and (min-width: 960px) {
    .kp_container--right {
      display: flex;
      opacity:0;
      max-width: 25%;
      width: 0%;
      height: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      animation: rightmove 2s forwards;
      animation-delay:1.7s;
    }
    @keyframes rightmove{
      0% {
        width:0%;
        opacity: 0;
      }
      40% {
        width:25%;
        opacity: 0;
      }
      100% { 
        width:25%;
        opacity: 1;
      }
    }
}
@media screen and (max-width: 960px) {
    .kp_container--right {
      display: flex;
      opacity:0;
      max-width: 100%;
      width: 100%;
      height: 0%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      animation: rightmove 2s forwards;
      animation-delay:1.7s;
      width: calc(100% - 20px);
    }
    @keyframes rightmove{
      0% {
        height:0%;
        opacity: 0;
      }
      40% {
        height:33%;
        opacity: 0;
      }
      100% { 
        height:33%;
        opacity: 1;
      }
    }
}

  .part{    
    position: absolute;
    width: 100%;
    height: 80px;
    z-index: 1;
    user-select: none;
    pointer-events: none;
  }
  .part-color{
    background: #00309c;
    width: 100%;
    height: 80px;
  }
  .part-line {
    background: rgb(90,126,220);
    background: linear-gradient(90deg, rgba(90,126,220,0) 0%, rgba(175,200,247,1) 30%, rgba(175,200,247,1) 70%, rgba(175,200,247,0) 100%);
    width: 100%;
    height: 2px;
  }

  .part--top{
    top: 0;
    transform: translateY(-110%);
    animation: upscreen 1s forwards;
    animation-delay: 2s;
  } 
  .part--bottom{
    bottom: 0;
    transform: translateY(110%);
    animation: downscreen 1s forwards;
    animation-delay: 2s;
  }
  @keyframes upscreen{
    0% { transform: translateY(-100%);}
    100% { transform: translateY(0%);}
  }
  @keyframes downscreen{
    0% { transform: translateY(100%);}
    100% { transform: translateY(0%);}
  }

  .open-light{
    background: radial-gradient(circle, rgba(146, 178, 239, 1) 0%, rgba(146, 178, 239, 0) 45%);
    position: absolute;
    height: 45vw;
    width: 45vw;
    z-index: 0;
    opacity:0;
    top: -18vw;
    left: -17vw;
    user-select: none;
    border-radius: 100%;
    pointer-events: none;
    animation: fadein 1s forwards;
    animation-delay: 2s;
  }

  .kp_right-content{
    gap: 20px;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    margin-left: 50px;
    padding: 20px 20px;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px 0 0 10px;
    background: rgb(18,66,166);
    background: linear-gradient(90deg, rgba(18,66,166,1) 0%, rgba(25,72,171,1) 39%, rgba(90,126,220,1) 84%);
  }
  .kp_right-content:hover{
    background: linear-gradient(90deg, rgb(21, 75, 193) 0%, rgb(31, 89, 214) 39%, rgba(90,126,220,1) 84%);
  }
    
  
  .kp_photo-container{
    width: 100%;
    height: fit-content;
    margin: auto 0;
    max-width: 180px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 2px;
    background: #ffee00;
    outline: solid 3px #ffb600;
    border-radius: 10px;
  }
  .kp_photo{
    width:100%;
  }
  .kp_titre-profil-barre,
  .link-profil{
    text-decoration: none;
  }
  .session-titre{
    font-size: 1.5em; 
  }
  .session-sstitre{
    font-size: 1.2em; 
    padding-top:10px;
  }

.message-alerte{
  display:none;
}
  @media screen and (max-width: 960px) {
    
    .message-alerte{
      display: flex;
      border-top: solid 1px white;
      border-bottom: solid 1px white;
      padding: 15px 0;
      max-width: calc(100% - 20px);
      margin: 20px auto 0;
    }
    .texte-alerte{
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
    }
    .texte-alerte p{
      line-height: 1.5;
      font-size:14px;
    }
    .kp_container-home{
      flex-wrap: wrap;
      align-content: center;
    }
    .kp_container--left {
      max-width: 100%;
      width:100%;
    }
    .kp_container--right {
      max-width: 100%;
      width:100%;
    }
    .kp_separation,
    .kp_container--left-text{
      display:none;
    }
    .kp_right-content{
      flex-wrap: wrap;
        background: #1141a5;
        width: calc(100% - 100px);
        border-radius: 10px;
        margin: auto;
    }
    .kp_titre-profil-barre{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }
    .btn-windows-xp {
      margin:20px 0 0;
    }
    .kp_photo-container{
      width: 80px;
    }
    .session-titre{
      font-size:20px;
    }
    .session-sstitre{
      font-size:16px;
    }
    .kp_right-content{
      flex-wrap: wrap;
        background: #1141a5;
        width: calc(100% - 60px);
        border-radius: 10px;
        margin: auto;
    }
    .open-light{
      width: 100vw;
      height: 100vh;
      top: -50vh;
      left: -50vw;
    }
  }
  </style>
  
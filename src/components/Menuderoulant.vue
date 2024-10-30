<template>

    <section class="kp_menu__barre-etat" ref="menu">
        
      <div class="kp_menu__barre-etat--titre">
        <div class="kp_menu__barre-etat--photo-container">
          <img class="kp_menu__barre-etat--photo" :src="maphoto" alt="Kévin Prévost">
        </div>
        <p class="kp_titre-profil-barre">Kévin Prévost - Développeur front-end</p>
      </div>
      <div class="kp_menu__barre-etat--container">
        <div class="kp_menu__barre-etat--content-left">
  
          <article class="kp_menu__barre-etat--ico kp_menu__barre-etat--projet" @click="emitAction('folder')">
            <div class="kp_menu__barre-etat--un-ico-container-img">
              <img class="kp_menu__barre-etat--img" :src="folder" alt="Mes projets">
            </div>
            <div>
              <p class="kp_menu__barre-etat--un-ico-container--text">
                Mes réalisations
              </p>
              <p class="kp_menu__barre-etat--un-ico-container--desc">
                Consulter mes projets
              </p>
            </div>
          </article>
          
  
          <article class="kp_menu__barre-etat--ico kp_menu__barre-etat--contact">
            <a :href="mailLink" class="kp_hrefmailto">
            </a>
            <div class="kp_menu__barre-etat--un-ico-container-img">
                <img class="kp_menu__barre-etat--img" :src="mail" alt="Me contacter">
              </div>
            <div>
              <p class="kp_menu__barre-etat--un-ico-container--text">
                Me contacter
              </p>
              <p class="kp_menu__barre-etat--un-ico-container--desc">
                Envoyez-moi un message
              </p>
            </div>
          </article>
          
  
          <article class="kp_menu__barre-etat--ico kp_menu__barre-etat--quisuisje" @click="emitAction('monparcours')">
            <div class="kp_menu__barre-etat--un-ico-container-img">
              <img class="kp_menu__barre-etat--img" :src="cv" alt="Mon parcours">
            </div>
            <div>
              <p class="kp_menu__barre-etat--un-ico-container--text">
                Mon parcours
              </p>
              <p class="kp_menu__barre-etat--un-ico-container--desc">
                Consulter mon parcours
              </p>
            </div>
          </article>

          
          
  
          <article class="kp_menu__barre-etat--ico kp_menu__barre-etat--quisuisje" @click="emitAction('monparcours')">
            <div class="kp_menu__barre-etat--un-ico-container-img">
              <img class="kp_menu__barre-etat--img" :src="pokemon" alt="Ma passion">
            </div>
            <div>
              <p class="kp_menu__barre-etat--un-ico-container--text">
                Ma passion
              </p>
              <p class="kp_menu__barre-etat--un-ico-container--desc">
                Découvrez ma passion
              </p>
            </div>
          </article>
  
        </div>
        <div class="kp_menu__barre-etat--content-right">
          <!-- Contenu de la partie droite -->
        </div>
      </div>
      
      <div class="kp_menu__barre-etat--bottom">
        <div class="item-action">
            <router-link to="/" class="link-profil"></router-link>
            <img class="kp_menu__barre-etat--img-icon" :src="lockIcon" alt="Verrouiller">
            <p class="kp_menu--sortir">Fermer la session</p>
          </div>
      
      
          <div class="item-action">
            <router-link to="/" class="link-profil"></router-link>
            <img class="kp_menu__barre-etat--img-icon" :src="exitIcon" alt="Fermer">
            <p class="kp_menu--sortir">Arrêter la navigation</p>
          </div>
      </div>
    </section>
    
  </template>
  
  <script>
import maphoto from '@/assets/images/kevinprevost.jpg';
import folder from '@/assets/images/folder.png';
import mail from '@/assets/images/mail.png';
import cv from '@/assets/images/cv.png';
import pokemon from '@/assets/images/pokecard_icn.png';

import exitIcon from '@/assets/images/exit-icon.png';
import lockIcon from '@/assets/images/lock-icon.png';

export default {
  name: 'Desktop',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
        maphoto,
        folder,
        mail,
        cv,
        mailLink: 'mailto:contact@kevinprevost.fr?subject=Contact depuis kevinprevost.fr&body=Nom : %0D%0APrénom : %0D%0ATéléphone : %0D%0ACompagnie (facultatif) : %0D%0A%0D%0ADescription du projet : %0D%0A%0D%0A%0D%0A%0D%0A',
        localIsVisible: true, 
        exitIcon,
        lockIcon,
        pokemon,
      };
  },
  methods: {
    toggleClass(menuIsVisible) {
      this.localIsVisible = menuIsVisible;
      this.updateMenuClass(menuIsVisible);
    },
    updateMenuClass(menuIsVisible) {
      this.localIsVisible = menuIsVisible;
      const menu = this.$refs.menu;
      if (menu) {
        if (!this.localIsVisible) {
          menu.classList.add('kp_menu__barre-etat--show');
          document.removeEventListener('click', this.handleClickOutside); 
        } else {
          menu.classList.remove('kp_menu__barre-etat--show');
        }
      }
    },

    emitAction(actionType) {
      this.$emit('actionSelected', actionType);
    },
  },
  watch: {
    isVisible(newVal) {
      this.localIsVisible = newVal;
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
};
</script>


  
  <style scoped>
.kp_menu__barre-etat{
    position: absolute;
    bottom: -10px;
    left: 0;
    background: white;
    width: 100%;
    max-width: 600px;
    transform: translateY(100%);
    transition: 0.1s;
    pointer-events: initial;
    filter: drop-shadow(1px 3px 4px black);
    border: solid 3px #255ec6;
    border-radius: 10px 10px 0 0;
}
.kp_menu__barre-etat--show {
  transform: translateY(0%);
  bottom: 42px;
}
.kp_menu__barre-etat--titre{

  background: rgb(139,185,237);
  background: linear-gradient(180deg, rgba(139,185,237,1) 0%, rgba(23,103,207,1) 3%, rgba(37,119,220,1) 16%, rgba(37,119,220,1) 64%, rgba(91,159,242,1) 100%);
  padding: 5px;
  border: solid 1px #4e7cd3;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: inset 0 0 13px rgb(45, 145, 255);
  padding: 20px 10px;
  font-size: 20px;
  width: calc(100% - 22px);
  gap: 20px;
  position: relative;
  top: -6px;
  outline: solid 1px #255ec6;
  border-radius: 10px 10px 0 0;
  &:hover{
    cursor: pointer;
  }
  &:hover .kp_titre-profil-barre{
    text-decoration: underline;
  }
  &:hover .kp_menu__barre-etat--photo-container{
    filter: drop-shadow(4px 3px 0px rgba(0, 0, 0, 0.3333333333));
  }
  &:hover .kp_menu__barre-etat--photo{
    opacity: 0.9;
  }
}
.kp_menu__barre-etat--titre:after{
content: "";
  position: absolute;
  width: 100%;
  height: 3px;
  left: -1px;
  background: red;
  bottom: -5px;
  border: solid 1px white;
  border-top: solid 1px #002c77;
  background: rgb(255,255,255);
  background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(242,143,41,1) 33%, rgba(241,138,32,1) 50%, rgba(240,142,41,1) 66%, rgba(211,229,250,1) 100%);
}
.kp_notification__demarrer{
  width: 172px;
  height: 44px;
  position: fixed;
  bottom: 0;
  left: 0;
}
.kp_menu__barre-etat--photo{
width: 60px;
}
.kp_menu__barre-etat--container{
  position: relative;
  top: -5px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 400px;
}
#kp_lang__user,
#kp_battery__user{
padding-right: 20px;
}
.kp_battery--img{
  width: 20px;
  filter: drop-shadow(2px 2px 1px #0000EE55);
}

/* icons */
.kp_menu__barre-etat--img{
  width: 40px;
}
.kp_menu__barre-etat--un-ico-container--text{
  color: #34393a;
  font-weight: 700;
}
.kp_menu__barre-etat--un-ico-container--desc{
  color: #aba3a9;
  font-weight: 400;
  padding-top: 5px;
}
.kp_menu__barre-etat--ico{
  display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    padding: 10px;
    cursor: pointer;
    &:hover{
      filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3333333333));
      background-color: #316ac5;
    }
    &:hover .kp_menu__barre-etat--un-ico-container--desc{
      color: #34393a;
    }
    &:hover p{
        color:white !important;
    }
}
.kp_menu__barre-etat--content-right{
  background: #d0dff6;
    width: 50%;
    border-left: solid 1px #a0c4f0;
    position: relative;
    top: 3px;
}
.kp_menu__barre-etat--photo-container{
  border: solid 3px white;
  border-radius: 7px;
  filter: drop-shadow(2px 2px 3px #00000055);
  cursor: pointer;
  height: 60px;
  background: white;
}

.kp_element_container--part-content{
  min-height: 300px;
  min-width: 400px;
  background: #0053e3;
  border: solid 2px #0053e3;
  border-top: 3px solid #0053e3;
  box-shadow: inset 0 0 13px rgb(45, 145, 255);
  position: relative;
}
.kp_element_container--content{
  background: white;
  width:calc(100% - 4px);
  height: 100%;
  min-height: 296px;
  min-width: 396px;
  overflow-y: scroll;
  top: -2px;
  position: absolute;
  left: 2px;
}
.kp_element--action--close{
  display:none;
}
.kp_profil--show{
  display: block;
  position: absolute;
  top: 50px;
  left: 300px;
}
.kp_notification__demarrer{

}

.kp_element--title-p{
  display: flex;
}

.kp_element__main-content{
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
.kp_title--ssmenu-profil{
  color: black;
}
.kp_element__main-content{
background-color: white;
}

.kp_element__profil--container{
  min-height: 250px;
  height: calc(100% - 39px);
}
.kp_profil--show{
  min-height: 289px;
}
.kp_element__main-content{
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  height:100%;
  background: white;
}
.kp_element_zone__profil--left{
  width: calc(200px - 20px);
  background: #7b9fea;
  padding: 10px;
}


.kp_menu__barre-etat--bottom{
    background: rgb(139, 185, 237);
    background: linear-gradient(180deg, rgba(139, 185, 237, 1) 0%, rgba(23, 103, 207, 1) 3%, rgba(37, 119, 220, 1) 16%, rgba(37, 119, 220, 1) 64%, rgba(91, 159, 242, 1) 100%);
    padding: 5px;
    border: solid 1px #4e7cd3;
    box-shadow: inset 0 0 13px rgb(45, 145, 255);
    padding: 20px 20px 20px 0px;
    font-size: 20px;
    width: calc(100% - 22px);
    gap: 20px;
    position: relative;
    outline: solid 1px #255ec6;
    cursor: pointer;
    display: flex;
    justify-content: right;
    flex-wrap: wrap;
    gap: 40px;
}


.item-action{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding : 0px 10px 0px 0px;
    position: relative;
}
.item-action:hover{
    text-decoration: underline;
    background: #255ec6;
    
}
.kp_menu--sortir{
    font-size:16px;
}
.kp_menu__barre-etat--img-icon{
    width: 30px;
}
.item-action:hover .kp_menu__barre-etat--img-icon{
    filter: brightness(1.32) ;
}
.kp_menu__barre-etat--content-left{
    padding:10px;
    width: 50%;
}

.link-profil{
  position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}

  </style>
  
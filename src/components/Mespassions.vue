<template>
    <!-- Texte image -->
    <section ref="referenceSizeDiv"   :class="['kp_content--block', 'kp_z-index', dynamicClasses, 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
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
        <div class="onglets">
          <ul class="containers-liste-onglets  kp_folder-liste">
              <li :class="[{ active: activeTab === 1, 'selected-project': activeTab === 1 }, 'kp_folder-li']" @click="setActiveTab(1)">Pokémon</li>
              <li :class="[{ active: activeTab === 2, 'selected-project': activeTab === 2 }, 'kp_folder-li']" @click="setActiveTab(2)">Le sport</li>
              <li :class="[{ active: activeTab === 3, 'selected-project': activeTab === 3 }, 'kp_folder-li']" @click="setActiveTab(3)">Le dessin</li>
          </ul>
        </div>
        <div  :class="['kp_content--block--content', 'kp_element--enable']">

          <div class="container-passions">


            <!-- ----------------- -->
            <!-- POkémon -->
             <div class="onglet  onglet--1" v-show="activeTab === 1" >
              <article class="container-passion  kp_card">
                <div class="texte-passion">
                  <div class="kp_texte-carte">
                    <h2 class="kp_p-black kp_bold  kp_titre-passion">POKéMON</h2>
                    <p class="kp_p-black">
                    Ayant grandi dans les années 90, je n'ai pas échappé à la folie POKéMON.<br>
                    Après avoir développé deux jeux amateurs en Ruby pour honorer la <span class="kp_bold  kp_bold--passion">passion de mon enfance</span>, cela m'a laissé un attachement particulier.<br>
                      J'ai conservé ma collection de cartes d'enfance, qui contient des raretés toujours très recherchées de nos jours.
                      <br>
                      <br>
                      Pour découvrir <span class="kp_bold  kp_bold--passion">le fangame que je développe</span> sur mon temps libre, rendez-vous sur le site de <span class="kp_bold  kp_bold--passion">POKéMON Opale</span> en cliquant sur le lien ce-dessous.
                    </p>
                      <a class="btn-windows-xp  btn-windows-xp-ok" href="http://www.pokemonopale.fr" target="_blank"><span class="btn-windows-xp--texte">Découvrir mon fangame</span></a>
                  </div>
                </div>

                
                <div class="passion-demonstaration">
                  <div class="part--passion">
                    <p class="kp_p-black kp_bold  hide-mobile   text-passion">Survolez la carte pour la voir briller.</p>
                    <p class="kp_p-black kp_bold  hide-desktop  text-passion">Déplacez votre doigt sur la carte pour la voir briller.</p>
                  </div>                    
                  <div class="part--passion"></div>
                </div>
                
                <div class="passion-demonstaration  passion-demonstaration--pokemon">
                  <!-- Carte -->
                      <div class="part--passion  part--passion-pokemon">
                        <article class="kp_card-pokemon" ref="cardPokemon">
                            <div class="kp_card-pokemon--container">
                                <img class="kp_card-pokemon--img" :src="Pokemoncard2" alt="carte Pokémon">
                                <div class="kp_card-pokemon--holo" ref="cardHolo">
                                    <div class="kp_card-pokemon--glow" ref="cardGlow"></div>
                                </div>                    
                                <img class="kp_card-pokemon--img kp_card-pokemon--cadre" :src="Pokemoncard1" alt="carte Pokémon" ref="carCadre">
                                <div class="kp_card-pokemon--glow2" ref="cardGlow2"></div>
                            </div>
                        </article>
                        <article class="card-face card-back">
                          <img :src="PokemonBack" alt="Dos de la carte Pokémon">
                        </article>
                  </div>
                  <!-- Game Boy -->
                  <div class="part--passion">
                    <p class="kp_p-black kp_bold  hide-desktop">Des images de POKéMON Opale</p>
                      <div class="kp_gameboy" ref="gameboy">
                          <img class="kp_gameboy--screen  fight-delay" :src="screen" alt="Gameboy"> 
                          <img class="kp_gameboy--screen  title-delay" :src="screentitle" alt="Gameboy"> 
                          <img class="kp_gameboy--img" :src="Gameboy" alt="Gameboy"> 
                          <img class="kp_gameboy--on" :src="Gameboyon" alt="Gameboy"> 
                      </div>
                  </div>
                </div>
                
              </article>
            </div>

            <!-- ----------------- -->
            <!-- Sports -->
            <div class="onglet  onglet--2" v-show="activeTab === 2" >
              
              <article class="container-passion  kp_card">
                  <div class="texte-passion">
                      <div class="kp_texte-carte">
                        <h2 class="kp_p-black kp_bold  kp_titre-passion">Le sport</h2>
                        <p class="kp_texte kp_p-black">
                          Depuis toujours, le sport occupe une place importante dans ma vie, avec un attachement particulier aux équipes qui font vibrer Bordeaux.
                          <br><br>Que ce soit les <span class="kp_bold  kp_bold--passion">Boxers de Bordeaux</span> sur la glace, avec l'énergie et la combativité du hockey, ou <span class="kp_bold  kp_bold--passion">l'Union Bordeaux Bègles (UBB)</span> sur le terrain de rugby, ces équipes représentent pour moi bien plus que des matchs&nbsp;: elles incarnent l'esprit de camaraderie, de <span class="kp_bold  kp_bold--passion">dépassement de soi</span> et de fidélité à une ville.
                          <br>Bien sûr, je ne manque jamais une occasion de suivre les grands rendez-vous de football, un autre sport qui me passionne et qui complète <span class="kp_bold  kp_bold--passion">mon univers sportif</span>.
                        </p>
                      </div>
                  </div>
              </article>

              <div class="passion-demonstaration">
                <div class="part--passion  part--passion-sport">
                  <div class="flippassion">
                    <div class="recto">
                      <img class="img-sport-passion" :src="ubb" alt="Logo UBB">
                    </div>
                    <div class="verso">
                      <img class="img-sport-passion" :src="ubbphoto" alt="UBB">
                    </div>
                  </div>
                </div>
                <div class="part--passion  part--passion-sport">
                  <div class="flippassion">
                    <div class="recto">
                      <img class="img-sport-passion  boxersdebordeaux" :src="boxers" alt="Logo BOXERS">
                    </div>
                    <div class="verso">
                      <img class="img-sport-passion" :src="boxersphoto" alt="Boxers">
                    </div>
                  </div>
                </div>
              </div>
            </div>

            

            <!-- ----------------- -->
            <!-- Sports -->
            <div class="onglet  onglet--3" v-show="activeTab === 3" >
              <article class="container-passion  kp_card">
                  <div class="texte-passion">
                      <div class="kp_texte-carte">
                        <h2 class="kp_p-black kp_bold  kp_titre-passion">Le dessin et l’art numérique</h2>
                        <p class="kp_texte kp_p-black">
                          Le dessin a toujours été un moyen d'expression pour moi, un espace de liberté où chaque trait raconte une histoire. 
                          <br>Au fil du temps, <span class="kp_bold  kp_bold--passion">cette passion a évolué</span> pour embrasser les outils numériques, ouvrant un nouveau champ de possibilités créatives.
                          <br>Aujourd'hui, <span class="kp_bold  kp_bold--passion">le dessin vectoriel</span> occupe une place de choix dans mon univers artistique&nbsp;: précis, modulable et épuré, il me permet de <span class="kp_bold  kp_bold--passion">jouer avec les formes et les couleurs</span> avec une flexibilité sans limites.
                          <br><span class="kp_bold  kp_bold--passion">Cet art numérique</span> est devenu pour moi une manière d’allier technologie et créativité, et d’explorer sans cesse de nouveaux horizons visuels.
                          <br>
                          <br>D'ailleurs, si vous aimez ce style créatif, je vous invite à découvrir Tookek.fr en cliquant si dessous.                          
                        </p>
                        
                        <a class="btn-windows-xp  btn-windows-xp-ok" href="http://www.tookek.fr" target="_blank"><span class="btn-windows-xp--texte">Découvrir Tookek.fr</span></a>
                      </div>
                  </div>
              </article>
              <div class="passion-demonstaration">
                <div class="part--passion  part--passion-dessin">
                  <img class="img-dessin-passion" :src="tookek" alt="tookek.fr">
                </div>
              </div>
            </div>
            


          </div>
        </div>
           
      <div class="resize-handle"></div>
  </section>
  <!-- Texte image -->
</template>

<script>
import Navigation   from  '@/components/Navigation.vue';
import FakeMenu     from '@/components/Fakemenu.vue';

import textIcon     from    '@/assets/images/icon-heart.png'; 

import Pokemoncard1 from '@/assets/images/card_poke.png';
import Pokemoncard2 from '@/assets/images/card_poke_sous.png';
import PokemonBack  from '@/assets/images/card_poke_3.png';
import pokecardIcon from '@/assets/images/pokecard_icn.png';

import Gameboy      from '@/assets/images/gameboycolorpassion.png';
import Gameboyon    from '@/assets/images/gameboyon.png';
import screentitle  from '@/assets/images/opale/opaletitle.gif';
import screen       from '@/assets/images/opale/opalefight.gif';

import ubb         from '@/assets/images/ubb.svg';
import ubbphoto    from '@/assets/images/ubbphoto.png';
import boxers      from '@/assets/images/boxers.svg';
import boxersphoto from '@/assets/images/boxersphoto.png';

import tookek       from '@/assets/images/tookek.gif';

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
        Pokemoncard1,
        Pokemoncard2,
        pokecardIcon,
        PokemonBack,
        Gameboy,
        Gameboyon,
        screentitle,
        screen,
        ubb,
        ubbphoto,
        boxers,
        boxersphoto,
        tookek,
        windowStateClass: 'kp_item_window_hide',
        activeTab: 1,
        divWidth: 0,
    };
  },
  mounted() {
    this.initResizeObserver();
    this.initCardInteractions(); 
  },
  beforeUnmount() {
    this.cleanupResizeObserver();
  },
  computed: {
    dynamicClasses() {
      return this.divWidth < 960 ? 'smalldiv' : 'largediv';
    },
  },
  watch: {
    divWidth(newWidth) {
      console.log('Mise à jour de la classe dynamique en fonction de divWidth:', this.dynamicClasses);
    },
  },
  methods: {

    initResizeObserver() {
      this.resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          this.divWidth = entry.contentRect.width;
        }
      });
      this.resizeObserver.observe(this.$refs.referenceSizeDiv);
    },
    cleanupResizeObserver() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
      }
    },
    initCardInteractions() {
        const card = this.$refs.cardPokemon;
        const cardGlow = this.$refs.cardGlow;
        const cardGlow2 = this.$refs.cardGlow2;
        const carCadre = this.$refs.carCadre;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        const updateGlowEffect = (x, y, elRect) => {
            let midCardWidth = elRect.width / 2;
            let midCardHeight = elRect.height / 2;

            let angleX = (x - midCardWidth) / midCardWidth * 20;
            let angleY = - (y - midCardHeight) / midCardHeight * 20;

            let glowX = x / elRect.width * 100;
            let glowY = y / elRect.height * 100;

            card.children[0].style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`;
            cardGlow2.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`;
            cardGlow.style.backgroundPosition = `${glowX * 10}px ${glowY * 10}px`;
            carCadre.style.filter = `drop-shadow(${glowX / 10}px ${glowY / 10}px 3px #000000AA)`;
            cardGlow2.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.9), transparent)`;
        };

        const resetCardPosition = () => {
            card.children[0].style.transform = '';
            cardGlow2.style.transform = '';
            cardGlow.style.backgroundPosition = '';
            carCadre.style.filter = '';
            cardGlow2.style.background = `radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9), transparent)`;
        };

        const handleMove = (e) => {
            let elRect = card.getBoundingClientRect();
            let x, y;

            if (isMobile && e.touches) {
                x = e.touches[0].clientX - elRect.left;
                y = e.touches[0].clientY - elRect.top;
            } else {
                x = e.clientX - elRect.left;
                y = e.clientY - elRect.top;
            }

            updateGlowEffect(x, y, elRect);
        };

        if (isMobile) {
            card.addEventListener('touchmove', handleMove);
            card.addEventListener('touchend', resetCardPosition);
        } else {
            card.addEventListener('mousemove', handleMove);
            card.addEventListener('mouseleave', resetCardPosition);
        }
    },
    setActiveTab(tabIndex) {
      this.activeTab = tabIndex;
    },
    
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
};
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
  transition: 0s;
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
  max-height: calc(100% - 11px);

  margin: 4px;
  background: white;
  border: solid 1px #e0dccb;  
  transition: 0s;
}
.kp_content--block{
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 800px;
  width: 1500px;
  height: fit-content;
  background: #eeecdf;
  position: absolute;
}

.containers-liste-onglets{
  width: 100%;
    position: relative;
    left: 0px;
    top: 0;
    background-color: #eeecdf;
    display: flex;
    flex-wrap: wrap;
    z-index: 10;
    justify-content: flex-start;
    align-items: flex-end;
    margin: 10px 10px 0;
    width: 100%;
    max-width: 1371px;
    margin: auto;
    background: #787676;
    margin-top: 20px;
}

@media screen and (max-width: 900px){
  .kp_content--block--content{
    overflow: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0s;
    position: relative;
    height: calc(100% - 36px) !important;
    font-size: 9px;
    display: flex;
    align-items: flex-end;
  }
}

.container-passions{
    gap: 40px;
    width: 100%;
    margin: auto;
    display: flex;
    height: 1100px;
    flex-wrap: wrap;
    max-width: 1370px;
    padding: 40px 20px;
    background: white;
    align-items: flex-start;
    justify-content: flex-start;
    border: solid 1px #91a7b4;
    filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.464));
}
.kp_titre-passion{
  font-size:23px;
  padding-bottom:15px;
}

.passion-demonstaration{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-around;
  margin: 10px 0;
}
/* ----------------- */
/* Popkécarte */
/* carte qui suis la souris au hover */
.kp_texte-carte{
    color: #000000;
    bottom: 150px;
    padding: 0 20px;
    border-radius: 20px;
    color: black;
    min-width: 320px;
    max-width: -moz-fit-content;
    max-width: fit-content;
    line-height: 1.5;
  }
  .kp_pokemon{
    width: 650px;
    height: -moz-fit-content;
    height: fit-content;
    background: white;
    position: absolute;
    max-width: 1000px;
    height: 1080px;
    z-index: 2;
  }
  .kp_pokemon_zone-texte {
    background: rgb(235, 235, 235);
    height: calc(100% - 51px);
    width: calc(100% - 32px);
    padding: 10px 25px 30px 5px;
    overflow-y: scroll;
    min-height: 150px;
    border:solid 1px rgb(170, 170, 170);
  } 
  .texte-passion{
    width:100%
  }

.kp_card{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}



.part--passion-pokemon{
  transform: rotateY(180deg); /* Retourne le dos */
  animation: rotatecard 1.5s forwards  cubic-bezier(0.025, 0.1, 0.15, 1) 1s;


  transform-style: preserve-3d;
  transition: transform 0.6s;
}
@keyframes rotatecard{
  0%{
    transform: rotateY(180deg);
  }
  100%{
    transform: rotateY(360deg);
  }
}

.card-container-backface{
  position: relative;
    max-width: 460px;
    height: 640px;
    perspective: 2500px;
    width: 100%;
}
.kp_card-pokemon{
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.card-back{
  transform-style: preserve-3d;
    transition: transform 0.6s;
    backface-visibility: hidden;
    position: relative;
    max-width: 460px;
    height: 640px;
    perspective: 2500px;
    width: 100%;
    position: absolute;
    top: 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    transform: rotateY(180deg); /* Retourne le dos */
}
.card-back img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
}


.kp_card-pokemon{
  position: relative;
  max-width: 460px;
  height: 640px;
  perspective: 2500px;
  width: 100%;
}
.kp_card-pokemon--container{ 
    width: 100%;
    height: 100%;
    max-width: 577px;
    overflow: hidden;
    border-radius: 32px;
    filter: drop-shadow(4px 4px 4px #00000099);
    border-radius: 34px;
    border: solid 1px #eac043
}
.kp_card-pokemon--img{
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
.kp_card-pokemon--glow  {
  position: absolute;
  top: -100%;
  left: 40%;
  width: 100%;
  height: 200%;
  background: #fff;
  opacity: 0.5;
  background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.2) 0%, transparent);
  background-image: linear-gradient(90deg, transparent 10%, transparent 7%, rgb(177 0 0 / 42%) 70%, transparent 50%, transparent 53%, rgba(222, 255, 10, 0.48) 90%, transparent 100%);
  transform: rotate(45deg);
}
.kp_card-pokemon--glow2  {
  position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 40%;
    background: #fff;
    opacity: 0.25;
    background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.9), transparent);
    mix-blend-mode: plus-lighter;
    border-radius: 100%;
    filter: blur(10px);
}

.kp_card-pokemon--holo{
  background-image: url(/src/assets/images/pokemon_holo_move.webp), url(/src/assets/images/pokemon_holo_fix.webp), linear-gradient(125deg, rgba(255, 0, 132, 0.3137254902) 15%, rgba(252, 164, 0, 0.2509803922) 30%, rgba(255, 255, 0, 0.1882352941) 40%, rgba(0, 255, 138, 0.1254901961) 60%, rgba(0, 207, 255, 0.2509803922) 70%, rgba(204, 76, 250, 0.3137254902) 85%);
  background-position: 50% 50%;
  background-size: 160%;
  background-blend-mode: overlay;
  filter: brightness(1) contrast(1);
  mix-blend-mode: color-dodge;
  opacity: 0.95;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  position: absolute;
  top: 10px;
  left: 10px;
  perspective: 10000px;
}
.kp_card-pokemon--cadre{
  filter:drop-shadow(5px 5px 3px #000000AA)
}

.kp_content--block--content.kp_element--enable{
  background: #787676;
  margin:0;
  border:none;
}


/* ----------------- */
/* Game Boy */
.onglet--1{
  display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    height: 1100px;
    gap: 40px;
}
.kp_gameboy{
  width: 450px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(2px 4px 6px black);
  margin: auto;
}
.kp_gameboy--img{
  width: 100%;
  max-width: 450px;
  position: relative;
}
.kp_gameboy--screen{
  position: absolute;
  width: 56%;
  top: 10.3%;
}
.kp_gameboy--on{
  position: absolute;
    width: 2.5%;
    top: 17.7%;
    left: 8.4%;
    animation: blink-91fc8996 2s infinite;
    filter: drop-shadow(0px 0px 4px #ff5858) brightness(1.2);
}
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
.part--passion{
  width:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  position: relative;
}

.title-delay{
  animation: fight 9.60s forwards;
}
@keyframes fight{
  0%{
    opacity: 1;
  }
  99%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }
}


/* ----------------- */
/* Sports */
.part--passion-sport{
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  position: relative;
  margin-top: 50px;
}

.part--passion-sport img{
  width: 100%;
  max-width: 500px;
  object-fit: contain;
}
.boxersdebordeaux{
  filter: drop-shadow(2px 4px 6px black);
}


.passion-demonstaration{
  perspective: 1000px; /* Perspective sur le conteneur parent */
  height: fit-content;
}

.flippassion {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: auto;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.recto, .verso {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
}

.verso {
  transform: rotateY(180deg);
}

.part--passion-sport:hover  {
  width:100%;
  max-width: 500px;
}
.part--passion:hover .flippassion {
  transform: rotateY(180deg); 
}

.onglets{
  width: 100%;
  background: #787676;
}
















/* -------------------- */
.smalldiv .part--passion,
.smalldiv .text-passion{
    width:100%;
}
.smalldiv .text-passion{
  padding: 40px 0 20px;
  text-align: center;
}
.smalldiv .container-passions{
  background: none;
    border: none;
    filter: none;
}
.smalldiv .onglet{
  height:fit-content; 
}
.smalldiv .kp_content--block--content.kp_element--enable{
  background: #FFFFFF;
}
.smalldiv .kp_folder-liste{
  background: #FFFFFF;
  border-bottom: solid 1px #e0dccb;
}
.smalldiv .passion-demonstaration--pokemon{
  gap: 50px;
}
/* -------------------- */
.largediv {
}

.kp_bold--passion{
  color: #000000;
}
.img-dessin-passion{
  width: 100%;;
}

@media screen and (max-width: 960px){
  .part--passion{
    width:100%;
  }
  .kp_content--block--content{
    display: flex;
    flex-direction: column;
  }
  .part--passion,
  .text-passion{
      width:100%;
  }
  .text-passion{
    padding: 40px 0 20px;
    text-align: center;
  }
  .container-passions{
    background: none;
      border: none;
      filter: none;
  }
  .onglet{
    height:fit-content; 
  }
  .kp_content--block--content.kp_element--enable{
    background: #FFFFFF;
  }
  .kp_folder-liste{
    background: #FFFFFF;
    border-bottom: solid 1px #e0dccb;
    display: flex;
    flex-wrap: nowrap;
    width: fit-content;
  }
  .kp_content--block{
    height: calc(100vh - 46px) !important;
    width: calc(100vw - 50px) !important;
  }
  .passion-demonstaration--pokemon{
    gap: 50px;
  }
  .kp_folder-li{
    font-size: 16px;
    width: 70px;
    padding: 10px 45px;
  }
  .kp_p-black{
    font-size:16px;
  }
  .container-passions{
    padding:0;
  }
  .kp_texte-carte{
    width: calc(100% - 20px);
    padding: 10px;
  }
  .container-passion{
    width: calc(100vw - 20px);
  }
  .kp_card-pokemon, .card-back{
    width: 320px;
    height: 450px;
  }
  .kp_card-pokemon--container{
    border-radius: 14px;
  }
  .kp_gameboy{
    width: 90%;
    margin-bottom: 180px;
    left: 10px;
  }
  .text-passion,
  .hide-desktop{
    padding: 0px 10px !important;
    text-align: left;
  }
  .passion-demonstaration{
    gap: 0px !important;
  }
  .part--passion-sport{

    width: calc(100% - 40px);
    left:10px;
  }
  .onglet--2, .onglet--3{
    padding-bottom: 200px;
  }
  .onglets{
    overflow-x: scroll;
    height: 41px;
  }
  .containers-liste-onglets{
    margin:0;
  }
}




</style>
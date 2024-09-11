<template>
  <!-- Card Pokémon -->
  <section :class="['kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
    <div class="kp_element--title">
      <div class="kp_element--icon-title kp_element--enable">
        <p class="kp_ascii--titre">
          <div class="kp_element_title--icn">
            <img class="kp_icon_zone--img" :src="pokecardIcon" alt="pokecard icon">
          </div>
          <span>Kévin Prévost - Ma passion</span>
        </p>
      </div>
      <Navigation :viewName="title" :context="context" :customClass="customClass" @close="handleClose" @resize="handleResize" @reduct="handleReduct" />
    </div>
    <div class="kp_pokemon_zone-texte kp_element--enable">
      <p class="kp_texte-carte">
        Ayant grandi dans les années 90, je n'ai pas échappé à la folie Pokémon.<br>
        Après avoir développé deux jeux amateurs en Ruby pour honorer la passion de mon enfance, cela m'a laissé un attachement particulier.<br>
        J'ai conservé ma collection de cartes d'enfance, qui contient des raretés toujours très recherchées de nos jours.
        <br><br>
        <span class="kp_p-black kp_bold">Cliquez sur les coins de la carte pour la voir briller.</span>
      </p>
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
    </div>
    <div class="resize-handle"></div>
  </section>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Pokemoncard1 from '@/assets/images/card_poke_1.png';
import Pokemoncard2 from '@/assets/images/card_poke_2.png';
import pokecardIcon from '@/assets/images/pokecard_icn.png';

export default {
  name: 'Cardpokemon',
  components: {
    Navigation
  },
  props: {
    context: {
      type: String,
      default: 'pokemon'
    },
    title: {
      type: String,
      default: 'pokemon'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
  data() {
    return {
      Pokemoncard1,
      Pokemoncard2,
      pokecardIcon,
      windowStateClass: 'kp_item_window_hide' // Classe initiale qui affiche la fenêtre
    };
  },
  mounted() {
    this.initCardInteractions();
  },
  methods: {
    initCardInteractions() {
      const card = this.$refs.cardPokemon;
      const cardGlow = this.$refs.cardGlow;
      const cardGlow2 = this.$refs.cardGlow2;
      const cardHolo = this.$refs.cardHolo;
      const carCadre = this.$refs.carCadre;

      card.addEventListener('mousemove', (e) => {
        let elRect = card.getBoundingClientRect();
        let x = e.clientX - elRect.left;
        let y = e.clientY - elRect.top;

        let midCardWidth = elRect.width / 2;
        let midCardHeight = elRect.height / 2;

        let angleX = (x - midCardWidth) / midCardWidth * 20;
        let angleY = - (y - midCardHeight) / midCardHeight * 20;

        let glowX = x / elRect.width * 100;
        let glowY = y / elRect.height * 100;

        card.children[0].style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`;
        cardGlow2.style.transform = `rotateX(${angleY}deg) rotateY(${angleX}deg)`;
        cardGlow.style.backgroundPosition = `${glowX * 10}px ${glowY * 10}px`;
        carCadre.style.filter = `drop-shadow(${glowX/10}px ${glowY/10}px 3px #000000AA)`;
        cardGlow2.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255, 255, 255, 0.9), transparent)`;
      });

      card.addEventListener('mouseleave', () => {
        card.children[0].style.transform = 'rotateX(0deg) rotateY(0deg)';
        cardGlow2.style.transform = `rotateX(0deg) rotateY(0deg)`;
        cardGlow.style.backgroundPosition = `0px 0px`;
      });
    },
    
    handleClose() {
      this.$emit('update-class', 'kp_item_hide');
    },
    handleResize() {
      this.$emit('update-class', 'kp_item_resize');
    },
    handleReduct() {
      this.$emit('update-class', 'kp_item_reduct');
    }
  }
};
</script>

<style scoped>
/* ----------------- */
/* Popkécarte */
/* carte qui suis la souris au hover */
.kp_texte-carte{
    color: #000000;
    bottom: 150px;
    background: #fdf9ce;
    padding: 20px;
    border-radius: 20px;
    color: black;
    border: solid 1px #000000;
    min-width: 320px;
    max-width: -moz-fit-content;
    max-width: fit-content;
    line-height: 1.2;
  }
  .kp_pokemon{
    width: 650px;
    height: -moz-fit-content;
    height: fit-content;
    background: white;
    position: absolute;
    border: solid 4px #ffffff;
    outline: solid 1px #9b9b9b;
    max-width: 1000px;
    height: 1080px;
    z-index: 2;
  }
  .kp_pokemon_zone-texte {
    background: rgb(235, 235, 235);
    height: calc(100% - 51px);
    width: calc(100% - 32px);
    margin-top: 3px;
    padding: 10px 25px 30px 5px;
    overflow-y: scroll;
    min-height: 150px;
    border:solid 1px rgb(170, 170, 170);
}


.kp_card-pokemon{
  position: relative;
  top: 20px;
  left: 25px; 
  width: 577px;
  height: 800px;
  perspective: 1000px;
}
.kp_card-pokemon--container{ 
  width: 100%;
  height: 100%;
  max-width: 577px;
  overflow: hidden;
  border-radius: 32px;
  filter: drop-shadow(7px 7px 8px #00000077);
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
  background-image: linear-gradient(90deg, transparent 10%, transparent 7%, rgba(255, 0, 0, 0.42) 34%, transparent 50%, transparent 53%, rgba(222, 255, 10, 0.48) 75%, transparent 100%);
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
</style>

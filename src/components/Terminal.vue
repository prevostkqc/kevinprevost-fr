<template>
  <!-- Terminal -->
  <section :class="['kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window']" :id="`kp_${context}`">
      <div class="kp_element--title">
          <div class="kp_element--icon-title kp_element--enable">
              <p class="kp_ascii--titre">
                  <!-- <div class="kp_terminal--icn">KP:\</div> -->
                  <div class="kp_element_title--icn">
                       <img class="kp_icon_zone--img" :src="iconprojet" alt="text">
                   </div>
                  <span>Kévin Prévost - Développeur front-end</span>
              </p>
          </div>
          <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title" :context="context" :customClass="customClass" />
      </div>
      <div class="kp_terminal_zone-texte kp_element--enable">

        <div class="kp_terminal-content">
          <!-- Ajout de ref pour l'accès via JavaScript -->
          <p ref="terminalText" class="kp_terminal--texte"></p>
        </div>
      </div>
      <div class="resize-handle"></div>
  </section>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

import iconprojet from '@/assets/images/icon-terminalkp.png';

export default {
name: 'Terminal',
emits: ['update-class', 'close', 'resize', 'reduct'],

components: {
  Navigation
},

props: {
  context: {
    type: String,
    default: 'terminal'
  },
  title: {
    type: String,
    default: 'terminal'
  },
  customClass: {
    type: String,
    default: 'kp_element--incons-zone'
  }
},
 data() {
   return {
     iconprojet,
   };
 },

mounted() {
  this.$nextTick(() => {
    const container = this.$refs.terminalText;
    if (container) {
      this.ecrireTexte(container);
    } else {
      console.error('Element terminalText non trouvé');
    }
  });
},

methods: {
  ecrireTexte(container) {
    const texteAAnimer = `
      ===================  <br/>  
      =>  Qui suis-je ?  <=  <br/>  
      ===================  <br/><br/>  
      Avec une solide expérience de plus de 10 ans dans le développement web, ma passion pour le multimédia et les évolutions technologiques a été le moteur de ma carrière.<br/><br/>
      Spécialiste en création et optimisation de solutions web, je suis constamment à la recherche des dernières innovations pour apporter des réponses créatives et efficaces aux défis qui me sont proposés.<br/><br/>
      Mon parcours m'a permis de développer une expertise approfondie et une excellente capacité d'analyse des solutions visuelles, des langages de programmation et des outils de développement, me positionnant comme un acteur clé dans la transformation numérique des entreprises.<br/><br/>
      En tant que responsable au sein du groupe Cybertek de la Cellule Créative, regroupant les services de webdesign, motion-design, graphisme, intégration et développement front-end, j'ai affiné ma maîtrise en gestion d'équipe pour piloter des projets novateurs avec succès et pour stimuler l'engagement de mon équipe vers la réalisation de nos ambitions partagées.<br/><br/>
      Mon approche, centrée sur la collaboration et l'innovation, favorise un environnement avec lequel la créativité et la technologie convergent vers un objectif commun.<br/><br/>
      Dynamique et motivé, je suis toujours prêt à explorer de nouveaux horizons et à relever de nouveaux défis.<br/><br/>
      Bienvenue dans mon univers !
    `;

    let index = 0;
    let enBalise = false;
    let textePourBalise = "";

    const ajouterCaractere = () => {
      if (index < texteAAnimer.length) {
        let char = texteAAnimer[index];

        if (enBalise) {
          textePourBalise += char;
          if (char === ">") {
            container.innerHTML += textePourBalise;
            textePourBalise = "";
            enBalise = false;
          }
        } else {
          if (char === "<") {
            enBalise = true;
            textePourBalise = char;
          } else {
            container.innerHTML += char;
          }
        }

        index++;
        let delai = enBalise ? 0 : Math.random() * (15 - 5); 
        setTimeout(ajouterCaractere, delai);
      }
    };

    ajouterCaractere();
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
    },
  }
};
</script>

<style scoped>
/* terminal */
.kp_folder--terminal{
  margin-top: 0;
}

.kp_terminal_zone-titre{
    background: rgb(3, 82, 226);
    background: linear-gradient(90deg, rgb(3, 82, 226) 0%, rgb(60, 148, 255) 100%);
    padding: 5px;
    border: solid 1px #4e7cd3;
    display: flex;
    align-items: center;
  }
  .kp_terminal--titre{
    color: #FFFFFF;
  }


.window {
  left:100px;
}
.kp_terminal {
  width: 800px;
  height: fit-content;
  background: white;
  position: absolute;
}

.kp_terminal_zone-titre {
  background: rgb(3, 82, 226);
  background: linear-gradient(90deg, rgb(3, 82, 226) 0%, rgb(60, 148, 255) 100%);
  padding: 5px;
  border: solid 1px #4e7cd3;
  display: flex;
  align-items: center;
}

.kp_terminal--titre {
color: #FFFFFF;
}

.kp_terminal_zone-texte {
  background: black;
  height: calc(100% - 51px);
  width: calc(100% - 30px);
  padding: 10px 25px 30px 5px;
  overflow-y: scroll;
  min-height: 150px;
}

.kp_terminal--texte {
font-family: 'Courier New', Courier, monospace;
line-height: 1.3;
}

.kp_terminal--icn {
background: black;
font-size: 10px;
display: flex;
align-items: flex-end;
padding: 2px;
font-family: "Raster", "Courier New", Courier, monospace;
border-top: solid 5px #5089eb;
outline: #3b93ff solid 1px;
margin-right: 8px;
}

.kp_terminal--texte-titre {
font-weight: 600;
font-family: 'Courier New', Courier, monospace;
color: #ffff77;
}

.kp_terminal--bold {
font-family: 'Courier New', Courier, monospace;
font-weight: 600;
color: #ff7373;
}
.kp_terminal{
  width:100%;

}

.kp_terminal-ecriture {
border-right: solid 1px white;
animation: blinkText 1s infinite linear;
}

@keyframes blinkText {
  0% {
    border-right: solid 1px white;
  }
  50% {
    border-right: solid 1px black;
  }
  100% {
    border-right: solid 1px white;
  }
}
</style>
<template>

  <!-- Window Internet -->
  <section class="kp_browser kp_z-index kp_browser--show kp_changed__id kp_element--action--close kp_item__window" id="kp_browser">
    <div class="kp_element--title">
      <div class="kp_element--icon-title">
        <div class="kp_element--title-p kp_element--enable">
          <div class="kp_element_title--icn">
            <img v-if="projetActuel" class="kp_icon_zone--img" :src="projetIcon" alt="Projet">
          </div>
          <span v-if="projetActuel">{{ projetActuel.compagnie }} - {{ projetActuel.titre }}</span>
        </div>
      </div>

      <!-- Vérification que projetActuel est défini avant de rendre le composant Navigation -->

      <Navigation :viewName="title" :context="context" :customClass="customClass" @close="handleClose" @resize="handleResize" @reduct="handleReduct" />
    </div>
    
    <div class="kp_window--border kp_element--enable">
      <div class="kp_internet--onglets" id="kp_internet--onglets">
        <!-- Affichage des boutons pour chaque projet filtré -->
        <button v-for="projet in projetsFiltres" :key="projet.id" :class="'kp_projet-btn kp_projet-btn--' + projet.id" @click="changerProjet(projet)">
          <img class="kp_icn-onglet" :src="`/images/sites/${projet.icn}.png`" alt="projet">{{ projet.titre }}
        </button>
        <div class="kp_internet--favorites"></div>
      </div> 

      <!-- Vérification que projetActuel existe avant d'afficher l'iframe -->
      <div class="kp_browser-content--iframe">
        <iframe v-if="projetActuel" :src="projetActuel.url" width="600" height="400" frameborder="0" class="kp_iframe--projet"></iframe>
      </div>
      
    </div>
    <div class="resize-handle"></div>
  </section>
  


  <!-- Clipy -->
   <div :class="clipyClass">
      <div v-if="!showInfo" class="kp_information-projet kp_clipy--bulle" @click="toggleInfo">
        <p class="kp_information--p">Afficher les informations concernant ce projet</p>
      </div>

      <!-- Si showInfo est true, afficher les informations du projet -->
      <div v-if="showInfo" class="kp_clipy--bulle kp_clipy--bulle-projet">
        <article class="kp_un-projet kp_un-projet--show">
          <div class="kp_icon_zone kp_un-projet--close" @click="toggleInfo">
            <img class="kp_icon_zone--img" :src="navigationClose" alt="close">
          </div>
          <h2 class="kp_h2 kp_projet-desc--h2">{{ projetActuel.titre }} - {{ projetActuel.compagnie }}</h2>
          <span class="kp_projet-annee kp_h4">{{ projetActuel.annee }}</span>
          <p class="kp_p kp_projet_description">{{ projetActuel.description }}</p>

          <!-- Liste des technologies utilisées dans le projet -->
          <ul class="kp_projet-technos">
            <li v-for="technologie in projetActuel.techno" :key="technologie"
                :class="['kp_projet-techno', `kp_projet-techno--${technologie.toLowerCase()}`]">
              <!-- Utilisation de la méthode getTechnoLogo pour récupérer l'image correcte -->
              <img :src="getTechnoLogo(technologie)" class="kp_img-techno" :alt="technologie">
              <p class="kp_projet-techno--text">{{ technologie }}</p>
            </li>
          </ul>
        </article>
      </div>
   </div>
  
  <!-- Clipy -->


</template>

<script>
import projets from '@/assets/projets.json'; // Importation du JSON contenant les projets
import Navigation from '@/components/Navigation.vue';
import navigationClose from '@/assets/images/close_icn.svg';



  import technoajax             from '@/assets/images/logos-technos/ajax.png';
  import technoaspnet           from '@/assets/images/logos-technos/aspnet.png';
  import technoazuredevops      from '@/assets/images/logos-technos/azuredevops.png';
  import technocakephp          from '@/assets/images/logos-technos/cakephp.png';
  import technocss3             from '@/assets/images/logos-technos/css3.png';
  import technofigma            from '@/assets/images/logos-technos/figma.png';
  import technogit              from '@/assets/images/logos-technos/git.png';
  import technogithub           from '@/assets/images/logos-technos/github.png';
  import technogitkraken        from '@/assets/images/logos-technos/gitkraken.png';
  import technohtml5            from '@/assets/images/logos-technos/html5.png';
  import technoillustrator      from '@/assets/images/logos-technos/illustrator.png';
  import technojquery           from '@/assets/images/logos-technos/jquery.png';
  import technojs               from '@/assets/images/logos-technos/js.png';
  import technojson             from '@/assets/images/logos-technos/json.png';
  import technomysql            from '@/assets/images/logos-technos/mysql.png';
  import technonotion           from '@/assets/images/logos-technos/notion.png';
  import technophotoshop        from '@/assets/images/logos-technos/photoshop.png';
  import technophp              from '@/assets/images/logos-technos/php.png';
  import technophpstorm         from '@/assets/images/logos-technos/phpstorm.png';
  import technopython           from '@/assets/images/logos-technos/python.png';
  import technorazor            from '@/assets/images/logos-technos/razor.png';
  import technosublimtext       from '@/assets/images/logos-technos/sublimtext.png';
  import technothreejs          from '@/assets/images/logos-technos/threejs.png';
  import technotypescript       from '@/assets/images/logos-technos/typescript.png';
  import technovisualstudio     from '@/assets/images/logos-technos/visualstudio.png';
  import technovisualstudiocode from '@/assets/images/logos-technos/visualstudiocode.png';
  import technovuejs            from '@/assets/images/logos-technos/vuejs.png';
  import technowebflow          from '@/assets/images/logos-technos/webflow.png';
  import technowoocommerce      from '@/assets/images/logos-technos/woocommerce.png';
  import technowordpress        from '@/assets/images/logos-technos/wordpress.png';
  import technoxd               from '@/assets/images/logos-technos/xd.png';

export default {
  name: 'Portfolio',
  components: {
    Navigation
  },
  data() {
    return {
      projets: projets,
      projetActuel: projets[0],  // Projet sélectionné par défaut
      showInfo: true,  // Informations visibles par défaut
      navigationClose,
      logosTechnos: {
        ajax: technoajax,
        aspnet: technoaspnet,
        azuredevops: technoazuredevops,
        cakephp: technocakephp,
        css3: technocss3,
        figma: technofigma,
        git: technogit,
        github: technogithub,
        gitkraken: technogitkraken,
        html5: technohtml5,
        illustrator: technoillustrator,
        jquery: technojquery,
        js: technojs,
        json: technojson,
        mysql: technomysql,
        notion: technonotion,
        photoshop: technophotoshop,
        php: technophp,
        phpstorm: technophpstorm,
        python: technopython,
        razor: technorazor,
        sublimtext: technosublimtext,
        threejs: technothreejs,
        typescript: technotypescript,
        visualstudio: technovisualstudio,
        visualstudiocode: technovisualstudiocode,
        vuejs: technovuejs,
        webflow: technowebflow,
        woocommerce: technowoocommerce,
        wordpress: technowordpress,
        xd: technoxd,
      }
    };
  },
  computed: {
    projetsFiltres() {
      if (this.compagnieProjet) {
        return this.projets.filter(projet => projet.compagnie === this.compagnieProjet);
      }
      return this.projets;
    },
    projetIcon() {
      if (this.projetActuel && this.projetActuel.icn) {
        return `/images/sites/${this.projetActuel.icn}.png`;
      }
      return '';
    },
    clipyClass() {
      const browserElement = document.querySelector('.kp_browser');
      if (!browserElement) {
        return 'clipy_project';
      }
      const parentElement = browserElement.closest('.kp_item__window_draggable');
      if (parentElement && parentElement.classList.contains('kp_item_hide')) {
      }
      return 'clipy_project';
    }
  },
  mounted() {
    this.moveClipyProject();
    setTimeout(() => {
      this.checkAndToggleClipyProjectClass(); 
    }, 0);
    this.observeClassChanges();
  },
  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setFixedPosition); 
  },
  methods: {
    changerProjet(projet) {
      this.projetActuel = projet; // Met à jour le projet affiché
    },
    setCompagnieProjet(compagnie) {
      this.$emit('update-class', 'kp_item_show');
      this.$emit('projet-selectionne', compagnie);
    },
    handleClose() {
      this.$emit('update-class', 'kp_item_hide');
    },
    handleResize() {
      this.$emit('update-class', 'kp_item_resize');
    },
    handleReduct() {
      this.$emit('update-class', 'kp_item_reduct');
    },
    changerProjet(projet) {
      this.projetActuel = projet;
      this.showInfo = true;
    },
    setCompagnieProjet(compagnie) {
      this.compagnieProjet = compagnie;
    },
    toggleInfo() {
      this.showInfo = !this.showInfo;
    },
    getTechnoLogo(technologie) {
      return this.logosTechnos[technologie.toLowerCase()] || '/images/fallback.png';
    },
    moveClipyProject() {
      const clipyElement = document.querySelector('.clipy_project');
      const targetParent = document.querySelector('.kp_main'); 
      if (clipyElement && targetParent) {
        targetParent.appendChild(clipyElement); 
      }
    },
    observeClassChanges() {
      const browserElement = document.querySelector('.kp_browser');
      if (!browserElement) return;

      const parentElement = browserElement.closest('.kp_item__window_draggable');
      
      if (parentElement) {
        this.observer = new MutationObserver(() => {
          this.checkAndToggleClipyProjectClass();
        });
        this.observer.observe(parentElement, {
          attributes: true,
          attributeFilter: ['class'],
        });
      }
    },

    checkAndToggleClipyProjectClass() {
      const browserElement = document.querySelector('.kp_browser');

      if (!browserElement) {
        return;
      }

      const parentElement = browserElement.closest('.kp_item__window_draggable'); 

      const clipyElement = document.querySelector('.clipy_project');
      if (clipyElement) {
        if (parentElement && parentElement.classList.contains('kp_item_hide')) {
          clipyElement.classList.add('clipy_project--hide'); 
        } else {
          clipyElement.classList.remove('clipy_project--hide');
        }
      }
    }
  }
};
</script>

<style scoped>
.kp_browser {
  height: calc(100vh - 260px);
  width: calc(100vw - 150px);
  max-width: 1900px;
  overflow: hidden;
}
.kp_icn-onglet {
  width: 20px;
  height: 20px;
}
.kp_projet-techno {
  font-size: 25px;
  text-transform: uppercase;
}
.kp_browser-content--iframe {
  overflow: hidden;
  width: calc(100% - 3px);
  height: calc(100% - 0px);
  border: solid 1px #0e46bb;
}
.kp_item__window {
  position: absolute;
}

/* Styles pour la bulle d'information */
.kp_clipy--bulle {
  display: flex;
  flex-direction: column;
}

.kp_clipy--bulle-projet {
  display: block;
}


.kp_un-projet--show {
  animation: fadeIn 0.5s;
}

.clipy_project{
  position: fixed;
  bottom: 0;
  right: 0;
  top: auto;
  left: auto;
  z-index: 1000;
}
.clipy_project--hide {
  display: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

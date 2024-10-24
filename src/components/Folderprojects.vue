<template>
  <!-- Folder Projects -->
  <section :class="['kp_image_ascii', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="iconprojet" alt="text">
                    </div>
                    <span>Kévin Prévost - Mes réalisations</span>
                </p>
            </div>
            <!-- Utilisation du composant Navigation avec le bon contexte -->
        <Navigation @close="handleClose"  @resize="handleResize"  @reduct="handleReduct"  :viewName="title" :context="context" :customClass="customClass" />
        </div>

        <!-- Affichage des projets -->
        <div class="kp_window--border kp_element--enable   kp_element--container">
          <div class="kp_line-projet" v-for="project in projects" :key="project.id">
            <div class="kp_line-year">
              {{ project.description }}
              <br>{{ project.annee }}
            </div>
            <article
              class="kp_folder--un-ico kp_folder--projets"
              @click="setCompagnieProjet(project.compagnie)"
            >
              <div class="kp_folder--un-ico-container-img">
                <img class="kp_folder--img" :src="getIconPath(project.icn)" :alt="project.titre" @error="imageError($event)" />
              </div>
              <p class="kp_folder--un-ico-container-text kp_folder--un-ico-container-text--black">
                {{ project.titre }}<br>{{ project.annee }}
              </p>
              <p class="kp_techno-list">
                <span v-for="tech in project.techno" :key="tech">{{ tech }} </span>
              </p>
            </article>
          </div>
          
        </div>
    </section>
    <div class="resize-handle"></div>
</template>






<script>
import axios from 'axios';
import Navigation from '@/components/Navigation.vue';
import iconprojet from '@/assets/images/folder.png';
import fallback from '@/assets/images/fallback.jpg';

export default {
  name: 'Folderprojects',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
  },
  props: {
    context: {
      type: String,
      default: 'folder',
    },
    title: {
      type: String,
      default: 'folder',
    },
    iconSource: {
      type: String,
      default: '/images/folder.png',
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone',
    },
  },
  data() {
    return {
      projects: [],
      iconprojet,
    };
  },
  methods: {
    async loadProjects() {
      try {
        const response = await axios.get('/projets.json'); // Remplace par le chemin correct
        this.projects = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    },
    // Gestion d'erreur de l'image
    imageError(event) {
      event.target.src = fallback; 
    },
    // Sélectionner un projet
    setCompagnieProjet(compagnie) {
      console.log('Projet sélectionné dans Folderprojects:', compagnie);
      this.$emit('projet-selectionne', compagnie);
      this.$emit('update-class', 'kp_item_show');
    },
    // Gestion des événements de fenêtre
    
    handleClose() {
      this.$emit('update-class', 'kp_item_hide');
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
    getIconPath(icn) {
      return `/images/icons/${icn}.jpg`; 
    },
  },
  mounted() {
    this.loadProjects();
  },
};
</script>

<style scoped>
/* Styles spécifiques pour FolderProjects.vue */
.kp_element--container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
  max-height: 250px;
  overflow-y: auto;
}

</style>

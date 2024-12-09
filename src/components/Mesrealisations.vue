<template>
  <!-- Texte image -->
  <section :class="['kp_folder', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
       <div class="kp_element--title">
           <div class="kp_element--icon-title">
               <p class="kp_element--title-p kp_element--enable">
                   <div class="kp_element_title--icn">
                       <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                   </div>
                   <span>Kévin Prévost - Mes réalisations</span>
               </p>
           </div>
           <!-- Utilisation du composant Navigation avec le bon contexte -->
       <Navigation @close="handleClose"  @resize="handleResize"  @reduct="handleReduct"  :viewName="title" :context="context" :customClass="customClass" />
       </div>
       <div class="kp_window--container-folder">
           <ul class="kp_folder-liste projets">
             <li class="kp_folder-li" v-for="project in projects" :key="project.id" @click="chargerprojet(project.id)">
               {{ project.nomduprojet }}
             </li>
           </ul>
           
           <div class="kp_element--container-folder kp_element--container">
             <!-- Afficher uniquement le projet sélectionné -->
             <div v-if="selectedProject" class="kp_line-projet">
               <div class="kp_line-year">
                 {{ selectedProject.texteclient }}
                 
                 {{ selectedProject.nomduprojet }}
                 <br>{{ selectedProject.date }}
               </div>

               <!-- Boucle pour afficher les pages du projet sélectionné -->
               <div class="kp_pages-container" v-if="selectedProject.nomdespages && selectedProject.nomdespages.length">
                 <div v-for="(page, index) in selectedProject.nomdespages" :key="index" class="kp_page-thumbnail">
                   <img :src="getPageThumbnailPath(selectedProject.nomimageprojet, page)" :alt="page || 'Page sans nom'" @error="imageError($event)" class="kp_page-thumbnail-img" />
                   <p class="kp_page-title">{{ page || "Page sans nom" }}</p>
                 </div>
               </div>

               <article
                 class="kp_folder--un-ico kp_folder--projets"
                 @click="setCompagnieProjet(selectedProject.client)"
               >
                 <div class="kp_folder--un-ico-container-img">
                   <img class="kp_folder--img" :src="getIconPath(selectedProject.logo)" :alt="selectedProject.nomduprojet" @error="imageError($event)" />
                 </div>
                 <p class="kp_folder--un-ico-container-text kp_folder--un-ico-container-text--black">
                   {{ selectedProject.nomduprojet }}<br>{{ selectedProject.date }}
                 </p>
                 <p class="kp_techno-list">
                   <span v-for="tech in selectedProject.technos" :key="tech">{{ tech }} </span>
                 </p>
               </article>
             </div>
           </div>
         </div>
          
          <div class="resize-handle"></div>
      </section>
      <!-- Texte image -->
</template>

<script>
import axios from 'axios';
import Navigation from '@/components/Navigation.vue';
import iconprojet from '@/assets/images/folder.png';
import fallback from '@/assets/images/fallback.jpg';

import fondpc from '@/assets/images/pcfond.png';

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
     selectedProjectId: null,
     iconprojet,
      fondpc,
   };
 },
 computed: {
   selectedProject() {
     return this.projects.find(project => project.id === this.selectedProjectId);
   },
 },
 methods: {
   async loadProjects() {
     try {
       const response = await axios.get('/projets.json', { params: { t: Date.now() } });
       this.projects = response.data;
     } catch (error) {
       console.error('Erreur lors du chargement des projets:', error);
     }
   },
   imageError(event) {
     event.target.src = fallback;
   },
   chargerprojet(projectId) {
     this.selectedProjectId = projectId;
   },
   setCompagnieProjet(client) {
     this.$emit('projet-selectionne', client);
     this.$emit('update-class', 'kp_item_show');
   },
   handleClose() {
     this.$emit('update-class', 'kp_item_hide');
     this.$emit('close');
   },
   handleResize() {
     this.windowStateClass = this.windowStateClass === 'kp_item_resize' ? '' : 'kp_item_resize';
     this.$emit('update-class', this.windowStateClass);
   },
   handleReduct() {
     this.$emit('update-class', 'kp_item_reduct');
   },
   getIconPath(logo) {
     return `/images/icons/${logo}.jpg`; 
   },
   getPageThumbnailPath(nomimageprojet, page) {
     return `/images/projects/${nomimageprojet}/${page || 'default'}.jpg`; 
   },
 },
 mounted() {
   this.loadProjects();
 },
};
</script>
<style scoped>
.kp_folder {
 width: 920px;
 max-width: 100vw;
 top: 150px;
 left:250px;
}
.kp_element--container-folder {
 overflow-y: scroll;
}
.kp_element--container {
   display: flex;
   flex-direction: column;
   gap: 20px;
   height: 80vh;
   position: relative;
   padding: 20px;
}
.resize-handle {
 background: red;
}

/* Styles pour les miniatures de pages */
.kp_pages-container {
 display: flex;
 gap: 10px;
 margin-top: 20px;
 flex-wrap: wrap;
}
.kp_page-thumbnail {
 text-align: center;
 width: 100px;
}
.kp_page-thumbnail-img {
 width: 100px;
 height: 100px;
 object-fit: cover;
 border-radius: 5px;
 box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
.kp_page-title {
 font-size: 0.85rem;
 margin-top: 5px;
 color: #333;
}

.kp_window--border{
 background-color: #eeecdf;
}
.kp_window--container-folder{
   margin: 10px;
   background: white;
   border: solid 2px #91a7b4;
}
.kp_folder-liste{
   width: calc(100% + 2px);
   position: relative;
   left: -1px;
   top: 0;
   background-color: #eeecdf;
   display: flex;
   flex-wrap: wrap;
   z-index: 10;

   justify-content: flex-start; /* Aligner à gauche */
   align-items: flex-end; /* Aligner en bas */
}

.kp_folder-li{
 border: solid 2px #91a7b4;
   border-radius: 5px 5px 0 0;
   color: #000000;
   border-bottom: none;
   padding: 7px 45px;
   background: #f6f6f2;
   position: relative;
   border-bottom: solid 3px #919b9c;
   position: relative;
   bottom: -2px;
   cursor: pointer;
   height: 16px;
 }

.kp_folder-li:hover{
   border: solid 2px #91a7b4;
   border-radius: 5px 5px 0 0;
   color: #000000;
   border-bottom: none;
   padding: 7px 45px;
   background: white;
   position: relative;    
   height: 18px;
}

.kp_folder-li::before{
 content: "";
   position: absolute;
   top: -2px;
   left: -1px;
   width: 100%;
   height: 100%;
}
.kp_folder-li:hover::before{
 content: "";
   position: absolute;
   top: -2px;
   left: -1px;
   width: 100%;
   height: 100%;
   background: #ffc73c;
   border-radius: 5px 5px 0 0;
   height: 4px;
   border: solid 1px #e68b2c;
   border-bottom: none;
   border-top: solid 3px #e68b2c;
}

.kp_image_ascii{
   position: absolute;
   font-size: 14px;
   letter-spacing: 0px;
   font-family: monospace;
   background: white;
   color: black;
   max-width: 800px;
   &:hover .kp_image_ascii--content {
     filter: drop-shadow(3px 3px 2px black);
   }
 }
 .kp_window--show{
   display: block !important;
   overflow: hidden;
 }
 .kp_image_ascii--content{
   overflow: scroll;
   width: 100%;
   height: calc(100% - 11px);
   transition: 0.3s;
   position: relative;
   height: calc(100% - 36px) !important;
 }
 .kp_image_ascii:hover .kp_image_ascii--content {
   filter: drop-shadow(3px 3px 2px black);
 }
 .kp_image-text--show,
 .kp_text--show{
   display: block;
 }
 .kp_image_ascii--content{
   overflow: scroll;
   overflow: scroll;
   width: 100%;
   height: calc(100% - 11px);
   transition: 0.3s;
 }
 .kp_image_ascii{
   position: absolute;
   font-size: 14px;
   letter-spacing: 0px;
   font-family: monospace;
   background: white;
   color: black;
   max-width: 800px;
   width: 50%;
   height: fit-content;
   background: white;
   position: absolute;
 }
</style>
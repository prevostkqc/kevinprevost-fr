<template>
  <!-- Texte image -->
  <section
    :class="['kp_image_ascii', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]"
    :id="`kp_${context}`">
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
      <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title"
        :context="context" :customClass="customClass" />
    </div>

    <FakeMenu></FakeMenu>
    <ul class="kp_folder-liste projets" ref="folderList">
      <li :class="['kp_folder-li', { 'selected-project': project.id === selectedProjectId }]"
        v-for="project in projects" :key="project.id" @click="chargerprojet(project.id)">
        {{ project.nomduprojet }}
      </li>
    </ul>
    <div class="kp_image_ascii--content kp_element--enable">
      <div class="container-mesreals">
        <div class="kp_element--container-folder kp_element--container">
          <!-- Afficher uniquement le projet sélectionné -->
          <div v-if="selectedProject" class="kp_line-projet">
            <div class="part_left">
              <div class="kp_texte-image">
                <div class="unprojet--titre-image">
                  <img class="kp_folder--img" :src="getIconPath(selectedProject.logo)"
                    :alt="selectedProject.nomduprojet" @error="imageError($event)" />
                  <h2 class="unprojet--titre">{{ selectedProject.nomduprojet }}</h2>
                </div>
                <p class="unprojet--texte  unprojet--annee">{{ selectedProject.date }}</p>
                <p class="unprojet--texte  unprojet--texteclient"><span class="unprojet--texte  unprojet--textetitre">Le
                    client :</span><br />{{ selectedProject.texteclient }}</p>

                <ul class="kp_techno-list">
                  <li v-for="tech in selectedProject.technos" :key="tech" class="kp_techno-item">
                    <img :src="getTechIconPath(tech)" :alt="tech" @error="imageError($event)" class="kp_techno-icon" />
                    <p class="unprojet--texte  unprojet-nomtechno">{{ tech }}</p>
                  </li>
                </ul>
                <a class="btn-windows-xp  btn-windows-xp-ok" :href="selectedProject.lienprojet" target="_blank"><span
                    class="btn-windows-xp--texte">Voir le projet en ligne</span></a>
              </div>
              <div class="kp_part-image">
                <div class="container-pc">
                  <div class="kp_large-image">
                    <img :src="getPageThumbnailPath(selectedProject.nomimageprojet, selectedImageIndex)"
                      alt="Image sélectionnée"
                      @click="openPopup(getPageThumbnailPath(selectedProject.nomimageprojet, selectedImageIndex), 'desktop')"
                      class="kp_large-image-display kp_large-image-display--pc" />
                  </div>
                </div>
                <img :src="fondpc" alt="Fond PC" class="kp_large-image-display-pc" />
              </div>
            </div>
            <div class="part_right--gsm">
              <div class="part_right">

                <!-- Boucle pour afficher les miniatures du projet sélectionné -->
                <div ref="imageScrollContainer" class="kp_pages-container"
                  v-if="selectedProject.nomdespages && selectedProject.nomdespages.length > 1">
                  <p class="unprojet--texte titre-miniatures">Sélectionnez une page&nbsp;:</p>
                  <div v-for="(page, index) in selectedProject.nomdespages" :key="index" class="kp_page-thumbnail"
                    :class="{ 'selected-image': index === selectedImageIndex }" @click="selectImage(index)">
                    <img :src="getPageThumbnailPath(selectedProject.nomimageprojet, index)"
                      :alt="page || 'Page sans nom'" @error="imageError($event)" class="kp_page-thumbnail-img" />
                    <p class="kp_page-title">{{ page || "" }}</p>
                  </div>
                </div>
              </div>

              <div class="gsm-container" v-if="selectedProject.versionmobile === 'oui'">
                <div v-if="selectedProject.versionmobile === 'oui'" class="kp_mobile-image">
                  <img :src="getPageThumbnailPathMobile(selectedProject.nomimageprojet, selectedImageIndex)"
                    alt="Image mobile sélectionnée"
                    @click="openPopup(getPageThumbnailPathMobile(selectedProject.nomimageprojet, selectedImageIndex), 'gsm')"
                    class="kp_large-image-display kp_large-image-display--gsm" />
                </div>

                <img :src="fondgsm" alt="Fond PC" class="kp_large-image-display-gsm" />
              </div>
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
import axios from 'axios';
import Navigation from '@/components/Navigation.vue';
import FakeMenu from '@/components/Fakemenu.vue';

import iconprojet from '@/assets/images/icon-archive.png';
import fallback from '@/assets/images/fallback.jpg';

import fondpc from '@/assets/images/pcfond.png';
import fondgsm from '@/assets/images/fondgsm.png';

export default {
  name: 'Folderprojects',
  emits: ['update-class', 'close', 'resize', 'reduct', 'show-popup', 'typepop'],
  components: {
    Navigation,
    FakeMenu
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
      selectedImageIndex: 0,
      iconprojet,
      windowStateClass: '',
      fondpc,
      fondgsm,
      isPopupOpen: false,
      popupImageSrc: '',
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
        if (this.projects.length > 0) {
          this.selectedProjectId = this.projects[0].id;
          this.selectedImageIndex = 0;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
      }
    },
    adjustContainerHeight() {
      if (this.$refs.folderList && this.$refs.contentContainer) {
        const folderListHeight = this.$refs.folderList.offsetHeight;
        this.$refs.contentContainer.style.height = `${folderListHeight + 38}px`;
      }
    },
    imageError(event) {
      event.target.src = fallback;
    },
    chargerprojet(projectId) {
      this.selectedProjectId = projectId;
      this.selectedImageIndex = 0;
      this.$nextTick(() => {
        this.resetImageScroll();
      });
    },

    openPopup(imageSrc, type) {
      this.$emit('show-popup', { imageSrc, type });
    },
    resetImageScroll() {
    },
    selectImage(index) {
      this.selectedImageIndex = index;
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
    getTechIconPath(tech) {
      return `/images/technos/${tech}.png`;
    },
    getIconPath(logo) {
      return `/images/logos/${logo}.png`;
    },
    getPageThumbnailPath(nomimageprojet, index) {
      const suffix = index === 0 ? '' : index + 1;
      return `/images/preview-projets/${nomimageprojet}${suffix}.jpg`;
    },
    getPageThumbnailPathMobile(nomimageprojet, index) {
      const suffix = index === 0 ? '' : index + 1;
      return `/images/preview-projets/${nomimageprojet}${suffix}-m.jpg`;
    },
  },
  mounted() {
    this.loadProjects();
    this.adjustContainerHeight();
    window.addEventListener('resize', this.adjustContainerHeight);
  },
  updated() {
    this.adjustContainerHeight();
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.adjustContainerHeight);
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
};
</script>
<style scoped>
.kp_window--show {
  display: block !important;
  overflow: hidden;
}

.kp_image_ascii--content {
  overflow: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
  position: relative;
}

.kp_image-text--show,
.kp_text--show {
  display: block;
}

.kp_image_ascii--content {
  overflow: scroll;
  overflow: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
}

.kp_image_ascii {
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 800px;
  width: 50%;
  height: fit-content;
  background: #eeecdf;
  position: absolute;
}


@media screen and (max-width: 900px) {
  .kp_image_ascii--content {
    overflow: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    position: relative;
    height: calc(100% - 36px) !important;
    font-size: 9px;
    display: flex;
    align-items: flex-end;
  }
}

.kp_element--container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding: 40px 20px 20px;
}

.kp_folder {
  width: 80vw;
  height: 80vh;
  max-width: 100vw;
  max-height: 100vh;
}






.kp_window--border {
  background-color: #eeecdf;
}

.kp_window--container-folder {
  margin: 10px;
  background: white;
  border: solid 2px #91a7b4;
}


/* Styles pour les miniatures de pages */
.kp_pages-container {
  display: flex;
  gap: 17px;
  margin: 20px 0;
  flex-wrap: wrap;
}

.kp_page-thumbnail {
  text-align: center;
  width: 74px;
  background: #ffffff;
  border: solid 1px #ffffff;
  border-radius: 3px;
  padding: 5px;
  cursor: pointer;
}

.kp_page-thumbnail:hover {
  background: #fdf9ce;
  border: solid 1px #000000;
  border-radius: 3px;
  filter: drop-shadow(2px 2px 6px #00000044);
}

.selected-image {
  background: #fdf9ce;
  border: solid 1px #000000;
  border-radius: 3px;
  filter: drop-shadow(2px 2px 6px #00000044);
}

.kp_page-thumbnail-img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  border: solid 2px #000000;
}

.kp_page-title {
  font-size: 0.85rem;
  margin-top: 5px;
  color: #333;
}

.container-mesreals {
  max-height: calc(100% - 120px);
  margin: 0 10px 10px;
  background: white;
  border: solid 2px #91a7b4;
  overflow-y: scroll;
  height: fit-content;
}

.unprojet--titre {
  font-size: 32px;
  color: #000000;
  font-weight: 600;
}

.unprojet--texte {
  font-size: 16px;
  color: #000000;
  line-height: 1.5;
}

.unprojet--annee {
  font-weight: 600;
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom: solid 2px #000000;
}

.unprojet--texteclient {
  margin-top: 10px;
}

.unprojet--textetitre {
  font-size: 22px;
  margin-top: 30px;
  margin-bottom: -10px;
  display: block;
}

.kp_large-image-display {
  width: 100%;
}

.kp_part-image {
  width: 100%;
  position: relative;
}

.kp_large-image {
  overflow-y: scroll;
  /* max-height: calc(100vh - 300px); */
  /* max-width: 1300px; */
}

.unprojet--titre-image {
  display: flex;
  align-items: center;
  gap: 10px;
}

.kp_techno-list {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  list-style: none;
  padding: 20px 0;
}

.kp_techno-item {
  text-align: center;
  width: 40px;
  position: relative;
  cursor: help;
}

.kp_techno-icon {
  width: 35px;
  height: 35px;
  object-fit: contain;
  margin-bottom: 5px;
}

.unprojet-nomtechno {
  pointer-events: none;
  position: absolute;
  top: -42px;
  left: -4px;
  background: #fdf9ce;
  border-radius: 2px;
  padding: 5px 20px;
  border: solid 1px #000000;
  opacity: 0;
}

.kp_techno-item:hover .unprojet-nomtechno {
  pointer-events: initial;
  opacity: 1;
  transition: 0.3s;
}

.unprojet-nomtechno::after {
  content: "";
  background: #fdf9ce;
  width: 9px;
  height: 9px;
  position: absolute;
  bottom: -5px;
  left: 11px;
  border: solid 1px black;
  transform: rotate(315deg);
  clip-path: polygon(0 0, 0% 100%, 100% 100%);
}

.kp_line-projet {
  display: flex;
  gap: 40px;
}

.kp_texte-image {
  width: 100%;
}

.kp_mobile-image {
  overflow-y: scroll;
}

.titre-miniatures {
  font-size: 22px;
  width: 100%;
}

.titre-page-principale {
  font-size: 22px;
  width: 100%;
  padding-bottom: 20px;
}

.separator {
  width: 1px;
  height: 100%;
  background: #000000;
}

.titre-page-mobile {
  width: 100%;
  padding-top: 25px;
}


.kp_large-image-display-pc {
  width: 100%;
  z-index: 10;
  position: relative;
  width: 84%;
  left: 8%;
  pointer-events: none;
  user-select: none;
}

.kp_large-image {
  position: absolute;
  top: 0;
  aspect-ratio: 16 / 11;
  width: calc(69% - 2px);
  top: 16px;
  left: 15%;
}

.kp_large-image-display-gsm {
  width: 100%;
  z-index: 10;
  position: relative;
  width: 100%;
  pointer-events: none;
  user-select: none;
}

.gsm-container {
  position: relative;
  width: 100%;
  height: fit-content;
  margin-top: 20px;
  padding: 20px 0;
  max-width: 400px;
}

.kp_large-image-display--gsm {
  position: absolute;
  width: calc(98% + 2px);
  left: 1%;
}

.kp_mobile-image {
  position: absolute;
  top: 0;
  aspect-ratio: 9 / 17;
  width: calc(97% + 5px);
  top: 33px;
  left: 2%;
}



.kp_large-image::-webkit-scrollbar {
  width: 12px;
  height: 12px;
  border: 2px solid #6f6f6f;
}

.kp_large-image::-webkit-scrollbar-track {
  background: #f4f4f4;
  border: 1px solid #6f6f6f;
}

.kp_large-image::-webkit-scrollbar-thumb {
  background: #ababab;
  border: 1px solid #6f6f6f;
}

.kp_large-image::-webkit-scrollbar-thumb:hover {
  background: #fff788;
  border: 1px solid #6f6f6f;
}

.kp_large-image * {
  scrollbar-width: thin;
  scrollbar-color: #888 #000000;
}


.part_left {
  width: 70%;
}

.container-pc {
  position: relative;
}

.part_right--gsm {
  width: 30%;
}




@media screen and (max-width:960px) {
  .kp_folder {
    height: calc(100vh - 47px) !important;
  }

  .kp_folder-liste {
    flex-direction: column-reverse;
    height: 52px;
    width: fit-content;
    overflow-x: scroll;
    width: fit-content;
  }

  .kp_folder-li {
    padding: 15px 20px;
    max-width: 100px;
    width: 100px;
  }

  .kp_folder-li:hover {
    padding: 15px 20px;
    max-width: 100px;
    width: 100px;
  }

  .selected-project {
    padding: 15px 20px;
    max-width: 100px;
    width: 100px;
  }

  .container-mesreals {
    position: relative;
    top: -110px;
  }

  .kp_line-projet {
    flex-wrap: wrap;
  }

  .kp_texte-image {
    width: 100%;
  }

  .kp_pages-container {
    gap: 6px;
  }

  .kp_mobile-image {}

  .kp_element--container {
    padding-bottom: 70px !important;
  }

  .unprojet--annee {
    border: none;
  }

  .unprojet--textetitre {
    margin-top: 0;
  }

  .kp_element--container {
    padding-top: 150px;
  }

  .part_left {
    width: 100%;
  }

  .part_right--gsm {
    width: fit-content;
    margin: auto;
  }
}

@media screen and (max-width:900px) {
  .kp_element--container {
    padding-top: 15px;
  }
}

@media screen and (max-width:1600px) {
  .kp_mobile-image {
    top: 25px;
    width: calc(98% + 1px);
  }
}

@media screen and (max-width:1460px) {
  .kp_large-image {
    top: 12px;
  }
}

@media screen and (max-width:1155px) {
  .kp_large-image {
    top: 10px;
  }
}
</style>
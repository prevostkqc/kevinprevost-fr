<template>
  <!-- Folder Projects -->
  <section :class="['kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window']" :id="`kp_${context}`">
    <div class="kp_element--title">
      <div class="kp_element--icon-title kp_element--enable">
        <p class="kp_ascii--titre">
          <div class="kp_element_title--icn">
            <img class="kp_icon_zone--img" :src="iconSource" alt="reduct">
          </div>
          <span>{{ title }}</span>
        </p>
      </div>
      <Navigation :viewName="title" :context="context" :customClass="customClass" @close="handleClose" @resize="handleResize" @reduct="handleReduct" />
    </div>
    <div :class="['kp_folder-projects-zone-texte', 'kp_element--enable']">
      <article class="kp_card-folder-projects">
        <div class="kp_line-projet" v-for="project in projects" :key="project.name">
          <div class="kp_line-year">
            {{ project.description }}
            <br>{{ project.years }}
          </div>
          <article
            v-for="folder in project.folders"
            :key="folder.name"
            class="kp_folder--un-ico kp_folder--projets"
            @click="setCompagnieProjet(folder.company)"
          >
            <div class="kp_folder--un-ico-container-img">
              <img class="kp_folder--img" :src="folder.image" :alt="folder.name" @error="imageError($event)">
            </div>
            <p class="kp_folder--un-ico-container-text kp_folder--un-ico-container-text--black">
              {{ folder.name }}<br>{{ folder.years }}
            </p>
          </article>
        </div>
      </article>
    </div>
    <div class="resize-handle"></div>
  </section>
  <!-- Folder Projects -->
</template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';

  
  import siteauchan           from '@/assets/images/sites/auchan.png';
  import sitebmw              from '@/assets/images/sites/bmw.png';
  import sitecybertek         from '@/assets/images/sites/cybertek.png';
  import sitecybertekpro      from '@/assets/images/sites/cybertekpro.png';
  import siteforbes           from '@/assets/images/sites/forbes.png';
  import sitegrosbill         from '@/assets/images/sites/grosbill.png';
  import sitegrosbillpro      from '@/assets/images/sites/grosbillpro.png';
  import sitekevinprevost     from '@/assets/images/sites/kevinprevost.png';
  import sitekusmitea         from '@/assets/images/sites/kusmitea.png';
  import sitelescanardises    from '@/assets/images/sites/lescanardises.png';
  import sitelinkedin         from '@/assets/images/sites/linkedin.png';
  import sitemaif             from '@/assets/images/sites/maif.png';
  import sitemalakoff         from '@/assets/images/sites/malakoff.png';
  import sitemred             from '@/assets/images/sites/mred.png';
  import siteneadly           from '@/assets/images/sites/neadly.png';
  import siteopale            from '@/assets/images/sites/opale.png';
  import sitepicata           from '@/assets/images/sites/picata.png';
  import sitepokemongemme     from '@/assets/images/sites/pokemongemme.png';
  import sitesaintefoy        from '@/assets/images/sites/saintefoy.png';
  import sitescalian          from '@/assets/images/sites/scalian.png';
  import siteshopiles         from '@/assets/images/sites/shopiles.png';
  import siteuniversitelaval  from '@/assets/images/sites/universitelaval.png';
  import siteweb100t          from '@/assets/images/sites/web100t.png';
  import sitewedemain         from '@/assets/images/sites/wedemain.png';
  
  export default {
    name: 'Folderprojects',
    siteauchan,
    sitebmw,
    sitecybertek,
    sitecybertekpro,
    siteforbes,
    sitegrosbill,
    sitegrosbillpro,
    sitekevinprevost,
    sitekusmitea,
    sitelescanardises,
    sitelinkedin,
    sitemaif,
    sitemalakoff,
    sitemred,
    siteneadly,
    siteopale,
    sitepicata,
    sitepokemongemme,
    sitesaintefoy,
    sitescalian,
    siteshopiles,
    siteuniversitelaval,
    siteweb100t,
    sitewedemain,

    components: {
      Navigation
    },
    props: {
      context: {
        type: String,
        default: 'folder'
      },
      title: {
        type: String,
        default: 'folder'
      },
      iconSource: {
        type: String,
        default: '/images/folder.png'
      },
      customClass: {
        type: String,
        default: 'kp_element--incons-zone'
      }
    },
    data() {
      return {
        projects: [
          {
            description: 'Plusieurs pages réalisées pour des PC Gamer',
            years: '2021-2024',
            folders: [
              {
                name: 'PC Gamer',
                company: 'CybertekPcGamer',
                image: sitecybertek, // Utilisation des images importées
                years: '2024 - 2021'
              }
            ]
          },
          {
            description: 'Sites dont j’étais responsable pour le Groupe Cybertek',
            years: '2021-2024',
            folders: [
              {
                name: 'Cybertek',
                company: 'Cybertek',
                image: sitecybertek,
                years: '2024 - 2021'
              },
              {
                name: 'Cybertek Pro',
                company: 'Cybertekpro',
                image: sitecybertekpro,
                years: '2024 - 2022'
              },
              {
                name: 'Mred',
                company: 'Mred',
                image: sitemred,
                years: '2024 - 2022'
              },
              {
                name: 'Picata',
                company: 'Picata',
                image: sitepicata,
                years: '2024 - 2022'
              },
              {
                name: 'Grosbill',
                company: 'Grosbill',
                image: sitegrosbill,
                years: '2024 - 2021'
              }
            ]
          },
          {
            description: 'Projets réalisés plus tôt dans ma carrière',
            years: '2013-2021',
            folders: [
              {
                name: 'Opale',
                company: 'Opale',
                image: siteopale,
                years: '2024 - 2018'
              },
              {
                name: 'KusmiTea',
                company: 'Kusmitea',
                image: sitekusmitea,
                years: '2021 - 2020'
              },
              {
                name: 'Shopiles',
                company: 'Sophiles',
                image: siteshopiles,
                years: '2017 - 2016'
              },
              {
                name: 'Mag Auchan',
                company: 'MagAuchan',
                image: siteauchan,
                years: '2016 - 2013'
              },
              {
                name: 'WeDemain',
                company: 'Wedemain',
                image: sitewedemain,
                years: '2020 - 2016'
              },
              {
                name: 'Canardises',
                company: 'LesCanardises',
                image: sitelescanardises,
                years: '2010 - 2013'
              }
            ]
          }
        ]
      };
    },
   methods: {
      imageError(event) {
        event.target.src = '/images/fallback.png'; // image de fallback en cas d'erreur
      },
      setCompagnieProjet(compagnie) {
        console.log('Projet sélectionné dans Folderprojects:', compagnie);
        try {
          this.$emit('projet-selectionne', compagnie);
          this.$emit('update-class', 'kp_item_show'); // Assurez-vous que cet événement est émis
          console.log('Événements projet-selectionne et update-class émis');
        } catch (error) {
          console.error('Erreur lors de l\'émission des événements:', error);
        }
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
    }
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques pour la vue FolderProjects.vue */
  </style>
  
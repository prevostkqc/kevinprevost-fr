<template>
  <!-- Mon parcours -->
  <section class="kp_quisuisje kp_z-index kp_changed__id kp_item__window" id="kp_quisuisje">
    <div class="kp_element--title">
      <div class="kp_element--icon-title kp_element--enable">
        <p class="kp_ascii--titre">
          <div class="kp_element_title--icn">
            <img class="kp_icon_zone--img" :src="iconSource" alt="reduct" />
          </div>
          <span>Kévin Prévost - Mon parcours</span>
        </p>
      </div>
      <Navigation @close="handleClose"  @resize="handleResize"  @reduct="handleReduct"  :viewName="title" :context="context" :customClass="customClass" />
    </div>
    <FakeMenu></FakeMenu>

    <div class="kp_folder-projects-zone-texte kp_quisuisje--texte kp_element--enable">
      <div class="kp_quisuisje--content">
        <!-- Boucle pour afficher chaque expérience -->
        <article class="kp_cv-experience--line" v-for="(experience, index) in experiences" :key="index">
          <div class="kp_cv-experience-line">
            <div class="kp_cv-experience-line--content">
              <div class="kp_compagnie-btn">
                <div class="kp_compagnie-img-nom">
                  <div class="kp_cv-experience-line--logo">
                    <img :src="experience.logo" class="kp_img-cv" :alt="experience.company" />
                  </div>
                  <div class="kp_cv-experience-line--entreprise">
                    <div class="kp_cv-experience-line--date kp_p-black kp_h5 kp_bold">{{ experience.date }}</div>
                    <div class="kp_cv-experience-line--title kp_p-black kp_h4">{{ experience.title }}</div>
                    <div class="kp_cv-experience-line--company kp_p-black kp_h6">{{ experience.company }}</div>
                    <div class="kp_cv-experience-line--poste kp_p-black">{{ experience.location }}</div>
                  </div>
                </div>
                <button class="kp_btn-cv kp_btn-cv--afficher" @click="toggleShow">{{ buttonText }}</button>
                <button class="kp_btn-cv kp_btn-cv--masquer" @click="toggleShow">Masquer les informations</button>
              </div>

              <!-- Liste des responsabilités -->
              <div class="kp_content--cv">
                <ul class="kp_cv-ul">
                  <li class="kp_cv-li kp_p-black" v-for="(responsibility, idx) in experience.responsibilities" :key="idx">{{ responsibility }}</li>
                </ul>

                <!-- Boucle pour afficher les technologies -->
                <ul class="kp_cv-experience-line--technos kp_projet-technos" v-for="(category, catIndex) in experience.technos" :key="catIndex">
                  <li class="kp_li-techno" v-for="(techno, techIndex) in category.items" :key="techIndex">
                    <img :src="techno.logo" class="kp_img-techno" :alt="techno.name" />
                    <p class="kp_projet-techno--text">{{ techno.name }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <div class="resize-handle"></div>
  </section>
</template>
  
  <script>
  import Navigation from '@/components/Navigation.vue';
  import FakeMenu     from '@/components/Fakemenu.vue';

  
  import iconSource from '@/assets/images/cv.png';

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
  name: 'Monparcours',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
    FakeMenu
  },
 props: {
   context: {
     type: String,
     default: 'monparcours',
   },
   title: {
     type: String,
     default: 'monparcours',
   },
   customClass: {
     type: String,
     default: 'kp_element--incons-zone',
   },
 },
  data() {
    return {
      buttonText: 'Afficher les informations',
      iconSource,
      experiences: [
        {
          logo: sitekevinprevost,
          date: '2010 - aujourd\'hui',
          title: 'Développeur Front-end Back-end / Webdesigner / Intégrateur / UI-UX Designer',
          company: 'Freelance',
          location: 'Québec, Paris, Bordeaux',
          responsibilities: [
            'Responsable des Développeurs Front-end, Intégrateurs et Webdesigner.',
            'Intégration CSS, développement Front-end en collaboration avec l\'équipe Back-end.',
            'Optimisation multi supports (responsive) pour une meilleure expérience utilisateur.',
            'Gestion d\'équipe et communication permanente pour tenir les délais.',
            'Mise en place de points quotidiens et hebdomadaires pour suivre l\'avancement.',
            'Création et gestion d\'un espace Notion pour simplifier les échanges.',
            'Communication interservices pour la gestion des projets.'
          ],
          technos: [
            {
              name: 'Code',
              items: [
                { name: 'CSS3', logo: technocss3 },
                { name: 'Javascript', logo: technojs },
                { name: 'HTML5', logo: technohtml5 },
                { name: 'Vue.js', logo: technovuejs },
                { name: 'TypeScript', logo: technotypescript },
                { name: 'PHP', logo: technophp },
                { name: 'MySQL', logo: technomysql },
                { name: 'Three.js', logo: technothreejs },
                { name: 'Python', logo: technopython }
              ]
            },
            {
              name: 'Outils',
              items: [
                { name: 'Figma', logo: technofigma },
                { name: 'Photoshop', logo: technophotoshop },
                { name: 'Notion', logo: technonotion },
                { name: 'Visual Studio Code', logo: technovisualstudiocode },
                { name: 'Git', logo: technogit }
              ]
            }
          ]
        },
        {
          logo: sitecybertek,
          date: '2021 - 2024',
          title: 'Responsable Cellule Créative & Développeur Front-end',
          company: 'GROUPE CYBERTEK',
          location: 'Bordeaux',
          responsibilities: [
            'Responsable des Développeurs Front-end, Intégrateurs et Webdesigner.',
            'Intégration CSS, développement Front-end en collaboration avec l\'équipe Back-end.',
            'Optimisation multi supports pour une meilleure expérience utilisateur.',
            'Gestion d\'équipe pour tenir les délais et résoudre les problèmes.'
          ],
          technos: [
            {
              name: 'Code',
              items: [
                { name: 'CSS3', logo: technocss3 },
                { name: 'ASP.NET', logo: technohtml5 }
              ]
            },
            {
              name: 'Outils',
              items: [
                { name: 'Figma', logo: technofigma },
                { name: 'Photoshop', logo: technophotoshop }
              ]
            }
          ]
        },
        {
          logo: siteshopiles,
          date: '2016 - 2017',
          title: 'Développeur web',
          company: 'Shopîles - Neadly',
          location: 'Bordeaux',
          responsibilities: [
            'Développement de solutions, Front-end/Back-end pour les différents sites de la compagnie.',
            'Mise en place d\'outils pour simplifier la gestion de projets.',
            'Création d\'une API et d\'un service de paiement simplifié pour les entreprises.'
          ],
          technos: [
            {
              name: 'Code',
              items: [
                { name: 'Javascript', logo: technojs },
                { name: 'HTML5', logo: technohtml5 },
                { name: 'CSS3', logo: technocss3 },
                { name: 'PHP', logo: technophp },
                { name: 'MySQL', logo: technomysql }
              ]
            },
            {
              name: 'Outils',
              items: [
                { name: 'Sublime Text', logo: technophotoshop },
                { name: 'GitKraken', logo: technogit }
              ]
            }
          ]
        },
        {
          logo: sitescalian,
          date: '2016',
          title: 'Développeur web',
          company: 'Scalian',
          location: 'Bordeaux',
          responsibilities: [
            'Développement de solutions Front-end/Back-end pour plusieurs sites.',
            'Échange avec plusieurs prestataires pour adapter leurs problèmes à nos solutions.',
            'Correction de base de données corrompues et nettoyage de code pour une meilleure optimisation.'
          ],
          technos: [
            {
              name: 'Code',
              items: [
                { name: 'Javascript', logo: technojs },
                { name: 'HTML5', logo: technohtml5 },
                { name: 'CSS3', logo: technocss3 },
                { name: 'PHP', logo: technophp },
                { name: 'MySQL', logo: technomysql }
              ]
            },
            {
              name: 'Outils',
              items: [
                { name: 'PHPStorm', logo: technophotoshop },
                { name: 'Git', logo: technogit }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    toggleShow() {
      this.buttonText = this.buttonText === 'Afficher plus d\'informations' ? 'Masquer les informations' : 'Afficher plus d\'informations';
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
    toggleShow(event) {
        const parentElement = event.target.parentElement;
        parentElement.classList.toggle('kp-cv--show');
    }
  }
};
</script>
  
<style scoped>
  
  .kp_quisuisje{
        background: white;
        width: 60vw;
        height: 60vh;
    }
    .kp_quisuisje--content{
        background: white;
        height:100%;
        overflow: hidden;
        overflow-y: scroll;
    }
    .kp_compagnie-img-nom{
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        align-items: center;
    }
    .kp_img-cv{
        width: 85px;
        height: 85px;
    }
    .kp_cv-li{
        padding-left: 20px;
        position: relative;
        line-height: 1.3;
    }
    .kp_cv-li:before{
        content: "•";
        position: absolute;
        left: 0;
        color: #000;
    }
    .kp_cv-experience--line{
        padding: 20px;
        border-bottom: solid 2px #000000;
    }
    .kp_cv-experience--line:nth-child(odd){
        background-color: #FCFCFC;
    }
    .kp_cv-ul{
        width: calc(100% - 20px);
        border-top: solid 1px #c1c1c1;
        padding: 10px;
        margin-top: 10px;
    }
    .kp_li-techno{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        width: 80px;

        


        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        width: 100px;
        border: solid 1px;
        padding: 10px 5px;
        border-radius: 9px;
    }
    .kp_projet-technos{
        gap: 15px;
        flex-wrap: wrap;
    }
    .kp_content--cv{
        max-height: 0px !important;
        overflow: hidden;
        transition: 0.3s;
    }
    .kp_btn-cv{
        background: #0053e3;
        padding: 10px 15px;
        border-radius: 5px;
        border: solid 1px #000000;
        cursor: pointer;
        box-shadow: inset 0 0 13px rgb(67, 129, 195);
        color: white;
        text-decoration: none;
        height: -moz-fit-content;
        height: fit-content;
        margin: 10px 0;
        display: block;
        width: -moz-fit-content;
        width: fit-content;
    }
    
    .kp_btn-cv:hover{
        background: #003f9e;

    }
    .kp_compagnie-btn{
        display: flex;
        flex-direction: column;
    }
    .kp-cv--show ~ .kp_content--cv{
        max-height: 2000px !important;
        overflow: hidden;
    }
    .kp_btn-cv--masquer{
        display: none;
    }
    .kp-cv--show .kp_btn-cv--masquer{
        display: block;
    }
    .kp-cv--show .kp_btn-cv--afficher{
        display:none;
    }
    .kp_projet-technos--outils li{
        border: solid 2px #ff3535;
    }
    .kp_projet-technos--outils li:hover{
        background: #ffcfcf;
    }
    .kp_projet-technos--cms li{
        border: solid 2px #ffa303;
    }
    .kp_projet-technos--cms li:hover{
        background : #ffdfa9;
    }
    .kp_projet-technos--code li{
        border: solid 2px #291beb;
    }
    .kp_projet-technos--code li:hover{
        background: #d4d1ff;
    }
    .kp_projet-technos--visuel li{
        border: solid 2px #16b139;
    }
    .kp_projet-technos--visuel li:hover{
       background: #ceffd9;
    }
    
    @media screen and (max-width: 900px){
        .kp_li-techno{
            padding: 10px 2px;
        }
    }
  </style>
  
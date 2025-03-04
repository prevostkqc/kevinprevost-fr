<template>
    <!-- Media -->
    <section :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - Mes compétences</span>
                </p>
            </div>
            <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title" :context="context" :customClass="customClass" />
        </div>
        <section class="fake-menu-top-folder">
            <div class="fake-menu--top">
                <ul class="liste-fake-menu">
                    <li class="liste-fake-menu--li  liste-fake-menu--li-nouveau">Fichier
                        <ul class="fake-sous-menu">
                            <li class="fake-sous-menu--li" @click="clearCanvas">
                                <p class="p-texte">Nouveau</p>
                                <p class="p-texte">Ctrl+N</p>
                            </li>
                            <li class="fake-sous-menu--li">
                                <p class="p-texte">Ouvrir...</p>
                                <p class="p-texte">Ctrl+O</p>
                            </li>
                            <li class="fake-sous-menu--li">
                                <p class="p-texte">Enregistrer</p>
                                <p class="p-texte">Ctrl+S</p>
                            </li>
                        </ul>
                    </li>
                    <li class="liste-fake-menu--li">Edition</li>
                    <li class="liste-fake-menu--li">Affichage</li>
                    <li class="liste-fake-menu--li">Image</li>
                    <li class="liste-fake-menu--li">Couleurs</li>
                    <li class="liste-fake-menu--li">?</li>
                </ul>
            </div>
        </section>

       
        <div class="kp_content--block--content kp_element--enable kp_content--mescompetences">
            <div v-for="techCategory in technos" :key="techCategory.name" class="kp_technos--category">
                <h3 class="kp_technos--title">{{ techCategory.name }}</h3>
                <transition-group name="fade" tag="div" class="kp_technos--list">
                    <div 
                        v-for="(tech, index) in techCategory.items" 
                        :key="tech.name" 
                        class="kp_technos--item"
                        :href="techCategory.link" target="_blank"
                        :style="{ animationDelay: `${index * 0.3}s` }">
                        <a class="kp-liste--a" :href="tech.link" target="_blank"></a>
                            <img :src="tech.logo" :alt="tech.name" class="kp_technos--logo">
                            <div class="kp_technos--text">    
                                <span class="kp_p">{{ tech.name }}</span>
                                <span class="kp_p kp_annee">Depuis {{ tech.depuis }}</span>
                            </div>
                    </div>
                </transition-group>
            </div>
        </div>

        <div class="resize-handle"></div>
    </section>
    <!-- Media -->
</template>

<script>

import Navigation   from  '@/components/Navigation.vue';
import textIcon     from  '@/assets/images/icon-competences.png'; 


import technoajax from '@/assets/images/logos-technos/ajax.png';
import technoaspnet from '@/assets/images/logos-technos/aspnet.png';
import technoazuredevops from '@/assets/images/logos-technos/azuredevops.png';
import technocakephp from '@/assets/images/logos-technos/cakephp.png';
import technocss3 from '@/assets/images/logos-technos/css3.png';
import technofigma from '@/assets/images/logos-technos/figma.png';
import technogit from '@/assets/images/logos-technos/git.png';
import technogithub from '@/assets/images/logos-technos/github.png';
import technogitkraken from '@/assets/images/logos-technos/gitkraken.png';
import technohtml5 from '@/assets/images/logos-technos/html5.png';
import technoshopify from '@/assets/images/logos-technos/shopify.png';
import technoillustrator from '@/assets/images/logos-technos/illustrator.png';
import technojquery from '@/assets/images/logos-technos/jquery.png';
import technojs from '@/assets/images/logos-technos/js.png';
import technojson from '@/assets/images/logos-technos/json.png';
import technomysql from '@/assets/images/logos-technos/mysql.png';
import technonotion from '@/assets/images/logos-technos/notion.png';
import technophotoshop from '@/assets/images/logos-technos/photoshop.png';
import technophp from '@/assets/images/logos-technos/php.png';
import technophpstorm from '@/assets/images/logos-technos/phpstorm.png';
import technopython from '@/assets/images/logos-technos/python.png';
import technorazor from '@/assets/images/logos-technos/razor.png';
import technosublimtext from '@/assets/images/logos-technos/sublimtext.png';
import technothreejs from '@/assets/images/logos-technos/threejs.png';
import technotypescript from '@/assets/images/logos-technos/typescript.png';
import technovisualstudio from '@/assets/images/logos-technos/visualstudio.png';
import technovisualstudiocode from '@/assets/images/logos-technos/visualstudiocode.png';
import technovuejs from '@/assets/images/logos-technos/vuejs.png';
import technowebflow from '@/assets/images/logos-technos/webflow.png';
import technowoocommerce from '@/assets/images/logos-technos/woocommerce.png';
import technowordpress from '@/assets/images/logos-technos/wordpress.png';
import technoxd from '@/assets/images/logos-technos/xd.png';
import technojira from '@/assets/images/logos-technos/jira.png';
import technosymfony from '@/assets/images/logos-technos/symfony.png';
import technocopilot from '@/assets/images/logos-technos/copilot.png';
import technoopenai from '@/assets/images/logos-technos/openai.png';


export default {
  name: 'Mescompetences',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
  },
  props: {
    context: {
      type: String,
      default: 'media'
    },
    title: {
      type: String,
      default: 'media'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
    data() {
        return {
            textIcon,
            
            technos: [
                {
                    name: 'Technos',
                    items: [
                        { name: 'Javascript', logo: technojs, depuis: '2010', link: 'https://developer.mozilla.org/fr/docs/Web/JavaScript' },
                        { name: 'CSS3', logo: technocss3, depuis: '2010', link: 'https://developer.mozilla.org/fr/docs/Web/CSS' },
                        { name: 'HTML5', logo: technohtml5, depuis: '2010', link: 'https://developer.mozilla.org/fr/docs/Web/HTML' },
                        { name: 'Vue.js', logo: technovuejs, depuis: '2020', link: 'https://vuejs.org/' },
                        { name: 'TypeScript', logo: technotypescript, depuis: '2020', link: 'https://www.typescriptlang.org/' },
                        { name: 'Three.js', logo: technothreejs, depuis: '2020', link: 'https://threejs.org/' },
                        { name: 'PHP', logo: technophp, depuis: '2010', link: 'https://www.php.net/' },
                        { name: 'MySQL', logo: technomysql, depuis: '2010', link: 'https://dev.mysql.com/doc/' },
                        { name: 'Ajax', logo: technoajax, depuis: '2010', link: 'https://developer.mozilla.org/fr/docs/Web/Guide/AJAX' },
                        { name: 'ASP.NET', logo: technoaspnet, depuis: '2022', link: 'https://learn.microsoft.com/fr-fr/aspnet/' },
                        { name: 'Python', logo: technopython, depuis: '2008', link: 'https://docs.python.org/fr/3/' },
                        { name: 'jQuery', logo: technojquery, depuis: '2010', link: 'https://jquery.com/' },
                        { name: 'JSON', logo: technojson, depuis: '2010', link: 'https://www.json.org/json-fr.html' },
                        { name: 'Razor', logo: technorazor, depuis: '2022', link: 'https://learn.microsoft.com/fr-fr/aspnet/core/razor-pages/' },
                        { name: 'CakePHP', logo: technocakephp, depuis: '2013', link: 'https://cakephp.org/' },
                        { name: 'Symfony', logo: technosymfony, depuis: '2015', link: 'https://symfony.com/' }
                    ]
                },
                {
                    name: 'Outils',
                    items: [
                        { name: 'Figma', logo: technofigma, depuis: '2017', link: 'https://www.figma.com/' },
                        { name: 'Notion', logo: technonotion, depuis: '2020', link: 'https://www.notion.so/' },
                        { name: 'Jira', logo: technojira, depuis: '2015', link: 'https://www.atlassian.com/software/jira' },
                        { name: 'Copilot', logo: technocopilot, depuis: '2023', link: 'https://github.com/features/copilot' },
                        { name: 'OpenAI', logo: technoopenai, depuis: '2023', link: 'https://openai.com/' },
                        { name: 'Photoshop', logo: technophotoshop, depuis: '2008', link: 'https://www.adobe.com/fr/products/photoshop.html' },
                        { name: 'Illustrator', logo: technoillustrator, depuis: '2008', link: 'https://www.adobe.com/fr/products/illustrator.html' },
                        { name: 'Adobe XD', logo: technoxd, depuis: '2018', link: 'https://www.adobe.com/fr/products/xd.html' },
                        { name: 'Git', logo: technogit, depuis: '2010', link: 'https://git-scm.com/doc' },
                        { name: 'GitHub', logo: technogithub, depuis: '2010', link: 'https://docs.github.com/fr' },
                        { name: 'GitKraken', logo: technogitkraken, depuis: '2016', link: 'https://www.gitkraken.com/' },
                        { name: 'Visual Studio Code', logo: technovisualstudiocode, depuis: '2016', link: 'https://code.visualstudio.com/' },
                        { name: 'Visual Studio', logo: technovisualstudio, depuis: '2022', link: 'https://visualstudio.microsoft.com/fr/' },
                        { name: 'PHPStorm', logo: technophpstorm, depuis: '2010', link: 'https://www.jetbrains.com/phpstorm/' },
                        { name: 'Sublime Text', logo: technosublimtext, depuis: '2010', link: 'https://www.sublimetext.com/' },
                        { name: 'Azure DevOps', logo: technoazuredevops, depuis: '2022', link: 'https://azure.microsoft.com/fr-fr/products/devops/' },
                    ]
                },
                {
                    name: 'CMS',
                    items: [
                        { name: 'WordPress', logo: technowordpress, depuis: '2010', link: 'https://wordpress.org/' },
                        { name: 'WooCommerce', logo: technowoocommerce, depuis: '2017', link: 'https://woocommerce.com/' },
                        { name: 'Shopify', logo: technoshopify, depuis: '2016', link: 'https://www.shopify.com/' },
                        { name: 'Webflow', logo: technowebflow, depuis: '2020', link: 'https://webflow.com/' },
                    ]
                }
            ],

        };
    },
    methods: {
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
    },
    mounted() {
    },
};
</script>

<style scoped>    

.kp_window--show{
  display: block !important;
  overflow-y: hidden;
}
.kp_content--block--content{
  overflow-y: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
  position: relative; 
}
.kp_content--block--content{
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 71px);
    transition: 0.3s;
    max-height: 100vh;
    max-width: 200% !important;
}
.kp_content--block{
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 730px;
  width: 730px;
  height: 750px;
  background: #cdcabb;
  position: absolute;
  max-height: 100vh;
  max-width: 100vw;
}

.kp_technos--category {
    margin-bottom: 20px;
    padding: 20px;
}

.kp_technos--title {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
}
.kp_p{
    color: #333;
    text-align: center;
}

.kp_technos--list {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.kp_technos--item {
    display: flex;
    align-items: center;
    gap: 15px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    min-width: 135px;
    opacity: 0;
    animation: fadeIn 0.8s ease-in-out forwards;
    position: relative;
    top:0;
    transition: top 0.3s, box-shadow 0.3s, background 0.3s;
}
.kp_technos--item:hover{
    top:-5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background: #f5f5f5;
}

.kp_technos--text{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    width:100%;
    border-top: 1px solid #333;
    padding-top: 10px;
}
.kp_technos--logo {
    width: 70px;
    height: 70px;
}
.kp_annee{
    font-weight: 500;
    font-size: 12px;
    font-style: italic;
}


.fade-enter-active {
    animation: fadeIn 0.8s ease-in-out forwards;
}

.fade-enter {
    opacity: 0;
    transform: translateY(10px);
}
.kp-liste--a{
    position: absolute;
    inset: 0;
}


@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media screen and (max-width: 960px) {
    .kp_technos--item {
        min-width: 40%;
    }
}

</style>
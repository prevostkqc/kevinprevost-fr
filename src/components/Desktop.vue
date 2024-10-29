<template>
  <section class="kp_desktop">
    <article 
      v-for="item in desktopItems" 
      :key="item.id" 
      :class="['kp_folder--un-ico', item.class]"
      @click="handleClick(item.id); callBringToFront(item.id)
      ">  <!-- Ajout de @click pour chaque icône -->
      <div class="kp_folder--un-ico-container-img">
        <div v-if="item.isTextIcon" class="kp_terminal--icn">{{ item.icon }}</div>
        <img v-else :class="['kp_folder--img', item.imageClass]" :src="item.icon" :alt="item.altText" />
      </div>
      <p class="kp_folder--un-ico-container-text">
        {{ item.text }}
      </p>
    </article>
    <a v-if="mailLink" :href="mailLink" class="kp_hrefmailto-icon">
      <article class="kp_folder--un-ico kp_folder--mail">
        <div class="kp_folder--un-ico-container-img">
          <img class="kp_folder--img" :src="mailIcon" alt="Me contacter">
        </div>
        <p class="kp_folder--un-ico-container-text">
          Me contacter
        </p>
      </article>
    </a>
  </section>
</template>

<script>
import mailIcon from '@/assets/images/mail.png';
import folderIcon from '@/assets/images/folder.png';
import cvIcon from '@/assets/images/cv.png';
import textIcon from '@/assets/images/text.png';
import pokecardIcon from '@/assets/images/pokecard_icn.png';
import passionIcon from '@/assets/images/icon-heart.png';
import paintIcon from '@/assets/images/icon-paint.png';

export default {
  name: 'Desktop',
  data() {
    return {
      desktopItems: [
        {
          id: 'terminal',
          class: 'kp_folder--terminal',
          icon: 'KP:\\',
          isTextIcon: true,
          text: 'qui suis-je ?',
          altText: 'Terminal',
        },
        {
          id: 'folder',
          class: 'kp_folder--folder',
          icon: folderIcon,
          isTextIcon: false,
          text: 'Mes réalisations',
          altText: 'Mes projets',
        },
        {
          id: 'monparcours',
          class: 'kp_folder--quisuisje',
          icon: cvIcon,
          isTextIcon: false,
          text: 'Mon parcours',
          altText: 'Mon parcours',
        },
        {
          id: 'autoportrait',
          class: 'kp_folder--autoportrait',
          icon: textIcon,
          isTextIcon: false,
          text: 'Autoportrait',
          altText: 'Ma tête',
        },
        {
          id: 'paint',
          class: 'kp_folder--paint',
          icon: paintIcon,
          isTextIcon: false,
          text: 'Paint',
          altText: 'paint',
        },
        {
          id: 'passions',
          class: 'kp_folder--passions',
          icon: passionIcon,
          isTextIcon: false,
          text: 'Mes psassions',
          altText: 'Mes passions',
        },
        {
          id: 'pokemon',
          class: 'kp_folder--pokemon',
          icon: pokecardIcon,
          isTextIcon: false,
          text: 'Mes passions',
          altText: 'Ma passion',
        }
      ],
      mailLink: 'mailto:contact@kevinprevost.fr?subject=Contact depuis kevinprevost.fr&body=Nom : %0D%0APrénom : %0D%0ATéléphone : %0D%0ACompagnie (facultatif) : %0D%0A%0D%0ADescription du projet : %0D%0A%0D%0A%0D%0A%0D%0A',
      mailIcon
    };
  },
  methods: {
    handleClick(id) {
      this.$emit('openWindow', id);
    },
    
    callBringToFront(appId) {
      this.$emit('callBringToFront', appId);
    },
  }
};
</script>

<style scoped>
  .kp_terminal--icn{
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
</style>

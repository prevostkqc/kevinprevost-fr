<template>
  <section class="kp_desktop">
    <article 
      v-for="item in desktopItems" 
      :key="item.id" 
      :class="['kp_folder--un-ico', item.class]"
      @click="handleClick(item.id)">  <!-- Ajout de @click pour chaque icône -->
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
          text: 'quisuisje',
          altText: 'Terminal',
        },
        {
          id: 'folder',
          class: 'kp_folder--folder',
          icon: folderIcon,
          isTextIcon: false,
          text: 'mesrealisations',
          altText: 'Mes projets',
        },
        {
          id: 'monparcours',
          class: 'kp_folder--quisuisje',
          icon: cvIcon,
          isTextIcon: false,
          text: 'monparcours',
          altText: 'Mon parcours',
        },
        {
          id: 'autoportrait',
          class: 'kp_folder--autoportrait',
          icon: textIcon,
          isTextIcon: false,
          text: 'autoportrait',
          altText: 'Ma tête',
        },
        {
          id: 'pokemon',
          class: 'kp_folder--pokemon',
          icon: pokecardIcon,
          isTextIcon: false,
          text: 'mapassion',
          altText: 'Ma passion',
        }
      ],
      mailLink: 'mailto:contact@kevinprevost.fr?subject=Contact depuis kevinprevost.fr&body=Nom : %0D%0APrénom : %0D%0ATéléphone : %0D%0ACompagnie (facultatif) : %0D%0A%0D%0ADescription du projet : %0D%0A%0D%0A%0D%0A%0D%0A',
      mailIcon
    };
  },
  methods: {
    handleClick(id) {
      // Émet un événement pour dire à Home.vue d'ouvrir la fenêtre correspondante
      this.$emit('openWindow', id);
    }
  }
};
</script>

<style scoped>
</style>

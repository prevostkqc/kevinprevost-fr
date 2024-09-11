<template>
    <section class="kp_menu__barre-etat">
    <div class="kp_menu__barre-etat--titre">
        <div class="kp_menu__barre-etat--photo-container">
            <img class="kp_menu__barre-etat--photo" src="/images/kevinprevost.jpg" alt="Kévin Prévost">
        </div>
        <p class="kp_titre-profil-barre">Kévin Prévost - Développeur front-end</p>
    </div>
    <div class="kp_menu__barre-etat--container">
        <div class="kp_menu__barre-etat--content-left">

            <article class="kp_menu__barre-etat--ico  kp_menu__barre-etat--projet">
                <div class="kp_menu__barre-etat--un-ico-container-img">
                    <img class="kp_menu__barre-etat--img" src="/images/folder.png" alt="Mes projets">
                </div>
                <div>
                    <p class="kp_menu__barre-etat--un-ico-container--text">
                        Mes réalisations
                    </p>
                    <p class="kp_menu__barre-etat--un-ico-container--desc">
                        Consulter mes projets
                    </p>

                </div>
            </article>

            <article class="kp_menu__barre-etat--ico  kp_menu__barre-etat--contact">
                <a class="kp_hrefmailto" href="mailto:contact@kevinprevost.fr?subject=Contact depuis kevinprevost.fr&body=Nom : %0D%0APrénom : %0D%0ATéléphone : %0D%0ACompagnie (facultatif) : %0D%0A%0D%0ADescription du projet : %0D%0A%0D%0A%0D%0A%0D%0A"></a>
                <div class="kp_menu__barre-etat--un-ico-container-img">
                    <img class="kp_menu__barre-etat--img" src="/images/mail.png" alt="Me contacter">
                </div>
                <div>
                    <p class="kp_menu__barre-etat--un-ico-container--text">
                        Me contacter
                    </p>
                    <p class="kp_menu__barre-etat--un-ico-container--desc">
                        Envoyez-moi un message
                    </p>

                </div>
            </article>

            <article class="kp_menu__barre-etat--ico  kp_menu__barre-etat--quisuisje" >
                <div class="kp_menu__barre-etat--un-ico-container-img">
                    <img class="kp_menu__barre-etat--img" src="/images/cv.png" alt="Mon parcours">
                </div>
                <div>
                    <p class="kp_menu__barre-etat--un-ico-container--text">
                        Mon parcours
                    </p>
                    <p class="kp_menu__barre-etat--un-ico-container--desc">
                        Consulter mon parcours
                    </p>

                </div>
            </article>

        </div>
        <div class="kp_menu__barre-etat--content-right">

        </div>
    </div>
</section>
  </template>
  
  <script>
  import maphoto from '@/assets/images/kevinprevost.jpg';
  
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
                id: 'folder-projects',
                class: 'kp_folder--folder-projects',
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
  
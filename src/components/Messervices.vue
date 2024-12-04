<template>
    <!-- Mon parcours -->
    <section class="kp_quisuisje kp_z-index kp_changed__id kp_item__window" id="kp_quisuisje">
        <div class="kp_element--title">
            <div class="kp_element--icon-title kp_element--enable">
                <p class="kp_ascii--titre">
                <div class="kp_element_title--icn">
                    <img class="kp_icon_zone--img" :src="iconSource" alt="reduct" />
                </div>
                <span>Kévin Prévost - Mes services</span>
                </p>
            </div>
            <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title"
                :context="context" :customClass="customClass" />
        </div>
        <FakeMenu></FakeMenu>

        <div class="kp_folder-projects-zone-texte kp_quisuisje--texte kp_element--enable">

        </div>
        <article>
            <div class="title_service">
                Développement d'applications web
            </div>
            <div class="desc_service">
                Création d'applications web modernes, dynamiques et réactives, en intégrant des fonctionnalités sur mesure pour répondre aux besoins spécifiques des clients.
            </div>
        </article>
        <div class="resize-handle"></div>
    </section>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import FakeMenu from '@/components/Fakemenu.vue';

import iconSource from '@/assets/images/icon-services.png';


export default {
    name: 'Messervices',
    emits: ['update-class', 'close', 'resize', 'reduct'],
    components: {
        Navigation,
        FakeMenu
    },
    props: {
        context: {
            type: String,
            default: 'messervices',
        },
        title: {
            type: String,
            default: 'messervices',
        },
        customClass: {
            type: String,
            default: 'kp_element--incons-zone',
        },
    },
    data() {
        return {
            iconSource,
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
    }
};
</script>

<style scoped>
.title_service{
    color: #000000;
}
</style>
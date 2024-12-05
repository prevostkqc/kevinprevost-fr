<template>
    <!-- Services -->
    <section
        :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]"
        :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                <div class="kp_element_title--icn">
                    <img class="kp_icon_zone--img" :src="iconSource" alt="text">
                </div>
                <span>Kévin Prévost - Mes services</span>
                </p>
            </div>
            <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title"
                :context="context" :customClass="customClass" />
        </div>
        <FakeMenu></FakeMenu>



        <div class="kp_content--block--content kp_element--enable  kp_content--meservices">
            <section class="services_container">
                <div class="services_content">
                    <div class="titre_services">
                        <h2 class="services_title  services_title--principal">Mes services</h2>
                        <p class="services_text">Développeur web avec une forte sensibilité créative, je vous propose
                            mes services pour la création de votre site internet.
                            <br>Je suis spécialisé dans le développement front-end et je peux également vous aider pour
                            la création de votre identité visuelle.
                        </p>
                    </div>


                      <!-- Dynamically render services with v-for -->
                      <article v-for="(service, index) in services" :key="index" class="un_service">
                        <h2 class="services_title">
                            <img :class="service.iconClass" class="icon_service" :src="service.icon" :alt="service.alt" />
                            {{ service.title }}
                        </h2>
                        <p class="services_text">{{ service.description }}</p>
                    </article>



                </div>
            </section>
        </div>
        <div class="resize-handle"></div>
    </section>
    <!-- Services -->
</template>

<script>


import Navigation from '@/components/Navigation.vue';
import FakeMenu from '@/components/Fakemenu.vue';

import iconSource from '@/assets/images/icon-services.png';

import icondev from '@/assets/images/services/icon-dev.png';
import iconcss from '@/assets/images/services/icon-css.png';
import icondashboard from '@/assets/images/services/icon-dashboard.png';
import iconuiux from '@/assets/images/services/icon-uiux.png';
import iconsupport from '@/assets/images/services/icon-support.png';
import iconvisuel from '@/assets/images/services/icon-visuel.png';
import iconreutilisable from '@/assets/images/services/icon-reutilisable.png';
import iconapi from '@/assets/images/services/icon-api.png';


export default {
    name: 'Media',
    emits: ['update-class', 'close', 'resize', 'reduct'],
    components: {
        Navigation,
        FakeMenu,
    },
    props: {
        context: {
            type: String,
            default: 'messervices'
        },
        title: {
            type: String,
            default: 'messervices'
        },
        customClass: {
            type: String,
            default: 'kp_element--incons-zone'
        }
    },
    data() {
        return {
            iconSource,
            windowStateClass: '',
            services: [
                { icon: icondev, iconClass: 'icon-dev', title: 'Développement de sites web', description: 'Création de sites web modernes, dynamiques et réactives, en intégrant des fonctionnalités sur mesure pour répondre à vos besoins.', alt: 'icondev' },
                { icon: iconcss, iconClass: 'icon-css', title: 'Intégration CSS et animations dynamiques', description: 'Intégration de designs professionnels et animations fluides avec CSS pour améliorer l\'expérience utilisateur.', alt: 'iconcss' },
                { icon: iconvisuel, iconClass: 'icon-visuel', title: 'Création d\'une identité visuelle', description: 'Conception de logos, chartes graphiques et supports de communication pour renforcer votre image de marque.', alt: 'iconvisuel' },
                { icon: iconuiux, iconClass: 'icon-uiux', title: 'Personnalisation et optimisation d\'UI/UX', description: 'Analyse et amélioration des interfaces utilisateur pour garantir une navigation intuitive.', alt: 'iconuiux' },
                { icon: iconsupport, iconClass: 'icon-support', title: 'Support technique et maintenance', description: 'Assistance pour résoudre les problèmes techniques et garantir leur performance.', alt: 'iconsupport' },
                { icon: iconreutilisable, iconClass: 'icon-reutilisable', title: 'Développement de composants réutilisables', description: 'Création de composants modulaires, réutilisables et bien documentés.', alt: 'iconreutilisable' },
                { icon: iconapi, iconClass: 'icon-api', title: 'Connexion avec des API et services tiers', description: 'Connexion de vos applications et sites web à des APIs externes.', alt: 'iconapi' },
                { icon: icondashboard, iconClass: 'icon-dashboard', title: 'Création de dashboards interactifs', description: 'Conception et développement de tableaux de bord interactifs pour visualiser vos données.', alt: 'icondashboard' },
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
.kp_window--show {
    display: block !important;
    overflow-y: hidden;
}

.kp_content--block--content {
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    position: relative;
}

.kp_content--block--content {
    max-width: calc(100% - 0px) !important;
    overflow-y: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    max-height: 100vh;
}

.kp_content--block {
    position: absolute;
    font-size: 14px;
    letter-spacing: 0px;
    color: black;
    max-width: 800px;
    width: 700px;
    height: 750px;
    background: #FFFFFF;
    position: absolute;
    max-height: 100vh;
    max-width: 100vw;
}


.services_container {
    padding: 20px 20px;
    background-color: #e5e5e5;
    width: calc(100% - 40px);
}

.services_content {
    padding: 10px 10px 100px;
    width: calc(100% - 20px);
    background-color: #FFFFFF;
}

.services_text {
    color: #000000;
    line-height: 1.5;
}

.services_title {
    font-size: 22px;
    font-weight: 700;
    color: #000000;
    display: flex;
    align-items: center;
    gap: 10px;
}

.services_title--principal {
    font-size: 30px;
    font-weight: 700;
    color: #000000;
}

.un_service {
    border-top: solid 1px #000000;
    padding: 20px 0;
}

.services_text {
    padding: 10px 0;
}





.un_service {
    border-top: solid 1px #000000;
    padding: 20px 0;
    opacity: 0;
    animation: fadeIn 0.5s forwards;
    overflow: hidden;
    max-height: 0px;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        max-height: 0px;
    }
    100% {
        opacity: 1;
        max-height: 500px;
    }
}

/* Animation avec un délai pour chaque élément */
.un_service:nth-child(2) {
    animation-delay: 0.3s;
}
.un_service:nth-child(3) {
    animation-delay: 0.6s;
}
.un_service:nth-child(4) {
    animation-delay: 0.9s;
}
.un_service:nth-child(5) {
    animation-delay: 1.2s;
}
.un_service:nth-child(6) {
    animation-delay: 1.5s;
}
.un_service:nth-child(7) {
    animation-delay: 1.8s;
}
.un_service:nth-child(8) {
    animation-delay: 2.1s;
}
.un_service:nth-child(9) {
    animation-delay: 2.4s;
}
</style>
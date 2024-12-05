<template>
    <!-- Mes exemples -->
    <section
        :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]"
        :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                <div class="kp_element_title--icn">
                    <img class="kp_icon_zone--img" :src="iconSource" alt="text">
                </div>
                <span>Kévin Prévost - Mes exemples</span>
                </p>
            </div>
            <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title"
                :context="context" :customClass="customClass" />
        </div>
        <FakeMenu></FakeMenu>



        <div class="kp_content--block--content kp_element--enable  kp_content--exemples">
            <section class="exemples_container">
                <div class="exemples_content">
                    <div class="titre_exemples">
                        <h2 class="exemples_titre  exemples_title--principal">Mes exemples</h2>
                        <p class="exemples_text">
                            Voici des exemples d'éléments que j'ai pu réaliser.
                            <br>Cet espace "bac à sable" me permet de tester des idées, des concepts, des animations,
                            etc.
                        </p>
                    </div>

                    <div>


                        <!-- Boucle pour afficher tous les exemples -->
                        <div v-for="(exemple, index) in exemples" :key="index" class="exemple_item">
                            <!-- CTA pour afficher/masquer -->
                            <button class="kp_btn-cv kp_btn-cv--masquer btn-windows-xp btn-windows-xp-ok"
                                @click="toggleExemple(index)" >
                                <span class="btn-windows-xp--texte">
                                {{ exemple.isVisible ? `Masquer ${exemple.name}` : `Afficher ${exemple.name}` }}
                                </span>
                            </button>

                            <!-- Vue correspondante -->
                            <div v-if="exemple.isVisible">
                                <component :is="exemple.component" />
                            </div>
                        </div>

                    </div>


                </div>
            </section>
        </div>
        <div class="resize-handle"></div>
    </section>
    <!-- Mes exemples -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import FakeMenu from '@/components/Fakemenu.vue';

import Exemple1 from '@/components/exemples/Exemple1.vue';
import Exemple2 from '@/components/exemples/Exemple2.vue';

import iconSource from '@/assets/images/icon-exemples.png';


export default {
    name: 'Exemples',
    emits: ['update-class', 'close', 'resize', 'reduct'],
    components: {
        Navigation,
        FakeMenu,

        Exemple1,
        Exemple2,
    },
    props: {
        context: {
            type: String,
            default: 'mesexemples'
        },
        title: {
            type: String,
            default: 'mesexemples'
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
            exemples: [
                { name: 'Toggles', component: 'Exemple1', isVisible: false },
                { name: 'Effets hover', component: 'Exemple2', isVisible: false },
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

        toggleExemple(index) {
            this.exemples[index].isVisible = !this.exemples[index].isVisible;
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
    max-width: 900px;
    width: 900px;
    height: 1000px;
    background: #FFFFFF;
    position: absolute;
    max-height: 100vh;
    max-width: 100vw;
}
.btn-windows-xp{
    margin:0;
}
.exemples_content{
    margin-bottom: 150px;
}

.exemples_title--principal {
    color: #000000;
    font-size: 30px;
    font-weight: 700;
    padding: 20px 20px 0;
}

.exemples_title--un {
    color: #000000;
    font-size: 22px;
    font-weight: 700;
}

.exemples_text {
    color: #000000;
    font-size: 16px;
    font-weight: 400;
    margin-top: 10px;
    padding: 10px 20px 10px;
    line-height: 1.5;
}

.titre_exemples {
    border-bottom: solid 1px #000000;
    padding-bottom: 20px;
}

.exemple_item{
    background-color: #eeecdf;
    border: solid 2px #000000;
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
}

@media screen and (max-width: 960px) {
    .exemple_item{
        background-color: #eeecdf;
        padding: 10px;
        margin: 20px 1px;
        border:none;
        border-radius: 0;
        border-top: solid 2px #000000;
        border-bottom: solid 2px #000000;
    }
}
</style>
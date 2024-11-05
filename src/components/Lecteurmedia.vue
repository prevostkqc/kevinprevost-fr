<template>
    <!-- Media -->
    <section :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - Lecteur Média</span>
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

        <div class="kp_content--block--content kp_element--enable kp_content--media">
            <div class="media-player-animation">
                <canvas ref="visualizerCanvas" class="visualizer"></canvas>
            </div>
        </div>
        

        <div class="resize-handle"></div>
    </section>
    <!-- Media -->
</template>

<script>

import Navigation   from  '@/components/Navigation.vue';
import textIcon     from  '@/assets/images/icon-media.png'; 

export default {
  name: 'Media',
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
    },
    windowStateClass: {
      type: String,
      default: ''
    },
  },
    data() {
        return {
            textIcon,
            particles: [],
            maxParticles: 100, // Limite du nombre de particules pour éviter la surcharge
            canvasContext: null,
            canvasWidth: 0,
            canvasHeight: 0,
            localWindowStateClass: this.windowStateClass,
        };
    },
    mounted() {
        this.setupCanvas();
        this.startAnimation();
    },
    methods: {
        handleClose() {
            this.$emit('update-class', 'kp_item_hide');
            this.$emit('close');
        },
        handleResize() {
            if (this.localWindowStateClass === 'kp_item_resize') {
                this.localWindowStateClass = ''; 
            } else {
                this.localWindowStateClass = 'kp_item_resize';
            }
            this.$emit('update-class', this.localWindowStateClass); // Émettez la valeur locale
        },
        handleReduct() {
            this.$emit('update-class', 'kp_item_reduct');
        },

        setupCanvas() {
            const canvas = this.$refs.visualizerCanvas;
            this.canvasContext = canvas.getContext("2d");
            canvas.width = this.$refs.visualizerCanvas.parentElement.offsetWidth;
            canvas.height = this.$refs.visualizerCanvas.parentElement.offsetHeight;
            this.canvasWidth = canvas.width;
            this.canvasHeight = canvas.height;
        },
        startAnimation() {
            this.animate();
        },
        animate() {
        const ctx = this.canvasContext;
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (this.particles.length < this.maxParticles) {
            this.generateParticles();
        }
        this.particles = this.particles.filter(particle => {
            particle.update();
            particle.draw(ctx);
            return particle.alpha > 0;
        });

        requestAnimationFrame(this.animate.bind(this));
        },
        generateParticles() {
            const numberOfParticles = Math.min(10 + Math.floor(Math.random() * 30), this.maxParticles - this.particles.length); 
            const baseX = Math.random() * this.canvasWidth;
            const baseY = Math.random() * this.canvasHeight;

            for (let i = 0; i < numberOfParticles; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 4 + 1.5;
                const size = Math.random() * 25 + 50;
                this.particles.push(new Particle(baseX, baseY, angle, speed, size));
            }
        },
    },
    beforeDestroy() {
        cancelAnimationFrame(this.animationId);
    },
};
class Particle {
    constructor(x, y, angle, speed, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = angle;
        this.speed = speed;
        this.alpha = 1;

        this.color = {
            r: Math.floor(Math.random() * 156),
            g: Math.floor(Math.random() * 156),
            b: Math.floor(Math.random() * 156)
        };
    }
    update() {
        // Met à jour la position de la particule
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= 0.02;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
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
    max-width: calc(100% - 20px) !important;
    overflow-y: hidden;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    max-height: 100vh;
}
.kp_content--block{
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 800px;
  width: 700px;
  height: 750px;
  background: #cdcabb;
  position: absolute;
  max-height: 100vh;
  max-width: 100vw;
}



.media-player-animation {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #000; /* Fond noir pour un meilleur contraste */
}
.visualizer {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
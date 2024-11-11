<template>
    <!-- Media -->
    <section
        :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]"
        :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                <div class="kp_element_title--icn">
                    <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                </div>
                <span>Kévin Prévost - Lecteur Média</span>
                </p>
            </div>
            <Navigation @close="handleClose" @resize="handleResize" @reduct="handleReduct" :viewName="title"
                :context="context" :customClass="customClass" />
        </div>
        <section class="fake-menu-top-folder">
            <div class="fake-menu--top">
                <ul class="liste-fake-menu">
                    <li class="liste-fake-menu--li  liste-fake-menu--li-nouveau"><span
                            class="under-windows">F</span>ichier
                        <ul class="fake-sous-menu">
                            <li class="fake-sous-menu--li">
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
                    <li class="liste-fake-menu--li">Affic<span class="under-windows">h</span>age</li>
                    <li class="liste-fake-menu--li"><span class="under-windows">L</span>ecture</li>
                    <li class="liste-fake-menu--li"><span class="under-windows">O</span>utils</li>
                    <li class="liste-fake-menu--li"><span class="under-windows">?</span></li>
                </ul>
            </div>
        </section>

        <div class="music-player">
            <div class="back-lecteur"></div>
            <img class="icon-top" :src="icontop" alt="icon-top" />
            <div class="lectureencours">
                <img class="icon-lecture" :src="inconlecture" alt="icon-lecture" />
                <p class="p-texte  p-texte-lectureencours">Lecture en cours</p>
            </div>
            <img class="logo-kek" :src="logokek" alt="logo-kek" />
            <div class="music-container">
                <div class="back-gradient"></div>
                <div class="contenu">

                    <div class="content-left">
                        <ul class="ul-left">
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Lecture<br>en cours</p>
                            </li>
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Guide<br>multimédia</p>
                            </li>
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Copier à<br>partir d'un CD</p>
                            </li>
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Bibliothèque<br>multimédia</p>
                            </li>
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Tuner<br>radio</p>
                            </li>
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Copier<br>sur...</p>
                            </li>
                            <li class="li-left">
                                <p class="p-texte  p-texte-li">Service<br>Premium</p>
                            </li>
                            <li class="li-left  li-left-none">
                                <p class="p-texte  p-texte-li">Sélecteur<br>d'apparence</p>
                            </li>
                        </ul>
                    </div>
                    <div class="content-right">
                        <div class="part-top">
                            <section class="part-left">
                            </section>
                            <section class="part-midddle">
                                <div class="visualizer">
                                    <div class="visualizer-top">
                                        <p class="trackinfo--title">{{ currentTrack.title }}</p>
                                        <p class="trackinfo--artist">{{ currentTrack.artist }}</p>
                                    </div>

                                    <canvas ref="canvas" width="300" height="300" class="canva-container"></canvas>
                                </div>

                                <div class="track-info">
                                    <p> {{ formatTime(currentTime) }}<span class="time-restant"> / {{
                                        formatTime(duration - currentTime) }}</span></p>
                                </div>
                            </section>
                            <section class="part-right">
                                <div class="rechercheinfos">
                                    Rechercher des informations
                                </div>
                                <div>
                                    <img :src="songimg" alt="Song Image" />
                                </div>
                                <div class="playlist">
                                    <ul>
                                        <li v-for="(track, index) in playlist" :key="index" @click="selectTrack(index)"
                                            :class="{ playing: currentTrackIndex === index }">
                                            <p class="playlist-line">
                                            <div class="part-palylist  part-palylist--titre">
                                                {{ track.title }}<span class="artistplaylist"> - {{ track.artist
                                                    }}</span>
                                            </div>
                                            <div class="part-palylist  part-palylist--temps">
                                                <span v-if="track.duration">{{ formatTime(track.duration) }}</span>
                                                <span v-else>Chargement...</span>
                                            </div>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </section>
                        </div>
                        <div class="part-bottom">

                            <div class="progress-block">
                                <div class="progress-bar-container" @click="seekTo($event)">
                                    <div class="progress-bar-background"></div>
                                    <input type="range" min="0" max="100" step="0.1" v-model="progress" @input="seek"
                                        class="hidden-range" ref="hiddenRange" />
                                    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
                                    <img class="progress-cursor" :src="iconcursor" :style="{ left: progress + '%' }"
                                        alt="Curseur">
                                </div>
                            </div>
                            <div class="controls">
                                <div class="button" @click="playPause">
                                    <img v-if="!isPlaying" :src="iconplay" alt="Play" class="playpause" />
                                    <img v-else :src="iconpause" alt="Pause" class="playpause" />
                                </div>
                                <div class="boutonnextprev">
                                    <div class="button" @click="prevTrack">
                                        <img :src="iconprev" alt="Précédent" />
                                    </div>
                                    <div class="button" @click="nextTrack">
                                        <img :src="iconnext" alt="Suivant" />
                                    </div>
                                </div>

                                <input :class="{ 'hiddenrange': true, 'volumemuted': isMuted }" type="range" min="0"
                                    max="1" step="0.01" v-model="volume" @input="updateVolume" />
                                <button @click="toggleMute" class="buttonmute">
                                    <img v-if="!isMuted" :src="iconmute" alt="Mute" />
                                    <img v-else :src="iconvolume" alt="Unmute" />
                                </button>
                                <div class="zonevolume">
                                    <div class="volume-block">
                                        <div class="volume-bar-container" @click="setVolume($event)">
                                            <div class="back-volume"></div>
                                            <div class="volume-bar-background"></div>
                                            <div class="volume-content-bar">
                                                <div class="volume-bar" :style="{ width: (volume * 100) + '%' }"></div>
                                            </div>
                                            <input type="range" min="0" max="1" step="0.01" v-model="volume"
                                                @input="updateVolume" class="hidden-volume-range"
                                                ref="hiddenVolumeRange" />

                                            <img class="volume-cursor" :src="iconcursor"
                                                :style="{ left: (volume * 100) + '%' }" alt="Curseur Volume">
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <audio ref="audio" :src="currentTrack.path" @timeupdate="updateProgress" @ended="handleTrackEnd"></audio>
        </div>



        <div class="resize-handle"></div>
    </section>
    <!-- Media -->
</template>

<script>

import Navigation from '@/components/Navigation.vue';
import textIcon from '@/assets/images/icon-media.png';

import track1 from '@/assets/audio/99redballons-nena.mp3';
import track2 from '@/assets/audio/foulesentimentale-alainsouchon.mp3';

import iconmute from '@/assets/images/windowsmedia/valumeon.png';
import iconvolume from '@/assets/images/windowsmedia/volumeoff.png';
import iconplay from '@/assets/images/windowsmedia/play.png';
import iconpause from '@/assets/images/windowsmedia/pause.png';
import iconprev from '@/assets/images/windowsmedia/precedente.png';
import iconnext from '@/assets/images/windowsmedia/suivante.png';
import iconcursor from '@/assets/images/windowsmedia/volume-cursor.png';
import jaugefull from '@/assets/images/windowsmedia/jaugefull.png';
import jaugeempty from '@/assets/images/windowsmedia/jaugeempty.png';
import songimg from '@/assets/images/windowsmedia/song-img.png';
import icontop from '@/assets/images/windowsmedia/icon-top.png';
import inconlecture from '@/assets/images/windowsmedia/icon-lecture.png';
import logokek from '@/assets/images/logo.png';

export default {
    name: 'Media',
    emits: ['update-class', 'close', 'resize', 'reduct'],
    name: "RandomShapes",
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
            iconmute,
            iconvolume,
            iconplay,
            iconpause,
            iconprev,
            iconnext,
            iconcursor,
            jaugefull,
            jaugeempty,
            songimg,
            icontop,
            inconlecture,
            logokek,

            shapes: [],


            isPlaying: false,
            progress: 0,
            currentTime: 0,
            duration: 0,
            volume: 1,
            isMuted: false,
            currentTrackIndex: 0,
            playlist: [
                { title: '99 Red Balloons', artist: 'Nena', path: track1 },
                { title: 'Foule Sentimentale', artist: 'Alain Souchon', path: track2 },
            ],
        };
    },
    computed: {
        currentTrack() {
            return this.playlist[this.currentTrackIndex];
        },
    },
    mounted() {
        const audio = this.$refs.audio;
        audio.volume = this.volume;

        this.playlist.forEach((track, index) => {
            const tempAudio = new Audio(track.path);
            tempAudio.addEventListener("loadedmetadata", () => {
                this.playlist[index].duration = tempAudio.duration || 0;
            });
        });
        window.addEventListener("resize", this.adjustCanvasSize);

        audio.addEventListener("loadedmetadata", () => {
            this.duration = audio.duration;
        });
    },
    watch: {
        currentTrackIndex(newIndex) {
            const newTrack = this.playlist[newIndex];
            if (!newTrack.duration) {
                const tempAudio = new Audio(newTrack.path);
                tempAudio.addEventListener('loadedmetadata', () => {
                    this.playlist[newIndex].duration = tempAudio.duration || 0;
                });
            }
        }
    },
    methods: {
        handleClose() {
            const audio = this.$refs.audio;
            audio.pause();
            audio.currentTime = 0;
            this.isPlaying = false;
            this.$emit('update-class', 'kp_item_hide');
            this.$emit('close');
        },
        handleResize() {
            if (this.localWindowStateClass === 'kp_item_resize') {
                this.localWindowStateClass = '';
            } else {
                this.localWindowStateClass = 'kp_item_resize';
            }
            this.$emit('update-class', this.localWindowStateClass);
        },
        handleReduct() {
            this.$emit('update-class', 'kp_item_reduct');
        },
        selectTrack(index) {
            this.currentTrackIndex = index;
            this.resetAudio(true);
        },
        playPause() {
            const audio = this.$refs.audio;
            if (audio.paused) {
                audio.play();
                this.isPlaying = true;
                this.startAnimation();
            } else {
                audio.pause();
                this.isPlaying = false;
                this.stopAnimation();
            }
        },
        updateProgress() {
            const audio = this.$refs.audio;
            this.currentTime = audio.currentTime;
            this.duration = audio.duration;
            this.progress = (audio.currentTime / audio.duration) * 100;
        },
        adjustCanvasSize() {
            const canvas = this.$refs.canvas;
            const parent = canvas.parentElement;

            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        },

        startAnimation() {
            if (this.animationInterval) return;

            this.animationInterval = setInterval(() => {
                if (!this.isPlaying) {
                    this.stopAnimation();
                    return;
                }

                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext("2d");

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                this.shapes = this.shapes.filter((shape) => {
                    shape.size += shape.growthRate;
                    shape.opacity -= shape.fadeRate;

                    if (shape.opacity > 0) {
                        ctx.fillStyle = shape.color;
                        ctx.globalAlpha = shape.opacity;
                        ctx.filter = `blur(${shape.blurLevel}px)`;

                        ctx.beginPath();
                        ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                    }

                    return shape.opacity > 0;
                });

                this.generateShapes()
            }, 500);
        },
        stopAnimation() {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
            this.clearShapes();
        },
        clearShapes() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.shapes = [];
        },

        seekTo(event) {
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const percentage = offsetX / rect.width;
            this.progress = percentage * 100;
            this.$refs.audio.currentTime = percentage * this.$refs.audio.duration;
        },
        seek() {
            const audio = this.$refs.audio;
            audio.currentTime = (this.progress / 100) * audio.duration;
        },
        setVolume(event) {
            const rect = event.currentTarget.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            let percentage = offsetX / rect.width;
            percentage = Math.max(0, Math.min(percentage, 1));
            this.volume = percentage;
            this.$refs.audio.volume = this.volume;
            this.isMuted = this.volume === 0;
        },
        updateVolume() {
            this.volume = Math.max(0, Math.min(this.volume, 1));
            this.$refs.audio.volume = this.volume;
            this.isMuted = this.volume === 0;
        },
        toggleMute() {
            const audio = this.$refs.audio;
            audio.muted = !audio.muted;
            this.isMuted = audio.muted;
        },
        formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const sec = Math.floor(seconds % 60);
            return `${minutes}:${sec < 10 ? '0' + sec : sec}`;
        },

        handleTrackEnd() {
            if (this.currentTrackIndex < this.playlist.length - 1) {
                this.nextTrack();
            } else {
                this.isPlaying = false;
                this.resetAudio(false);
            }
        },

        nextTrack() {
            if (this.currentTrackIndex < this.playlist.length - 1) {
                this.currentTrackIndex++;
                this.resetAudio();
            }
        },

        prevTrack() {
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
                this.resetAudio();
            }
        },

        resetAudio(playImmediately = false) {
            const audio = this.$refs.audio;
            audio.currentTime = 0;
            this.currentTime = 0;
            this.progress = 0;
            audio.load();

            audio.oncanplay = () => {
                if (playImmediately || this.isPlaying) {
                    audio.play();
                    this.isPlaying = true;
                }
                audio.oncanplay = null;
            };
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        getRandomColor() {
            const red = Math.floor(Math.random() * 50);
            const green = Math.floor(Math.random() * 100);
            const blue = Math.floor(Math.random() * 156) + 100;

            return `rgb(${red}, ${green}, ${blue})`;
        },
        generateShapes() {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 5; i++) {
                this.shapes.push({
                    x: this.getRandomInt(0, canvas.width),
                    y: this.getRandomInt(0, canvas.height),
                    size: this.getRandomInt(20, 50),
                    color: this.getRandomColor(),
                    opacity: 1,
                    growthRate: this.getRandomInt(1, 5),
                    fadeRate: 0.01,
                    blurLevel: this.getRandomInt(1, 5),
                    blurIncreaseRate: this.getRandomInt(1, 3),
                });
            }

            this.animateShapes(ctx);
        },
        animateShapes(ctx) {
            const canvas = this.$refs.canvas;

            const animate = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                this.shapes = this.shapes.filter((shape) => {
                    shape.size += shape.growthRate;
                    shape.opacity -= shape.fadeRate;

                    if (shape.opacity > 0) {
                        ctx.fillStyle = shape.color;
                        ctx.filter = `blur(${shape.blurLevel}px)`;
                        ctx.globalAlpha = shape.opacity;

                        ctx.beginPath();
                        ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.closePath();
                    }

                    return shape.opacity > 0;
                });
                if (this.shapes.length > 0) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
        },



    },
    beforeDestroy() {
        window.removeEventListener("resize", this.adjustCanvasSize);
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
    max-width: calc(100% - 20px) !important;
    overflow-y: hidden;
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
    height: 574px;
    background: #b8b8b8;

    position: absolute;
    max-height: 100vh;
    max-width: 100vw;
}








.controls img {
    width: 24px;
    height: 24px;
}


.music-player {
    background-color: #bcc2e2;

    background: rgb(41, 53, 117);
    background: -moz-linear-gradient(180deg, rgba(41, 53, 117, 1) 0%, rgba(116, 128, 191, 1) 3%, rgba(196, 203, 223, 1) 30%, rgba(192, 200, 223, 1) 70%, rgba(116, 128, 191, 1) 97%, rgba(41, 53, 117, 1) 100%);
    background: -webkit-linear-gradient(180deg, rgba(41, 53, 117, 1) 0%, rgba(116, 128, 191, 1) 3%, rgba(196, 203, 223, 1) 30%, rgba(192, 200, 223, 1) 70%, rgba(116, 128, 191, 1) 97%, rgba(41, 53, 117, 1) 100%);
    background: linear-gradient(180deg, rgb(81 103 145) 0%, rgb(53 64 123) 3%, rgb(37 47 75) 30%, rgb(36 47 78) 70%, rgb(60 73 142) 97%, rgba(41, 53, 117, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#293575", endColorstr="#293575", GradientType=1);
    color: #000000;
    text-align: center;
    display: flex;
    border-top: solid 1px #97a3e5;
}

.content-left {
    width: 140px;
    padding-top: 55px;
    background: rgb(255, 255, 255);
    background: -moz-linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(219, 227, 244, 1) 50%, rgba(193, 210, 234, 1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(219, 227, 244, 1) 50%, rgba(193, 210, 234, 1) 100%);
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(219, 227, 244, 1) 50%, rgba(193, 210, 234, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff", endColorstr="#c1d2ea", GradientType=1);
    margin-right: 10px;
}

.content-right {
    width: calc(100% - 60px);
    margin-top: 35px;
    margin-right: 10px;
}

.track-info {
    font-size: 18px;
    margin-bottom: 10px;
}

.controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}

.button {
    border: none;
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    border-radius: 100%;
}

.button:hover {
    filter: brightness(0.95);
}

.button.onmute {}

input[type="range"] {
    width: 100px;
}

.part-right {
    background: #394472;
    width: calc(40% - 10px);
    border-left: solid 3px #71717b;
}

/* ----------------- */
/* Playlist */
.playlist {
    margin-top: 20px;
    color: white;
    border-top: solid 3px #71717b;
    min-height: 190px;
    min-height: 235px;
}

.playlist ul {
    list-style: none;
    padding: 0;
}

.playlist li {
    padding: 3px;
    cursor: pointer;
}

.playlist li:hover {
    background-color: #282f4a;
}

.playing {
    background-color: #000000 !important;
}

.playing .part-palylist,
.playing span {
    color: #89e116;
}

.part-palylist--titre {
    width: fit-content;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    max-width: 400px;
}

.playlist-line {
    display: flex;
    justify-content: space-between;
}

.artistplaylist {
    font-size: 12px;
    color: #ccc;
}

/* ----------------- */
/* Visualizer */
.visualizer {
    height: fit-content;
    width: 100%;
    text-align: left;
}

.part-top {
    display: flex;
    justify-content: space-between;
    background-color: #070412;
}

.part-midddle {
    width: calc(60% - 10px);
    display: flex;
    justify-content: flex-start;
    padding: 5px;
    flex-wrap: wrap;
    align-content: space-between;
}

/* ----------------- */
/* progress bar */
.progress-block {
    width: 100%;
    background: rgb(149, 200, 148);
    background: linear-gradient(90deg, rgba(149, 200, 148, 1) 0%, rgba(149, 200, 148, 1) 48%, rgba(198, 206, 216, 1) 51%, rgba(201, 206, 220, 1) 100%);
    border-radius: 7px;
    outline: solid 2px #bfd2ea;
}

.progress-bar-container {
    height: 10px;
    position: relative;
    background: rgb(225, 227, 234);
    background: linear-gradient(0deg, rgba(225, 227, 234, 1) 0%, rgba(142, 154, 186, 1) 100%);
    cursor: pointer;
    width: calc(100% - 76px) !important;
    margin: 10px 0;
    left: 38px;
}

.progress-bar-container:before {
    content: '';
    position: absolute;
    top: 0;
    left: -37px;
    width: 30px;
    height: 11px;
    background-image: url(/src/assets/images/windowsmedia/end-img.png);
    background-size: 100% 100%;
    z-index: 1;
    transform: scaleX(-1);
}

.progress-bar-container:after {
    content: '';
    position: absolute;
    top: 0;
    right: -38px;
    width: 30px;
    height: 11px;
    background-image: url('@/assets/images/windowsmedia/end-img.png');
    background-size: 100% 100%;
    z-index: 1;
}

.hidden-range {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    opacity: 0;
    z-index: 3;
    cursor: pointer;
}

.progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: red;
    transition: width 0.1s linear;
    z-index: 1;
    background: rgb(148, 199, 147);
    background: linear-gradient(0deg, rgba(148, 199, 147, 1) 0%, rgba(149, 200, 148, 1) 80%, rgba(168, 218, 166, 1) 89%, rgba(195, 245, 193, 1) 100%);
}

.progress-cursor {
    width: 23px;
    height: 11px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.1s linear;
    z-index: 2;
}

.time-restant {
    display: none;
}

/* ----------------- */
/* volume bar */
.progress-bar-container,
.volume-bar-container {
    width: 100%;
    height: 10px;
    position: relative;
    cursor: pointer;
    margin: 5px 0 10px;
}

.hiddenrange {
    opacity: 0;
    width: 0 !important;
}

.hidden-range,
.hidden-volume-range {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100%;
    opacity: 0;
    z-index: 3;
    cursor: pointer;
}


.progress-cursor,
.volume-cursor {
    width: 23px;
    height: 13px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.1s linear;
    z-index: 2;
}

.playpause {
    width: 32px !important;
    height: 32px !important;
}

.boutonnextprev {
    display: flex;
    gap: 4px;
}

.zonevolume {
    width: 100px;
}

.volumemuted~.volume-block {
    pointer-events: none;
    filter: grayscale(1);
}

.volumemuted~button img {
    filter: hue-rotate(263deg) brightness(0.95);
}

.volume-cursor {
    width: 11px !important;
    height: 17px !important;
}

.back-volume {
    clip-path: polygon(0 100%, 0 83%, 100% 0, 99% 37%, 98% 85%, 96% 91%, 92% 96%, 85% 100%, 41% 100%);
    position: absolute;
    background: rgb(159, 172, 205);
    background: -moz-linear-gradient(180deg, rgba(159, 172, 205, 1) 0%, rgba(196, 203, 223, 1) 49%, rgba(245, 246, 249, 1) 71%, rgba(228, 228, 228, 1) 100%);
    background: -webkit-linear-gradient(180deg, rgba(159, 172, 205, 1) 0%, rgba(196, 203, 223, 1) 49%, rgba(245, 246, 249, 1) 71%, rgba(228, 228, 228, 1) 100%);
    background: linear-gradient(180deg, rgba(159, 172, 205, 1) 0%, rgba(196, 203, 223, 1) 49%, rgba(245, 246, 249, 1) 71%, rgba(228, 228, 228, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#9faccd", endColorstr="#e4e4e4", GradientType=1);
    height: 10px;
    width: 100%;
}

.progress-bar-container:hover .progress-cursor {
    filter: hue-rotate(285deg);
}

.volume-content-bar {
    clip-path: polygon(0 100%, 0 83%, 100% 0, 99% 37%, 98% 85%, 96% 91%, 92% 96%, 85% 100%, 41% 100%);
    width: 100%;
    height: 10px;
}

.progress-bar,
.volume-bar {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    transition: width 0.1s linear;
    z-index: 1;
    background: rgb(120, 167, 135);
    background: -moz-linear-gradient(180deg, rgba(120, 167, 135, 1) 0%, rgba(120, 167, 135, 1) 72%, rgba(154, 210, 149, 1) 97%, rgba(227, 240, 233, 1) 100%);
    background: -webkit-linear-gradient(180deg, rgba(120, 167, 135, 1) 0%, rgba(120, 167, 135, 1) 72%, rgba(154, 210, 149, 1) 97%, rgba(227, 240, 233, 1) 100%);
    background: linear-gradient(180deg, rgba(120, 167, 135, 1) 0%, rgba(120, 167, 135, 1) 72%, rgba(154, 210, 149, 1) 97%, rgba(227, 240, 233, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#78a787", endColorstr="#e3f0e9", GradientType=1);
}

.back-gradient {
    position: absolute;
    width: 100%;
    height: 50px;
    z-index: 0;
    bottom: 0;
    background: rgb(251, 250, 244);
    background: -moz-linear-gradient(180deg, rgba(251, 250, 244, 1) 20%, rgba(196, 203, 223, 1) 40%, rgba(192, 200, 223, 1) 60%, rgba(228, 228, 228, 1) 80%);
    background: -webkit-linear-gradient(180deg, rgba(251, 250, 244, 1) 20%, rgba(196, 203, 223, 1) 40%, rgba(192, 200, 223, 1) 60%, rgba(228, 228, 228, 1) 80%);
    background: linear-gradient(180deg, rgba(251, 250, 244, 1) 20%, rgba(196, 203, 223, 1) 40%, rgba(192, 200, 223, 1) 60%, rgba(228, 228, 228, 1) 80%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fbfaf4", endColorstr="#e4e4e4", GradientType=1);
}

.music-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #dbe5f7;



    clip-path: polygon(0 calc(7% + 27px), 0% 80%, 5px calc(82% - 6px), 48px calc(84% + -3px), 86px calc(88% + -11px), 103px calc(80% - -40px), 122px calc(70% + 106px), 122px calc(100% - 3px), 125px 100%, 61% 100%, 64% 96%, 99% 96%, 100% 95%, 100% calc(0% + 2px), calc(100% - 7px) -1px, calc(100% - 1px) 0px, calc(65% + 4px) 0%, 63% 15px, 62% 25px, calc(16% + 11px) 25px, calc(13% + -9px) 45px, calc(1% + 61px) 47px, calc(2% - 3px) 48px, calc(0% + 5px) 48px, calc(0% + 1px) 51px);
}

.contenu {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
}

.buttonmute {
    border: none;
    background: none;
    cursor: pointer;
}

.li-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 6px;
    position: relative;
    cursor: pointer;
}

.li-left:hover {
    background: rgb(255, 255, 255);
    background: linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(195, 213, 237, 1) 45%);
}

.li-left:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 10px;
    width: calc(100% - 50px);
    height: 1px;
    background: rgb(255, 255, 255);
    background: -moz-linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(187, 199, 228, 1) 69%, rgba(187, 199, 228, 1) 100%);
    background: -webkit-linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(187, 199, 228, 1) 69%, rgba(187, 199, 228, 1) 100%);
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(187, 199, 228, 1) 69%, rgba(187, 199, 228, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffffff", endColorstr="#bbc7e4", GradientType=1);
}

.li-left-none:after {
    display: none;
}

.p-texte-li {
    display: flex;
    justify-content: flex-start;
    width: fit-content;
    text-align: left;
}

.canva-container {
    width: 100%;
    height: 100%;
    display: block;
    aspect-ratio: 1 / 1;
}
.back-lecteur{
    position: absolute;
    width: 100%;
    height: calc(100% - 103px);
    background: rgb(164, 195, 255);
    background: linear-gradient(180deg, rgba(164, 195, 255, 1) 0%, rgba(93, 110, 178, 1) 5%, rgb(109 130 196) 100%);
    top: 80px;
    border-radius: 10px;
    border: solid 1px #89a2de;
    outline: solid 1px #7f90b5;
}
.icon-top{
    position: absolute;
    top:85px;
    left: 5px;
}
.lectureencours{
    position: absolute;
    top: 74px;
    right: 78px;
    z-index: 10;
    display: flex;
    border: solid 1px #a9b4d7;
    padding: 5px 15px;
    border-radius: 3px;
    gap: 10px;
    background: rgb(253,254,254);
    background: linear-gradient(180deg, rgba(253,254,254,1) 0%, rgba(191,210,234,1) 100%);
    cursor: pointer;
}
.lectureencours:hover{
    background: rgb(253,254,254);
    background: linear-gradient(0deg, rgba(253,254,254,1) 0%, rgba(191,210,234,1) 100%);
}
.p-texte-lectureencours{
    color: #000000;
}
.resize-handle{
    pointer-events: none;
}
.rechercheinfos{
    display: flex;
    padding: 10px 5px;
    background: #6071bf;
    margin-bottom: 10px;
    cursor: pointer;
}
.rechercheinfos:hover{
    background: #282f4a;
}
.logo-kek{
    position: absolute;
    bottom: 30px;
    left: 24px;
    width: 5%;
    border: solid 2px white;
    border-radius: 100px;
    padding: 2px;
}



@media screen and (max-width: 960px) {
    .music-container{
        clip-path: none;
    }
    .content-left,
    .logo-kek,
    .back-lecteur,
    .lectureencours{
        display:none;
    }
    .kp_media {
        height: calc(100vh - 49px);
    }
    
    .canva-container {
        width: 100%;
        height: 50vh;
        display: block;
        aspect-ratio: 1 / 1;
    }
    .content-right{
        width: calc(100% + 10px);
        margin: 0;
    }
}
</style>
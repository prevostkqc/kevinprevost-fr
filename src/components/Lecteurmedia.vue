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
                    <li class="liste-fake-menu--li  liste-fake-menu--li-nouveau"><span class="under-windows">F</span>ichier
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
            <div class="part-top">
                <section class="part-left">
                </section>
                <section class="part-midddle">
                    <div class="visualizer">
                        <div class="visualizer-top">
                            <p class="trackinfo--title">{{ currentTrack.title }}</p>
                            <p class="trackinfo--artist">{{ currentTrack.artist }}</p>
                        </div>
                    </div>
                </section>
                <section class="part-right">
                    <div class="playlist">
                        <ul>
                            <li v-for="(track, index) in playlist" :key="index" @click="selectTrack(index)" :class="{ playing: currentTrackIndex === index }">
                                <p>
                                    <strong>{{ track.title }}</strong> - {{ track.artist }} - 
                                    <span v-if="track.duration">{{ formatTime(track.duration) }}</span>
                                    <span v-else>Chargement...</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <div class="part-bottom">
                <div class="progress-bar-container" @click="seekTo($event)">
                    <!-- Barre de progression statique pour l'apparence -->
                    <div class="progress-bar-background"></div>
                    
                    <!-- Jauge masquée pour capturer les interactions -->
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="0.1" 
                        v-model="progress" 
                        @input="seek" 
                        class="hidden-range" 
                        ref="hiddenRange"
                    />

                    <!-- Barre de progression dynamique et curseur -->
                    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
                    <img class="progress-cursor" :src="iconcursor" :style="{ left: progress + '%' }" alt="Curseur">
                </div>
                <div class="controls">
                    <button @click="prevTrack">
                        <img :src="iconprev" alt="Précédent" />
                    </button>
                    <button @click="playPause">
                        <img v-if="!isPlaying" :src="iconplay" alt="Play" />
                        <img v-else :src="iconpause" alt="Pause" />
                    </button>
                    <button @click="nextTrack">
                        <img :src="iconnext" alt="Suivant" />
                    </button>
                    <!-- Jauge de volume séparée -->
                    <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="updateVolume" />
                    <button @click="toggleMute">
                        <img v-if="!isMuted" :src="iconmute" alt="Mute" />
                        <img v-else :src="iconvolume" alt="Unmute" />
                    </button>
                </div>
            </div>
            <audio ref="audio" :src="currentTrack.path" @timeupdate="updateProgress"></audio>
            
            <div class="track-info">
                <p> {{ formatTime(currentTime) }}-{{ formatTime(duration - currentTime) }} /{{ formatTime(duration) }}</p>
            </div>



           
        </div>

        

        <div class="resize-handle"></div>
    </section>
    <!-- Media -->
</template>

<script>

import Navigation   from  '@/components/Navigation.vue';
import textIcon     from  '@/assets/images/icon-media.png'; 

import track1       from '@/assets/audio/99redballons-nena.mp3';
import track2       from '@/assets/audio/foulesentimentale-alainsouchon.mp3';

import iconmute     from '@/assets/images/windowsmedia/valumeon.png';
import iconvolume   from '@/assets/images/windowsmedia/volumeoff.png';
import iconplay     from '@/assets/images/windowsmedia/play.png';
import iconpause    from '@/assets/images/windowsmedia/pause.png';
import iconprev     from '@/assets/images/windowsmedia/precedente.png';
import iconnext     from '@/assets/images/windowsmedia/suivante.png';
import iconcursor   from '@/assets/images/windowsmedia/volume-cursor.png';
import jaugefull    from '@/assets/images/windowsmedia/jaugefull.png';
import jaugeempty   from '@/assets/images/windowsmedia/jaugeempty.png';

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
            iconmute,
            iconvolume,
            iconplay,
            iconpause,
            iconprev,
            iconnext,
            iconcursor,
            jaugefull,
            jaugeempty,


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
            tempAudio.addEventListener('loadedmetadata', () => {
            this.playlist[index].duration = tempAudio.duration || 0;
            });
        });

        audio.addEventListener('loadedmetadata', () => {
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
        } else {
            audio.pause();
            this.isPlaying = false;
        }
        },
        updateProgress() {
            const audio = this.$refs.audio;
            this.currentTime = audio.currentTime;
            this.duration = audio.duration;
            this.progress = (audio.currentTime / audio.duration) * 100;
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
        updateVolume() {
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

        playPause() {
            const audio = this.$refs.audio;
            if (audio.paused) {
            audio.play();
            this.isPlaying = true;
            } else {
            audio.pause();
            this.isPlaying = false;
            }
        },



    }
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








.controls img {
  width: 24px;
  height: 24px;
}


.music-player {
  padding: 20px;
  background-color: #333;
  color: #fff;
  text-align: center;
}
.track-info {
  font-size: 18px;
  margin-bottom: 10px;
}
.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
button {
  background-color: #666;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #888;
}
button.onmute {
  background-color: #d9534f; /* Couleur rouge pour indiquer que le son est coupé */
}
input[type="range"] {
  width: 100px;
}

/* ----------------- */
/* Playlist */
.playlist {
  margin-top: 20px;
  color: white;
}

.playlist ul {
  list-style: none;
  padding: 0;
}

.playlist li {
  padding: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.playlist li:hover {
  background-color: #444;
}

.playlist li.playing {
  background-color: #666;
  font-weight: bold;
}


/* ----------------- */
/* Visualizer */
.part-top{
    display: flex;
    justify-content: space-between;
}

/* ----------------- */
/* progress bar */
.progress-bar-container {
    width: 100%;
    height: 10px;
    position: relative;
    background-color: #444;
    cursor: pointer;
}

.hidden-range {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100%;
    opacity: 0; /* Rendre invisible mais cliquable */
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
}

.progress-cursor {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: left 0.1s linear;
    z-index: 2;
    pointer-events: none;
}
</style>
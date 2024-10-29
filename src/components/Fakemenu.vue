<template>
        
    <section class="fake-menu-top-folder">
            <div class="fake-menu--top">
                <ul class="liste-fake-menu">
                    <li class="liste-fake-menu--li"><span class="under-windows">F</span>ichier</li>
                    <li class="liste-fake-menu--li"><span class="under-windows">E</span>dition</li>
                    <li class="liste-fake-menu--li">Affic<span class="under-windows">h</span>age</li>
                    <li class="liste-fake-menu--li">Fa<span class="under-windows">v</span>oris</li>
                    <li class="liste-fake-menu--li"><span class="under-windows">O</span>utils</li>
                    <li class="liste-fake-menu--li"><span class="under-windows">?</span></li>
                </ul>
                <div class="fake-menu--container-logo">
                    <img :src="Logo" alt="logo" class="fake-menu-logo"/>
                </div>
            </div>
            <div class="fake-menu--middle">
                <div class="fake-menu--middle-container">
                    <div class="fake-menu-arrow-back">
                        <img :src="backIcon" alt="back" class="fake-menu-arrow-back--img"/>
                        <p class="p-texte">Précédente</p>
                        <img :src="litlearrow" alt="litlearrow" class="fake-menu-arrow-back--img"/>
                    </div>
                    <div class="fake-menu-arrow-back">
                        <img :src="backIcon" alt="back" class="fake-menu-arrow-back--img  fake-menu-arrow-back--img-reverse"/>
                        <img :src="litlearrow" alt="litlearrow" class="fake-menu-arrow-back--img"/>
                    </div>
                    <div class="fake-menu-arrow-back">
                        <img :src="folderback" alt="back" class="fake-menu-arrow-back--img"/>
                    </div>
                </div>
                
                <div class="fake-menu--middle-container">
                    <div class="fake-menu-arrow-back">
                        <img :src="search" alt="search" class="fake-menu-arrow-back--img"/>
                        <p class="p-texte  p-texte-pad">Rechercher</p>
                    </div>
                </div>
                <div class="fake-menu--middle-container">
                    <div class="fake-menu-arrow-back  fake-menu-arrow-back--actif">
                        <img :src="minifolder" alt="folder" class="fake-menu-arrow-back--img"/>
                        <p class="p-texte  p-texte-pad">Dossiers</p>
                    </div>
                </div>
                <div class="fake-menu--middle-container  fake-menu--middle-container--none">
                    <div class="fake-menu-arrow-back">
                        <img :src="multidesk" alt="search" class="fake-menu-arrow-back--img"/>
                        <img :src="litlearrow" alt="litlearrow" class="fake-menu-arrow-back--img"/>
                    </div>
                </div>
            </div>
            
            <div class="fake-menu--end">
                <div class="fake-menu--end-container">
                    <p class="p-texte">A<span class="under-windows">d</span>resse</p>
                </div>
                <div class="menu--url">
                    <input type="text" class="menu--url-text" :value="`C:\\Users\\Kévin Prévost\\Développeur web`"></input>
                    <img :src="goto" alt="folder" class="fake-menu-arrow-back--img"/>
                </div>
                <div class="fake-menu--end-container  fake-menu--end-container-flex">
                    <img :src="greenarrow" alt="folder" class="fake-menu-arrow-back--img"/>
                    <p class="p-texte">OK</p>
                </div>
                
            </div>
        </section>
</template>

<script>
import backIcon from    '@/assets/images/icon-back.png';
import litlearrow from  '@/assets/images/icon-litlearrow.png';
import folderback from  '@/assets/images/icon-folderback.png';
import search from      '@/assets/images/icon-search.png';
import minifolder from   '@/assets/images/icon-minifolder.png';
import multidesk from   '@/assets/images/icon-multidesk.png';
import goto from        '@/assets/images/icon-goto.png';
import greenarrow from  '@/assets/images/icon-greenarrow.png';

import Logo from '@/assets/images/logo-2024.png';

export default {
  name: 'FakeMenu',
  props: {
    context: {
      type: String,
      default: 'browser'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
  data() {
    return {
        Logo,
        backIcon,
        litlearrow,
        folderback,
        search,
        minifolder,
        multidesk,
        goto,
        greenarrow,
    };
  },
  computed: {
    address() {
      return `C:\\Users\\Kévin Prévost\\${this.context}`;
    }
  }
}
</script>

<style scoped>
</style>
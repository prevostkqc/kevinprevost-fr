<template>
    <article class="exemple1">
        <div class="un_exemple">
            
            <div class="result_exemple">
                <div class="unexemple__container">
                    <div class="ex__toggle" @click="toggleSunMoon">
                        <div :class="['ex__toggle-circle', { active: isSunMoonActive }]">
                            <img :src="lune1" alt="lune1" class="mini  moon1" />
                            <img :src="lune2" alt="lune2" class="mini  moon2" />
                            <img :src="soleil1" alt="soleil1" class="mini  sun1" />
                            <img :src="soleil2" alt="soleil2" class="mini  sun2" />
                        </div>
                    </div>
                </div>
                    
                <div class="container--code">
                    <input type="checkbox" name="showcode" class="checkbox-code" id="showcode1">
                    <label class="label-code  kp_btn-cv kp_btn-cv--masquer btn-windows-xp btn-windows-xp-ok" for="showcode1">
                        <span class="text-code  text-code-afficher  btn-windows-xp--texte">Afficher le code source</span>
                        <span class="text-code  text-code-masquer  btn-windows-xp--texte">Masquer le code source</span>
                    </label>
<div class="part_code">
<p class="titre_code">HTML</p>
<pre><code class="html">&lt;div class=&quot;ex__toggle&quot; @click=&quot;toggleSunMoon&quot;&gt;
    &lt;div :class=&quot;[&quot;ex__toggle-circle&quot;, { active: isSunMoonActive }]&quot;&gt;
        &lt;img :src=&quot;lune1&quot; alt=&quot;lune1&quot; class=&quot;mini moon1&quot; /&gt;
        &lt;img :src=&quot;lune2&quot; alt=&quot;lune2&quot; class=&quot;mini moon2&quot; /&gt;
        &lt;img :src=&quot;soleil1&quot; alt=&quot;soleil1&quot; class=&quot;mini sun1&quot; /&gt;
        &lt;img :src=&quot;soleil2&quot; alt=&quot;soleil2&quot; class=&quot;mini sun2&quot; /&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code></pre>

<p class="titre_code">JS</p>
<pre><code class="js">
data() {
    return {
        isSunMoonActive: false,
        lune1,
        lune2,
        soleil1,
        soleil2,
    };
},
methods: {
    toggleSunMoon() {
        this.isSunMoonActive = !this.isSunMoonActive;
    },
},
</code></pre>

<p class="titre_code">CSS</p>
<pre><code class="css">
.ex__toggle {
    background: linear-gradient(90deg, rgba(98, 98, 98, 1) 0%, rgba(228, 228, 228, 1) 100%);
    width: 86px;
    height: 15px;
    border-radius: 50px;
    cursor: pointer;
    border: solid 2px #AAAAAA;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;
}
.ex__toggle-circle {
    background-color: rgb(59, 79, 233);
    width: 42px;
    height: 42px;
    border-radius: 50px;
    border: solid 2px #08149f;
    position: relative;
    left: -3px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    transform: translateX(0);
    overflow: hidden;
}
.ex__toggle-circle.active {
    transform: translateX(45px);
    background-color: rgb(28, 32, 171);
}
.ex__toggle:hover {
    background: linear-gradient(90deg, rgba(98, 98, 98, 1) 0%, rgba(228, 228, 228, 1) 100%);
}
.mini {
    position: absolute;
    width: 34px;
    height: 34px;
    margin: 4px;
    top: 0;
    left: 0;
    transition: transform 0.5s ease;
}
.moon1,
.moon2 {
    transform: translateY(-150%);
}
.moon2 {
    transition: transform 0.8s ease;
}
.ex__toggle-circle.active .moon1,
.ex__toggle-circle.active .moon2 {
    transform: translateY(0);
}
.sun1,
.sun2 {
    transform: translateY(0);
    transition: transform 0.5s ease, opacity 2s ease;
}
.sun2 {
    opacity: 1;
    animation: rotatesun 15s linear infinite;
}
.ex__toggle-circle.active .sun1,
.ex__toggle-circle.active .sun2 {
    transform: translateY(150%);
}
.ex__toggle-circle.active .sun2 {
    opacity: 0;
}
@keyframes rotatesun {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</code></pre>
</div>
                </div>
  

            
            </div>
        </div>
        
        <div class="un_exemple">
            <div class="result_exemple">
                <div class="ex__toggle_off" @click="toggleOnOff">
                    <div :class="['ex__toggle-onoff', { active: isOnOffActive }]">
                    </div>
                </div>
            </div>
        </div>
        
        
        <div class="un_exemple">
            <div class="result_exemple">
                <div class="ex__toggle_yesno" @click="toggleYesNO">
                    <div :class="['ex__toggle-yesno', { active: isYesNOActive }]">
                    </div>
                    <div class="yesno  yesno--yes">OUI</div>
                    <div class="yesno  yesno--no">NON</div>
                </div>
            </div>
        </div>

    </article>
</template>

<script>
import lune1 from '@/assets/images/exemples/exemple1-1.png';
import lune2 from '@/assets/images/exemples/exemple1-2.png';
import soleil1 from '@/assets/images/exemples/exemple1-3.png';
import soleil2 from '@/assets/images/exemples/exemple1-4.png';

export default {
    name: 'Exemple1',
    data() {
        return {
            isSunMoonActive: false,
            isOnOffActive: false,
            isYesNOActive: false,
            lune1,
            lune2,
            soleil1,
            soleil2,
        };
    },
    methods: {
        toggleSunMoon() {
            this.isSunMoonActive = !this.isSunMoonActive;
        },
        toggleOnOff() {
            this.isOnOffActive = !this.isOnOffActive;
        },
        toggleYesNO() {
            this.isYesNOActive = !this.isYesNOActive;
        },
    },
};
</script>

<style scoped>
.exemples_text {
    font-size: 1.5rem;
    font-weight: bold;
    color: #000000;
    margin-bottom: 10px;
}
.un_exemple {
    border: solid 1px #000000;
    border-radius: 5px;
    padding: 20px;
    margin: 10px;
    background: #FFFFFF;
    user-select: none;
}
.result_exemple {
    padding: 10px;
    user-select: none;
}
.checkbox-code{
    display: none;
}
.text-code{
    color: #000000;
    font-size:13px;
    height: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
}
pre {
    background-color: #494949;
    padding: 10px;
    font-family: Consolas, monospace;
    width: 100%;
    overflow: scroll;
}
.titre_code{
    font-size: 1.2rem;
    font-weight: bold;
    color: #000000;
    margin: 10px 0 5px;
}
.html {
    color: #d1eddc;
}
.css {
    color: #eca5d1;
}
.js {
    color: #e6c56b;
}
.label-code{
    top: 10px;
    display: block;
    cursor: pointer;
}
.part_code,
.text-code-masquer{
    display: none;
}
.checkbox-code:checked ~ .part_code,
.checkbox-code:checked ~ .label-code .text-code-masquer{
    display: block;
}
.checkbox-code:checked ~ .label-code .text-code-afficher{
    display: none;
}

.unexemple__container{
    padding: 20px 0;
}

@media screen and (max-width: 960px) {
    .un_exemple{
        padding: 10px;
        margin: 20px 0px;
    }
    .text-code{
        height: auto;
    }
}

/* ----------------- TOGGLE SUN MOON ----------------- */
.ex__toggle {
    background: linear-gradient(90deg, rgba(98, 98, 98, 1) 0%, rgba(228, 228, 228, 1) 100%);
    width: 86px;
    height: 15px;
    border-radius: 50px;
    cursor: pointer;
    border: solid 2px #AAAAAA;
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;
}

.ex__toggle-circle {
    background-color: rgb(59, 79, 233);
    width: 42px;
    height: 42px;
    border-radius: 50px;
    border: solid 2px #08149f;
    position: relative;
    left: -3px;
    transition: transform 0.3s ease, background-color 0.3s ease;
    transform: translateX(0);
    overflow: hidden;
}

.ex__toggle-circle.active {
    transform: translateX(45px);
    background-color: rgb(28, 32, 171);
}

.ex__toggle:hover {
    background: linear-gradient(90deg, rgba(98, 98, 98, 1) 0%, rgba(228, 228, 228, 1) 100%);
}

.mini {
    position: absolute;
    width: 34px;
    height: 34px;
    margin: 4px;
    top: 0;
    left: 0;
    transition: transform 0.5s ease;
}

.moon1,
.moon2 {
    transform: translateY(-150%);
}

.moon2 {
    transition: transform 0.8s ease;
}

.ex__toggle-circle.active .moon1,
.ex__toggle-circle.active .moon2 {
    transform: translateY(0);
}

.sun1,
.sun2 {
    transform: translateY(0);
    transition: transform 0.5s ease, opacity 0.5s ease;
}

.sun2 {
    opacity: 1;
    animation: rotatesun 15s linear infinite;
}

.ex__toggle-circle.active .sun1,
.ex__toggle-circle.active .sun2 {
    transform: translateY(150%);
}

.ex__toggle-circle.active .sun2 {
    opacity: 0;
}

@keyframes rotatesun {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}


/* ----------------- TOGGLE ON OFF ----------------- */
.ex__toggle_off {
    background: #5f5f5f;
    width: 60px;
    height: 30px;
    cursor: pointer;
    border: solid 2px #444444;
    display: flex;
    align-items: center;
}
.ex__toggle-onoff {
    background-color: rgb(215, 215, 215);
    width: 25px;
    height: 25px;
    transition: transform 0.15s ease;
    transform: translateX(0);
    overflow: hidden;
    position: relative;
    left: 3px;
    top: 0px;
}
.ex__toggle-onoff.active {
    transform: translateX(29px);
    background-color: rgb(33, 33, 33);
}


/* ----------------- TOGGLE YES NO ----------------- */
.ex__toggle_yesno {
    background: #444444;
    width: 100px;
    height: 30px;
    cursor: pointer;
    border-radius: 15px;
    display: flex;
    align-items: center;
    position: relative;
}
.ex__toggle-yesno {
    background-color: rgb(22, 158, 36);
    width: 55px;
    height: 30px;
    border-radius:15px;
    transition: transform 0.4s ease;
    transform: translateX(0);
    overflow: hidden;
    position: relative;
    left: 0px;
    top: 0px;
}
.ex__toggle-yesno.active {
    transform: translateX(45px);
    background-color: rgb(233, 59, 59);
}
.yesno{
    position: absolute;
    top: 8px;
    left: 14px;
    transition: opacity 0.4s;
}
.yesno--no{
    left: auto;
    right: 12px;
    opacity: 0.3;
}

.ex__toggle-yesno.active ~ .yesno--yes{
    opacity: 0.3;
}
.ex__toggle-yesno.active ~ .yesno--no{
    opacity: 1;
}

.container--code{
    display:none;
}
</style>
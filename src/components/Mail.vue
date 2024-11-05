<template>
    <!-- Mail -->
    <section :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - Contactez-moi</span>
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

        <section class="fake-menu-top-folder">
            <div class="fake-menu--top  fake-menu--top-mail">
                <div class="fake-menu--icn  fake-menu--icn-up  fake-menu-arrow-" @click="triggerSubmit" >
                    <img class="fake-menu--top--img" :src="mailsend" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Envoyer</p>
                </div>
                <div class="fake-menu--icn  fake-menu-arrow-back">
                    <img class="fake-menu--top--img" :src="mailcut" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Couper</p>
                </div>
                <div class="fake-menu--icn  fake-menu-arrow-back">
                    <img class="fake-menu--top--img" :src="mailcopy" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Copier</p>
                </div>
                <div class="fake-menu--icn  fake-menu-arrow-back">
                    <img class="fake-menu--top--img" :src="mailpaste" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Coller</p>
                </div>
                <div class="fake-menu--icn  fake-menu-arrow-back  fake-menu--icn-sep">
                    <img class="fake-menu--top--img" :src="mailretour" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Annuler</p>
                </div>
                <div class="fake-menu--icn  fake-menu-arrow-back">
                    <img class="fake-menu--top--img" :src="mailverifie" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Vérifier</p>
                </div>
                <div class="fake-menu--icn  fake-menu-arrow-back  fake-menu--icn-sep">
                    <img class="fake-menu--top--img" :src="mailabc" alt="Mail" />
                    <p class="p-mail  p-mail-fake">Orthographe</p>
                </div>
            </div>
        </section>
       
        <form @submit.prevent="sendEmail" class="formemail">
            <div class="kp_content--block--content kp_element--enable  kp_content--mail">
                
                <div class="mail_to">
                    <div class="mailt_to--left">
                        <p class="p-mail">À&nbsp;:</p>
                    </div>
                    <div class="mail_to--right">
                        <p class="p-mail" style="user-select: none; pointer-events: none;">contact@kevinprevost.fr</p>
                    </div>
                </div>


                <div class="mail_to">
                    <div class="mailt_to--left">
                        <p class="p-mail  p-mail-image"><img :src="mailcion1" alt="Mail" />De*&nbsp;:</p>
                    </div>
                    <div class="mail_to--right">
                        <input class="input-mail" type="email" placeholder="Votre mail" name="" id="senderemail"  required  v-model="senderEmail">
                    </div>
                </div>

                <div class="mail_to">
                    <div class="mailt_to--left">
                        <p class="p-mail  p-mail-image"><img :src="mailcion2" alt="Mail" />Nom*&nbsp;:</p>
                    </div>
                    <div class="mail_to--right">
                        <input class="input-mail" type="text" placeholder="Votre nom" name="" id="ccemail"  required  v-model="nameClient">
                    </div>
                </div>

                <div class="mail_to">
                    <div class="mailt_to--left">
                        <p class="p-mail  p-mail-image"><img :src="mailcion1" alt="Mail" />Compagnie&nbsp;:</p>
                    </div>
                    <div class="mail_to--right">
                        <input class="input-mail" type="text" placeholder="Le nom de votre compagnie" name="" id="cciemail"  v-model="nameCompany">
                    </div>
                </div>
            
                <div class="mail_to">
                    <div class="mailt_to--left">
                        <p class="p-mail  p-mail-image"><img :src="mailcion2" alt="Mail" />Objet*&nbsp;:</p>
                    </div>
                    <div class="mail_to--right">
                        <input type="text" class="input-mail" placeholder="Le motif de votre prise de contact" name="" id="objectemail"  required  v-model="subject">
                    </div>
                </div>
                
                <p class="p-mail  p-mail-right">*Champ obligatoire&nbsp;</p>

                <div class="mail-section--font-style">
                    <select id="font-family" class="custom-select" v-model="fontFamily">
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                    <select id="font-size" class="custom-select" v-model="fontSize">
                        <option value="8px">8</option>
                        <option value="10px">10</option>
                        <option value="12px">12</option>
                        <option value="14px">14</option>
                        <option value="16px">16</option>
                        <option value="18px">18</option>
                        <option value="20px">20</option>
                        <option value="22px">22</option>
                        <option value="24px">24</option>
                        <option value="26px">26</option>
                        <option value="28px">28</option>
                        <option value="30px">30</option>
                        <option value="32px">32</option>
                        <option value="34px">34</option>
                        <option value="36px">36</option>
                        <option value="38px">38</option>
                        <option value="40px">40</option>
                    </select>
                    <select id="font-weight" class="custom-select  custom-select--graisse" v-model="fontWeight">
                        <option value="normal">Normal</option>
                        <option value="bold">Gras</option>
                        <option value="bolder">Très gras</option>
                        <option value="lighter">Fin</option>
                    </select>
                    <label for="text-decoration-color" class="label-color">A<span class="color-text-preview" :style="{ backgroundColor: textDecorationColor }"></span></label>
                    
                    <input type="color" id="text-decoration-color" class="text-decoration-color" v-model="textDecorationColor">
                </div>
            </div>
            <div class="textarea-mail--container">
                <textarea name="" class="textarea-mail" :style="textareaStyle" id="textareamail" rows="10"  required  v-model="messageBody"></textarea>
            </div>
            <div class="content-submit">
                <button type="submit"  class="btn-windows-xp  btn-windows-xp-ok  btn-submit" id="formSubmitButton"><span class="btn-windows-xp--texte">Envoyer</span></button>
            </div>
        </form>
        <p v-if="statusMessage">{{ statusMessage }}</p>
        <div v-if="showSuccessMessage" class="message-success  message-success--box">
            <div  id="message-success" class="message-success--visuel">
                <img :src="validation" alt="Validation" />
                E-mail envoyé avec succès !
            </div>
        </div>
        <p v-if="statusMessage">{{ statusMessage }}</p>
        <div class="resize-handle"></div>
    </section>
    <!-- Mail -->
</template>

<script>

import Navigation   from  '@/components/Navigation.vue';

import textIcon     from  '@/assets/images/icon-mail.png'; 
import validation   from  '@/assets/images/icon-sendmail.png';
import mailcion1    from  '@/assets/images/icon-mail-1.png';
import mailcion2    from  '@/assets/images/icon-mail-2.png';

import mailsend     from  '@/assets/images/icon-mail-send.png';
import mailcut      from  '@/assets/images/icon-mail-cut.png';
import mailcopy     from  '@/assets/images/icon-mail-copy.png';
import mailpaste    from  '@/assets/images/icon-mail-paste.png';
import mailretour   from  '@/assets/images/icon-mail-retour.png';
import mailverifie  from  '@/assets/images/icon-mail-verifie.png';
import mailabc      from  '@/assets/images/icon-mail-abc.png';

export default {
  name: 'Mail',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
  },
  props: {
    context: {
      type: String,
      default: 'mail'
    },
    title: {
      type: String,
      default: 'mail'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
    data() {
        return {
            textIcon,
            mailcion1,
            mailcion2,
            mailsend,
            mailcut,
            mailcopy,
            mailpaste,
            mailretour,
            mailverifie,
            mailabc,
            form: {
                name: '',
                email: '',
                message: ''
            },
            statusMessage: '',
            fontWeight: "normal",
            fontFamily: "Arial",
            fontSize: "18px",
            textDecorationColor: "#000000",
            textDecorationStyle: "none",
            windowStateClass: '',
            senderEmail: '',
            subject: '',
            messageBody: '',
            statusMessage: '',
            nameCompany: '',
            nameClient: '',
            validation,
            showSuccessMessage: false, 
        };
    },
    computed: {
        textareaStyle() {
            return {
                fontWeight: this.fontWeight,
                fontFamily: this.fontFamily,
                fontSize: this.fontSize,
                color: this.textDecorationColor,
            };
        },
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
        triggerSubmit() {
            const submitButton = document.getElementById("formSubmitButton");
            if (submitButton) {
                submitButton.click();
            }
        },
        async sendEmail() {
            const formData = new FormData();
            formData.append("name", this.nameClient);
            formData.append("company", this.nameCompany);
            formData.append("email", this.senderEmail);
            formData.append("subject", this.subject);
            formData.append("message", this.messageBody);

            try {
                const response = await fetch("send-email.php", {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    this.statusMessage = "E-mail envoyé avec succès!";
                    this.showSuccessMessage = true;
                    this.senderEmail = '';
                    this.nameClient = '';
                    this.nameCompany = '';
                    this.subject = '';
                    this.messageBody = '';
                    setTimeout(() => {
                        this.showSuccessMessage = false;
                    }, 5000);
                } else {
                    this.showSuccessMessage = false;
                    this.statusMessage = "Erreur lors de l'envoi de l'e-mail.";
                }
            } catch (error) {
                this.showSuccessMessage = false;
                this.statusMessage = "Impossible de se connecter au serveur.";
            }
        }
    },
    mounted() {
    },
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
.kp_content--mail{
    padding: 10px;
    background-color: #ecebda;
}
.mail_to{
    display: flex;
    justify-content: flex-start;
    margin: 10px 0;
    align-items: center;
}
.mailt_to--left{
    width: 110px;
    text-align: right;
    padding-left: 10px;
}
.mail_to--right{
    width: calc(100% - 160px);
}
.btn-windows-xp{
    padding: 5px 30px;
    border-radius: 5px;
    cursor: pointer;
    margin: 0;
    width: 65px;
    display: flex;
    justify-content: center;
}
.btn-windows-xp--texte{
    font-size: 14px;
    font-weight: bold;
    color: black;
}
.input-mail{
    padding: 4px 15px;
    width: 100%;
    border: solid 1px #716f64;
    border-bottom: solid 1px #f1efe2;
    border-right: solid 1px #ffffff;
    box-shadow: -2px -2px 0 0 #aca899;
}

.label-mail,
.p-mail{
    color:#000000;
    font-size: 14px;

}
.p-mail{
    padding-right: 15px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    gap: 5px;
}
.btn-submit{    
    position: relative;
    bottom: 0;
    width: fit-content;
    padding: 10px 80px;
    font-size: 18px;
    font-weight: 600;
}
.voirplusinput{
    display:none
}
.line-hide{
    display: none;
}
.voirplusinput:checked ~ .line-hide{
    display: flex;
}
.voirplusinput:checked ~ .voirplus--label{
    display: none;
}
select.custom-select {
    appearance: none; 
    -webkit-appearance: none;
    -moz-appearance: none; 
    background-image: url('@/assets/images/icon-goto.png');
    background-repeat: no-repeat;
    background-position: right 2px center;
    background-size: 16px;
    border: 1px solid #ccc;
    padding: 3px 25px 3px 3px;
    font-size: 16px;
    cursor:pointer;

    border: solid 1px #716f64;
    border-bottom: solid 1px #f1efe2;
    border-right: solid 1px #ffffff;
    box-shadow: -2px -2px 0 0 #aca899;
}
select.custom-select::-ms-expand {
    display: none;
}
.text-decoration-color{
    display:none;
}
.label-color{
    font-size: 27px;
    cursor: pointer;
    color: rgb(26, 0, 122);
    font-family: serif;
    font-weight: 600;
    background: linear-gradient(to right, #335686, #132f60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}
.mail-section--font-style{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0;
    gap: 15px;
    padding: 10px;
    background: #cdcabb;
    border: solid 1px #716f64;
    border-bottom: solid 1px #f1efe2;
    border-right: solid 1px #ffffff;
    box-shadow: -2px -2px 0 0 #aca899;
    background: #ecebda;
    width: calc(100% - 40px);
    left: 10px;
    position: relative;
}
.textarea-mail--container{
    margin: 0;
    padding: 0 20px 20px;
    background: #ecebda;
    height: calc(100% - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

}
.textarea-mail{
    width: 100%;
    height: 100%;
    resize: none;
    box-sizing: border-box;
    padding: 10px;
    border: solid 1px #716f64;
    border-bottom: solid 1px #f1efe2;
    border-right: solid 1px #ffffff;
    box-shadow: -2px -2px 0 0 #aca899;
}
.message-success--box{
    width:260px;
    margin: 0 auto;
    position: relative;
    overflow: hidden ;
    position: absolute;
    top: 72px;
    left: calc(50% - 130px);
    display: flex;
}


.content-submit{
    display: flex;
    justify-content: flex-end;
    width: calc(100% - 30px);
    left: 10px;
    position: relative;
}
.message-success--visuel {
    color: #4CAF50;
    font-weight: bold;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #4CAF50;
    background-color: #e7f9e7;
    border-radius: 5px;
    text-align: center;
    animation: fadesendmail 5s infinite;
    display: flex;
    align-items: center;
    gap: 10px;
}
@keyframes fadesendmail{
    0%{
        transform: translateY(-100%);
        opacity: 0;
    }
    10%{
        transform: translateY(0);
        opacity: 1;
    }
    90%{
        transform: translateY(0);
        opacity: 1;
    }
    100%{
        transform: translateY(-100%);
        opacity: 0;
    }
}
.color-text-preview{
    background-color: #000000;
    width: 15px;
    height: 15px;
    display: block;
    border: solid 2px #2f2f2f;
    border-bottom: solid 2px #ffffff;
    border-right: solid 2px #ffffff;
    position: relative;
    bottom: 0px;
}
.fake-menu--top-mail{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 10px;
    background: #ecebda;
}
.fake-menu--top{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0px;
}

.formemail{
    padding-bottom: 43px;
    background: #ecebda;
}
.fake-menu--icn{
    display: flex;
    flex-direction: column;
    align-items: center;
    width:100px;
    gap: 0;
    padding: 0 0 5px 0;
}
.p-mail-fake{
    width: fit-content;
    margin: auto;
    padding: 0;
    text-align: center;
}
.fake-menu--icn-sep{
    position: relative;
    margin:0 20px 0 0 ;
}
.fake-menu--icn-sep:after{
    content: '';
    position: absolute;
    width: 1px;
    height: 100%;
    background: #cac6af;
    right: -10px;
}
.fake-menu--icn-up:hover{
    background: rgb(253,253,251);
    background: linear-gradient(180deg, rgba(253,253,251,1) 0%, rgba(253,253,251,1) 73%, rgba(228,225,214,1) 100%);
}
.fake-menu--icn-up:active{
    background: rgb(253,253,251);
    background: linear-gradient(0deg, rgba(253,253,251,1) 0%, rgba(253,253,251,1) 73%, rgba(228,225,214,1) 100%);
}
.p-mail-right{

}
@media screen and (max-width: 960px){
    .fake-menu--top-mail,
    .custom-select--graisse{
        display:none;
    }
}
</style>
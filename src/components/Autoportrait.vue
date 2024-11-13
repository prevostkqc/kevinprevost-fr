<template>
    <!-- Texte image -->
    <section :class="['kp_image_ascii', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - autoportrait.txt</span>
                </p>
            </div>
            <!-- Utilisation du composant Navigation avec le bon contexte -->
        <Navigation @close="handleClose"  @resize="handleResize"  @reduct="handleReduct"  :viewName="title" :context="context" :customClass="customClass" />
        </div>
        <div class="container-texte">
            <div>
            <p class="kp_text  kp_text--text">
              Avec ce site, je vous propose de découvrir mon univers, mes passions et mes différentes approches face aux compléxités de ce que j'avais à reproduire en donnant une place importante aux détails.
              <br/><br/>
              J'ai eu l'idée de coder visuellement ce que nous avions sur l'OS de Windows XP afin de vous présenter mes compétences au travers de l'interface qui m'a vu grandir.
              <br/><br/>
              Depuis mes débuts, j’ai toujours été animé par l’idée de créer des expériences numériques qui marient esthétique, performance et innovation.
              <br/><br/>
              Ce site est une manière de partager avec vous non seulement mon parcours professionnel, mais aussi une part de ma créativité et de mes inspirations.
              <br/><br/>
              J’ai conçu ce dernier comme un espace interactif, un terrain de jeu où mes compétences prennent vie.
              <br/><br/>
              Vous y découvrirez mes projets passés, mes passions, et ma vision du web moderne. Chaque détail ici est pensé pour offrir une navigation intuitive et agréable, tout en mettant en valeur mon expertise technique et artistique.
              <br/><br/>
              À travers les différentes expériences qu'il propose, je vous invite à explorer mon approche du développement web, qui allie rigueur technique et sensibilité graphique. Qu’il s’agisse de concevoir des interfaces dynamiques, de collaborer sur des projets ambitieux ou de donner vie à des concepts créatifs, je m’efforce toujours de repousser les limites pour produire un résultat unique et mémorable.
              <br/><br/>
              Que vous soyez curieux de découvrir mon travail, intéressé par une collaboration ou simplement de passage, je vous invite à explorer les fonctionnalités de ce site. Chaque clic vous en dira un peu plus sur ma personnalité, mes compétences et mes ambitions.
              <br/><br/>
              Si vous avez des questions ou une idée à partager, contactez-moi. Je suis toujours ouvert à de nouveaux défis et à des échanges enrichissants.
              <br/><br/>
              Ensemble, construisons le web de demain.
            </p>
          </div>
         
          <pre class="kp_element--enable  kp_texte-image">                                                                   
                                              .=#@@@@@@#=.                                             
                                          .@@@@@@@@@@@@@@@@@.                                          
                                      .@@@@@@@@@@@@@@@@@@@@@@@@.                                       
                                    #@@@@@@@@%%%############@@@@@:                                     
                                    @@@@@%###******************%@@@.                                    
                                  @@@#****++++++***+**+++*+*****###                                    
                                  @@****++++++++++++++++++++++++***##                                   
                                .@#**+++++++++++++++++++++++==++++*+*                                   
                                =#++++++++======+++++++===========++++                                  
                                **++++++++++===+++++===========---=+*=.                                 
                                **+++++++++++++++=====-========-----==-                                 
                                +**+++++=============*####**+++=-----+=                                 
                                =**++++============++*###*++++==--:::=+=                                
                                ***+++++**+++====-===+*##**+==#=--:::-== =:=                            
                                ##*++#%%%%%#*++=----=+##*@@@=**=----::-*-::+:                           
                                -#*#%#*###%##*++=---++**=##%-=------::::---:::                          
                                +%%**#**#@####*+==--==+***+==-------:::.-=-:-.                          
                                *#*%#*%#@@#***++=-:---=+====------:::...-==:.                          
                                ****#****#****++=-:::::---------::::...:-=---                          
                                +++++++++**++**+=---::::--------::::...:::::.                          
                                *+++++++++++++*++=---:::------::::::..:-::::                           
                                +*++++++++++++++==--:::-=----:::::::..:-:++                            
                                  *+========+++++==---@=:--=--::::::::.----                             
                                  ++========+++##*+=:-:--------::::::::--:.                             
                                  .*+======++++*%##*****#*##+=--::::::-:--                              
                                  +++=====+#%@@@%%@%%##******++=-:::--::=                              
                                    +*+++++#%%%%**++=+=====+*##*=-:::----=                              
                                    =#*+++*##%#%%##*++=---::-=++=------:--                              
                                    =#**+*#%*+*+*++==--::-:---=*+-=--+=--                              
                                      %%***##**********=---:-++++*+**=++=:                              
                                      +@%##%@%#+++++++=-----=+######**+==..                             
                                      +@@@@@@##*+++==+----=+=+####%#*++:...                            
                                        @@@@@@@%###*+=+++==+++*#****+++:.....-                          
                                      **@@@@@@@%%##*+*#*++****###*+++:::.....##@@%.                    
                                      @@@@@@@@@@@@@#%%%%##**##**%%*+-::.......##%%%#*####.              
                                  .@@@@@@@@@*@@@@@%@@%@#%%#%#**##+::::::.....:%#%%%###%%%%%%##+##%*.    
                          .=@@@@@@@@@@@@@@@*+++%@@%@@%@@@%%#+-:::::::::.....#%%%%%####%%%%%%#*#%%%#*###
                    =%@@@@@@@@@@@@@@@@@@@@@@**+++====++++===--:::::::::....:-%%@@%%%##%%%%%%#*##%%%%%###
                @@@@@@@@@@@@@@@@@@@@@@@@@@@@@++++====------::::::::::.....::#%%@@########%@%####%%%%%%%#
              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*+++===----:-:::::::::::..:..:*%%@@#########%@%######%%%%%%
          =@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*==++==---::::::::::::....:::=%%@@%###%%####%@#*######%%%%%
        *%%@%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@=-=====---:-:::::::::::::::-*%%@@###%%#####%@########%#%%%
    @%%%%@@@@@%%@@@@@@@@@@@@@@@@@@@@@%%@@@@@+-----------:::::::::::::::+%@@@@###@@####%%@##########%%%%
    @@@%%%%%@%@@%%@@@@@%%@@@@@@%@@@@@@@%%@@@@@@=-------:::::::::::::::::+%@@@@%###@@####%%@**########%##%
    %@@%%%%@@%@@%%@@@@%%@@@@@@%%@@@@@@@%#%@@%@@@+----:-:::::::::::::::-*%%@@@@###%@%####%%@*############%
    %%@@%%%@@%@@%%%%%%#@@%@@@%#%%%%@@@@%##@@%%%@@%----:::::::-:::::::-@%@@@@@@##%%@%%###%@%*#######*####%
    %%%@%%%%@%@@@%%%%#@@%%@@@#%%%%%%@@@###%@@%#@@@@+-:--:::::-:::::-*%@@@@@@@%*%%%@%%%###@#**####***#**#%
    %%%%%%%%@@%@%%%##@@%%@@@##%%%##%@@@####@@@%%%%@@@*--:-::---:--+%@@@@@@@@@#*%#%%%%###%%#*####****#***%
    %%@%%%%%@@#@%%%#@@#%%%%##%%%#%%#%@@##%#%@@@%#%%%@@%#:---:---*%%%%@@@%@@@@*#%%#%%%%##%%#*####****#***%
    #%%@%%%%@@@@%##@@#%%%%%#####%###%@@#####%@@@%%%@%%%%%%=--+@@@@@@@@@#%@@@#*#%##%%%%##%%**#####**#****%
    %#%%@@%#%@@@##%@%%%%%%##%%######%@%###%#%%@@@@%%%%#%%%%%%%%@@@@@@@#%@@@%###%##%%%%%%%%**#####**#****%</pre>

        </div>
        
           
           <div class="resize-handle"></div>
       </section>
       <!-- Texte image -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import textIcon from '@/assets/images/text.png';

export default {
  name: 'Autoportrait',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation
  },
  props: {
    context: {
      type: String,
      default: 'autoportrait'
    },
    title: {
      type: String,
      default: 'autoportrait'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
  data() {
    return {
      textIcon,
      windowStateClass: 'kp_item_window_hide'
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
    }
  }
}
</script>
<style scoped>
  .kp_image_ascii{
    position: absolute;
    font-size: 14px;
    letter-spacing: 0px;
    font-family: monospace;
    background: white;
    color: black;
    max-height: 100vh;
    /* overflow-Y: scroll; */
    &:hover .kp_image_ascii--content {
      filter: drop-shadow(3px 3px 2px black);
    }
  }
.kp_element--title{
  position: sticky;
  top: 0;
}
  

.kp_content--block {
    position: absolute;
    font-size: 14px;
    letter-spacing: 0px;
    color: black;
    width: 385px;
    height: fit-content;
    background: #cdcabb;
    position: absolute;
    max-height: 100vh;
    max-width: 100vw;
    height: 550px;
}

  .kp_window--show{
    display: block !important;
    overflow: hidden;
  }
  .kp_image_ascii--content{
    overflow: scroll;
    width: 100%;
    transition: 0.3s;
    position: relative;
    height: calc(100% - 36px);
  }
  .kp_image_ascii:hover .kp_image_ascii--content {
    filter: drop-shadow(3px 3px 2px black);
  }
  .kp_image-text--show,
  .kp_text--show{
    display: block;
  }
  .kp_image_ascii--content{
    overflow: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
  }
  .kp_image_ascii{
    position: absolute;
    font-size: 14px;
    letter-spacing: 0px;
    font-family: monospace;
    background: white;
    color: black;
    background: white;
    position: absolute;
  }
  .kp_text--text{
    font-size: 14px;
    font-family: monospace;
    color: black;
    margin: 0;
    padding: 10px;
  }
  .kp_texte-image{
    filter: drop-shadow(3px 3px 2px black);
  }

  .kp_texte-image{
    filter: drop-shadow(3px 3px 2px black);
    font-family: monospace;
    color: black;
  }
  .container-texte{
    overflow-y: scroll;
    height: calc(100% - 0px);
  }
  
@media screen and (max-width: 960px){
  .kp_image_ascii--content{
    overflow: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    position: relative;
    height: calc(100% - 36px) !important;
    font-size: 9px;
    display: flex;
    align-items: flex-end;
    padding-top: 30px;
  }
  .kp_text--text{
    padding-top: 50px;
  }
  .kp_element--title{
    position: fixed;
    top: 0;
    width: calc(100vw - 17px);
  }
}
</style>
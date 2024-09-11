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
        <Navigation :viewName="title" :context="context" :customClass="customClass" @close="handleClose" @resize="handleResize" @reduct="handleReduct" />
        </div>
        <pre class="kp_image_ascii--content kp_element--enable">                                                                   
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
           
           <div class="resize-handle"></div>
       </section>
       <!-- Texte image -->
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import textIcon from '@/assets/images/text.png';

export default {
  name: 'Autoportrait',
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
      context: 'text',
      title: 'Kévin Prévost - autoportrait.txt',
      textIcon,
      customClass: 'kp_element--incons-zone',
      windowStateClass: 'kp_item_window_hide'
    };
  },
  methods: {
    handleClose() {
      this.$emit('update-class', 'kp_item_hide');
    },
    handleResize() {
      this.$emit('update-class', 'kp_item_resize');
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
    max-width: 800px;
    &:hover .kp_image_ascii--content {
      filter: drop-shadow(3px 3px 2px black);
    }
  }
  .kp_window--show{
    display: block !important;
    overflow: hidden;
  }
  .kp_image_ascii--content{
    overflow: scroll;
    width: 100%;
    height: calc(100% - 11px);
    transition: 0.3s;
    position: relative;
    height: calc(100% - 36px) !important;
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
    max-width: 800px;
    width: 50%;
    height: fit-content;
    background: white;
    position: absolute;
    border: solid 4px #ffffff;
  }

  
@media screen and (max-width: 900px){
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
  }
}
</style>
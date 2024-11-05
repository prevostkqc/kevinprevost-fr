<template>
    <section :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]" :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                    <div class="kp_element_title--icn">
                        <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                    </div>
                    <span>Kévin Prévost - Paint</span>
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
        <div class="kp_content--block--content kp_element--enable">
            <div class="paint-content">
              <div class="outils-left">
                <div class="outils-paint">
                  <img v-for="(tool, index) in tools" 
                         :key="index" 
                         :src="tool.icon" 
                         :alt="tool.name" 
                         class="kp_icon_zone--paint paint-tool"
                         :class="['tool-name--'+tool.name, { 'selected-tool': currentTool === tool.name }]"
                         @click="selectTool(tool.name)" />
                </div>
                <div class="zone-size">
                  <div class="size-paint">
                    <input type="radio" v-model="lineWidth" name="line-size" id="size-1" class="input-size" value="1"/>
                    <label for="size-1" class="label-size  label-size--1"></label>
                    <input type="radio" v-model="lineWidth" name="line-size" id="size-2" class="input-size" value="3"/>
                    <label for="size-2" class="label-size  label-size--2"></label>
                    <input type="radio" v-model="lineWidth" name="line-size" id="size-3" class="input-size" value="7"/>
                    <label for="size-3" class="label-size  label-size--3"></label>
                    <input type="radio" v-model="lineWidth" name="line-size" id="size-4" class="input-size" value="10"/>
                    <label for="size-4" class="label-size  label-size--4"></label>
                  </div>  
                </div>
              </div>
                <div class="paint-side-canva">
                  <canvas 
                    ref="canvas" 
                    :width="width" 
                    :height="height" 
                    @mousedown="handleMouseDown" 
                    @mousemove="handleMouseMove" 
                    @mouseup="handleMouseUp" 
                    @mouseleave="stopDrawing"
                    @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove"
                    @touchend="handleTouchEnd"
                    @contextmenu.prevent
                    :style="[canvasStyle, { cursor: cursorStyle }]"
                    class="paint-canvas"
                  ></canvas>
                  <div
                  v-show="isSelecting"
                    :class="['selection-rectangle', selectionRectangleClass]"
                    :style="selectionStyle"
                  ></div>
                  <div class="border-paint  border-paint--1"></div>
                  <div class="border-paint  border-paint--2"></div>
                  <div class="border-paint  border-paint--3"></div>
                  <div class="border-paint  border-paint--4"></div>
                </div>
            </div>
            <div class="paint-colors">
              <div class="color-selectionne">
                <!-- <input type="color" id="color-modif" v-model="color-modif"> -->
                <div class="color-preview-secondary" :style="{ backgroundColor: secondaryColor }"></div>
                <div class="color-preview" :style="{ backgroundColor: color }"></div>
                
              </div>
              
              <div class="color-pickers">
                <div class="une-couleur" style="background: #000000" @click="setColor('#000000')" @contextmenu.prevent="setSecondaryColor('#000000')"></div>
                <div class="une-couleur" style="background: #808080" @click="setColor('#808080')" @contextmenu.prevent="setSecondaryColor('#808080')"></div>
                <div class="une-couleur" style="background: #800000" @click="setColor('#800000')" @contextmenu.prevent="setSecondaryColor('#800000')"></div>
                <div class="une-couleur  hide-mobile" style="background: #808000" @click="setColor('#808000')" @contextmenu.prevent="setSecondaryColor('#808000')"></div>
                <div class="une-couleur" style="background: #008000" @click="setColor('#008000')" @contextmenu.prevent="setSecondaryColor('#008000')"></div>
                <div class="une-couleur  hide-mobile" style="background: #008080" @click="setColor('#008080')" @contextmenu.prevent="setSecondaryColor('#008080')"></div>
                <div class="une-couleur" style="background: #000080" @click="setColor('#000080')" @contextmenu.prevent="setSecondaryColor('#000080')"></div>
                <div class="une-couleur" style="background: #800080" @click="setColor('#800080')" @contextmenu.prevent="setSecondaryColor('#800080')"></div>
                <div class="une-couleur  hide-mobile" style="background: #808040" @click="setColor('#808040')" @contextmenu.prevent="setSecondaryColor('#808040')"></div>
                <div class="une-couleur" style="background: #004040" @click="setColor('#004040')" @contextmenu.prevent="setSecondaryColor('#004040')"></div>
                <div class="une-couleur  hide-mobile" style="background: #004040" @click="setColor('#004040')" @contextmenu.prevent="setSecondaryColor('#004040')"></div>
                <div class="une-couleur  hide-mobile" style="background: #004080" @click="setColor('#004080')" @contextmenu.prevent="setSecondaryColor('#004080')"></div>
                <div class="une-couleur" style="background: #8000ff" @click="setColor('#8000ff')" @contextmenu.prevent="setSecondaryColor('#8000ff')"></div>
                <div class="une-couleur  hide-mobile" style="background: #804000" @click="setColor('#804000')" @contextmenu.prevent="setSecondaryColor('#804000')"></div>

                <div class="une-couleur" style="background: #ffffff" @click="setColor('#ffffff')" @contextmenu.prevent="setSecondaryColor('#ffffff')"></div>
                <div class="une-couleur  hide-mobile" style="background: #c0c0c0" @click="setColor('#c0c0c0')" @contextmenu.prevent="setSecondaryColor('#c0c0c0')"></div>
                <div class="une-couleur" style="background: #ff0000" @click="setColor('#ff0000')" @contextmenu.prevent="setSecondaryColor('#ff0000')"></div>
                <div class="une-couleur" style="background: #ffff00" @click="setColor('#ffff00')" @contextmenu.prevent="setSecondaryColor('#ffff00')"></div>
                <div class="une-couleur" style="background: #00ff00" @click="setColor('#00ff00')" @contextmenu.prevent="setSecondaryColor('#00ff00')"></div>
                <div class="une-couleur" style="background: #00ffff" @click="setColor('#00ffff')" @contextmenu.prevent="setSecondaryColor('#00ffff')"></div>
                <div class="une-couleur" style="background: #0000ff" @click="setColor('#0000ff')" @contextmenu.prevent="setSecondaryColor('#0000ff')"></div>
                <div class="une-couleur" style="background: #ff00ff" @click="setColor('#ff00ff')" @contextmenu.prevent="setSecondaryColor('#ff00ff')"></div>
                <div class="une-couleur  hide-mobile" style="background: #ffff80" @click="setColor('#ffff80')" @contextmenu.prevent="setSecondaryColor('#ffff80')"></div>
                <div class="une-couleur  hide-mobile" style="background: #00ff80" @click="setColor('#00ff80')" @contextmenu.prevent="setSecondaryColor('#00ff80')"></div>
                <div class="une-couleur  hide-mobile" style="background: #80ffff" @click="setColor('#80ffff')" @contextmenu.prevent="setSecondaryColor('#80ffff')"></div>
                <div class="une-couleur  hide-mobile" style="background: #8080ff" @click="setColor('#8080ff')" @contextmenu.prevent="setSecondaryColor('#8080ff')"></div>
                <div class="une-couleur" style="background: #ff0080" @click="setColor('#ff0080')" @contextmenu.prevent="setSecondaryColor('#ff0080')"></div>
                <div class="une-couleur  hide-mobile" style="background: #ff8040" @click="setColor('#ff8040')" @contextmenu.prevent="setSecondaryColor('#ff8040')"></div>
              </div>
              
            </div>
        </div>
        <div class="resize-handle"></div>
    </section>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import textIcon from '@/assets/images/icon-paint.png';

import paint1 from '@/assets/images/paint/paint-select1.png';
import paint2 from '@/assets/images/paint/paint-select2.png';
import paint3 from '@/assets/images/paint/paint-erase.png';
import paint4 from '@/assets/images/paint/paint-paint.png';
import paint5 from '@/assets/images/paint/paint-pip.png';
import paint6 from '@/assets/images/paint/paint-zoom.png';
import paint7 from '@/assets/images/paint/paint-pen.png';
import paint8 from '@/assets/images/paint/paint-painting.png';
import paint9 from '@/assets/images/paint/paint-brush.png';
import paint10 from '@/assets/images/paint/paint-letter.png';
import paint11 from '@/assets/images/paint/paint-line.png';
import paint12 from '@/assets/images/paint/paint-line2.png';
import paint13 from '@/assets/images/paint/paint-rect.png';
import paint14 from '@/assets/images/paint/paint-shape.png';
import paint15 from '@/assets/images/paint/paint-ellipse.png';
import paint16 from '@/assets/images/paint/paint-egg.png';

import penCursor      from '@/assets/images/paint/cursor-pen.png';
import brushCursor    from '@/assets/images/paint/cursor-brush.png';
import eraserCursor   from '@/assets/images/paint/cursor-eraser.png';
import fillCursor     from '@/assets/images/paint/cursor-fill.png';
import pipetteCursor  from '@/assets/images/paint/cursor-pipette.png';
import paintingCursor from '@/assets/images/paint/cursor-painting.png';


export default {
  name: 'Paint',
  emits: ['update-class', 'close', 'resize', 'reduct'],
  components: {
    Navigation,
  },
  props: {
    context: {
      type: String,
      default: 'paint'
    },
    title: {
      type: String,
      default: 'paint'
    },
    customClass: {
      type: String,
      default: 'kp_element--incons-zone'
    }
  },
  data() {
    return {
        windowStateClass: 'kp_item_window_hide',
        drawing: false,
        canvasContext: null,
        width: 900,
        height: 900,
        toolSizes: {
            pen: 4,   
            brush: 10,
            paintbrush: 15 
        },
        toolCursors: {
          pen: penCursor,
          brush: brushCursor,
          eraser: eraserCursor,
          fill: fillCursor,
          pipette: pipetteCursor,
          painting: paintingCursor,
          rect: 'crosshair',
          ellipse: 'crosshair',
          line: 'crosshair',
          select: 'crosshair',
        },
        currentTool: 'pen',
        lineWidth: 1,
        textIcon,
        color: '#000000',
        secondaryColor: '#FFFFFF', 
        isDrawingComplete: false,
        isSelecting: false,
        activeDrawing: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        canvasScale: 1,
        previewLine: null,
        needsUpdate: false,
        tools: [
            { name: 'select1', icon: paint1 },
            { name: 'select', icon: paint2 },
            { name: 'eraser', icon: paint3 },
            { name: 'fill', icon: paint4 },
            { name: 'pipette', icon: paint5 },
            { name: 'zoom', icon: paint6 },
            { name: 'pen', icon: paint7 },
            { name: 'painting', icon: paint8 },
            { name: 'brush', icon: paint9 },
            { name: 'letter', icon: paint10 },
            { name: 'line', icon: paint11 },
            { name: 'line2', icon: paint12 },
            { name: 'rect', icon: paint13 },
            { name: 'shape', icon: paint14 },
            { name: 'ellipse', icon: paint15 },
            { name: 'egg', icon: paint16 },
        ]
    };
},
  methods: {
    handleClose() {
      this.$emit('update-class', 'kp_item_hide');
      this.$emit('close');
    },
    handleResize() {
      this.windowStateClass = this.windowStateClass === 'kp_item_resize' ? '' : 'kp_item_resize';
      this.$emit('update-class', this.windowStateClass);
    },
    handleReduct() {
      this.$emit('update-class', 'kp_item_reduct');
    },
    clearCanvas() {
        const canvas = this.$refs.canvas;
        const context = this.canvasContext;
        context.clearRect(0, 0, canvas.width, canvas.height);
    },
    toggleZoom() {
      this.canvasScale = this.canvasScale === 1 ? 1.4 : 1;
    },


    handleTouchStart(event) {
      const touch = event.touches[0];
      const { offsetX, offsetY } = this.getCanvasCoords(touch.clientX, touch.clientY);
      this.handleMouseDown({ offsetX, offsetY });
    },
    handleTouchMove(event) {
      const touch = event.touches[0];
      const { offsetX, offsetY } = this.getCanvasCoords(touch.clientX, touch.clientY);
      this.handleMouseMove({ offsetX, offsetY });
    },
    handleTouchEnd() {
      this.handleMouseUp();
    },
    getCanvasCoords(clientX, clientY) {
    const canvas = this.$refs.canvas;
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: clientX - rect.left,
      offsetY: clientY - rect.top
    };
  },
    /* --------------------------------------------------- */
    /* Sélection et dessin */
    handleMouseDown(event) {
      if (!this.needsUpdate) {
        this.needsUpdate = true;
        requestAnimationFrame(() => {
            this.needsUpdate = false; // Réinitialise après le rendu
          this.activeDrawing = true;
          this.startX = event.offsetX;
          this.startY = event.offsetY;
          
          if (this.currentTool === 'rect' || this.currentTool === 'ellipse' || this.currentTool === 'line' || this.currentTool === 'select') {
              this.isDrawingShape = true;
              this.isSelecting = true; 
              this.currentX = this.startX;
              this.currentY = this.startY;
          } else {
              this.startDrawing(event); 
          }

          document.addEventListener('mousemove', this.handleMouseMove);
          document.addEventListener('mouseup', this.stopDrawing);
        });
      }
    },
    handleMouseMove(event) {
        if (this.isDrawingShape && this.isSelecting) {
          this.currentX = event.offsetX;
          this.currentY = event.offsetY;
        } else if (this.drawing) {
          if (this.currentTool === 'line') {
            this.previewLine = { startX: this.startX, startY: this.startY, endX: event.offsetX, endY: event.offsetY };
            this.drawPreviewLine();
          } else {
            this.draw(event);
          }
        }
    },
    drawPreviewLine() {
      if (!this.previewLine) return;
      const { startX, startY, endX, endY } = this.previewLine;
      this.clearCanvas();
      this.canvasContext.beginPath();
      this.canvasContext.moveTo(startX, startY);
      this.canvasContext.lineTo(endX, endY);
      this.canvasContext.strokeStyle = this.color;
      this.canvasContext.lineWidth = this.lineWidth;
      this.canvasContext.stroke();
      this.canvasContext.closePath();
    },
    handleMouseLeave(event) {
      if (this.currentTool === 'line') {
        this.previewLine = null;
      }
      if (this.currentTool !== 'line') {
        this.stopDrawing(event);
      }
    },
    handleMouseUp(event) {
      if (!this.isDrawingComplete && this.isDrawingShape) {
        this.endOverlay(event);
      } else {
        this.stopDrawing(event);
      }
    },

    startOverlay(event) {
        if (!this.isDrawingShape && (this.currentTool === 'select' || this.currentTool === 'rect' || this.currentTool === 'ellipse')) {
            this.isDrawingShape = true;
            this.isSelecting = true;
            this.isDrawingComplete = false;
            this.startX = event.offsetX;
            this.startY = event.offsetY;
            this.currentX = this.startX;
            this.currentY = this.startY;
        }
    },

    updateOverlay(event) {
        if (this.isDrawingShape) {
            this.currentX = event.offsetX;
            this.currentY = event.offsetY;
        }
    },

    endOverlay(event) {
        if (this.isDrawingShape) {
            const endX = event.offsetX;
            const endY = event.offsetY;

            if (this.currentTool === 'rect') {
                this.drawRectangle(this.startX, this.startY, endX, endY);
            } else if (this.currentTool === 'ellipse') {
                this.drawEllipse(this.startX, this.startY, endX, endY);
            }

            this.isDrawingShape = false;
            this.isSelecting = false;
            this.isDrawingComplete = true;

            document.removeEventListener('mousemove', this.updateOverlay);
            document.removeEventListener('mouseup', this.endOverlay);
        }
    },
    drawRectangle(startX, startY, endX, endY) {
      const width = endX - startX;
      const height = endY - startY;
      this.canvasContext.beginPath();
      this.canvasContext.rect(startX, startY, width, height);
      this.canvasContext.strokeStyle = this.color;
      this.canvasContext.lineWidth = this.lineWidth;
      this.canvasContext.stroke();
    },

    drawEllipse(startX, startY, endX, endY) {
      const centerX = (startX + endX) / 2;
      const centerY = (startY + endY) / 2;
      const radiusX = Math.abs(endX - startX) / 2;
      const radiusY = Math.abs(endY - startY) / 2;
      this.canvasContext.beginPath();
      this.canvasContext.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      this.canvasContext.strokeStyle = this.color;
      this.canvasContext.lineWidth = this.lineWidth;
      this.canvasContext.stroke();
    },

    /* --------------------------------------------------- */
    /* Sélection */
    startSelection(event) {
      this.isSelecting = true;
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.currentX = this.startX;
      this.currentY = this.startY;
    },
    updateSelection(event) {
      if (this.isSelecting) {
        this.currentX = event.offsetX;
        this.currentY = event.offsetY;
      }
    },
    endSelection() {
      if (this.isSelecting) {
        this.isSelecting = false;
      }
    },

    /* --------------------------------------------------- */
    /* Remplissage de zone */
    fillArea(startX, startY, color) {
    const canvas = this.$refs.canvas;
    const context = this.canvasContext;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const width = imageData.width;
    const height = imageData.height;
    const stack = [[startX, startY]];  // Utilisation d'une pile pour éviter la récursivité excessive

    const targetColor = this.getPixelColor(imageData, startX, startY);
    const fillColor = this.colorToRGBA(color);

    if (this.colorsMatch(targetColor, fillColor)) return;

    const maxDepth = 5000; // Limiter la profondeur pour éviter les ralentissements

    while (stack.length > 0) {
        let [x, y] = stack.pop();
        if (stack.length > maxDepth) break;

        let currentPixel = (y * width + x) * 4;

        // Parcours vers le haut pour trouver la limite de la zone
        while (y >= 0 && this.colorsMatch(targetColor, [
            imageData.data[currentPixel],
            imageData.data[currentPixel + 1],
            imageData.data[currentPixel + 2],
            imageData.data[currentPixel + 3]
        ])) {
            y--;
            currentPixel -= width * 4;
        }

        currentPixel += width * 4;
        y++;

        let reachLeft = false;
        let reachRight = false;

        // Parcours vers le bas pour remplir la zone et vérifier les limites latérales
        while (y < height && this.colorsMatch(targetColor, [
            imageData.data[currentPixel],
            imageData.data[currentPixel + 1],
            imageData.data[currentPixel + 2],
            imageData.data[currentPixel + 3]
        ])) {
            this.setPixelColor(imageData, x, y, fillColor);

            if (x > 0 && this.colorsMatch(this.getPixelColor(imageData, x - 1, y), targetColor)) {
                if (!reachLeft) {
                    stack.push([x - 1, y]);
                    reachLeft = true;
                }
            } else {
                reachLeft = false;
            }

            if (x < width - 1 && this.colorsMatch(this.getPixelColor(imageData, x + 1, y), targetColor)) {
                if (!reachRight) {
                    stack.push([x + 1, y]);
                    reachRight = true;
                }
            } else {
                reachRight = false;
            }

            y++;
            currentPixel += width * 4;
        }
    }

    context.putImageData(imageData, 0, 0);
},
getPixelColor(imageData, x, y) {
  const index = (y * imageData.width + x) * 4;
  return [
    imageData.data[index],
    imageData.data[index + 1],
    imageData.data[index + 2],
    imageData.data[index + 3],
  ];
},

setPixelColor(imageData, x, y, color) {
  const index = (y * imageData.width + x) * 4;
  imageData.data[index] = color[0];
  imageData.data[index + 1] = color[1];
  imageData.data[index + 2] = color[2];
  imageData.data[index + 3] = color[3];
},

colorsMatch(color1, color2) {
  return color1[0] === color2[0] &&
         color1[1] === color2[1] &&
         color1[2] === color2[2] &&
         color1[3] === color2[3];
},

colorToRGBA(color) {
    if (color.startsWith("#")) {
      const bigint = parseInt(color.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b, 255];
    }
    return [0, 0, 0, 255]; // Couleur par défaut en cas d'erreur
  },

    colorsMatch(color1, color2) {
      return color1[0] === color2[0] &&
             color1[1] === color2[1] &&
             color1[2] === color2[2] &&
             color1[3] === color2[3];
    },

    hexToRGBA(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b, 255];
    },
    rgbToHex(r, g, b) {
      return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
    },

    /* --------------------------------------------------- */
    /* Pipette */
    pickColor(x, y, button) {
      const canvas = this.$refs.canvas;
      const context = this.canvasContext;
      const pixelData = context.getImageData(x, y, 1, 1).data;
      const [r, g, b, a] = pixelData;
      if (a === 0) {
        return;
      }
      const hexColor = this.rgbToHex(r, g, b);
      if (button === 2) {
        this.secondaryColor = hexColor;
      } else {
        this.color = hexColor;
      }
    },
    setColor(newColor) {
      this.color = newColor;
    },
    setSecondaryColor(newColor) {
      this.secondaryColor = newColor;
    },

    /* --------------------------------------------------- */
    /* Outils de dessin */
    selectTool(toolName) {
      this.currentTool = toolName;
        if (toolName === 'zoom') {
          this.toggleZoom();
         }
    },

    /* --------------------------------------------------- */
    /* Dessin */
    startDrawing(event) {
      if (!this.activeDrawing) return;
      this.drawing = true;
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      
      this.currentColor = (event.button === 2) ? this.secondaryColor : this.color;
      
      this.currentColor = this.currentTool === 'eraser' ? '#FFFFFF' : this.currentColor;

      if (this.currentTool === 'pipette') {
        this.pickColor(this.startX, this.startY, event.button);
        return;
      }
      
      if (this.currentTool === 'fill') {
        this.fillArea(this.startX, this.startY, this.currentColor);
        return;
      }
      if (this.currentTool === 'pen' || this.currentTool === 'painting' || this.currentTool === 'paint_brush') {
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.startX, this.startY);
      }

      switch (this.currentTool) {
        case 'pen':
        case 'painting':
          this.canvasContext.beginPath();
          this.canvasContext.moveTo(this.startX, this.startY);
          break;

        case 'eraser':
          // this.canvasContext.clearRect(this.startX, this.startY, this.lineWidth, this.lineWidth);
          
          this.canvasContext.beginPath();
          this.canvasContext.moveTo(this.startX, this.startY);
          break;

        case 'line':
        case 'curve':
        case 'rect':
        case 'polygon':
        case 'ellipse':
        case 'rounded-rect':
          break;

        case 'text':
          break;

        case 'pipette':
          const pixelData = this.canvasContext.getImageData(this.startX, this.startY, 1, 1).data;
          this.color = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
          break;

        default:
          break;
      }

      document.addEventListener('mousemove', this.draw);
      document.addEventListener('mouseup', this.stopDrawing);
    },


    draw(event) {
      if (!this.drawing || this.currentTool === 'line' || this.currentTool === 'rect' || this.currentTool === 'ellipse') return;
     
      
      const drawingColor = this.currentTool === 'eraser' ? '#FFFFFF' : this.currentColor;
      this.canvasContext.strokeStyle = this.currentColor;
      this.canvasContext.lineWidth = this.effectiveLineWidth;
      
    
      switch (this.currentTool) {
        case 'pen':
          this.canvasContext.lineTo(event.offsetX, event.offsetY);
          this.canvasContext.lineWidth = this.lineWidth;
          this.canvasContext.stroke();
          break;

        case 'painting':
            this.canvasContext.lineTo(event.offsetX, event.offsetY);
            this.canvasContext.stroke();
            break;

        case 'eraser':
          
          // this.canvasContext.clearRect(event.offsetX, event.offsetY, this.lineWidth, this.lineWidth);
          this.canvasContext.lineTo(event.offsetX, event.offsetY);
          this.canvasContext.stroke();
          break;

        case 'brush':
          for (let i = 0; i < 10; i++) {
            const offsetX = event.offsetX + (Math.random() - 0.5) * this.lineWidth * 5;
            const offsetY = event.offsetY + (Math.random() - 0.5) * this.lineWidth * 5;
            this.canvasContext.fillStyle = this.currentColor;
            this.canvasContext.fillRect(offsetX, offsetY, 1, 1);
          }
          break;

        default:
          break;
      }
    },

    stopDrawing(event) {
      this.drawing = false;
      this.canvasContext.lineWidth = this.effectiveLineWidth;
      document.removeEventListener('mousemove', this.draw);
      document.removeEventListener('mouseup', this.stopDrawing);
      const endX = event.offsetX;
      const endY = event.offsetY;

      if (this.startX === 0 && this.startY === 0) return;

      switch (this.currentTool) {
        case 'pen':
        case 'painting':
          this.canvasContext.closePath();
          break;

        case 'line':

          const endX = event.offsetX;
          const endY = event.offsetY;
          this.canvasContext.beginPath();
          this.canvasContext.moveTo(this.startX, this.startY);
          this.canvasContext.lineTo(endX, endY);
          this.canvasContext.strokeStyle = this.color;
          this.canvasContext.lineWidth = this.lineWidth;
          this.canvasContext.stroke();
          this.canvasContext.closePath();
          break;

        case 'rect':
          this.canvasContext.strokeStyle = this.color;
          this.canvasContext.lineWidth = this.lineWidth;
          this.canvasContext.strokeRect(this.startX, this.startY, endX - this.startX, endY - this.startY);
          break;

        case 'ellipse':
          const centerX = (this.startX + endX) / 2;
          const centerY = (this.startY + endY) / 2;
          const radiusX = Math.abs(endX - this.startX) / 2;
          const radiusY = Math.abs(endY - this.startY) / 2;
          this.canvasContext.beginPath();
          this.canvasContext.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
          this.canvasContext.strokeStyle = this.color;
          this.canvasContext.lineWidth = this.lineWidth;
          this.canvasContext.stroke();
          break;

        case 'text':
          const text = prompt("Entrez votre texte :");
          if (text) {
            this.canvasContext.font = `${this.lineWidth * 5}px Arial`;
            this.canvasContext.fillStyle = this.color;
            this.canvasContext.fillText(text, this.startX, this.startY);
          }
          break;

        case 'polygon':
          this.canvasContext.beginPath();
          this.canvasContext.moveTo(this.startX, this.startY);
          this.canvasContext.lineTo((this.startX + endX) / 2, endY);
          this.canvasContext.lineTo(endX, this.startY);
          this.canvasContext.closePath();
          this.canvasContext.strokeStyle = this.color;
          this.canvasContext.lineWidth = this.lineWidth;
          this.canvasContext.stroke();
          break;

        case 'rounded-rect':
          const rectWidth = endX - this.startX;
          const rectHeight = endY - this.startY;
          const radius = 20;
          this.canvasContext.beginPath();
          this.canvasContext.moveTo(this.startX + radius, this.startY);
          this.canvasContext.arcTo(this.startX + rectWidth, this.startY, this.startX + rectWidth, this.startY + rectHeight, radius);
          this.canvasContext.arcTo(this.startX + rectWidth, this.startY + rectHeight, this.startX, this.startY + rectHeight, radius);
          this.canvasContext.arcTo(this.startX, this.startY + rectHeight, this.startX, this.startY, radius);
          this.canvasContext.arcTo(this.startX, this.startY, this.startX + rectWidth, this.startY, radius);
          this.canvasContext.strokeStyle = this.color;
          this.canvasContext.lineWidth = this.lineWidth;
          this.canvasContext.stroke();
          break;

        default:
          break;
      }
      this.startX = 0;
      this.startY = 0;
      this.isSelecting = false;

      document.removeEventListener('mousemove', this.draw);
      document.removeEventListener('mouseup', this.stopDrawing);
    },
    clearCanvas() {
      this.canvasContext.clearRect(0, 0, this.width, this.height);
    }
  },
  beforeDestroy() {
    window.removeEventListener('mouseleave', this.stopDrawing);
  },
  mounted() {
      const canvas = this.$refs.canvas;
      this.canvasContext = canvas.getContext("2d", { willReadFrequently: true });
      this.canvasContext.lineCap = "round";
      this.currentTool = 'pen';
      this.lineWidth = 1;

      // Ajuste la largeur et la hauteur pour mobile en prenant 90% de l'écran
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      this.width = screenWidth < 900 ? screenWidth * 0.9 : 900;
      this.height = this.width;

      canvas.width = this.width;
      canvas.height = this.height;

      this.canvasContext.fillStyle = "#FFFFFF";
      this.canvasContext.fillRect(0, 0, canvas.width, canvas.height);
      
      window.addEventListener('mouseleave', (event) => {
        if (this.activeDrawing) {
          this.stopDrawing(event); 
        }
      });
    },
  
    computed: {
      cursorStyle() {
        const cursor = this.toolCursors[this.currentTool];
        return cursor ? `url(${cursor}) 16 16, auto` : 'default';
      },
      canvasStyle() {
        return {
          transform: `scale(${this.canvasScale})`,
          transformOrigin: 'top left', 
        };
      },
      selectionStyle() {
        const x = Math.min(this.startX, this.currentX);
        const y = Math.min(this.startY, this.currentY);
        const width = Math.abs(this.currentX - this.startX);
        const height = Math.abs(this.currentY - this.startY);

        if (this.currentTool === 'select') {
          return {
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            border: '1px dashed #000',
            backgroundColor: 'rgba(0, 0, 255, 0.2)',
          };
        } else if (this.currentTool === 'rect') {
          return {
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            border: '1px dashed #000',
            backgroundColor: 'rgba(0, 0, 255, 0.0)',
          };
        }else if (this.currentTool === 'ellipse') {
          return {
            left: `${x}px`,
            top: `${y}px`,
            width: `${width}px`,
            height: `${height}px`,
            border: '1px dashed #000',
            backgroundColor: 'rgba(0, 0, 255, 0.0)',
            borderRadius: '50%',
          };
        }
        return {};
      },
      effectiveLineWidth() {
        return this.currentTool === 'painting' ? this.lineWidth * 5 : this.lineWidth;
      },
      cursorStyle() {
      const cursor = this.toolCursors[this.currentTool];
        return cursor && cursor.includes('.png') 
          ? `url(${cursor}) 16 16, auto` 
          : cursor || 'aircross'; 
      },
      selectionRectangleClass() {
        switch (this.currentTool) {
            case 'select':
                return 'selection-select';
            case 'rect':
                return 'selection-rect';
            case 'ellipse':
                return 'selection-ellipse';
            default:
                return '';
        }
      },
      selectionStyle() {
        const x = Math.min(this.startX, this.currentX);
        const y = Math.min(this.startY, this.currentY);
        const width = Math.abs(this.currentX - this.startX);
        const height = Math.abs(this.currentY - this.startY);

        if (this.currentTool === 'select') {
            return {
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: '1px dashed #000',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
            };
        } else if (this.currentTool === 'rect') {
            return {
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: '2px solid #000',
                border: `${this.lineWidth}px solid ${this.isUsingSecondaryColor ? this.secondaryColor : this.color}`,
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
            };
        } else if (this.currentTool === 'ellipse') {
            return {
                left: `${x}px`,
                top: `${y}px`,
                width: `${width}px`,
                height: `${height}px`,
                border: `${this.lineWidth}px solid ${this.isUsingSecondaryColor ? this.secondaryColor : this.color}`,
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                borderRadius: '50%',
            };
        }
        return {};
    },
  }
}
</script>

<style scoped>
.kp_window--show{
  display: block !important;
  overflow: hidden;
}
.kp_content--block--content{
  overflow: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
  position: relative;
}
.kp_content--block{
  max-width: none !important;
}

.kp_image-text--show,
.kp_text--show{
  display: block;
}
.kp_content--block--content{
  overflow: scroll;
  overflow: scroll;
  width: 100%;
  height: calc(100% - 11px);
  transition: 0.3s;
}
.kp_content--block{
  position: absolute;
  font-size: 14px;
  letter-spacing: 0px;
  color: black;
  max-width: 800px;
  width: 1200px;
  height: 1100px;
  background: #eeecdf;
  position: absolute;
}


@media screen and (max-width: 900px){
  .kp_content--block--content{
    overflow-y: scroll;
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




.paint-side-canva{    
  width: fit-content;
  height: fit-content;
  /* overflow: hidden; */
  position: relative;
  padding-right: 8px;
  padding-bottom: 8px;
}

.paint-canvas{
  width: 900px;
  height: 900px;
  background-color: #FFFFFF;
  position: relative;
  top: 5px;
  left: 5px;
  border: none;
  cursor: crosshair;
}


.paint-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
}
canvas {
  border: 1px solid #000;
}
.outils-paint{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #aca899;
    height: 277px;
    width: 70px;
    background: #ece9d8;
    padding: 10px;
}
.paint-content{
    display: flex;
    height: 100%;
    width: 100%;
    background: #808080;
}
.paint-tool{
  border: 1px solid #FFFFFF00;
  width: calc(50% - 2px);
  cursor: pointer;
}

.selected-tool {
  border: 1px solid #7a98af;
  border-radius: 3px;
  background: #ffffff;
}
.kp_icon_zone--paint:hover{
  border: 1px solid #7a98af7d;
}
.outils-left{
  background: #ece9d8;
}
.border-paint{
    position: absolute;
    width: 3px;
    height: 3px;
    background-color: #FFFFFF;
    position: absolute;
}
.border-paint--1{
    top: 2px;
    left: 2px;
}
.border-paint--2{
    top: 2px;
    right: 0px;
}
.border-paint--3{
    bottom: 0px;
    left: 2px;
} 
.border-paint--4{
    bottom: 0px;
    right: 0px;
}
.paint-colors{
  position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    background: #ece9d8;
    border-top: solid 1px #aca899;
    display: flex;
}
.une-couleur{
  border-top: solid 2px #000000;
  border-left: solid 2px #000000;
  border-bottom: solid 2px #cecece;
  border-right: solid 2px #cecece;

}
.color-selectionne{
    padding: 18px;
    background-color: white;
    width: fit-content;
    border-top: solid 2px #000000;
    border-left: solid 2px #000000;
    border-bottom: solid 2px #cecece;
    border-right: solid 2px #cecece;
    position: relative;
    left: 15px;
    top: 22px;
    width: 10px;
    height: 10px;
}
.color-preview-secondary{
  background-color: rgb(255, 255, 255);
    width: 18px;
    height: 18px;
    border: solid 2px #ece9d8;
    box-shadow: 2px 2px 0 0 #aca899;
    position: absolute;
    right: 6px;
    bottom: 6px;
}
.color-preview{
  background-color: rgb(0, 0, 0);
    width: 18px;
    height: 18px;
    border: solid 2px #ece9d8;
    box-shadow: 2px 2px 0 0 #aca899;
    position: absolute;
    top: 6px;
    left: 6px;

}
.color-pickers{    
  padding: 20px;
    width: fit-content;
    position: relative;
    left: 0px;
    top: 3px;
    width: 12px;
    height: 12px;
    display: flex;
    /* flex-direction: column-reverse; */
    /* align-content: flex-start; */
    width: 100%;
    flex-wrap: wrap;
    max-width: 360px;
}
.une-couleur{
  border: solid 2px #ece9d8;
  box-shadow: -2px -2px 0 0 #aca899;
  width:21px;
  height: 21px;
  border-top:solid 2px #000000;
  border-left: solid 2px #000000;
  cursor: pointer;
}
.kp_content--block--content{
  height: calc(100% - 66px);
}
.size-paint{
  border-top: solid 1px #aca899;
  border-left: solid 1px #aca899;
  border-right: solid 1px #ffffff;
  border-bottom: solid 1px #ffffff;
  margin: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  align-items: center;
  height: 110px;
}
.input-size{
  display: none;
}
.label-size{
  width:  19px;
  height: 19px;
  position: relative;
}
.label-size:after{
  content:"";
  width:  5px;
  height: 5px;
  position: absolute;
  background-color: #000000;
}
.label-size--1:after{
  width:  5px;
  height: 5px;
  left:7px;
  top:7px;
}
.label-size--2:after{
  width:  8px;
  height: 8px;
  left:5px;
  top:5px;
}
.label-size--3:after{
  width:  11px;
  height: 11px;
  left:4px;
  top:4px;
}
.label-size--4:after{
  width: 15px;
  height: 15px;
  left:2px;
  top:2px;
}
.input-size:checked + .label-size{
  background-color: #0078d7;
}
.input-size:checked + .label-size:after{
  background-color: #FFFFFF;
}
.selection-rectangle {
  position: absolute;
  pointer-events: none; /* Ignore les événements */
}

.tool-name--select1,
.tool-name--shape,
.tool-name--egg,
.tool-name--line2,
.tool-name--letter{
  pointer-events: none;
  filter: brightness(1.5);
    background: #5f5d57;
    opacity: 0.3;
}

.selection-rectangle {
    position: absolute;
    pointer-events: none;
    background-color: none;
}
@media screen and (max-width:960px){
  .paint-content{
      display: flex;
      height: 100%;
      width: 100%;
      background: #808080;
      flex-direction: column;
      
  }
  .size-paint{
    flex-direction: row;
    padding: 0px;
    height: 40px; 
  }
  .outils-paint{
    display: flex;
    height: 78px;
    width: 360px;
    padding: 0;
  }
  .paint-tool{
    width: 42px;
  }
  .kp_content--block--content.kp_element--enable{
    overflow: hidden;

  }
  .kp_paint{
    height: calc(100vh - 47px) !important;
  }
  .paint-colors{
    bottom: 30px;
  }
  .une-couleur{
    width: 30px;
    height: 30px;
  }
  .hide-mobile{
    display:none; 
  }
  .kp_content--block{
    width: calc(100vw - 50px) !important;
  }
  .color-pickers{
    max-width: 290px;
  }
  .paint-canvas {
    width: 100%;
    height: auto; 
    max-width: 100vw;
    background-color: #FFFFFF;
    cursor: crosshair;
  }
  .paint-side-canva{
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    position: relative;
    padding-right: 8px;
    padding-bottom: 8px;
    height: calc(100vh - 370px);
  }

  .tool-name--ellipse,
  .tool-name--fill,
  .tool-name--rect{
    pointer-events: none;
    filter: brightness(1.5);
    background: #5f5d57;
    opacity: 0.3;
  }
}


</style>
<template>
    <!-- Démineur -->
    <section
        :class="['kp_content--block', 'kp_z-index', 'kp_changed__id', `kp_${context}`, 'kp_item__window', windowStateClass]"
        :id="`kp_${context}`">
        <div class="kp_element--title">
            <div class="kp_element--icon-title">
                <p class="kp_element--title-p kp_element--enable">
                <div class="kp_element_title--icn">
                    <img class="kp_icon_zone--img" :src="textIcon" alt="text">
                </div>
                <span>Kévin Prévost - Démineur</span>
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
                        <ul class="fake-sous-menu  difficulty-list">
                            <li @click="changeDifficulty('easy')"
                                :class="['fake-sous-menu--li', 'p-texte', 'li-difficulte', { active: selectedDifficulty === 'easy' }]">
                                Facile
                            </li>
                            <li @click="changeDifficulty('medium')"
                                :class="['fake-sous-menu--li', 'p-texte', 'li-difficulte', { active: selectedDifficulty === 'medium' }]">
                                Moyen
                            </li>
                            <li @click="changeDifficulty('hard')"
                                :class="['fake-sous-menu--li', 'p-texte', 'li-difficulte', { active: selectedDifficulty === 'hard' }]">
                                Difficile
                            </li>
                        </ul>
                    </li>
                    <li class="liste-fake-menu--li">?</li>
                </ul>
            </div>
        </section>


        <div class="kp_content--block--content kp_element--enable  kp_content--demineur">


            <div class="game-info-container">
                <div class="game-info  game-info-time">
                    <p class="game-info-p">{{ formatNumber(flagsLeft) }}</p>
                </div>
                <div @click="initializeBoard" class="new-game-button"
                    :class="['new-game-button', { 'face-game-over': isGameOver }]">
                    <img :src="smile" :class="['dem-smile']" alt="smile" />
                    <img :src="sad" :class="['dem-sad']" alt="smile" />
                </div>
                <div class="game-info  game-info-time">
                    <p class="game-info-p">{{ formatNumber(timer) }}</p>
                </div>
            </div>


            <section :class="['game-container', { 'game-over': isGameOver }]">
                <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
                    <div v-for="(cell, colIndex) in row" :key="colIndex" class="cell" :class="[
                        { revealed: cell.revealed },
                        { mine: cell.mine },
                        { exploded: cell.exploded },
                        { flagged: cell.flagged },
                        { disabled: isGameOver }
                    ]" @click="handleCellClick(rowIndex, colIndex)"
                        @contextmenu.prevent="toggleFlag(rowIndex, colIndex)">
                        <span v-if="cell.revealed && !cell.mine"
                            :class="['text', cell.adjacentMines ? `text-${cell.adjacentMines}` : 'text-default']"
                            :style="{ color: colors[cell.adjacentMines] || 'black' }">
                            {{ cell.adjacentMines }}
                        </span>
                        <img v-if="cell.flagged" :src="flag" class="dem-flag" alt="flag" />
                        <img v-if="cell.mine && cell.exploded" :src="minefake" class="dem-mine-fake" alt="fake mine" />
                        <img v-if="cell.mine && !cell.exploded" :src="mine" class="dem-mine" alt="mine" />
                    </div>
                </div>
                <div v-if="gameMessage" class="game-message">{{ gameMessage }}</div>
            </section>

        </div>
        <div class="resize-handle"></div>
    </section>
    <!-- Démineur -->
</template>

<script>

import Navigation from '@/components/Navigation.vue';
import textIcon from '@/assets/images/icon-demineur.png';

import flag from '@/assets/images/dem-flag.png';
import mine from '@/assets/images/dem-bomb.png';
import minefake from '@/assets/images/dem-bomb-fake.png';
import smile from '@/assets/images/dem-smile.png';
import sad from '@/assets/images/dem-sad.png';

export default {
    name: 'Media',
    emits: ['update-class', 'close', 'resize', 'reduct'],
    components: {
        Navigation,
    },

    props: {
        context: {
            type: String,
            default: 'demineur'
        },
        title: {
            type: String,
            default: 'demineur'
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
            board: [],
            rows: 10,
            cols: 10,
            mines: 15,
            flag,
            mine,
            minefake,
            timer: 0,
            flagsLeft: 0,
            gameMessage: '',
            intervalId: null,
            isGameOver: false,
            hasGameStarted: false,
            selectedDifficulty: 'easy',
            smile,
            sad,

            colors: {
                0: '#00000000',
                1: '#0000ff',
                2: '#008000',
                3: '#ff0000',
                4: '#00007b',
                5: '#822424',
            },
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
        formatNumber(value) {
            return value.toString().padStart(3, '0');
        },
        changeDifficulty(difficulty) {
            this.selectedDifficulty = difficulty;
            // Logique de changement de difficulté ici...
            if (difficulty === 'easy') {
                this.rows = 8;
                this.cols = 8;
                this.mines = 10;
            } else if (difficulty === 'medium') {
                this.rows = 12;
                this.cols = 12;
                this.mines = 20;
            } else if (difficulty === 'hard') {
                this.rows = 16;
                this.cols = 16;
                this.mines = 40;
            }
            this.initializeBoard();
        },

        startTimer() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }

            this.intervalId = setInterval(() => {
                if (!this.isGameOver) {
                    this.timer++;
                } else {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }, 1000);
        },

        initializeBoard() {

            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
            this.timer = 0;
            this.intervalId = setInterval(() => {
                this.timer++;
            }, 1000);

            this.hasGameStarted = false;
            this.flagsLeft = this.mines;
            this.gameMessage = '';

            this.board = Array.from({ length: this.rows }, () =>
                Array.from({ length: this.cols }, () => ({
                    revealed: false,
                    mine: false,
                    flagged: false,
                    exploded: false,
                    adjacentMines: 0,
                }))
            );

            let placedMines = 0;
            while (placedMines < this.mines) {
                const row = Math.floor(Math.random() * this.rows);
                const col = Math.floor(Math.random() * this.cols);
                if (!this.board[row][col].mine) {
                    this.board[row][col].mine = true;
                    placedMines++;
                }
            }

            this.board.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (!cell.mine) {
                        cell.adjacentMines = this.countAdjacentMines(rowIndex, colIndex);
                    }
                });
            });

        },

        checkVictory() {
            const allMinesFlagged = this.board.every(row =>
                row.every(cell =>
                    (cell.mine && cell.flagged) || (!cell.mine && cell.revealed)
                )
            );

            if (allMinesFlagged) {
                this.gameMessage = 'Bravo, vous avez gagné !';
                this.isGameOver = true;
            }
        },
        toggleFlag(row, col) {
            console.log(this.isGameOver);
            if (this.isGameOver) return;

            const cell = this.board[row][col];

            if (!cell.revealed) {
                if (cell.flagged) {
                    cell.flagged = false;
                    this.flagsLeft++;
                } else if (this.flagsLeft > 0) {
                    cell.flagged = true;
                    this.flagsLeft--;

                    if (cell.mine) {
                    }
                }
            }
            this.checkVictory();
        },
        handleCellClick(row, col) {
            const cell = this.board[row][col];
            if (cell.revealed || cell.flagged) return;

            if (!this.hasGameStarted) {
                this.hasGameStarted = true;
                this.startTimer();
            }

            cell.revealed = true;
            if (cell.mine) {
                cell.exploded = true;
                this.revealAllMines();
                this.gameMessage = 'Game Over';
                this.isGameOver = true;
            } else if (cell.adjacentMines === 0) {
                this.revealAdjacentCells(row, col);
            }
            this.checkVictory();
        },
        initializeBoard() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }

            this.timer = 0;
            this.isGameOver = false;
            this.hasGameStarted = false;
            this.flagsLeft = this.mines;
            this.gameMessage = '';

            this.board = Array.from({ length: this.rows }, () =>
                Array.from({ length: this.cols }, () => ({
                    revealed: false,
                    mine: false,
                    flagged: false,
                    exploded: false,
                    adjacentMines: 0,
                }))
            );

            let placedMines = 0;
            while (placedMines < this.mines) {
                const row = Math.floor(Math.random() * this.rows);
                const col = Math.floor(Math.random() * this.cols);
                if (!this.board[row][col].mine) {
                    this.board[row][col].mine = true;
                    placedMines++;
                }
            }

            this.board.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    if (!cell.mine) {
                        cell.adjacentMines = this.countAdjacentMines(rowIndex, colIndex);
                    }
                });
            });
        },
        countAdjacentMines(row, col) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1],
            ];
            return directions.reduce((count, [dx, dy]) => {
                const x = row + dx;
                const y = col + dy;
                if (x >= 0 && x < this.rows && y >= 0 && y < this.cols && this.board[x][y].mine) {
                    count++;
                }
                return count;
            }, 0);
        },
        revealAllMines() {
            this.board.forEach(row => {
                row.forEach(cell => {
                    if (cell.mine) {
                        cell.revealed = true;
                    }
                });
            });
        },
        revealAdjacentCells(row, col) {
            const directions = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1],
            ];
            directions.forEach(([dx, dy]) => {
                const x = row + dx;
                const y = col + dy;
                if (x >= 0 && x < this.rows && y >= 0 && y < this.cols) {
                    const cell = this.board[x][y];
                    if (!cell.revealed && !cell.mine) {
                        cell.revealed = true;
                        if (cell.adjacentMines === 0) {
                            this.revealAdjacentCells(x, y);
                        }
                    }
                }
            });
        },
        toggleFlag(row, col) {
            if (this.isGameOver) return;

            const cell = this.board[row][col];

            if (!cell.revealed) {
                if (cell.flagged) {
                    cell.flagged = false;
                    this.flagsLeft++;
                } else if (this.flagsLeft > 0) {
                    cell.flagged = true;
                    this.flagsLeft--;

                    if (cell.mine) {
                    }
                }
            }

            this.checkVictory();
        },
    },
    mounted() {
        this.initializeBoard();
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
    width: 385px;
    height: fit-content;
    background: #cdcabb;
    position: absolute;
    max-height: 100vh;
    max-width: 100vw;
    height: 510px;
}

.game-container {
    gap: 0px;
    margin: 10px;
    padding: 10px;
    display: grid;
    background-color: #bdbdbd;
    border: 4px solid #7b7b7b;
    width: fit-content;
    position: relative;
    left: 9px;
    border-right: solid 4px #FFFFFF;
    border-bottom: solid 4px #FFFFFF;
    border-top: solid 4px #808080;
    border-left: solid 4px #808080;
}

.row {
    display: flex;
}

.text {
    font-weight: 600;
    font-size: 10px;

    font-family: "Press Start 2P", system-ui;
    font-style: normal;
    user-select: none;
}

.text-0 {
    color: #00000000;
}

.text-1 {
    color: #0000ff;
}

.text-2 {
    color: #008000;
}

.text-3 {
    color: #ff0000;
}

.text-4 {
    color: #00007b;
}

.text-5 {
    color: #822424;
}

.dem-flag {}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.game-message {
    font-size: 18px;
    color: green;
    text-align: center;
    margin: 10px 0;
    animation: fade-in 0.5s ease-in-out;
}

.game-info {
    font-size: 14px;
    margin: 10px;
}

.new-game-button {
    width: 21px;
    height: 21px;
}

.difficulty-select {
    margin: 10px;
    padding: 5px;
    font-size: 14px;
}

.game-message {
    display: none;
}

.cell {
    width: 15px;
    height: 15px;
    background-color: #e6e6e6;
    border: 1px solid #9e9e9e;
    text-align: center;
    line-height: 14px;
    cursor: pointer;
    border-top: solid 3px #FFFFFF;
    border-left: solid 3px #FFFFFF;
    border-bottom: solid 3px #808080;
    border-right: solid 3px #808080;
    outline: solid 1px #808080;
    background: #c0c0c0;
}

.cell.revealed {
    background-color: #ffffff;
    border: 1px solid #cccccc;

    border-top: solid 3px #c0c0c0;
    border-left: solid 3px #c0c0c0;
    border-bottom: solid 3px #c0c0c0;
    border-right: solid 3px #c0c0c0;
    background: #c0c0c0;
}

.cell.mine {
    border-top: solid 3px #FFFFFF;
    border-left: solid 3px #FFFFFF;
    border-bottom: solid 3px #808080;
    border-right: solid 3px #808080;

}

.cell:hover {

    border-bottom: solid 3px #c0c0c0;
    border-right: solid 3px #c0c0c0;
    border-top: solid 3px #c0c0c0;
    border-left: solid 3px #c0c0c0;
}

.cell.mine img {
    display: none;
}

.cell.revealed.mine img {
    display: block;
}

.cell.mine.flagged img {
    display: block;
}

.cell.flagged .dem-mine {
    display: none !important;
}

.cell.exploded {
    background: red;
}

.dem-mine-fake {
    width: 100%;
    height: 100%;
    background-color: red;
    border-top: solid 1px red;
    border-left: solid 1px red;
    border-bottom: solid 1px red;
    border-right: solid 1px red;
}

.new-game-button {
    width: 26px;
    height: 26px;
    border-top: solid 3px #FFFFFF;
    border-left: solid 3px #FFFFFF;
    border-bottom: solid 3px #808080;
    border-right: solid 3px #808080;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game-container.game-over {
    pointer-events: none;
    user-select: none;
}

.dem-sad {
    display: none;
}

.face-game-over .dem-smile {
    display: none;
}

.face-game-over .dem-sad {
    display: block;
}

.resize-handle {
    display: none;
    pointer-events: none;
}

.li-difficulte {
    padding: 10px;
}

.li-difficulte:hover {
    color: white;
}

.game-info-container {
    border-right: solid 4px #FFFFFF;
    border-bottom: solid 4px #FFFFFF;
    border-top: solid 4px #808080;
    border-left: solid 4px #808080;
    display: flex;
    width: calc(100% - 38px);
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    position: relative;
    left: 9px;
    padding: 0 5px;
}

.kp_content--demineur {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: flex-start;
}

.game-info-p{
    font-size: 20px;
    font-weight: 600;
    font-family: "Press Start 2P", system-ui;
    font-style: normal;
    user-select: none;
    color: #ff0000;
    position: relative;
    top: 1px;
    left: 1px;
}


.game-info-time {
    width: fit-content;
    height: 26px;
    border-bottom: solid 3px #FFFFFF;
    border-right: solid 3px #FFFFFF;
    border-top: solid 3px #808080;
    border-left: solid 3px #808080;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000000;
}
</style>
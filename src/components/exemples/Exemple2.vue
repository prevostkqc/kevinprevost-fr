<template>
    <article class="exemple1">

        <div class="un_exemple">
            <div class="result_exemple">

                <div class="card-container">
                    <div class="card" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave" :style="cardStyle">
                        <div class="card-content">
                            <p>Survolez cette carte pour voir l'effet</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </article>
</template>

<script>
export default {
    name: 'Exemple2',

    data() {
        return {
            x: 0,
            y: 0,
            shadowX: 0,
            shadowY: 0,
        };
    },
    computed: {
        cardStyle() {
            return {
                transform: `perspective(500px) rotateX(${this.y / 10}deg) rotateY(${this.x / 10}deg)`,
                boxShadow: `${-this.shadowX}px ${-this.shadowY}px 15px rgba(0, 0, 0, 0.2)`,
            };
        },
    },
    methods: {
        handleMouseMove(event) {
            const card = event.target.getBoundingClientRect();
            this.x = event.clientX - card.left - card.width / 2;
            this.y = event.clientY - card.top - card.height / 2;
            this.shadowX = (this.x / card.width) * 20;
            this.shadowY = (this.y / card.height) * 20;
        },
        handleMouseLeave() {
            this.x = 0;
            this.y = 0;
            this.shadowX = 0;
            this.shadowY = 0;
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

.checkbox-code {
    display: none;
}

.text-code {
    color: #000000;
    font-size: 13px;
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

.titre_code {
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

.label-code {
    top: 10px;
    display: block;
    cursor: pointer;
}

.part_code,
.text-code-masquer {
    display: none;
}

.checkbox-code:checked~.part_code,
.checkbox-code:checked~.label-code .text-code-masquer {
    display: block;
}

.checkbox-code:checked~.label-code .text-code-afficher {
    display: none;
}

.unexemple__container {
    padding: 20px 0;
}

@media screen and (max-width: 960px) {
    .un_exemple {
        padding: 10px;
        margin: 20px 0px;
    }

    .text-code {
        height: auto;
    }
}



/* -------------------------------------------- */
/* Styles de la carte */
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


.card {
    width: 300px;
    height: 200px;
    background-color: #383838;
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    filter: blur(0.5px);
    border: solid 1px #c9c9c9;
    transition: 0.01s;
}

.card-content {
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 40px);
}

.card h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

.card p {
    font-size: 1rem;
}

.card:hover {
    cursor: pointer;
}
</style>
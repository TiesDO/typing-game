<script>
import { ref } from 'vue'
import gameState from '@/states/textState.js'

export default {
    data() {
        return {
            gameState,
            active: ref(false),
            correct: ref(false),
            mistake: ref(false),
            invalid: ref(false),
        }
    },
    props: {
        pos: Number,
    },
    computed: {
        charBuff() {
            return gameState.characterBuffer[this.pos]
        },
        cursorPos() {
            return gameState.cursorPosition;
        }
    },
    watch: {
        charBuff(newVal) {
            switch(newVal) {
                case 0: this.correct = true; this.mistake = false; break;
                case 1: this.mistake = true; this.correct = false; break;
                default: this.correct = false; this.mistake = false;
            }
        },
        cursorPos(newVal) {
            this.active = newVal === this.pos - 1
        }
    }
}
</script>

<template>
    <span :class="{active, correct, mistake}" :data-buf="gameState.characterBuffer[pos]">{{ gameState.displayText[pos] }}</span>
</template>

<style>
label {
    border: 1px solid transparent;
}

.active {
    border-left: 1px solid black;
}

.active-last {
    border-right: 1px solid black;
}

.correct {
    color: green;
}

.mistake {
    color: red;
}
</style>

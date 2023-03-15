<script>
import {ref} from 'vue'
import TextDisplay from '../components/TextDisplay.vue'
import TypingResult from '../components/TypingResult.vue'
import gameState from '@/states/textState.js'

export default {
    setup() {
        return {
            resultsPopup: ref(false),
            resultData: ref(null),
        };
    },
    components: {
        TextDisplay,
        TypingResult
    },
    watch: {
        resultsPopup() {
            this.resultData = gameState.getResult();
        },
    },
    methods: {
        retry() {
            gameState.reload()
        }
    }
};
</script>

<template>
    <TextDisplay @onFinished="resultsPopup = true" />
    <q-dialog v-model="resultsPopup" @before-hide="retry">
        <q-card :style="{
            width: '600px',
            'max-width': '80vw',
            'max-height': '70vh',
        }">
            <div class="row">
                <div class="col">
                    <TypingResult v-bind="resultData" />
                </div>
            </div>
            <q-separator />
            <div class="row q-py-md">
                <div class="col flex justify-end q-gutter-md">
                    <q-btn color="primary" label="Retry" @click="retry"/>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

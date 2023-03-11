<script>
// TODO: Allow the user to retry with a new text

import { ref } from "vue";

import TextDisplay from "./components/TextDisplay.vue";
import MainLayout from "./layout/MainLayout.vue";
import TypingResult from "./components/TypingResult.vue";

export default {
    setup() {
        return {
            resultsPopup: ref(false),
        };
    },
    components: {
        MainLayout,
        TextDisplay,
        TypingResult,
    },
    methods: {
        displayResult() { },
    },
};
</script>

<template>
    <MainLayout>
        <TextDisplay @onFinished="resultsPopup = true" />
        <q-dialog v-model="resultsPopup">

    <q-card :style="{width: '600px', 'max-width': '80vw', height: '600px', 'max-height': '70vh'}">
            <TypingResult />
    </q-card>
        </q-dialog>
    </MainLayout>
</template>

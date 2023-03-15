<script>
// TODO: Allow the user to retry with a new text

import { ref } from "vue";

import TextDisplay from "./components/TextDisplay.vue";
import MainLayout from "./layout/MainLayout.vue";
import TypingResult from "./components/TypingResult.vue";
import { computeResult } from "./components/states";

export default {
    setup() {
        return {
            resultsPopup: ref(false),
            resultData: ref(null),
        };
    },
    components: {
        MainLayout,
        TextDisplay,
        TypingResult,
    },
    watch: {
        resultsPopup() {
            this.resultData = computeResult();
        },
    },
};
</script>

<template>
    <MainLayout>
        <TextDisplay @onFinished="resultsPopup = true" />
        <q-dialog v-model="resultsPopup">
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
                        <q-btn color="white" text-color="black" label="Profile" />
                        <q-btn color="primary" label="Retry" />
                    </div>
                </div>
            </q-card>
        </q-dialog>
    </MainLayout>
</template>

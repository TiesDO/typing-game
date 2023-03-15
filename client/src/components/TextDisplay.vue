<script>
import { ref } from "vue";
import gameState from "@/states/textState";
import CharacterDisplay from "./CharacterDisplay.vue";

export default {
    data() {
        return {
            gameState,
            input: ref(""),
        };
    },
    components: {
        CharacterDisplay,
    },
    emits: ["onFinished"],
    computed: {
        textSplit() {
            return gameState.displayText.split("");
        },
        isLoading() {
            return gameState.isLoading;
        },
    },
    watch: {
        textSplit() { 
            this.input = ""
        },
    },
    methods: {
        handleChange(event) {
            const et = event.target;
            const etv = et.value;
            const etvl = etv.length;

            if (etv.length > gameState.displayText.length) {
                event.target.value = etv.substring(0, etvl);
                return event.preventDefault();
            }

            gameState.update(etv);

            if (etvl >= gameState.displayText.length) {
                this.$emit("onFinished");
            }
        },
        handleBeforeChange(event) {
            const len = event.target.value.length;
            event.target.setSelectionRange(len, len);

            if (len >= gameState.displayText.length) {
                return event.preventDefault();
            }
        },
    },
};
</script>

<template>
    <div class="container absolute-center">
        <label for="hiddenInput">
            <div ref="characters" id="characterContainer" v-show="!isLoading"
                class="text-h6 text-center text-grey-6 relative-position">
                <CharacterDisplay v-for="(item, index) in gameState.displayText.split('')" :pos="index" :key="index" />
            </div>
        </label>

        <q-spinner-oval v-show="isLoading" size="2em" class="absolute-center" />

        <input @input="handleChange" :value="input" @beforeinput="handleBeforeChange" type="text" id="hiddenInput"
            class="absolute-top-left non-selectable no-pointer-events" />
    </div>
    <q-icon v-show="!isLoading" color="blue-grey-3" :class="{ 'anim-spinning': isLoading }"
        class="absolute-top-right q-mt-xl q-pa-sm" name="refresh" size="2em" @click="gameState.reload()" />
</template>

<style scoped>
#hiddenInput {
    opacity: 0;
    user-select: none;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
}

.container {
    width: 80%;
}

#characterContainer {
    font-family: "Courier New", Courier, monospace;
}
</style>

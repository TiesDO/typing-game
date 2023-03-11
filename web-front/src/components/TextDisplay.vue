<script>

// TODO: Create something to happen when the user has won

import { textState } from "./states.js";
let cursorPos = 0
let setFinished = () => { alert('You finished') }

export default {
    data() {
        return {
            textState,
            cursorPos,
            setFinished
        };
    },
    computed: {
        console: () => console,
    },
    methods: {
        handleChange(event) {
            // TODO: Clean up this bloody mess
            // FIX: Make bind the max len of the input box to stop user from adding to the text when it is finished
            const tLen = event.target.value.length

            if (event.target.value.length > textState.text.length) {
                event.target.value = event.target.value.substring(0, event.target.value.length)
                return event.preventDefault()
            }

            if (textState.processChange(event.target.value) === true) {
                setFinished();
                return
            }

            // swap cursor
            this.$refs.characters.children[cursorPos].classList.remove('active')
            cursorPos = tLen
            if (tLen >= textState.text.length) {
                this.$refs.characters.children[textState.text.length - 1].classList.add('active-done')
            } else {
            this.$refs.characters.children[cursorPos].classList.add('active')
}
        },
        handleBeforeChange(event) {
            const len = event.target.value.length;
            event.target.setSelectionRange(len, len);
        },
    },
};
</script>

<template>
    <div class="container absolute-center">
        <label for="hiddenInput">
            <div ref="characters" v-show="!textState.isLoading" class="text-h6 text-center text-grey-6 relative-position">
                <span v-for="(item, index) in textState.text.split('')" :key="index"
                    v-bind:data-test="textState.typed[index]">
                    {{ item }}</span>
            </div>
        </label>
        <q-spinner-oval v-show="textState.isLoading" size="2em" class="absolute-center" />
        <input @input="handleChange" @beforeinput="handleBeforeChange" type="text" id="hiddenInput"
            class="absolute-top-left non-selectable no-pointer-events" />
    </div>
    <q-icon v-show="!textState.isLoading" color="blue-grey-3" :class="{ 'anim-spinning': textState.isLoading }"
        class="absolute-top-right q-mt-xl q-pa-sm" name="refresh" size="2em" @click="textState.reload()" />
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

.container:focus-within {
    /* border: 1px solid blue; */
}

.container {
    width: 80%;
}

div>label {}

div>label>div {
    font-family: "Courier New", Courier, monospace;
}

div>label>div span.active {
    border-left: 1px solid black;
}

div>label>div span.active-done {
    border-right: 1px solid black;
}

div>label>div [data-test="0"] {
    color: green;
}

div>label>div [data-test="1"] {
    color: red;
}
</style>

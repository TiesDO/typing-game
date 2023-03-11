<script>
import { textState } from "./states.js";
let cursorPos = 0;
let setFinished = () => {
    alert("You finished");
};

export default {
    data() {
        return {
            textState,
            cursorPos,
            setFinished,
        };
    },
    emits: ['onFinished'],
    computed: {
        console: () => console,
    },
    methods: {
        handleChange(event) {
            // HACK: works.. kindof
            // - Breaks on typing more than the textState allows
            // - Cursor does not reset (maybe implement reset on reload?)
            // - Last character cursor placement is funky
            // - Should also show cursor when and on start 
            // - onyl show cursor when input element has focus

            const tLen = event.target.value.length;

            if (event.target.value.length > textState.text.length) {
                event.target.value = event.target.value.substring(
                    0,
                    event.target.value.length
                );
                return event.preventDefault();
            }

            if (textState.processChange(event.target.value) === true) {
                setFinished();
                return;
            }

            // swap cursor
            this.$refs.characters.children[cursorPos].classList.remove("active");
            cursorPos = tLen;
            if (tLen >= textState.text.length) {
                this.$refs.characters.children[textState.text.length - 1].classList.add(
                    "active-done"
                );

                this.$emit('onFinished')
            } else {
                this.$refs.characters.children[cursorPos].classList.add("active");
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
            <div ref="characters" id="characterContainer" v-show="!textState.isLoading" class="text-h6 text-center text-grey-6 relative-position">
                <span v-for="(item, index) in textState.text.split('')" :key="index"
                    v-bind:data-test="textState.displayBuffer[index]">
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

#characterContainer {
    font-family: "Courier New", Courier, monospace;
}


#characterContainer span {
    border: 1px solid transparent
}

#characterContainer span.active {
    border-left: 1px solid black;
}

#characterContainer span.active-done {
    border-right: 1px solid black;
}

#characterContainer [data-test="0"] {
    color: green;
}

#characterContainer [data-test="1"] {
    color: red;
}
</style>

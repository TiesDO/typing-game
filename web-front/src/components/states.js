import { reactive } from "vue";

export const textState = reactive({
    text: "Type to start!",
    typed: Array(17).fill(null),
    isLoading: false,
    mistakes: 0,

    reload: async () => {
        textState.isLoading = true;
        const response = await fetch(
            "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1"
        );
        let tmp = await response.json();
        tmp = tmp[0];

        // validate the text (remove double whitespace and cap length)
        tmp.replace(/\s{2}/g, " ");

        if (tmp.length > 250) {
            // HACK: works, but can be expanded to look for the last word
            tmp = tmp.substring(0, 250);
        }

        textState.text = tmp;
        textState.typed = Array(tmp.length).fill(null);
        textState.cursorPos = 0;
        textState.isLoading = false;
    },

    processChange: (userInput) => {
        const inputLen = userInput.length;
        const inputArr = userInput.split("");
        const textArr = textState.text.split("");

        // compare the user input to the current typed buffer
        for (let i = 0; i < textState.typed.length; i++) {
            const stateToBe =
                i < inputLen ? (inputArr[i] === textArr[i] ? 0 : 1) : null;
            if (textState.typed[i] !== stateToBe) {
                textState.typed[i] = stateToBe;
            }
        }

        // update the typed count
        textState.typedCount = inputLen;
        return false
    },
});

// TODO: Create result state, which consists of:
// - [ ] wpm and cpm
// - [ ] backspaces (accuracy percentage)
// - [ ] map of timings for everykey press ({ stamp: ms, correct: boolean })



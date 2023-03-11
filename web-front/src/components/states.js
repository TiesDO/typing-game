import { reactive } from "vue";

export const textState = reactive({
    text: "Type to start!",
    displayBuffer: Array("Type to start!".length).fill(null),
    prevInput: "",
    actions: [],
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
        textState.displayBuffer = Array(tmp.length).fill(null);
        textState.cursorPos = 0;
        textState.isLoading = false;
    },

    // PERF: Updates action list and the display buffer based on a simple diff algo
    processChange: (userInput) => {
        const inputLen = userInput.length;
        const inputArr = userInput.split("");
        const prevLen = textState.prevInput.length;
        const prevArr = textState.prevInput.split("");
        const textArr = textState.text.split("");

        const action = {
            time: performance.now(),
        };

        if (inputLen > prevLen) {
            for (let i = 0; i < inputLen - prevLen; i++) {
                let fi = prevLen + i;
                action.type = "+";
                action.char = inputArr[fi];
                action.exp = textArr[fi];

                textState.displayBuffer[fi] = action.exp === action.char ? 0 : 1;
            }
        } else {
            for (let i = prevLen - inputLen - 1; i >= 0; i--) {
                let fi = inputLen + i;
                action.type = "-";
                action.exp = textArr[fi];
                action.char = prevArr[fi];

                textState.displayBuffer[fi] = null;
            }
        }

        textState.actions.push(action);
        textState.prevInput = userInput;
        textState.typedCount = inputLen;

        return false;
    },
});

export const computeResult = () => {
    let timeElapsed =
        textState.actions[textState.actions.length - 1].time -
        textState.actions[0].time;

    let totalWords = textState.text.split(" ").length;
    let totalCharacters = textState.text.length;

    let wpm = (totalWords * 60) / (timeElapsed / 1000);
    let cpm = (totalCharacters * 60) / (timeElapsed / 1000);
    let actions = textState.actions.slice(); // shallow clone of the actions

    let correct_cpm = actions.filter(
        (a) => a.type === "+" && a.char === a.exp
    ).length;

    let finalMistakes = 0;
    for (const r of textState.displayBuffer) {
        if (r !== 0) {
            finalMistakes++;
        }
    }

    let totalMistakes = 0;
    for (const a of actions) {
        if (
            (a.type === "+" && a.exp !== a.char) ||
            (a.type === "-" && a.exp === a.char)
        ) {
            totalMistakes++;
        }
    }

    console.log(textState.displayBuffer);

    return {
        cpm,
        wpm,
        correct_cpm,
        actions,
        timeElapsed,
        finalMistakes,
        totalMistakes,
        totalWords,
        totalCharacters,
    };
};

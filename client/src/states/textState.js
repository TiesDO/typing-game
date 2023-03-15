import { reactive } from "vue";
import { getText } from "@/helpers/requests";

export default reactive({
    displayText: "Type to start!",
    characterBuffer: Array(14).fill(null),
    actions: [],
    isLoading: false,
    isDone: false,
    cursorPosition: 0,
    prevInput: "",

    getResult() {
        return computeResult(this);
    },
    reset(text = null) {
        this.displayText = text ?? "Type to start!";
        this.characterBuffer =
            text !== null ? Array(text.length).fill(null) : Array(14).fill(null);
        this.actions = [];
        this.isLoading = false;
        this.isDone = false;
        this.cursorPosition = 0;
        this.prevInput = "";
    },
    reload() {
        this.isLoading = true;

        getText()
            .then((res) => {
                let tmp = res[0];

                tmp.replace(/\s{2}/g, " ");

                if (tmp.length > 100) {
                    tmp = tmp.substring(0, 100);
                }

                this.reset(tmp);
            })
            .catch((err) => {
                console.error(err);
            })
            .finally(() => {
                this.isLoading = false;
            });
    },
    update(input) {
        const inputLen = input.length;
        const inputArr = input.split("");
        const prevLen = this.prevInput.length;
        const prevArr = this.prevInput.split("");
        const textArr = this.displayText.split("");

        const action = {
            time: performance.now(),
        };

        // NOTE: Split the logic for storing add/remove actions
        if (inputLen > prevLen) {
            for (let i = 0; i < inputLen - prevLen; i++) {
                let fi = prevLen + i;
                action.type = "+";
                action.char = inputArr[fi];
                action.exp = textArr[fi];

                this.characterBuffer[fi] = action.exp === action.char ? 0 : 1;
            }
        } else {
            for (let i = prevLen - inputLen - 1; i >= 0; i--) {
                let fi = inputLen + i;
                action.type = "-";
                action.exp = textArr[fi];
                action.char = prevArr[fi];

                this.characterBuffer[fi] = null;
            }
        }

        this.actions.push(action);
        this.prevInput = input;
        this.cursorPosition = inputLen - 1
    },
});

function computeResult(t) {
    let timeElapsed = t.actions[t.actions.length - 1].time - t.actions[0].time;

    let totalWords = t.displayText.split(" ").length;
    let totalCharacters = t.displayText.length;

    let wpm = (totalWords * 60) / (timeElapsed / 1000);
    let cpm = (totalCharacters * 60) / (timeElapsed / 1000);
    let actions = t.actions.slice(); // shallow clone of the actions

    let correctCpm = actions.filter(
        (a) => a.type === "+" && a.char === a.exp
    ).length;

    let finalMistakes = 0;
    for (const r of t.characterBuffer) {
        if (r !== 0) {
            finalMistakes++;
        }
    }

    // NOTE: an action is counted as a mistake when you either type a wrong character, or remove a correct one
    let totalMistakes = 0;
    for (const a of actions) {
        if (
            (a.type === "+" && a.exp !== a.char) ||
            (a.type === "-" && a.exp === a.char)
        ) {
            totalMistakes++;
        }
    }

    return {
        cpm,
        wpm,
        correctCpm,
        actions,
        timeElapsed,
        finalMistakes,
        totalMistakes,
        totalWords,
        totalCharacters,
    };
}

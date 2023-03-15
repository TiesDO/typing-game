import { reactive } from 'vue'

export default reactive({
    token: "",
    username: "",
    id: "",

    isLoggedIn() {
        return this.token !== ''
    },
    fromToken(token) {
        this.token = token;
        let payload = JSON.parse(atob(token.split(".")[0]));
        this.username = payload["un"];
        this.id = payload["id"];
    },
    logout() {
        this.token = '';
        this.username = '';
        this.id = '';
    },
});

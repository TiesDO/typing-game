export default {
    token: "",
    username: "",
    id: "",

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
};

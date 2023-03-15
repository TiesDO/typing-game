export function getText() {
    const texturl =
        "https://baconipsum.com/api/?type=all-meat&paras=1&start-with-lorem=1";

    return new Promise((accept, reject) => {
        fetch(texturl, { method: "GET" }).then(async (res) => {
            if (res.status === 200) {
                let data = await res.json();
                accept(data);
            } else {
                reject(res.statusText);
            }
        });
    });
}

const apiurl = "http://127.0.0.1:3000/";

function fetchApi(url, method, data = null) {
    return fetch(apiurl + url, {
        method: method.toUpperCase(),
        body: data !== null ? JSON.stringify(data) : undefined,
    });
}

function fetchApiAuth(url, method, token, data = null) {
    return fetch(apiurl + url, {
        method: method.toUpperCase(),
        body: data !== null ? JSON.stringify(data) : undefined,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}

export function postLogin(un, pw) {
    return new Promise((accept, reject) => {
        fetchApi("account/login", "post", { username: un, password: pw }).then(
            async (res) => {
                if (res.ok) {
                    let data = await res.json();
                    if (data.status === 'SUCCESS') {
                        accept(data)
                    } else {
                        reject(data.message)
                    }
                } else {
                    reject(res.statusText)
                }
            }
        );
    });
}

export function postRegister(un, pw) {
    return new Promise((accept, reject) => {
        fetchApi("account/register", "post", { username: un, password: pw }).then(
            async (res) => {
                if (res.ok) {
                    let data = await res.json();
                    if (data.status === 'SUCCESS') {
                        accept(data)
                    } else {
                        reject(data.message)
                    }
                } else {
                    reject(res.statusText)
                }
            }
        );
    });
}

// TODO: create POST results, GET profile

export function getLeaderboard() {
    return new Promise((accept, reject) => {
        fetchApi("leaderboard", 'get')
            .then(async res => {
                if (res.ok) {
                    let data = await res.json();
                    if (data.status === 'SUCCESS') {
                        accept(data)
                    } else {
                        reject(data.message)
                    }
                } else {
                    reject(res.statusText)
                }
            })
    })
}

export function postResult(result, token) {
    return new Promise((accept, reject) => {
        fetchApiAuth('result', 'post', token, result)
            .then(async res => {
                if (res.ok) {
                    let data = await res.json()
                    if (data.status === 'SUCCESS') {
                        accept(data)
                    } else {
                        reject(data.message)
                    }   
                } else {
                    reject(res.statusText)
                }
            })
    })
}

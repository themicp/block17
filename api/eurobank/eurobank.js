const request = require('request');
const fs = require('fs');

const EUROBANK_HOST = 'http://api.beyondhackathon.com';
/*
const EUROBANK_USER = {
    username: 'cray',
    password: 'addodsnjej'
};
*/
const EUROBANK_USER = {
    username: 'gtklocker',
    password: 'yourmom'
};

const tokenParams = {
    client_id: 'contestant',
    client_secret: 'secret',
    grant_type: 'password',
    username: EUROBANK_USER.username,
    password: EUROBANK_USER.password
};

class EurobankAPI {
    static getAccessToken(user) {
        return new Promise((resolve, reject) => {
            request.post(`${EUROBANK_HOST}/authorization/token`,
                { form: Object.assign(tokenParams, user), json: true }, (err, res, body) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(body.access_token);
                    }
            });
        });
    }

    static makeAPI() {
        return new Promise((resolve, reject) => {
            EurobankAPI.getAccessToken(EUROBANK_USER).then((accessToken) => {
                resolve(new EurobankAPI(accessToken));
            });
        });
    }

    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    get(uri, data) {
        return new Promise((resolve, reject) => {
            request.get(`${EUROBANK_HOST}${uri}`,
                {
                    auth: {
                        bearer: this.accessToken
                    },
                    qs: data,
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(body);
                    }
            });
        });
    }

    post(uri, data) {
        return new Promise((resolve, reject) => {
            request.post(`${EUROBANK_HOST}${uri}`,
                {
                    auth: {
                        bearer: this.accessToken
                    },
                    form: data,
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(body);
                    }
            });
        });
    }

    postJSON(uri, data) {
        return new Promise((resolve, reject) => {
            request.post(`${EUROBANK_HOST}${uri}`,
                {
                    auth: {
                        bearer: this.accessToken
                    },
                    body: data,
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(body);
                    }
            });
        });
    }
}


const run = async () => {
    try {
        const euro = await EurobankAPI.makeAPI();
        //const res = await euro.postJSON('/backend/save', JSON.parse(fs.readFileSync('customer_sample.json', 'utf8')));
        //console.log(res);

        const res = await euro.get('/accounts/00260000010000010034310/statement', {});
        console.log(res);
    } catch(e) {
        console.err(e);
    }
};

run();

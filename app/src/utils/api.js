import $ from 'jquery';

const getEndpoint = (bank) => {
    return bank === 'eurobank' ? 'http://eurobank-api.manmu.es' : 'http://beyondbank-api.manmu.es'
}

const fetch = (url, bank) => {
    return new Promise((resolve, reject) => {
        const endpoint = getEndpoint(bank);
        $.get(endpoint + url).done(res => {
            resolve(res);
        }).fail(err => {
            console.log(err);
            reject(err);
        });
    });
};

export {fetch, getEndpoint};

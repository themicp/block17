import http from 'http';
import $ from 'jquery';

const getEndpoint = (bank) => {
    return bank == 'eurobank' ? 'http://arctan.gtklocker.com:4242' : 'http://arctan.gtklocker.com:4252'
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

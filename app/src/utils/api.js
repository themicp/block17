import http from 'http';

const fetch = url => {
    return new Promise((resolve, reject) => {
        http.get('/test', res => {
            if (url === '/account') {
                const account = {
                    fullname: 'Themis Papameletiou',
                    account: 'GR16 0110 1250 0000 0001 2300 695',
                    avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                    balance: '130'
                };

                resolve(account);
            } else if (url === '/bank') {
                const bank = {
                    name: 'Eurobank',
                    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Eurobank.svg/800px-Eurobank.svg.png'
                };

                resolve(bank);
            } else if (url === '/tx') {
                const transactions = [
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Alien_Emoji.png?8395986304114536760',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 11,
                    },
                    {
                        date: new Date().getTime(),
                        amount: 35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 12,
                    },
                    {
                        date: new Date().getTime(),
                        amount: 35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Alien_Emoji.png?8395986304114536760',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 13,
                    },
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 14,
                    },
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 15,
                    },
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 16,
                    },
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 17,
                    },
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 2,
                    },
                    {
                        date: new Date().getTime(),
                        amount: -35.08,
                        counterparty: {
                            fullname: 'gtklocker',
                            avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                            iban: 'GR16 0110 1250 0000 0001 2300 695',
                        },
                        description: 'Birthday cake',
                        key: 3,
                    },
                ];

                resolve(transactions);
            } else if (url === '/contacts') {
                const contacts = [
                    {
                        name: 'Kostis Karantias',
                        avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                        iban: 'GR1601101250000000012300695',
                    },
                    {
                        name: 'Dionysis Zindros',
                        avatar: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Alien_Emoji.png?8395986304114536760',
                        iban: 'GR1601101250000000012300695',
                    },
                    {
                        name: 'Themis Papameletiou',
                        avatar: 'https://cdn.shopify.com/s/files/1/1061/1924/files/Alien_Emoji.png?8395986304114536760',
                        iban: 'GR1601101250000000012300695',
                    },
                ];

                resolve(contacts);
            } else if (url.indexOf('/contact/') === 0) {
                resolve({
                    name: 'Kostis Karantias',
                    avatar: 'https://pbs.twimg.com/profile_images/799176331623800832/ggd6_JbJ.jpg',
                    iban: 'GR1601101250000000012300695',
                });
            } else {
                console.log('request to', url);
                resolve({});
            }
        }, err => {
            console.log(err);
            reject(err);
        });
    });
};

export {fetch};

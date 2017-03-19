import React from 'react';
import App from './App';
import Home from './Home';
import Transaction from './Transaction';
import Contacts from './Contacts';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path='/:bank' component={App}>
        <IndexRoute component={Home} />
        <Route path='/:bank/transaction/:account' component={Transaction} />
        <Route path='/:bank/contacts' component={Contacts} />
    </Route>
);

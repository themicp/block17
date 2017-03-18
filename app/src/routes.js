import React from 'react';
import App from './App';
import Home from './Home';
import Transaction from './Transaction';
import Contacts from './Contacts';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/transaction/:account' component={Transaction} />
        <Route path='/contacts' component={Contacts} />
    </Route>
);

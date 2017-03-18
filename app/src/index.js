import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {IntlProvider} from 'react-intl';
import './index.css';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

const App = (
    <IntlProvider locale='en'>
        <MuiThemeProvider>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </IntlProvider>
);

ReactDOM.render(
  App,
  document.getElementById('root')
);

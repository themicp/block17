import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {fetch} from './utils/api';
import {Link} from 'react-router';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        const accountPromise = fetch('/account');
        const bankPromise = fetch('/bank');

        Promise.all([accountPromise, bankPromise]).then(data => {
            this.setState({
                account: data[0],
                bank: data[1],
            });
        }).catch(err => {
            console.log(err);
        });
    }


    render() {
        const {children} = this.props;

        const props = {
            account: this.state.account,
            bank: this.state.bank
        }

        const childrenWithProps = React.cloneElement(children, props);

        return (
            <div className="App">
                {this.state.bank && this.state.account ? 
                <header>
                    <div className='logo'>
                        <Link to='/'>
                            <img src={this.state.bank.logo} alt='bank-logo'/>
                        </Link>
                    </div>
                </header>
                : ''}
                {childrenWithProps}
            </div>
        );
    }
}

export default App;

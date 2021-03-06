import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {fetch} from './utils/api';

injectTapEventPlugin();

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    fetchData = () => {
        const accountPromise = fetch('/account', this.props.params.bank);
        const bankPromise = fetch('/bank', this.props.params.bank);

        Promise.all([accountPromise, bankPromise]).then(data => {
            this.setState({
                account: data[0],
                bank: data[1],
            });
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillMount() {
        this.fetchData();
        setInterval(this.fetchData, 1000);
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
                {childrenWithProps}
            </div>
        );
    }
}

export default App;

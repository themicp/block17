import React, { Component } from 'react';
import './App.css';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import {FormattedDate, FormattedNumber} from 'react-intl';
import {fetch} from './utils/api';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SwapIcon from 'material-ui/svg-icons/action/swap-horiz';
import {Link} from 'react-router';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    fetchData = () => {
        fetch('/tx', this.props.params.bank).then(transactions => {;
            this.setState({transactions});
        }).catch(err => {
            console.log(err);
        });
    }

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    }

    componentWillMount() {
        this.fetchData();
        this.updateInterval = setInterval(this.fetchData, 1000);
    }

    render() {
        let listItems = [];
        if (this.state.transactions) {
            this.state.transactions.forEach(item => {
                listItems.push(
                    <ListItem
                        key={item.id}
                        leftAvatar={<Avatar src={item.counterparty.avatar} />}
                        primaryText={item.description}
                        style={{textAlign: 'left'}}
                        secondaryText={<span className='date'><FormattedDate
												value={item.date}
                                                hour='2-digit'
                                                minute='2-digit'
												day="numeric"
												month="long"
												year="numeric" /></span>}

                        rightToggle={
                            <span className={'amount ' + (item.amount < 0 ? 'red' : 'green')}>
                                <FormattedNumber value={item.amount/100} style='currency' currency='EUR' />
                            </span>
                        }	
                    />
                );
            });
        }

        const balanceStyle = {
            fontSize: 25,
            fontWeight: 'bold'
        };

        return (
            <section className='main'>
                {this.props.bank && this.props.account ? 
                <div>
                    <header>
                        <div className='logo'>
                            <Link to={'/' + this.props.params.bank}>
                                <img src={this.props.bank.logo} alt='bank-logo'/>
                            </Link>
                        </div>
                    </header>
                    <div className='user-details'>
                        <Avatar src={this.props.account.avatar} />
                        <span className='name'>{this.props.account.fullname}</span>
                        <span className='iban'>{this.props.account.account}</span>
                        <div className='clear'></div>
                    </div>
                    <Card>
                        <CardTitle>Balance</CardTitle>
                        <CardText style={balanceStyle}>
                            <FormattedNumber value={this.props.account.balance/100} style='currency' currency='EUR' />
                        </CardText>
                    </Card>
                </div>
                : ''}
                {this.state.transactions ? 
                    <List className='list'>
                        <Subheader>Transactions</Subheader>
                        {listItems}
                    </List>
                : ''}
                <Link className='new-transaction' to={this.props.params.bank + '/contacts'}>
                    <FloatingActionButton>
                        <SwapIcon />
                    </FloatingActionButton>
                </Link>
            </section>
        );
    }
}

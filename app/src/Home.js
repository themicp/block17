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

    componentWillMount() {
        fetch('/tx').then(transactions => {;
            this.setState({transactions});
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        let listItems = [];
        if (this.state.transactions) {
            this.state.transactions.forEach(item => {
                listItems.push(
                    <ListItem
                        key={item.key}
                        leftAvatar={<Avatar src={item.counterparty.avatar} />}
                        primaryText={item.description}
                        secondaryText={<span className='date'><FormattedDate
												value={item.date}
												day="numeric"
												month="long"
												year="numeric" /></span>}

                        rightToggle={
                            <span className={(item.amount < 0 ? 'red' : 'green')}>
                                <FormattedNumber value={item.amount} style='currency' currency='EUR' />
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

        console.log(this.props.account);
        return (
            <section className='main'>
                {this.props.bank && this.props.account ? 
                <div>
                    <div className='user-details'>
                        <Avatar src={this.props.account.avatar} />
                        <span className='name'>{this.props.account.fullname}</span>
                        <span className='iban'>{this.props.account.account}</span>
                        <div className='clear'></div>
                    </div>
                    <Card>
                        <CardTitle>Balance</CardTitle>
                        <CardText style={balanceStyle}>
                            <FormattedNumber value={this.props.account.balance} style='currency' currency='EUR' />
                        </CardText>
                    </Card>
                </div>
                : ''}
                {this.state.transactions ? 
                    <List>
                        <Subheader>Transactions</Subheader>
                        {listItems}
                    </List>
                : ''}
                <Link className='new-transaction' to='/contacts'>
                    <FloatingActionButton>
                        <SwapIcon />
                    </FloatingActionButton>
                </Link>
            </section>
        );
    }
}
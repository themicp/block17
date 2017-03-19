import React, { Component } from 'react';
import './App.css';
import Avatar from 'material-ui/Avatar';
import {getEndpoint, fetch} from './utils/api';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import {FormattedNumber} from 'react-intl';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import $ from 'jquery';

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {contact: {}, open: false, message: ''};
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    };

    componentWillMount() {
        fetch('/contact/' + this.props.params.account, this.props.params.bank).then(contact => {
            this.setState({contact});
        });
        const url = getEndpoint(this.props.params.bank);
    }

    sendMoney = () => {
        const amount = this.refs.amount.input.value;
        const description = this.refs.description.input.value;

        if (amount == 0) {
            this.setState({open: true, message: 'Invalid amount.'});
            return;
        }

        const url = getEndpoint(this.props.params.bank) + '/tx';
        $.ajax({
            url,
            method: 'PUT',
            data: {
                amount: amount * 100,
                description,
                counterparty: this.props.params.account
            },
            success: (data, err) => {
		        this.setState({open: true, message: 'Money sent.'});	

                setTimeout(() => {
                    this.context.router.push('/' + this.props.params.bank + '/'); 
                }, 3000);
            },
            error: () => {
		        this.setState({open: true, message: 'There was an error creating the transaction.'});	
            }
        });
    }

    render() {
        return (
            <div>
                <AppBar
                    title='Amount'
                    style={{textAlign: 'left', marginBottom: '20px'}}
                    iconElementLeft={<Link to={this.props.params.bank + '/contacts'}><IconButton><NavigationBack color='#fff' /></IconButton></Link>}
                />
                <section className='main'>
                    {this.state.contact.name ?
                    <div>
                        <Card>
                            <CardTitle>Sending money to</CardTitle>
                            <CardText>
                                <Avatar src={this.state.contact.avatar} />
                                <span className='rec-name'>{this.state.contact.name}</span>
                                <span className='rec-account'>{this.state.contact.iban}</span>
                            </CardText>
                        </Card>

                        <Card>
                            <CardTitle style={{fontWeight: 'bold'}}>Balance: <FormattedNumber value={this.props.account.balance/100} style='currency' currency='EUR' /></CardTitle>
                        </Card>

                        <TextField
                            ref='description'
                            floatingLabelText='Description'
                            floatingLabelFixed={true}
                            fullWidth={true}
                            style={{marginTop: 20}}
                        />

                        <TextField
                            hintText='EUR'
                            ref='amount'
                            floatingLabelText='Amount to send'
                            floatingLabelFixed={true}
                            fullWidth={true}
                            type='number'
                            style={{fontSize: '20px', height: '82px'}}
                        />

                        <RaisedButton label='Send' primary={true} fullWidth={true} onClick={this.sendMoney} />

						<Snackbar
						  open={this.state.open}
						  message={this.state.message}
						  autoHideDuration={4000}
						  onRequestClose={this.handleRequestClose}
						/>
                    </div>
                    : ''}
                </section>
            </div>
        );
    }
}

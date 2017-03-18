import React, { Component } from 'react';
import './App.css';
import Avatar from 'material-ui/Avatar';
import {fetch} from './utils/api';
import TextField from 'material-ui/TextField';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {contact: {}};
    }

    componentWillMount() {
        fetch('/contact/' + this.props.params.account).then(contact => {
            console.log(contact);
            this.setState({contact});
        });
    }

    render() {
        return (
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

                    <TextField
                        hintText='EUR'
                        floatingLabelText='Amount to send'
                        floatingLabelFixed={true}
                        fullWidth={true}
                        type='number'
                        style={{marginTop: 20}}
                    />

                    <RaisedButton label='Send' primary={true} fullWidth={true} />
                </div>
                : ''}
            </section>
        );
    }
}

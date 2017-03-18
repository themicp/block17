import React, { Component } from 'react';
import './App.css';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {fetch} from './utils/api';
import {Link} from 'react-router';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {contacts:[]};
    }

    componentWillMount() {
        fetch('/contacts').then(contacts => {
            this.setState({contacts});
        });
    }

    render() {
        let listItems = [];

        if (this.state.contacts) {
            let i = 0;
            this.state.contacts.forEach(contact => {
                listItems.push(
                    <Link key={i++} to={'/transaction/' + contact.iban}><ListItem
                        leftAvatar={<Avatar src={contact.avatar} />}
                        primaryText={contact.name}
                        secondaryText={contact.iban}
                    /></Link>
                );
            });
        }

        return (
            <section className='main'>
                <List>
                    <Subheader>Saved Contacts</Subheader>
                    {listItems}
                </List>
            </section>
        );
    }
}

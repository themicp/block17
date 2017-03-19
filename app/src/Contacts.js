import React, { Component } from 'react';
import './App.css';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import {fetch} from './utils/api';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {contacts:[]};
    }

    componentWillMount() {
        fetch('/contacts', this.props.params.bank).then(contacts => {
            this.setState({contacts});
        });
    }

    render() {
        let listItems = [];

        if (this.state.contacts) {
            let i = 0;
            this.state.contacts.forEach(contact => {
                listItems.push(
                    <Link key={i++} to={'/' + this.props.params.bank + '/transaction/' + contact.iban}><ListItem
                        leftAvatar={<Avatar src={contact.avatar} />}
                        primaryText={contact.name}
                        secondaryText={contact.iban}
                    /></Link>
                );
            });
        }

        return (
            <div>
                <AppBar
                    title='Send Money'
                    style={{textAlign: 'left'}}
                    iconElementLeft={<Link to={'/' + this.props.params.bank}><IconButton><NavigationBack color='#fff' /></IconButton></Link>}
                />
                <section className='main'>
                    <List>
                        <TextField hintText='Search' fullWidth={true} />
                        {listItems}
                    </List>
                </section>
            </div>
        );
    }
}

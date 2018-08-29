import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "../../context";

export default class Contacts extends Component {
  handleDelete = id => {
    const newContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: newContacts });
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              {contacts.map(contact => (
                <Contact
                  contact={contact}
                  key={contact.id}
                  handleDeleteClick={this.handleDelete}
                />
              ))}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

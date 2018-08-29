import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";
import axios from "axios";

export default class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    isValid: true
  };

  errors = {};

  checkEmpty(type) {
    if (!this.state[type]) {
      this.errors[type] = `${type} is required`;
      return;
    }
    this.errors[type] = undefined;
  }

  isValidForm() {
    if (!this.state.name || !this.state.phone || !this.state.email) {
      return false;
    }
    return true;
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = async (dispatch, e) => {
    e.preventDefault();
    this.checkEmpty("name");
    this.checkEmpty("phone");
    this.checkEmpty("email");
    if (!this.isValidForm()) {
      this.setState({ isValid: false });
      return;
    }

    const newContact = {
      id: uuid(),
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };

    const res = await axios.post(`https://jsonplaceholder.typicode.com/users`, {
      ...newContact
    });

    console.log(res.data);
    dispatch({
      type: "ADD_CONTACT",
      payload: { ...res.data }
    });
    this.setState({ name: "", phone: "", email: "" });
    this.props.history.push("/");
  };

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.handleFormSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    name="name"
                    placeholder="Enter Name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    error={this.errors.name}
                  />

                  <TextInputGroup
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    error={this.errors.email}
                  />

                  <TextInputGroup
                    name="phone"
                    placeholder="Enter Phone"
                    value={this.state.phone}
                    onChange={this.handleInputChange}
                    error={this.errors.phone}
                  />
                  <button className="btn btn-block">Add Now</button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

import React, { Component } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";
import axios from "axios";

export default class EditContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
    isValid: true,
    loaded: false
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
    // TODO
    const { name, email, phone } = this.state;
    const updated = { name, email, phone };
    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updated
    );
    dispatch({ type: "EDIT_CONTACT", payload: res.data });
    this.props.history.push("/");
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const { name, email, phone } = res.data;
    this.setState({ name, email, phone, loaded: true });
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
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
                  <button
                    disabled={!this.state.loaded}
                    className="btn btn-block"
                  >
                    Edit Now
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

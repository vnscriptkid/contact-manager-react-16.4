import React, { Component } from "react";

export default class Test extends Component {
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then(response => response.json())
      .then(json => console.log(json));
  }

  render() {
    return <div>Test Component</div>;
  }
}

import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = { username: "" };
  }

  onNameChange = event => {
    this.setState({ username: event.target.value });
    console.log(event.target.value);
  };

  onSubmitSignIn = () => {
    fetch("https://hunter-todo-api.herokuapp.com/user", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then(response => response.json())
      .then(user => {
        console.log(user);
        this.props.loadUser(user);
        this.props.onRouteChange("home");
      });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <label>
          Name:
          <input type="text" name="username" onChange={this.onNameChange} />
        </label>
        <button onClick={this.onSubmitSignIn}> Register </button>
      </div>
    );
  }
}

export default Register;

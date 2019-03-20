import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = { username: "" };
  }

  onNameChange = event => {
    this.setState({ username: event.target.value });
    console.log(event.target.value);
  };

  onSubmitSignIn = () => {
    fetch("https://hunter-todo-api.herokuapp.com/auth", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username
      })
    })
      .then(response => response.json())
      .then(data => {
        this.props.loadUser(data);
        this.props.onRouteChange("home");
      });
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <label>
          Name:
          <input type="text" name="username" onChange={this.onNameChange} />
        </label>
        <button onClick={this.onSubmitSignIn}> Login </button>
      </div>
    );
  }
}

export default Login;

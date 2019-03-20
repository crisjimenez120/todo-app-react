import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navigation from "./Components/Navigation";
import Todos from "./Components/Todos";
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      route: "signin",
      isSignedIn: false,
      auth: ""
    };
  }
  componentDidMount() {
    const auth = sessionStorage.getItem("sillyauth");
    if (auth) {
      this.setState({
        isSignedIn: true,
        route: "home",
        auth: auth
      });
      return;
    }
  }
  loadUser = data => {
    sessionStorage.setItem("sillyauth", data.token);
    this.setState({
      auth: data.token
    });
  };

  onInputChange = event => {
    console.log(event.target.value);
    this.setState({ input: event.target.value });
  };

  onRouteChange = route => {
    if (route === "signout") {
      sessionStorage.clear();
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Navigation
          isSignedIn={this.state.isSignedIn}
          onRouteChange={this.onRouteChange}
        />

        {this.state.route === "home" ? (
          <div>
            <h1>Todo App Single Page App</h1>
            <Todos auth={this.state.auth} />
          </div>
        ) : this.state.route === "signin" ? (
          <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;

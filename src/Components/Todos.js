import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      todos: []
    };
  }

  onTodoChange = event => {
    this.setState({ newTodo: event.target.value });
    console.log(event.target.value);
  };
  componentDidMount() {
    fetch("https://hunter-todo-api.herokuapp.com/todo-item", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        sillyauth: this.props.auth
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          todos: data
        });
      });
  }
  onSubmitTodo = () => {
    fetch("https://hunter-todo-api.herokuapp.com/todo-item", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        sillyauth: this.props.auth
      },
      body: JSON.stringify({
        content: this.state.newTodo
      })
    })
      .then(response => response.json())
      .then(todo => {
        console.log(todo);
        console.log(this.state.todos);
        this.setState({
          todos: [...this.state.todos, todo]
        });
      });
  };

  onDeleteTodo = todo => {
    fetch("https://hunter-todo-api.herokuapp.com/todo-item/" + todo.id, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        sillyauth: this.props.auth
      },
      body: JSON.stringify({
        content: this.state.newTodo
      })
    });
    let arr = this.state.todos.filter(function(item) {
      return item !== todo;
    });
    this.setState({
      todos: arr
    });
  };

  onFlipTodo = todo => {
    fetch("https://hunter-todo-api.herokuapp.com/todo-item/" + todo.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        sillyauth: this.props.auth
      },
      body: JSON.stringify({
        completed: !todo.completed
      })
    });
    let arr = this.state.todos;
    arr[arr.indexOf(todo)].completed = !arr[arr.indexOf(todo)].completed;
    this.setState({
      todos: arr
    });
  };

  render() {
    return (
      <div>
        <label>
          New Todo:
          <input type="text" name="todo" onChange={this.onTodoChange} />
        </label>
        <button onClick={this.onSubmitTodo}> Add </button>
        <ul>
          {this.state.todos.map((todo, index) => (
            <div key={index}>
              {todo.completed ? (
                <li>
                  <strike>{`${todo.content}`}</strike>
                  <button onClick={() => this.onFlipTodo(todo)}>undo</button>
                  <button onClick={() => this.onDeleteTodo(todo)}>
                    delete
                  </button>
                </li>
              ) : (
                <li>
                  {`${todo.content}`}
                  <button onClick={() => this.onFlipTodo(todo)}>
                    complete
                  </button>
                  <button onClick={() => this.onDeleteTodo(todo)}>
                    delete
                  </button>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Register;

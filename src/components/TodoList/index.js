import React, { Component } from 'react';
import Todo from '../Todo';
import './index.css';
import AddToDo from '../AddTodo';

class TodoList extends Component {

    todoInitialState = {
        todoText: '',
        priority: 'normal',
        completed: false
    }

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodo: this.todoInitialState,
            searchQuery: '',
            showUrgentOnly: false // State to keep track of whether to show only urgent todos
        };
    }

    addTodo = () => {
        const { newTodo, todos } = this.state;
        if (newTodo.todoText.trim() !== '') {
            this.setState({
                todos: [newTodo, ...todos],
                newTodo: this.todoInitialState
            });
        }
    };

    clearAllTodos = () => {
        this.setState({
            todos: []
        });
    };

    removeFirstTodo = () => {
        const { todos } = this.state;
        if (todos.length > 0) {
            this.setState({
                todos: todos.slice(1)
            });
        }
    };

    removeCompletedTodos = () => {
        const { todos } = this.state;
        const filteredTodos = todos.filter(todo => todo.completed !== true)
        this.setState({ todos: filteredTodos })

    }
    handleInputChange = (e) => {
        // Update the newTodo value in the state with the input value
        this.setState({
            newTodo: {
                ...this.state.newTodo,
                todoText: e.target.value,
            },
        });
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            // Prevent the default form submission behavior
            e.preventDefault();
            // Call the addTodo function when the Enter key is pressed
            this.addTodo();
        }
    };


    handlePriorityChange = (e) => {
        this.setState({
            newTodo: {
                ...this.state.newTodo,
                priority: e.target.checked ? 'urgent' : 'normal'
            }
        });
    };

    handleCheckBoxChange = (e) => {
        // Get the current checked status of the checkbox
        const currentTodoChecked = e.target.checked;
        // Get the todo text associated with the checkbox
        const currentTodoText = e.target.value;

        // Map over the todos array and update the completed status of the specific todo
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.todoText === currentTodoText) {
                // Create a new object with the updated completed status
                return { ...todo, completed: currentTodoChecked };
            }
            // If the todo does not match the current todo text, return it unchanged
            return todo;
        });

        // Update the state with the updated todos array
        this.setState({
            todos: updatedTodos
        });
    };

    handleSearchChange = (e) => {
        this.setState({
            searchQuery: e.target.value
        });
    };

    // Function to toggle the display of only urgent todos
    toggleShowUrgentOnly = () => {
        this.setState((prevState) => ({
            showUrgentOnly: !prevState.showUrgentOnly
        }));
    };

    render() {
        const { todos, newTodo, searchQuery, showUrgentOnly } = this.state;

        // Filter todos based on search query
        const searchfilteredTodos = todos.filter(todo =>
            todo.todoText.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const filteredTodos = showUrgentOnly
            ? searchfilteredTodos.filter((todo) => todo.priority === 'urgent')
            : searchfilteredTodos;

        // Sort todos based on priority
        const sortedTodos = filteredTodos.sort((a, b) => {
            if (a.priority === "urgent" && b.priority !== "urgent") {
                return -1; // a comes before b
            } else if (a.priority !== "urgent" && b.priority === "urgent") {
                return 1; // b comes before a
            } else {
                return 0; // no change in order
            }
        });

        return (
            <div className="todo-list-container">
                <h1>Todo List</h1>
                <div className="search-container">
                    <label htmlFor="search" className="search-label">Search:</label>
                    <input
                        type="text"
                        id="search"
                        className="search-input"
                        placeholder="Enter search query"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                    />
                </div>
                <AddToDo newTodo={newTodo} handleInputChange={this.handleInputChange} handleKeyPress={this.handleKeyPress} handlePriorityChange={this.handlePriorityChange} handleAddToDo={this.addTodo} />

                <div className="buttons-container">
                    <button className="clear-button" onClick={this.clearAllTodos}>
                        Clear All
                    </button>
                    <button className="remove-button" onClick={this.removeFirstTodo}>
                        Remove First Todo
                    </button>
                    <button className="remove-completed-button" onClick={this.removeCompletedTodos}>
                        Remove Completed
                    </button>
                    <button className="show-urgent-button" onClick={this.toggleShowUrgentOnly}>
                        {showUrgentOnly ? "Show All" : "Show Urgent"}
                    </button>
                </div>

                <ul className="todos-list">
                    {sortedTodos.map((todo, index) => (
                        <Todo key={index} text={todo.todoText} priority={todo.priority} completed={todo.completed} handleChange={this.handleCheckBoxChange} />
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;

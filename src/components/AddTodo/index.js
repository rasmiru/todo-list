import { Component } from 'react'
class AddToDo extends Component {
    render() {
        const { newTodo, handleInputChange, handleKeyPress, handlePriorityChange, handleAddToDo } = this.props
        return (
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Add a todo"
                    value={newTodo.todoText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="priority"
                        name="priority"
                        checked={newTodo.priority === 'urgent'}
                        onChange={handlePriorityChange}
                    />
                    <label htmlFor="priority">Urgent</label>
                </div>
                <button className="add-button" onClick={handleAddToDo}>
                    Add Todo
                </button>
            </div>
        )
    }
}

export default AddToDo
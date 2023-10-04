import React, { Component } from 'react';
import './index.css'; // Import the associated CSS file for the Todo component

class Todo extends Component {
    render() {

        // Destructure the props to extract the necessary values
        const { text, priority, completed, handleChange } = this.props
        return (
            <li className={`todo-item ${completed && 'complete'}`}>
                {/* Create an <li> element with the class name 'todo-item'. If 'completed' is true, add the 'complete' class */}
                <input type="checkbox" checked={completed} value={text} onChange={handleChange} />
                {/* Create a checkbox input element. Set its checked status to 'completed' and value to 'text'. Assign 'handleChange' as the event handler for 'onChange' */}
                {text}
                {/* Display the todo text */}
                {priority === 'urgent' && <span className="urgent-label">Urgent</span>}
                {/* Conditionally render the 'Urgent' label. If 'priority' is 'urgent', display the span element with the class name 'urgent-label' and the text 'Urgent' */}
            </li>
        );
    }
};

export default Todo;
// Export the Todo component as the default export

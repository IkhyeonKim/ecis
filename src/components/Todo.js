// Todos 컴포넌트의 자식 컴포넌트 입니다.
// 필요한 html 요소들을 반환합니다.
import React from 'react'

function Todo(props) {

    return (
        <div className={`todos__todo ${props.isChecked ? `todos__todo--done` : `todos__todo--notDone`}`}>
            <div className="todos__todo--content">                
                <p className="text__todo">{props.todoText}</p>
                {props.isChecked ? <p className="text__doneOrNot">Done!</p> : <p className="text__doneOrNot">Not Done</p>}
            </div>

            <div className="todos__todo--btns">
                <button className="todos__todo--btn" onClick={() => props.handleEditModal(props.todo)} >Edit</button>
                <button className="todos__todo--btn" onClick={() => props.handleDeleteTodo(props.todo)}>Remove</button>
                <div className="todos__todo--checkBox">
                    <label htmlFor={props.todoText}>Done</label>
                    <input
                    type="checkbox" 
                    value="Done"
                    id={props.todoText} 
                    checked={props.isChecked} 
                    onChange={() => props.onChange(props.todoText)} 
                    /> 
                </div>
            </div>     

        </div>
    )
}

export default Todo
// Todos 컴포넌트는 AppTodo 컴포넌트 자식 컴포넌트로 Todo 컴포넌트를 자식 컴포넌트로 가지고 있습니다.
// 실질적으로 할일 들을 렌더링하고 할 일을 조회하는 기능을 수행하는 컴포넌트입니다.
import React from 'react'
import Todo from './Todo'

export default class Todos extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            searchText: '', // 아이템 조회를 위한 텍스트입니다.
            filtered: [], // 필터링을 통한 아이템들을 저장하기 위한 배열입니다.
            checked: false,
        }
        
        this.handleFilterTodos = this.handleFilterTodos.bind(this)
        this.renderTodos = this.renderTodos.bind(this)
        
    }


    handleFilterTodos(event) {
        // 사용자가 할 일을 입력했을 시 해당하는 할 일을 필터링하고 상태를 변환시키는 함수 입니다.
        const filteredTodos = this.props.todos.filter( todo => {
            return todo[0].toLowerCase().includes(event.target.value)
        })
                
        this.setState({
            searchText: event.target.value,
            filtered: filteredTodos
        })
        

    }

    renderTodos(todo){
        // 실질적으로 할 일 리스트를 렌더링 하는 함수입니다.
        return(
            <Todo
                todo={todo}
                todoText={todo[0]}
                key={todo[0]}
                handleDeleteTodo={this.props.handleDeleteTodo}
                handleEditModal={this.props.handleEditModal}
                isChecked={todo[1]}
                onChange={this.props.handleToggleChange}
            />
        )
    }

    render(){

        return (
            <div className="todos__wrapper">
                <div className="todos__search">
                    <input
                        className="todos__input todos__input--text" 
                        type="text" 
                        name="searchTodo" 
                        placeholder="Search in your to-do list!"
                        onChange={this.handleFilterTodos}    
                    />
                </div>               
                <div className="todos__todo-container">
                    {
                        this.state.filtered.length === 0 ? 
                        this.props.todos.map( (todo) => this.renderTodos(todo)) : 
                        this.state.filtered.map( (todo) => this.renderTodos(todo))
                    }
                </div>

            </div>
        )
    }
}

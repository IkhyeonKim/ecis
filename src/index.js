// Todo list앱의 메인이 되는 파일입니다. TodoApp이 최상위 부모 컴포넌트 입니다.

import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import './index.scss';
import Todos from './components/Todos'
import TodoModal from './components/TodoModal'
import AddTodo from './components/AddTodo'

ReactModal.setAppElement('#root')

class TodoApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            todos: [], // todo list 입니다
            newTodo: undefined, // todo가 수정 되었을 시 사용하는 상태입니다
            currentlyEditing: undefined, // 상세페이지(Modal) 에서 유저가 수정하기 전 상태입니다.
            targetToggle: undefined, // 상세페이지에서 할 일이 완료 되었는지 아닌지 체크하는 상태입니다.
        }
        this.handleAddTodo = this.handleAddTodo.bind(this)
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
        this.handleEditModal = this.handleEditModal.bind(this)
        this.handleCancelEditingTodo = this.handleCancelEditingTodo.bind(this)
        this.handleTodoChange = this.handleTodoChange.bind(this)
        this.handleEditTodo = this.handleEditTodo.bind(this)
        this.isExists = this.isExists.bind(this)
        this.handleToggleChange = this.handleToggleChange.bind(this)
        this.isChecked = this.isChecked.bind(this)
    }

    
    handleToggleChange(todo){
        // 체크박스에 사용되는 함수로 상태가 변경 되었을 때(완료, 미완료) 호출 되는 함수로 
        // 새로운 리스트를 반환하고 상태를 변경하여 렌더링 하는 함수입니다. 
        const newTodos = this.state.todos.slice()
 
        for(let i =0; i< newTodos.length; i++){
           
            if(newTodos[i][0] === todo){

                newTodos[i][1] = !newTodos[i][1]
                               
                const json = JSON.stringify(newTodos)
                localStorage.setItem('todos', json)

                this.setState({
                    todos: newTodos
                })

                return

            }
        }

        
    }

    handleCancelEditingTodo(){
        // 상세페이지에서 취소를 눌렀을 시 호출되는 함수로
        // 변경되었던 사항을 취소하고 상태를 초기화 합니다.
        this.setState({
            newTodo: '',
            currentlyEditing: ''
        })

    }

    handleTodoChange(event){
        // 상세페이지에서 확인을 누르기 전 텍스트가 바뀔 때 마다 호출되는 함수로
        // 변경되었던 사항을 반영하고 상태를 바꿔줍니다.
        this.setState({
            newTodo: event.target.value
        })
    }

    handleEditTodo(){

        //If the user clicks okay, then change the todo
        // 상세페이지에서 확인을 눌렀을 때 호출 되는 함수로
        // 변경사항을 반영하고 새로운 리스트를 반환 로컬 스토리지에도 변경 사항을 반영합니다.
        const index = this.state.todos.findIndex( todo => todo[0] === this.state.currentlyEditing)
        let newTodos = this.state.todos.slice()
        newTodos[index][0] = this.state.newTodo

        const json = JSON.stringify(newTodos)
        localStorage.setItem('todos',json)

        this.setState({
            todos: newTodos,
            newTodo: '',
            currentlyEditing: '',
            targetToggle: newTodos[index][1]
        })


    }

    handleEditModal(targetTodo){
        // Edit 버튼을 눌렀을 때 호출 되는 함수로
        // 해당하는 컴포넌트 정보를 전달 해 줍니다.
        this.setState({
            newTodo: targetTodo[0],
            currentlyEditing: targetTodo[0],
            targetToggle: targetTodo[1]
        })
    }

    handleDeleteTodo(targetTodo){
        // Remove 버튼을 눌렀을 때 해당 하는 리스트 아이템을 필터링 한 뒤 새로운 배열을 반환합니다.
        this.setState( () => {
            return {todos: this.state.todos.filter( todo => todo[0] !== targetTodo[0] )}
        })
    }

    handleAddTodo(e){
        // 새로운 아이템을 추가 했을 때 호출 되는 함수로 잘 못된 값이거나 중복되는 값이면 사용자 에게 알려주고
        // 새로운 아이템을 리스트에 추가합니다.
        e.preventDefault()
        const todo = [e.target.addTodo.value.trim(), false]
        const newTodos = this.state.todos.length === 0 ? [] : this.state.todos.slice()
        
        if(!todo[0]){
            alert('Please enter valid value!')
        }else if(this.isExists(this.state.todos, todo)){
            alert('That to-do value already exists')
        }else{
            newTodos.push(todo)
            this.setState( {
                todos: newTodos
            })
        }
        
        e.target.addTodo.value = ''
        
    }

    isChecked(todos, todoText) {
        console.log(todos.filter( todo => todo[0] === todoText)[1])
        return todos.filter( todo => todo[0] === todoText)[1]
    }

    isExists(todos, newTodo){
        // 중복되는 값이 있는지 확인 하는 함수 입니다.
        for(let i = 0; i< todos.length; i++){
            if(todos[i][0].toLowerCase() === newTodo[0].toLowerCase()){
                return true
            }
        }
        return false
    }
  
    componentDidMount(){
        // 컴포넌트가 처음 마운트 될 때 로컬 스토리지에서 리스트를 가져옵니다.
        try{
            const json = localStorage.getItem('todos')
            const todos = JSON.parse(json)
            if(todos){
                this.setState({
                    todos: todos
                })
            }
        }catch(error){
            console.log(error)
        }
    }

    componentDidUpdate(prevProps, prevState){
        // 리스트에 아이템이 추가 또는 삭제되거나 아이템 상태가 완료 또는 미완료로 바뀔 때 마다 리 렌더링을 위한 함수입니다.
        if((prevState.todos.length !== this.state.todos.length) || (prevState.targetToggle !== this.state.targetToggle)){

            const json = JSON.stringify(this.state.todos)
            localStorage.setItem('todos', json)
            this.forceUpdate()
        }
    }
    
    render(){
      return(
        <div className="todoApp">
            <div className="header">
                <h1>Todo List</h1>
            </div>
            
            <div className="addTodo">
                <AddTodo
                    onSubmit={this.handleAddTodo}
                />
            </div>
            <div className="todos">
                <Todos
                    todos={this.state.todos}
                    targetToggle={this.state.targetToggle}
                    handleEditModal={this.handleEditModal}
                    handleDeleteTodo={this.handleDeleteTodo}
                    handleToggleChange={this.handleToggleChange}
                />
            </div>

            <TodoModal 
                todos={this.state.todos}
                targetToggle={this.state.targetToggle}
                newTodo={this.state.newTodo}
                currentlyEditing={this.state.currentlyEditing}
                handleCancelEditingTodo={this.handleCancelEditingTodo}
                handleEditTodo={this.handleEditTodo}
                handleChange={this.handleTodoChange}
                handleToggleChange={this.handleToggleChange}
            />
        </div>
      )
    }
  }

ReactDOM.render(<TodoApp />, document.getElementById('root'));

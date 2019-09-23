// react-modal 패키지를 사용했습니다.
// TodoApp컴포넌트의 자식 컴포넌트로 부모의 상태를 전달받아 변경사항이 
// 프로그램 전체에 적용 되도록 만들었습니다.
import React from 'react';
import ReactModal from 'react-modal';


class TodoModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            customStyles: {
                content : {
                  top                   : '50%',
                  left                  : '50%',
                  right                 : 'auto',
                  bottom                : 'auto',
                  marginRight           : '-50%',
                  transform             : 'translate(-50%, -50%)',
                  width                 : '70vw',
                  'maxWidth'            : '900px',
                }
            }
        }
    }

    render(){
       
        return(
            <ReactModal
                isOpen={!!this.props.currentlyEditing}
                onRequestClose={this.props.handleCancelEditingTodo}
                style={this.state.customStyles}
            >   
                <div className="todoModal">
                    <h2>Edit todo</h2>
                        <input
                            className="todoModal__input"
                            type="text"
                            name="EditTodo"
                            value={this.props.newTodo}
                            onChange={this.props.handleChange}                    
                        />

                        <div className="todoModal__btns">
                            <button onClick={() => this.props.handleEditTodo()}>Okay</button>
                            <button onClick={() => this.props.handleCancelEditingTodo()}>Cancel</button>
                            <div>
                                <label htmlFor={this.props.currentlyEditing + 'Modal'}>Done</label>
                                <input 
                                    type="checkbox" 
                                    value="Done"
                                    id={this.props.currentlyEditing + 'Modal'} 
                                    defaultChecked={this.props.targetToggle} 
                                    onChange={() => this.props.handleToggleChange(this.props.currentlyEditing)} 
                                />
                            </div>
                        </div>

                </div>
            </ReactModal>
        )
    }
    
}

export default TodoModal
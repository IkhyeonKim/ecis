// 부모 컴포넌트로 부터 상태를 전달 받아 필요한 html 요소를 반환합니다.

import React from 'react';

function AddTodo(props) {
  
  return(
    <form className="addTodo__form" onSubmit={props.onSubmit}>
      <input className="addTodo__input addTodo__input--text" type="text" placeholder="Add something to do" name="addTodo"/>
      <input className="addTodo__input addTodo__input--submit" type="submit" value="Add"/>
    </form>
  )
    
}

export default AddTodo
import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
  render(){
    const { todos, onToggle, onRemove } = this.props;

    return (
      <div>
        <TodoItem text="오늘할일" />
        <TodoItem text="이제 자야지" />
        <TodoItem text="이제 자야지" />
      </div>
    );  
  }
}

export default TodoItemList;
import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

import './App.css';

const colors = ['#343a40', '#f03e3e', '#12b886', '#228ae6'];

class App extends Component {

  // DB없어서 임의로 값 셋팅
  id = 4

  state = {
    input: '',
    todos: [
      {id: 0, text: '항목을 추가하세요!! ', checked: true},
      {id: 1, text: '방 정리', checked: false},
      {id: 2, text: '눈썹 정리', checked: false},
      {id: 3, text: '온라인이력서, 링크드인 최신화', checked: false},
    ],
    color: '#343a40'
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    // 파라미터로 받은 id를 가지고 몇번째 아이템인지 찾는다
    const index = todos.findIndex(todo=> todo.id === id);
    const selected = todos[index]; // 선택한 객체

    const nextTodos = [...todos]; // 배열 복사

    //기존의 값들을 복사하고, checked값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      todos: nextTodos
    });
  }

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const {input, todos, color} = this.state;
    if(this.state.input === '') return;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
        color
      })
    });
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if(e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleSelectColor = (color) => {
    this.setState({
      color
    });

  }

  render() {
    const {input, todos, color} = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handleSelectColor
    } = this;

    return (
        <TodoListTemplate form={(<Form 
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color={color}
            />
          )}
          palette={(
            <Palette colors={colors} selected={color} onSelect={handleSelectColor}/>   
          )}
        >
          <TodoItemList 
            todos={todos} 
            onToggle={handleToggle} 
            onRemove={handleRemove}
          />
        </TodoListTemplate>
    );
  }
}

export default App;
